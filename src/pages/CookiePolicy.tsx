export default function CookiePolicy() {
  return (
    <main className="min-h-[70vh] bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: 27 Oct 2025</p>

        <p className="text-slate-700 mb-6">
          This Cookie Policy explains how Invenia Techlabs Pvt. Ltd. ("Invenia", "we") uses cookies and similar
          technologies on our website. You can control your preferences using the Cookie Settings available in the
          footer of our website.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">What are cookies?</h2>
        <p className="text-slate-700 mb-4">
          Cookies are small text files placed on your device to store data that can be recalled by a web server in the
          domain that placed the cookie. They help websites function, measure performance, and provide a better user
          experience.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Types of cookies we use</h2>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li><span className="font-medium">Necessary:</span> Required for core site functionality. Always active.</li>
          <li><span className="font-medium">Analytics:</span> Help us understand how visitors use our site.</li>
          <li><span className="font-medium">Marketing:</span> Used to deliver relevant content or ads.</li>
        </ul>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Managing your preferences</h2>
        <p className="text-slate-700 mb-4">
          You can manage or change your cookie preferences at any time using the Cookie Settings control in the footer
          of our website. Necessary cookies cannot be disabled as they are essential for the site to function.
        </p>

        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">Do Not Track</h2>
        <p className="text-slate-700 mb-4">
          If your browser sends a Do Not Track (DNT) signal, we treat it as a preference to reject non-essential
          cookies by default.
        </p>

        <div className="mt-8">
          <button
            onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Open Cookie Settings
          </button>
        </div>
      </div>
    </main>
  );
}
