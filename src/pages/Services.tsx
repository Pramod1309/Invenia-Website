import  { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "SAP Consulting",
      description: "Strategic guidance for your SAP journey",
      deliverables: ["Assessment & Strategy", "Solution Architecture", "Business Process Design", "Technical Roadmap"],
      methodology: ["Discovery", "Analysis", "Design", "Implementation"]
    },
    {
      title: "SAP Implementation",
      description: "End-to-end SAP implementation services",
      deliverables: ["System Configuration", "Data Migration", "Testing", "Go-Live Support"],
      methodology: ["Planning", "Configuration", "Testing", "Deployment"]
    },
    {
      title: "Migration & Upgradation",
      description: "Seamless migration to latest SAP versions",
      deliverables: ["Migration Strategy", "Code Remediation", "System Testing", "Cutover Management"],
      methodology: ["Assessment", "Preparation", "Migration", "Validation"]
    },
    {
      title: "Managed Support",
      description: "24/7 support and maintenance services",
      deliverables: ["Incident Management", "Performance Monitoring", "Security Updates", "User Support"],
      methodology: ["Monitor", "Respond", "Resolve", "Report"]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive SAP services from strategy to support
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{service.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Deliverables</h3>
                    <div className="space-y-3">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Methodology</h3>
                    <div className="flex items-center space-x-4">
                      {service.methodology.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {idx + 1}
                          </div>
                          {idx < service.methodology.length - 1 && (
                            <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {service.methodology.map((step, idx) => (
                        <div key={idx} className="text-center text-sm text-gray-600">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                    Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
 