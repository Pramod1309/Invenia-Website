import  { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Industries = () => {
  const industries = [
    { name: "Manufacturing", desc: "Streamline production processes", icon: "🏭" },
    { name: "Retail & E-commerce", desc: "Enhance customer experience", icon: "🛒" },
    { name: "Healthcare", desc: "Improve patient care delivery", icon: "🏥" },
    { name: "Banking & Finance", desc: "Digital banking solutions", icon: "🏦" },
    { name: "Education", desc: "Modern learning platforms", icon: "🎓" },
    { name: "Public Sector", desc: "Efficient government services", icon: "🏛️" },
    { name: "Energy & Utilities", desc: "Smart energy management", icon: "⚡" },
    { name: "Automotive", desc: "Connected vehicle solutions", icon: "🚗" }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Industries We Serve</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized SAP solutions tailored for your industry's unique challenges and requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{industry.name}</h3>
              <p className="text-gray-600 mb-6">{industry.desc}</p>
              <Link to="/contact" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;
 