import { useEffect, useState } from "react";

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentProps = {
  onManage: () => void;
  onSave: (consent: ConsentCategories) => void;
};

const STORAGE_KEY = "cookie_consent";

function getStoredConsent(): ConsentCategories | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredConsent(value: ConsentCategories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
}

export default function CookieConsent({ onManage, onSave }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    const dnt = (navigator as any).doNotTrack === "1" || (window as any).doNotTrack === "1";
    if (!existing) {
      if (dnt) {
        const rejectNonEssential = { necessary: true, analytics: false, marketing: false };
        setStoredConsent(rejectNonEssential);
        onSave(rejectNonEssential);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } else {
      onSave(existing);
      setVisible(false);
    }
  }, [onSave]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-7xl p-4">
        <div className="rounded-lg bg-white shadow-xl ring-1 ring-slate-200 p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-slate-800 text-sm md:text-base">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. You can manage preferences or read our
            <a href="#/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> and
            <a href="#/cookies" className="text-blue-600 hover:underline ml-1">Cookie Policy</a>.
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => {
                const v = { necessary: true, analytics: false, marketing: false };
                setStoredConsent(v);
                onSave(v);
                setVisible(false);
              }}
              className="px-3 py-2 text-sm font-medium rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={onManage}
              className="px-3 py-2 text-sm font-medium rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Manage Preferences
            </button>
            <button
              onClick={() => {
                const v = { necessary: true, analytics: true, marketing: true };
                setStoredConsent(v);
                onSave(v);
                setVisible(false);
              }}
              className="px-3 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
