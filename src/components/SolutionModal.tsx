import { X, ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    heading: string;
    subheading: string;
    highlights: string[];
    keyFeatures: Array<{
      icon: JSX.Element;
      title: string;
      description: string;
    }>;
    image?: string;
  };
  onStartClick: () => void;
}

const SolutionModal = ({ isOpen, onClose, title, content, onStartClick }: SolutionModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-2">{content.heading}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                {/* Subheading */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-600">Overview</h3>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {content.subheading}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Highlights</h3>
                  <div className="space-y-4">
                    {content.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-gray-700">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Core Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {content.keyFeatures.map((feature, index) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          {feature.icon}
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="space-y-8">
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={content.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"}
                    alt={title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Benefits</h3>
                  <div className="space-y-3">
                    {[
                      "40-60% reduction in manual processes",
                      "30-50% improvement in operational efficiency",
                      "Real-time insights for better decision making",
                      "Scalable architecture for future growth"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Efficiency Gain", value: "50%" },
                    { label: "Cost Reduction", value: "40%" },
                    { label: "Implementation", value: "12 Weeks" },
                    { label: "ROI", value: "6 Months" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600">
                Ready to transform your business with {title}?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Learn More
                </button>
                <button
                  onClick={() => {
                    onStartClick();
                    onClose();
                  }}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center"
                >
                  Let's Start <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionModal;