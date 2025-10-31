import { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. How can I help you today?' }
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const toggleHandler = () => setOpen((v) => !v);
    window.addEventListener('chatbot:open', openHandler as any);
    window.addEventListener('chatbot:toggle', toggleHandler as any);
    return () => {
      window.removeEventListener('chatbot:open', openHandler as any);
      window.removeEventListener('chatbot:toggle', toggleHandler as any);
    };
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text } as Message];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) })
      });
      if (!res.ok) throw new Error('Chat request failed');
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply ?? '(no response)' }]);
    } catch (e) {
      setMessages([...next, { role: 'assistant', content: 'Sorry, I had trouble replying. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-between">
            <div className="font-semibold">AI Assistant</div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div ref={listRef} className="h-72 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={
                  'inline-block px-3 py-2 rounded-2xl max-w-[85%] ' +
                  (m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800')
                }>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-block px-3 py-2 rounded-2xl max-w-[85%] bg-white border border-gray-200 text-gray-500 italic">
                  Typing...
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t bg-white flex items-center space-x-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={send} disabled={loading} className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
