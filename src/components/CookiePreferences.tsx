import { useEffect, useState } from "react";

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (consent: ConsentCategories) => void;
};

const STORAGE_KEY = "cookie_consent";

function getStoredConsent(): ConsentCategories {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { necessary: true, analytics: false, marketing: false };
}

function setStoredConsent(value: ConsentCategories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
}

export default function CookiePreferences({ open, onClose, onSave }: Props) {
  const [consent, setConsent] = useState<ConsentCategories>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    if (open) setConsent(getStoredConsent());
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-xl ring-1 ring-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Cookie Preferences</h2>
        <p className="text-slate-600 mb-4 text-sm">
          Control how we use cookies on this site. Necessary cookies are required for the website to function and cannot be disabled.
        </p>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 p-3 rounded-md border border-slate-200">
            <div>
              <div className="font-medium text-slate-800">Necessary Cookies</div>
              <div className="text-sm text-slate-600">Required for core functionality (security, network management, accessibility).</div>
            </div>
            <input type="checkbox" checked={true} disabled className="h-5 w-5" />
          </div>
          <div className="flex items-start justify-between gap-4 p-3 rounded-md border border-slate-200">
            <div>
              <div className="font-medium text-slate-800">Analytics Cookies</div>
              <div className="text-sm text-slate-600">Help us understand website usage to improve performance and user experience.</div>
            </div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={consent.analytics}
              onChange={(e) => setConsent((c) => ({ ...c, analytics: e.target.checked }))}
            />
          </div>
          <div className="flex items-start justify-between gap-4 p-3 rounded-md border border-slate-200">
            <div>
              <div className="font-medium text-slate-800">Marketing Cookies</div>
              <div className="text-sm text-slate-600">Used to deliver personalized ads or content based on your interests.</div>
            </div>
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={consent.marketing}
              onChange={(e) => setConsent((c) => ({ ...c, marketing: e.target.checked }))}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">Cancel</button>
          <button
            onClick={() => {
              const value = { ...consent, necessary: true };
              setStoredConsent(value);
              onSave(value);
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
