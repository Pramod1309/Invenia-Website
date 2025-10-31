import { ArrowRight, Check, Star, Users, Globe, Play, Quote, TrendingUp, Shield, Zap, Target, Sparkles, Rocket, Brain, Mail, Phone, MapPin, Send, Award, Book, FileText, Calendar, Download } from "lucide-react";
import { useState } from 'react';
import AnimatedCounter from "../components/AnimatedCounter";
import HoverCard from "../components/HoverCard";
import ParallaxSection from "../components/ParallaxSection";

const Home = () => {
  const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactRequirement, setContactRequirement] = useState('');
  const [contactMsg, setContactMsg] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSubscribe = async () => {
    const email = newsletterEmail.trim();
    if (!email) return setNewsletterMsg('Please enter your email');
    setNewsletterLoading(true);
    setNewsletterMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('subscribe_failed');
      setNewsletterMsg('Subscribed!');
      setNewsletterEmail('');
    } catch (e) {
      setNewsletterMsg('Subscription failed. Please try again.');
    } finally {
      setNewsletterLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) {
      setContactMsg('Name and email are required');
      return;
    }
    setContactLoading(true);
    setContactMsg(null);
    try {
      const message = `Company: ${contactCompany || '-'}\n\n${contactRequirement || ''}`;
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, phone: null, message })
      });
      if (!res.ok) throw new Error('contact_failed');
      setContactMsg('Thanks! We will reach out soon.');
      setContactName('');
      setContactEmail('');
      setContactCompany('');
      setContactRequirement('');
    } catch (e) {
      setContactMsg('Message failed to send. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1758630737403-1bda34e3f98e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0&fit=fillmax&h=1080&w=1920"
            alt="Professional Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/70 to-slate-800/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Transform Your Business
            </span>
            <br />
            <span className="text-white text-4xl md:text-5xl">
              with SAP Excellence
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Leading SAP consultancy delivering innovative solutions across industries. 
            We empower your digital transformation journey with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Map Section after Contact */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Us on Google Maps</h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Invenia Techlabs Location"
              src="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter 
                end={500} 
                suffix="+" 
                className="text-4xl font-bold text-blue-600 mb-2" 
              />
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                end={15} 
                suffix="+" 
                className="text-4xl font-bold text-blue-600 mb-2" 
              />
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <AnimatedCounter 
                end={200} 
                suffix="+" 
                className="text-4xl font-bold text-blue-600 mb-2" 
              />
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive SAP solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "ERP & Digital Core", 
                desc: "Complete business transformation with SAP S/4HANA",
                icon: <Rocket className="h-8 w-8 text-blue-600 mb-4" />
              },
              { 
                title: "Finance & Accounting", 
                desc: "Streamline financial operations and reporting",
                icon: <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              },
              { 
                title: "Supply Chain", 
                desc: "Optimize your supply chain management",
                icon: <Globe className="h-8 w-8 text-purple-600 mb-4" />
              },
              { 
                title: "Human Capital", 
                desc: "Enhance workforce management and productivity",
                icon: <Users className="h-8 w-8 text-orange-600 mb-4" />
              },
              { 
                title: "Customer Experience", 
                desc: "Deliver exceptional customer experiences",
                icon: <Star className="h-8 w-8 text-pink-600 mb-4" />
              },
              { 
                title: "Cloud Solutions", 
                desc: "Secure and scalable cloud infrastructure",
                icon: <Shield className="h-8 w-8 text-cyan-600 mb-4" />
              },
              {
                title: "Data & Analytics",
                desc: "Insights with SAP Analytics Cloud & embedded analytics",
                icon: <Brain className="h-8 w-8 text-indigo-600 mb-4" />
              },
              {
                title: "Security & Compliance",
                desc: "Governance and controls for regulated industries",
                icon: <Shield className="h-8 w-8 text-red-600 mb-4" />
              },
              {
                title: "Integration Platform",
                desc: "Seamless SAP + third-party integration via BTP",
                icon: <Zap className="h-8 w-8 text-yellow-600 mb-4" />
              },
              {
                title: "Training & Enablement",
                desc: "Role-based training to accelerate adoption",
                icon: <Award className="h-8 w-8 text-teal-600 mb-4" />
              }
            ].map((solution, index) => (
              <HoverCard key={index} hoverEffect="lift">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100 transform transition-transform hover:-translate-y-1">
                  {solution.icon}
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.desc}</p>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-blue-600 font-medium flex items-center group"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SAP Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive portfolio of SAP products to meet your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
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
              },
              {
                name: "SAP Analytics Cloud",
                description: "Unified BI, planning, and predictive analytics",
                features: ["Live data models", "Augmented analytics", "Collaborative planning"],
                rating: 4.7
              },
              {
                name: "SAP BTP",
                description: "Build and extend SAP applications on the Cloud",
                features: ["Integration Suite", "Extension Suite", "Event Mesh"],
                rating: 4.6
              }
            ].map((product, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-transform transform hover:-translate-y-1">
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
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                    Download Brochure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive SAP services from strategy to support
            </p>
          </div>

          <div className="space-y-12">
            {[
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
              },
              {
                title: "Integration Services",
                description: "Seamless integration across SAP and third-party systems",
                deliverables: ["API & Middleware", "BTP Integrations", "Data Pipelines", "Monitoring & Alerts"],
                methodology: ["Assess", "Design", "Build", "Validate", "Run"]
              },
              {
                title: "Training & Enablement",
                description: "Empower your teams with role-based SAP training",
                deliverables: ["User Workshops", "Admin Bootcamps", "Playbooks", "Certification Prep"],
                methodology: ["Plan", "Develop", "Deliver", "Evaluate"]
              },
              {
                title: "Security & Compliance",
                description: "Harden your SAP landscape with modern security",
                deliverables: ["Access Controls", "Audit & Compliance", "Vulnerability Mgmt", "Disaster Recovery"],
                methodology: ["Baseline", "Harden", "Monitor", "Improve"]
              }
            ].map((service, index) => (
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
                      <div className="flex flex-wrap gap-3">
                        {service.methodology.map((step, idx) => (
                          <div key={idx} className="group inline-flex items-center px-3 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                            <span className="mr-2 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center group-hover:scale-105 transition-transform">{idx + 1}</span>
                            <span className="text-sm font-medium">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      Get Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized SAP solutions tailored for your industry's unique challenges and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Manufacturing", desc: "Streamline production processes", icon: "🏭" },
              { name: "Retail & E-commerce", desc: "Enhance customer experience", icon: "🛒" },
              { name: "Healthcare", desc: "Improve patient care delivery", icon: "🏥" },
              { name: "Banking & Finance", desc: "Digital banking solutions", icon: "🏦" },
              { name: "Education", desc: "Modern learning platforms", icon: "🎓" },
              { name: "Public Sector", desc: "Efficient government services", icon: "🏛️" },
              { name: "Energy & Utilities", desc: "Smart energy management", icon: "⚡" },
              { name: "Automotive", desc: "Connected vehicle solutions", icon: "🚗" },
              { name: "Pharmaceuticals", desc: "Regulatory-compliant operations", icon: "💊" },
              { name: "Logistics", desc: "Network optimization and visibility", icon: "🚚" },
              { name: "Telecommunications", desc: "Scalable OSS/BSS", icon: "📡" },
              { name: "Media & Entertainment", desc: "Digital content platforms", icon: "🎬" }
            ].map((industry, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{industry.name}</h3>
                <p className="text-gray-600 mb-6">{industry.desc}</p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-blue-600 font-medium flex items-center hover:text-blue-700"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest SAP insights, guides, and industry trends
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
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
              },
              {
                type: "Case Study",
                title: "40% Faster Financial Close with S/4HANA",
                description: "How a global enterprise improved close cycles",
                icon: Award,
                date: "Jan 5, 2025"
              },
              {
                type: "Blog",
                title: "Top 10 Tips for SAP Testing",
                description: "Practical checklist for successful SAP QA",
                icon: Book,
                date: "Jan 12, 2025"
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 transform hover:-translate-y-1">
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
                  <button className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-8">Get the latest SAP insights delivered to your inbox</p>
            <div className="max-w-md mx-auto flex flex-col items-stretch gap-3 sm:flex-row sm:space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                onClick={handleSubscribe}
                disabled={newsletterLoading}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-60"
              >
                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {newsletterMsg && (
              <div className="mt-3 text-sm text-white/90">{newsletterMsg}</div>
            )}
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section id="company" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Invenia</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading SAP consultancy with 15+ years of experience in transforming businesses across industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                To empower businesses with innovative SAP solutions that drive digital transformation 
                and sustainable growth in the modern economy.
              </p>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600">
                To be the most trusted SAP partner, enabling organizations to achieve operational 
                excellence through cutting-edge technology solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600">50+ certified SAP consultants</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified</h3>
                <p className="text-gray-600">SAP Gold Partner status</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-gray-600">Serving 25+ countries</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Rate</h3>
                <p className="text-gray-600">98% project success</p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Rajesh Kumar", role: "CEO & Founder", experience: "20+ years SAP expertise" },
                { name: "Priya Sharma", role: "CTO", experience: "15+ years technical leadership" },
                { name: "Amit Patel", role: "Head of Consulting", experience: "18+ years SAP consulting" },
                { name: "Sneha Gupta", role: "Head of Operations", experience: "12+ years operations" }
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of our mission to transform businesses with SAP excellence
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              View Careers
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose Invenia?</h2>
              <div className="space-y-6">
                {[
                  "15+ Years of SAP Expertise",
                  "500+ Successful Implementations",
                  "Certified SAP Partners",
                  "24/7 Premium Support",
                  "Industry-Specific Solutions",
                  "Global Delivery Model"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1747467327020-fb3a0225a70f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBtb2Rlcm4lMjBvZmZpY2UlMjBjbGVhbiUyMG1pbmltYWx8ZW58MHx8fHwxNzYwMTEyNjUxfDA&ixlib=rb-4.1.0&fit=fillmax&h=1080&w=1920"
                alt="Professional Team"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say about our work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechCorp",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&fit=crop&w=400&h=400",
                quote: "Invenia transformed our entire SAP landscape. Their expertise and dedication exceeded our expectations.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "VP Operations, GlobalTech",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.1.0&fit=crop&w=400&h=400",
                quote: "The team's deep understanding of SAP S/4HANA helped us achieve 40% faster processing times.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "CFO, InnovateLabs",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&fit=crop&w=400&h=400",
                quote: "Outstanding support and implementation. Invenia made our digital transformation seamless.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <HoverCard key={index} hoverEffect="glow">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-blue-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Innovation at Scale</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're not just implementing SAP solutions, we're pioneering the future of enterprise technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <TrendingUp className="h-12 w-12 text-blue-400" />,
                title: "AI-Powered Analytics",
                description: "Leveraging machine learning for predictive insights and automated decision making."
              },
              {
                icon: <Shield className="h-12 w-12 text-green-400" />,
                title: "Enterprise Security",
                description: "Advanced security protocols ensuring your data is protected at every level."
              },
              {
                icon: <Zap className="h-12 w-12 text-yellow-400" />,
                title: "Real-time Processing",
                description: "Lightning-fast data processing with in-memory computing capabilities."
              },
              {
                icon: <Target className="h-12 w-12 text-purple-400" />,
                title: "Precision Implementation",
                description: "Surgical precision in every implementation, minimizing disruption to your business."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">See Us in Action</h2>
              <p className="text-xl text-gray-600 mb-8">
                Watch how we've helped leading organizations transform their business operations 
                with cutting-edge SAP solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Real-world case studies</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Expert insights and best practices</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">Behind-the-scenes implementation</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.1.0&fit=crop&w=800&h=600"
                  alt="Video Thumbnail"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all group">
                    <Play className="h-8 w-8 text-blue-600 ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future-Ready Section */}
      <ParallaxSection 
        backgroundImage="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.1.0&fit=crop&w=1920&h=1080"
        speed={0.3}
        className="py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-slate-800/90"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Future-Ready Technology
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We don't just implement today's solutions, we architect tomorrow's possibilities. 
              Our forward-thinking approach ensures your business stays ahead of the curve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-12 w-12 text-blue-400" />,
                title: "AI-Driven Insights",
                description: "Harness the power of artificial intelligence to unlock hidden patterns and drive smarter decisions."
              },
              {
                icon: <Rocket className="h-12 w-12 text-green-400" />,
                title: "Scalable Architecture",
                description: "Build systems that grow with your business, from startup to enterprise scale."
              },
              {
                icon: <Shield className="h-12 w-12 text-purple-400" />,
                title: "Future-Proof Security",
                description: "Advanced security measures that protect your data today and tomorrow."
              }
            ].map((feature, index) => (
              <HoverCard key={index} hoverEffect="scale">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <div className="flex justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business? Get in touch with our SAP experts today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      <a className="text-blue-600 hover:underline" href="mailto:support@inveniaconsulting.com">support@inveniaconsulting.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      <a className="text-blue-600 hover:underline" href="tel:+919986444496">+91 99864 44496</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                    <p className="text-gray-600">WeWork Lightbridge, 6th floor, Hiranandani Business Park</p>
                    <p className="text-gray-600">Saki Vihar Rd, Tunga Village, Chandivali, Powai</p>
                    <p className="text-gray-600">Maharashtra 400072</p>
                    <p className="mt-2">
                      <a
                        className="text-blue-600 hover:underline"
                        href="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirement</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your SAP requirements..."
                    value={contactRequirement}
                    onChange={(e) => setContactRequirement(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-60"
                >
                  {contactLoading ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-4 w-4" />
                </button>
                {contactMsg && (
                  <div className="text-sm text-gray-600 text-center">{contactMsg}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get started with our expert SAP consultants today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center justify-center"
            >
              Contact Us Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => scrollToSection('company')}
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all inline-flex items-center justify-center"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;