import { Mail, Phone, MapPin, Github, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="dist\assets\logo.png" 
                alt="Invenia Logo" 
                className="h-16 w-auto"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Invenia Techlabs
                </div>
                <div className="text-blue-300 text-sm">Delivering and Transforming Business Through ERP Excellence</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Leading ERP consultancy delivering innovative solutions across industries. 
              We empower businesses with cutting-edge technology and strategic insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-300">Quick Links</h3>
            <div className="space-y-3">
              <a href="#solutions" className="block text-gray-300 hover:text-blue-300 transition-colors">Solutions</a>
              <a href="#industries" className="block text-gray-300 hover:text-blue-300 transition-colors">Industries</a>
              <a href="#products" className="block text-gray-300 hover:text-blue-300 transition-colors">Products</a>
              <a href="#services" className="block text-gray-300 hover:text-blue-300 transition-colors">Services</a>
              <a href="#resources" className="block text-gray-300 hover:text-blue-300 transition-colors">Resources</a>
              <a href="#company" className="block text-gray-300 hover:text-blue-300 transition-colors">Company</a>
              <a href="#contact" className="block text-gray-300 hover:text-blue-300 transition-colors">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-300">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>WeWork Lightbridge, 6th floor, Hiranandani Business Park</div>
                  <div>Saki Vihar Rd, Tunga Village, Chandivali, Powai</div>
                  <div>Maharashtra 400072</div>
                  <a
                    href="https://www.google.com/maps?q=WeWork%20Lightbridge%2C%206th%20floor%2C%20Hiranandani%20Business%20Park%2C%20Saki%20Vihar%20Rd%2C%20Tunga%20Village%2C%20Chandivali%2C%20Powai%2C%20Maharashtra%20400072"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-300 hover:underline block mt-1"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href="tel:+919986444496" className="text-gray-300 hover:text-blue-300">+91 99864 44496</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href="mailto:support@inveniaconsulting.com" className="text-gray-300 hover:text-blue-300">support@inveniaconsulting.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Invenia Techlabs Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#/privacy" className="text-gray-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
              <a href="#/terms" className="text-gray-400 hover:text-blue-300 transition-colors">Terms & Conditions</a>
              <a href="#/cookies" className="text-gray-400 hover:text-blue-300 transition-colors">Cookie Policy</a>
              <button
                onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 
