import  { Link } from "react-router-dom";
import { ArrowRight, Book, FileText, Calendar, Download } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      type: "Blog",
      title: "SAP S/4HANA Migration Best Practices",
      description: "Complete guide to successful SAP S/4HANA migration",
      icon: Book,
      date: "Dec 15, 2024"
    },
    {
      type: "Whitepaper",
      title: "Digital Transformation with SAP",
      description: "How to leverage SAP for digital transformation",
      icon: FileText,
      date: "Dec 10, 2024"
    },
    {
      type: "Webinar",
      title: "Future of ERP: SAP Cloud Solutions",
      description: "Live discussion on cloud ERP trends",
      icon: Calendar,
      date: "Dec 20, 2024"
    },
    {
      type: "Guide",
      title: "SAP Implementation Checklist",
      description: "Step-by-step implementation guide",
      icon: Download,
      date: "Dec 5, 2024"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest SAP insights, guides, and industry trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <resource.icon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600">{resource.type}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{resource.date}</span>
                <Link to="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8">Get the latest SAP insights delivered to your inbox</p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
 