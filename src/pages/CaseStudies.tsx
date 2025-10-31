import  { ArrowRight, TrendingUp, Users, Clock } from "lucide-react";

const CaseStudies = () => {
  const cases = [
    {
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "Legacy ERP system hindering growth",
      solution: "SAP S/4HANA implementation with cloud migration",
      results: ["40% faster processing", "30% cost reduction", "Real-time visibility"],
      image: "https://images.unsplash.com/photo-1637095937545-7d8c1edf4d2b?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0"
    },
    {
      company: "Tech Retail Solutions",
      industry: "Retail",
      challenge: "Disconnected systems affecting customer experience",
      solution: "Integrated SAP Commerce and SuccessFactors",
      results: ["50% better customer satisfaction", "25% increase in sales", "Unified operations"],
      image: "https://images.unsplash.com/photo-1758630737403-1bda34e3f98e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real transformations achieved by our clients through innovative SAP solutions
          </p>
        </div>

        <div className="space-y-16">
          {cases.map((study, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <span className="text-blue-600 font-semibold">{study.industry}</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">{study.company}</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h3>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Solution</h3>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="bg-blue-50 p-4 rounded-lg text-center">
                            <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-blue-900">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>

                <div className="h-64 lg:h-auto">
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Create Your Success Story?</h2>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all">
            Start Your Transformation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
 