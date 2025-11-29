import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import connectToDatabase from './mongo.js';
import { addSubscriber, addContact, saveChatLog, getChatHistory } from './db-utils.js';
import fs from 'fs';
import contactRouter from './routes/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_BASE = (process.env.FRONTEND_BASE || 'http://localhost:5173').replace(/\/$/, '');

// Enable CORS with specific options
const corsOptions = {
  origin: FRONTEND_BASE,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const SITE_LINKS = {
  services: `${FRONTEND_BASE}/#services`,
  products: `${FRONTEND_BASE}/#products`,
  solutions: `${FRONTEND_BASE}/#solutions`,
  industries: `${FRONTEND_BASE}/#industries`,
  resources: `${FRONTEND_BASE}/#resources`,
  company: `${FRONTEND_BASE}/#company`,
  contact: `${FRONTEND_BASE}/#contact`,
  support: `${FRONTEND_BASE}/#contact`
};

app.use(cors({ origin: '*'}));
app.use(express.json());
// Site context to guide Gemini responses
const SITE_CONTEXT = `You are Invenia Techlabs' AI assistant for a corporate website built with React/Vite.\nCompany: Invenia Techlabs — SAP Excellence.\nOfferings:\n- Solutions: ERP & Digital Core (SAP S/4HANA), Finance & Accounting, Supply Chain, Human Capital, Customer Experience, Cloud Solutions, Data & Analytics, Security & Compliance.\n- Products: SAP S/4HANA, SAP SuccessFactors, SAP Ariba, SAP Concur, SAP Analytics Cloud, SAP BTP.\n- Services: SAP Consulting, SAP Implementation, Migration & Upgradation, Managed Support, Integration, Training & Enablement.\n- Industries: Manufacturing, Retail & E-commerce, Healthcare, Banking & Finance, Education, Public Sector, Energy & Utilities, Automotive.\n- Resources: Blogs, Whitepapers, Webinars, Guides, Newsletter.\nStyle: Be concise, friendly, and helpful. Provide actionable answers grounded in the above. Encourage contacting via the Contact section for demos and quotes.`;

// Build a lightweight knowledge base from the local site source files
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(PROJECT_ROOT, 'src');
const INDEX_PATHS = [
  path.join(SRC_DIR, 'pages'),
  path.join(SRC_DIR, 'components')
];

/** @type {{ path: string, text: string }[]} */
let SITE_DOCS = [];

function listFilesRecursively(dir) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        results = results.concat(listFilesRecursively(p));
      } else if (/\.(tsx?|md|mdx|jsx|html|txt)$/i.test(e.name)) {
        results.push(p);
      }
    }
  } catch (_) {
    // ignore
  }
  return results;
}

function extractReadableText(source) {
  if (!source) return '';
  let s = source.toString('utf8');
  // Strip JSX/HTML tags
  s = s.replace(/<[^>]*>/g, ' ');
  // Remove typical React/TSX expressions { ... }
  s = s.replace(/\{[^}]*\}/g, ' ');
  // Remove import/export lines
  s = s.replace(/^\s*(import|export)\s+[^;]*;?$/gm, ' ');
  // Collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function chunkText(text, size = 800, overlap = 100) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + size, text.length);
    chunks.push(text.slice(i, end));
    if (end === text.length) break;
    i = end - overlap;
    if (i < 0) i = 0;
  }
  return chunks;
}

function buildSiteDocs() {
  const docs = [];
  for (const base of INDEX_PATHS) {
    const files = listFilesRecursively(base);
    for (const f of files) {
      try {
        const raw = fs.readFileSync(f, 'utf8');
        const text = extractReadableText(raw);
        if (text.length > 60) {
          const chunks = chunkText(text);
          for (let idx = 0; idx < chunks.length; idx++) {
            docs.push({ path: `${path.relative(PROJECT_ROOT, f)}#${idx}`, text: chunks[idx] });
          }
        }
      } catch (_) {
        // ignore individual read errors
      }
    }
  }
  SITE_DOCS = docs;
}

function simpleRelevanceScore(query, text) {
  const q = (query || '').toLowerCase();
  const terms = q.split(/[^a-z0-9+]+/).filter(Boolean);
  if (!terms.length) return 0;
  const t = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    // count occurrences (bounded)
    const matches = t.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || [];
    score += Math.min(matches.length, 5);
  }
  // length prior to prefer medium chunks
  const lenPenalty = Math.abs(text.length - 600) / 600;
  return score - lenPenalty;
}

