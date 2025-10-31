import { useState } from 'react';
import { MessageCircle, X, Mail, Phone, Calendar } from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email Us",
      action: () => window.open('mailto:support@inveniaconsulting.com', '_blank'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Us",
      action: () => window.open('tel:+919986444496', '_blank'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule Meeting",
      action: () => {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Assistant",
      action: () => {
        const evt = new Event('chatbot:toggle');
        window.dispatchEvent(evt);
        setIsOpen(false);
      },
      color: "bg-cyan-600 hover:bg-cyan-700"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="bg-white text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={action.action}
              className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
        ) : (
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
