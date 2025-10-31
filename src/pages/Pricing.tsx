import  { Check, ArrowRight } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Contact Us",
      description: "Perfect for small businesses starting their SAP journey",
      features: [
        "SAP Business One implementation",
        "Basic training included",
        "Email support",
        "Standard reporting",
        "6 months support"
      ]
    },
    {
      name: "Professional",
      price: "Contact Us",
      description: "Comprehensive solution for growing enterprises",
      features: [
        "SAP S/4HANA implementation",
        "Advanced training program",
        "Phone & email support",
        "Custom reporting",
        "12 months support",
        "Cloud migration assistance"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "Full-scale transformation for large organizations",
      features: [
        "Complete SAP suite implementation",
        "Dedicated project manager",
        "24/7 premium support",
        "Advanced analytics",
        "24 months support",
        "Custom development",
        "Integration services"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Pricing Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options tailored to your business size and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-xl border-2 p-8 ${plan.popular ? 'border-blue-500 relative' : 'border-gray-100'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                plan.popular 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}>
                Get Quote <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Every business is unique. Let us create a tailored SAP solution that fits your specific needs and budget.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Free</div>
                <div className="text-gray-700">Initial Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Flexible</div>
                <div className="text-gray-700">Payment Terms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">ROI</div>
                <div className="text-gray-700">Guaranteed Results</div>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
 