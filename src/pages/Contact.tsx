import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, Map } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('mumbai');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirement: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.requirement) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          requirement: ''
        });
        toast.success('Thank you for contacting us! We will get back to you soon.');
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error((error as Error).message || 'Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Get in touch with our SAP experts today
          </p>
        </div>

        <div className="space-y-16">
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

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-gray-900">Mumbai, India</p>
                          <p className="text-gray-600">WeWork Lightbridge, 6th floor, Hiranandani Business Park</p>
                          <p className="text-gray-600">Saki Vihar Rd, Tunga Village, Chandivali, Powai</p>
                          <p className="text-gray-600">Maharashtra 400072</p>
                          <a
                            className="text-blue-600 hover:underline inline-flex items-center mt-1"
                            href="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MapPin className="h-4 w-4 mr-1" /> View on Map
                          </a>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-200">
                          <p className="font-medium text-gray-900">Wiesbaden, Germany</p>
                          <p className="text-gray-600">Invenia Consulting GmbH</p>
                          <p className="text-gray-600">Adolfstr. 1, 65185 Wiesbaden, Germany</p>
                          <a
                            className="text-blue-600 hover:underline inline-flex items-center mt-1"
                            href="https://www.google.com/maps?q=Adolfstr.%201%2C%2065185%20Wiesbaden%2C%20Germany"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MapPin className="h-4 w-4 mr-1" /> View on Map
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirement</label>
                  <textarea
                    value={formData.requirement}
                    onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your SAP requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full ${
                    isSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Locations</h2>
            
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm border-b-2 ${
                  activeTab === 'mumbai' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('mumbai')}
              >
                Mumbai, India
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm border-b-2 ${
                  activeTab === 'wiesbaden' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('wiesbaden')}
              >
                Wiesbaden, Germany
              </button>
            </div>

            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
              {activeTab === 'mumbai' ? (
                <iframe
                  title="Invenia Techlabs Mumbai Location"
                  src="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <iframe
                  title="Invenia Consulting GmbH Wiesbaden Location"
                  src="https://www.google.com/maps?q=Adolfstr.%201%2C%2065185%20Wiesbaden%2C%20Germany&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {activeTab === 'mumbai' ? (
                <>
                  <p className="font-medium">WeWork Lightbridge, 6th floor, Hiranandani Business Park</p>
                  <p>Saki Vihar Rd, Tunga Village, Chandivali, Powai, Maharashtra 400072, India</p>
                  <a
                    className="text-blue-600 hover:underline inline-flex items-center mt-2"
                    href="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Map className="h-4 w-4 mr-1" /> Open in Google Maps
                  </a>
                </>
              ) : (
                <>
                  <p className="font-medium">Invenia Consulting GmbH</p>
                  <p>Adolfstr. 1, 65185 Wiesbaden, Germany</p>
                  <a
                    className="text-blue-600 hover:underline inline-flex items-center mt-2"
                    href="https://www.google.com/maps?q=Adolfstr.%201%2C%2065185%20Wiesbaden%2C%20Germany"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Map className="h-4 w-4 mr-1" /> Open in Google Maps
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;