import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Trophy, 
  Globe, 
  Coffee, 
  Laptop, 
  GraduationCap,
  Briefcase,
  Star,
  CheckCircle,
  Send,
  Filter,
  Search
} from "lucide-react";

const Careers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const jobCategories = ["All", "Engineering", "Consulting", "Sales", "Marketing", "HR", "Finance"];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior SAP Consultant",
      department: "Consulting",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "5-8 years",
      description: "Lead SAP implementation projects and provide expert guidance to clients",
      skills: ["SAP S/4HANA", "FICO", "MM", "SD", "Project Management"],
      posted: "2 days ago",
      featured: true
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build modern web applications using React, TypeScript, and modern frameworks",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      posted: "1 week ago",
      featured: false
    },
    {
      id: 3,
      title: "Business Development Manager",
      department: "Sales",
      location: "Delhi, India",
      type: "Full-time",
      experience: "4-6 years",
      description: "Drive business growth and build strategic partnerships",
      skills: ["Sales", "Business Development", "SAP", "CRM", "Negotiation"],
      posted: "3 days ago",
      featured: true
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create intuitive and beautiful user experiences for our products",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
      posted: "5 days ago",
      featured: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "3-6 years",
      description: "Manage cloud infrastructure and deployment pipelines",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      posted: "1 week ago",
      featured: false
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-4 years",
      description: "Develop and execute marketing campaigns to drive brand awareness",
      skills: ["Digital Marketing", "Content Creation", "SEO", "Social Media", "Analytics"],
      posted: "4 days ago",
      featured: false
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
      title: "Learning & Development",
      description: "Continuous learning opportunities, certifications, and skill development programs"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Flexible Work",
      description: "Remote work options, flexible hours, and work-life balance initiatives"
    },
    {
      icon: <Trophy className="h-8 w-8 text-purple-500" />,
      title: "Recognition & Rewards",
      description: "Performance bonuses, recognition programs, and career advancement opportunities"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Global Exposure",
      description: "Work with international clients and teams across different time zones"
    },
    {
      icon: <Coffee className="h-8 w-8 text-orange-500" />,
      title: "Great Culture",
      description: "Collaborative environment, team events, and a supportive community"
    }
  ];

  const cultureValues = [
    {
      title: "Innovation First",
      description: "We encourage creative thinking and embrace new technologies to solve complex business challenges.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.1.0&fit=crop&w=800&h=600"
    },
    {
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and cross-functional collaboration to deliver exceptional results.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.1.0&fit=crop&w=800&h=600"
    },
    {
      title: "Continuous Growth",
      description: "We invest in our people's development and provide opportunities for career advancement and skill enhancement.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&fit=crop&w=800&h=600"
    },
    {
      title: "Client Success",
      description: "Our success is measured by our clients' success. We go above and beyond to deliver value.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.1.0&fit=crop&w=800&h=600"
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesCategory = selectedCategory === "All" || job.department === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.1.0&fit=crop&w=1920&h=1080"
            alt="Team Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-blue-900/80 to-slate-800/85"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Join Our
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl">
              Dream Team
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Build the future of enterprise technology with us. We're looking for passionate individuals 
            who want to make a real impact in the world of SAP and digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#jobs" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center">
              View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#culture" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all">
              Our Culture
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Employee Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Open Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section id="culture" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Culture & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster an environment where innovation thrives and every voice matters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {cultureValues.map((value, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={value.image}
                    alt={value.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                    <p className="text-blue-100">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive benefits and a supportive environment for your growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="jobs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your perfect role and join our growing team
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {jobCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className={`bg-white border-2 rounded-2xl p-8 hover:shadow-xl transition-all ${
                job.featured ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                      {job.featured && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.type}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.experience}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {job.department}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Posted {job.posted}</p>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
            <p className="text-xl text-gray-600">
              We're always looking for talented individuals. Send us your resume and we'll get in touch!
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position of Interest</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select a position</option>
                  <option>Senior SAP Consultant</option>
                  <option>Frontend Developer</option>
                  <option>Business Development Manager</option>
                  <option>UX/UI Designer</option>
                  <option>DevOps Engineer</option>
                  <option>Marketing Specialist</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us why you'd like to join our team..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Laptop className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drop your resume here or click to browse</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center"
              >
                Submit Application <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join us in transforming businesses and building the future of enterprise technology
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#jobs" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center">
              Browse Openings <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
