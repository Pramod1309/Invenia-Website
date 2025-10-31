import { useState, useEffect } from "react";
import { Menu, X, Search, ChevronDown, Globe } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [lang, setLang] = useState<'EN' | 'ES' | 'DE' | 'FR'>('EN');
  const nextLang = () => {
    const order: Array<'EN'|'ES'|'DE'|'FR'> = ['EN','ES','DE','FR'];
    const i = order.indexOf(lang);
    setLang(order[(i + 1) % order.length]);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false); // Close mobile menu
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'solutions', 'products', 'services', 'industries', 'resources', 'company', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (section: string) => activeSection === section;

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3"
            >
              <img 
                src="dist\assets\logo.png" 
                alt="Invenia Logo" 
                className="h-12 w-auto"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="text-white">
                <div className="text-xl font-bold">Invenia Techlabs</div>
                <div className="text-xs opacity-90">SAP Excellence</div>
              </div>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6 ml-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('home') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Home
              {isActive('home') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <div className="relative group">
              <button 
                onClick={() => scrollToSection('solutions')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center relative ${
                  isActive('solutions') 
                    ? 'text-blue-300 bg-white/10' 
                    : 'text-white/90 hover:text-blue-300'
                }`}
              >
                Solutions <ChevronDown className="ml-1 h-4 w-4" />
                {isActive('solutions') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
                )}
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50"
                >
                  ERP & Digital Core
                </button>
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50"
                >
                  Finance & Accounting
                </button>
                <button 
                  onClick={() => scrollToSection('solutions')}
                  className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50"
                >
                  Supply Chain
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('industries')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('industries') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Industries
              {isActive('industries') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('products')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('products') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Products
              {isActive('products') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('services')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('services') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Services
              {isActive('services') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('resources')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('resources') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Resources
              {isActive('resources') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('company')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                isActive('company') 
                  ? 'text-blue-300 bg-white/10' 
                  : 'text-white/90 hover:text-blue-300'
              }`}
            >
              Company
              {isActive('company') && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300 rounded-full"></div>
              )}
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Contact
            </button>
            <button onClick={nextLang} className="flex items-center space-x-1 text-white/90 hover:text-white px-3 py-2 rounded-md">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">{lang}</span>
            </button>
            <Search className="h-5 w-5 text-white/80 hover:text-white cursor-pointer" />
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-slate-800/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('industries')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Industries
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('resources')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Resources
            </button>
            <button 
              onClick={() => scrollToSection('company')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Company
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
            >
              Contact
            </button>
            <div className="flex items-center justify-between px-3 py-2 text-white/90">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Language</span>
              </div>
              <button onClick={nextLang} className="px-2 py-1 rounded border border-white/20 text-sm">{lang}</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;