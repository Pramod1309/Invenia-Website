import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      title: "ERP & Digital Core",
      description: "Transform your business with our comprehensive ERP solutions that streamline operations and drive growth.",
      link: "#"
    },
    {
      title: "Finance & Accounting",
      description: "Optimize your financial operations with our cutting-edge accounting and financial management solutions.",
      link: "#"
    },
    {
      title: "Supply Chain",
      description: "Enhance your supply chain efficiency with our integrated logistics and inventory management systems.",
      link: "#"
    },
    {
      title: "Human Capital",
      description: "Empower your workforce with our human resources and talent management solutions.",
      link: "#"
    },
    {
      title: "Customer Experience",
      description: "Deliver exceptional customer experiences with our CRM and customer engagement platforms.",
      link: "#"
    },
    {
      title: "Cloud Solutions",
      description: "Leverage the power of cloud computing with our scalable and secure cloud infrastructure.",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to transform your business operations and drive growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <Link 
                  to={solution.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
 