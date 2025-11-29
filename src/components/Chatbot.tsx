import { useEffect, useRef, useState } from 'react';
import { Send, X, ChevronRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

interface Message {
  role: 'user' | 'assistant' | 'system' | 'options';
  content: string | { text: string; options: string[] };
}

const PREDEFINED_OPTIONS = {
  initial: [
    'Tell me about your services',
    'What solutions do you offer?',
    'Show me your products',
    'Contact information'
  ],
  services: [
    'SAP Implementation',
    'Digital Transformation',
    'Cloud Solutions',
    'IT Consulting',
    'Back to main menu'
  ],
  solutions: [
    'Enterprise Solutions',
    'Business Intelligence',
    'Custom Development',
    'Back to main menu'
  ],
  products: [
    'SAP Add-ons',
    'Custom Software',
    'Mobile Applications',
    'Back to main menu'
  ]
};

const RESPONSES: Record<string, string> = {
  'Tell me about your services': 'We offer a wide range of services to help your business grow. Here are some of our key service areas:',
  'What solutions do you offer?': 'Our solutions are designed to address your business challenges. Here are some of our offerings:',
  'Show me your products': 'We have developed several products to enhance business operations. Here are some of them:',
  'Contact information': 'You can reach us at:\n\nEmail: support@inveniaconsulting.com\nPhone: +91 99864 44496\n\nOur office is located at:\nWeWork Lightbridge, 6th floor, Hiranandani Business Park, Saki Vihar Rd, Tunga Village, Chandivali, Powai, Maharashtra 400072',
  'SAP Implementation': 'Our SAP Implementation services help businesses of all sizes to deploy SAP solutions efficiently. We cover everything from planning to post-go-live support.',
  'Digital Transformation': 'Transform your business with our digital transformation services that leverage cutting-edge technologies to improve efficiency and drive growth.',
  'Cloud Solutions': 'Our cloud solutions help businesses migrate to the cloud, optimize cloud infrastructure, and develop cloud-native applications.',
  'IT Consulting': 'Get expert advice on IT strategy, digital transformation, and technology adoption from our experienced consultants.',
  'Enterprise Solutions': 'Comprehensive enterprise solutions tailored to your business needs, including ERP, CRM, and supply chain management.',
  'Business Intelligence': 'Turn your data into actionable insights with our business intelligence solutions and analytics services.',
  'Custom Development': 'Custom software development services to build solutions that perfectly fit your business requirements.',
  'SAP Add-ons': 'Enhance your SAP experience with our custom add-ons and extensions.',
  'Custom Software': 'Bespoke software solutions designed specifically for your business needs.',
  'Mobile Applications': 'Cross-platform mobile applications to help you reach your customers on the go.'
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m your AI assistant. How can I help you today?' 
    },
    { 
      role: 'options', 
      content: { 
        text: 'Choose an option or type your question:', 
        options: PREDEFINED_OPTIONS.initial 
      } 
    }
  ]);
  const [context, setContext] = useState('initial');
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

  const handlePredefinedResponse = (option: string) => {
    const userMessage = { role: 'user' as const, content: option };
    const nextMessages = [...messages, userMessage];
    
    let response = RESPONSES[option] || "I'm not sure how to respond to that. Could you please rephrase?";
    let nextContext = context;
    let options: string[] = [];

    // Handle context switching based on user selection
    if (option === 'Tell me about your services') {
      nextContext = 'services';
      options = PREDEFINED_OPTIONS.services;
    } else if (option === 'What solutions do you offer?') {
      nextContext = 'solutions';
      options = PREDEFINED_OPTIONS.solutions;
    } else if (option === 'Show me your products') {
      nextContext = 'products';
      options = PREDEFINED_OPTIONS.products;
    } else if (option === 'Back to main menu') {
      nextContext = 'initial';
      options = PREDEFINED_OPTIONS.initial;
      response = 'What would you like to know about?';
    } else if (option in RESPONSES) {
      // For other predefined responses, stay in current context
      options = PREDEFINED_OPTIONS[nextContext as keyof typeof PREDEFINED_OPTIONS] || [];
    } else {
      // For custom messages, use Gemini
      return false;
    }

    const assistantMessage = { role: 'assistant' as const, content: response };
    const optionsMessage = { 
      role: 'options' as const, 
      content: { 
        text: 'What would you like to know more about?', 
        options 
      } 
    };

    setMessages([...nextMessages, assistantMessage, optionsMessage]);
    setContext(nextContext);
    return true;
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    
    setInput('');
    const userMessage = { role: 'user' as const, content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    // First try to handle as predefined response
    const handled = handlePredefinedResponse(text);
    
    // If not a predefined response, use Gemini
    if (!handled) {
      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            messages: nextMessages
              .filter(m => m.role !== 'options')
              .map(m => ({ 
                role: m.role, 
                content: typeof m.content === 'string' ? m.content : m.content.text 
              })) 
          })
        });
        
        if (!res.ok) throw new Error('Chat request failed');
        
        const data = await res.json();
        const assistantMessage = { 
          role: 'assistant' as const, 
          content: data.reply ?? 'I\'m sorry, I couldn\'t process your request.' 
        };
        
        // Show options after Gemini response
        const optionsMessage = { 
          role: 'options' as const, 
          content: { 
            text: 'Is there anything else I can help you with?', 
            options: PREDEFINED_OPTIONS[context as keyof typeof PREDEFINED_OPTIONS] || PREDEFINED_OPTIONS.initial 
          } 
        };
        
        setMessages([...nextMessages, assistantMessage, optionsMessage]);
      } catch (e) {
        const errorMessage = { 
          role: 'assistant' as const, 
          content: 'Sorry, I had trouble replying. Please try again later.' 
        };
        setMessages([...nextMessages, errorMessage]);
      }
    }
    
    setLoading(false);
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
                {m.role === 'options' ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 mb-1">
                      {typeof m.content !== 'string' && m.content.text}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {typeof m.content !== 'string' && m.content.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePredefinedResponse(option)}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg border border-blue-100 transition-colors flex items-center"
                        >
                          {option}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={
                    'inline-block px-3 py-2 rounded-2xl max-w-[85%] ' +
                    (m.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800')
                  }>
                    {typeof m.content === 'string' ? (
                      <div className="whitespace-pre-line">{m.content}</div>
                    ) : (
                      <div className="whitespace-pre-line">{m.content.text}</div>
                    )}
                  </div>
                )}
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
