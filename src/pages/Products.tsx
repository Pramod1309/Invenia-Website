import  { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const Products = () => {
  const products = [
    {
      name: "SAP S/4HANA",
      description: "Next-generation ERP suite for digital business",
      features: ["Real-time processing", "AI and ML capabilities", "Cloud-native architecture"],
      rating: 4.9
    },
    {
      name: "SAP SuccessFactors",
      description: "Comprehensive Human Capital Management solution",
      features: ["Talent management", "HR analytics", "Employee experience"],
      rating: 4.8
    },
    {
      name: "SAP Ariba",
      description: "Procurement and supply chain solutions",
      features: ["Supplier management", "Contract management", "Spend analysis"],
      rating: 4.7
    },
    {
      name: "SAP Concur",
      description: "Travel and expense management platform",
      features: ["Expense reporting", "Travel booking", "Invoice management"],
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">SAP Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive portfolio of SAP products to meet your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-600">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="space-y-2 mb-8">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Link to="/contact" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
 