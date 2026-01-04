import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
import FloatingActionButton from "./components/FloatingActionButton";
import Chatbot from "./components/Chatbot";
import { useEffect, useState } from "react";
import CookieConsent from "./components/CookieConsent";
import CookiePreferences from "./components/CookiePreferences";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [route, setRoute] = useState<string>(window.location.hash || "#/");
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [, setConsent] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    const openPrefs = () => setPrefsOpen(true);
    window.addEventListener("open-cookie-preferences", openPrefs as EventListener);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("open-cookie-preferences", openPrefs as EventListener);
    };
  }, []);

  const renderRoute = () => {
    switch (route) {
      case "#/solutions":
        return <Solutions />;
      case "#/privacy":
        return <Privacy />;
      case "#/terms":
        return <Terms />;
      case "#/cookies":
        return <CookiePolicy />;
      case "#/":
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {renderRoute()}
      <Footer />
      <FloatingActionButton />
      <Chatbot />
      <CookieConsent onManage={() => setPrefsOpen(true)} onSave={setConsent} />
      <CookiePreferences open={prefsOpen} onClose={() => setPrefsOpen(false)} onSave={setConsent} />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;