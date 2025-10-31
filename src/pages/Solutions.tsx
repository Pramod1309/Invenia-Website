import  { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      title: "ERP & Digital Core",
      description: "Transform your business operations with SAP S/4HANA and digital core solutions",
      features: ["Real-time Analytics", "Cloud Integration", "Mobile Access", "AI-Powered Insights"],
      image: "https://images.unsplash.com/photo-1637095937545-7d8c1edf4d2b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0"
    },
    {
      title: "Finance & Accounting Solutions",
      description: "Streamline financial processes with comprehensive SAP Finance modules",
      features: ["Financial Planning", "Risk Management", "Compliance", "Automated Reporting"],
      image: "https://images.unsplash.com/photo-1758630737403-1bda34e3f98e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0"
    },
    {
      title: "Supply Chain & Logistics",
      description: "Optimize supply chain operations with intelligent SAP solutions",
      features: ["Demand Planning", "Inventory Optimization", "Logistics Management", "Supplier Collaboration"],
      image: "https://images.unsplash.com/photo-1747467327020-fb3a0225a70f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">SAP Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive SAP solutions designed to transform your business operations and drive growth
          </p>
        </div>

        <div className="space-y-20">
          {solutions.map((solution, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{solution.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{solution.description}</p>
                
                <div className="space-y-4 mb-8">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <img 
                  src={solution.image} 
                  alt={solution.title}
                  className="rounded-2xl shadow-xl w-full h-80 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
 