function retrieveContext(query, maxChars = 1800) {
  if (!SITE_DOCS.length) return '';
  const scored = SITE_DOCS
    .map(d => ({ ...d, s: simpleRelevanceScore(query, d.text) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 12);
  let picked = '';
  for (const d of scored) {
    if (picked.length + d.text.length + 50 > maxChars) break;
    picked += `\n[${d.path}] ${d.text}`;
  }
  return picked.trim();
}

// Build docs at startup
buildSiteDocs();
console.log(`Indexed site docs: ${SITE_DOCS.length} chunks`);

// Use contact routes
app.use(contactRouter);

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// AI status: quick diagnostics
app.get('/api/ai-status', (_req, res) => {
  res.json({
    ok: true,
    geminiKeyPresent: Boolean(process.env.GEMINI_API_KEY),
    indexedChunks: SITE_DOCS.length
  });
});

// Subscribe: save email
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  try {
    await withDb(async (conn) => {
      await conn.query('INSERT IGNORE INTO subscribers(email) VALUES(?)', [email]);
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'db_error' });
  }
});

// Contact: save message
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  try {
    await withDb(async (conn) => {
      await conn.query(
        'INSERT INTO contacts(name, email, phone, message) VALUES(?,?,?,?)',
        [name, email, phone ?? null, message ?? null]
      );
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'db_error' });
  }
});

// Chat: proxy to Gemini (placeholder if no key)
app.post('/api/chat', async (req, res) => {
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
  const GEMINI_MODEL = (process.env.GEMINI_MODEL || 'models/gemini-2.5-flash').trim();
  try {
    // Log chat messages to MongoDB (non-fatal on failure)
    try {
      for (const m of messages) {
        if (!m?.role || !m?.content) continue;
        await saveChatLog(m.role, m.content, req.sessionID);
      }
    } catch (error) {
      console.error('Error saving chat log:', error);
      // Continue execution even if logging fails
    }

    const userPrompt = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
    const siteContext = retrieveContext(userPrompt);

    if (!GEMINI_KEY) {
      const fallback = `Here is what I know from the website:\n${siteContext || '(no site context indexed)'}\n\nHow can I help you further?`;
      return res.json({ reply: fallback });
    }

    // Gemini API call (with site context + retrieved snippets + known links)
    const linksBlock = `Services: ${SITE_LINKS.services}\nProducts: ${SITE_LINKS.products}\nSolutions: ${SITE_LINKS.solutions}\nIndustries: ${SITE_LINKS.industries}\nResources: ${SITE_LINKS.resources}\nCompany: ${SITE_LINKS.company}\nContact/Support: ${SITE_LINKS.contact}`;
    const composed = `${SITE_CONTEXT}\n\nWebsite Context (verbatim snippets with file anchors):\n${siteContext || '(no context)'}\n\nUseful Links:\n${linksBlock}\n\nInstructions:\n- Answer naturally and helpfully.\n- Prefer facts grounded in Website Context.\n- When users ask about contact, support, demos, quotes, or help, include the Contact/Support link.\n- When users ask about services/products/solutions/industries/resources/company, include the relevant link.\n- If unsure or info is missing, say so briefly and point to Contact.\n- Keep responses concise and user-centric.\n\nUser message(s):\n${userPrompt || 'Hello'}`;
    const url = `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: composed }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 512
        }
      })
    });
    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      console.error('Gemini API error', r.status, errBody.slice(0, 500));
      throw new Error(`gemini_error_${r.status}`);
    }
    await connectToDatabase();
    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    // Intent-based fallback if model returns empty/too short
    const q = (userPrompt || '').toLowerCase();
    const short = !reply || reply.trim().length < 20 || /no reply/i.test(reply);
    if (short) {
      // ... (rest of the code remains the same)
      const aboutProducts = /product|s\/4|successfactors|ariba|concur|analytics cloud|sac|btp/.test(q);
      const aboutContact = /contact|support|help|demo|quote|reach|email|phone|assistance/.test(q);
      const aboutCompany = /company|about us|who are you|invenia/.test(q);
      const aboutResources = /resource|blog|whitepaper|webinar|guide/.test(q);
      const parts = [];
      if (aboutServices) parts.push(`Services we offer include Consulting, Implementation, Migration & Upgradation, Managed Support, Integration, and Training & Enablement. See: ${SITE_LINKS.services}`);
      if (aboutProducts) parts.push(`Key SAP products we work with: SAP S/4HANA, SuccessFactors, Ariba, Concur, Analytics Cloud, and SAP BTP. See: ${SITE_LINKS.products}`);
      if (aboutCompany) parts.push(`Learn about Invenia Techlabs on our Company page: ${SITE_LINKS.company}`);
      if (aboutResources) parts.push(`Explore our resources: ${SITE_LINKS.resources}`);
      if (aboutContact || parts.length === 0) parts.push(`Need help, a demo, or a quote? Contact us: ${SITE_LINKS.contact}`);
      reply = parts.join('\n');
    }
    res.json({ reply });
  } catch (e) {
    console.error('Chat handler error:', e?.message || e);
    const safeFallback = `I had trouble reaching the AI service. You can ask me about our services, solutions, products, industries we serve, or request support. You can also reach us via the Contact page for immediate assistance.`;
    res.status(200).json({ reply: safeFallback });
  }
});

// Start the server after database connection is established
async function startServer() {
  try {
    // Connect to the database
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('✅ Connected to MongoDB!');

    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
