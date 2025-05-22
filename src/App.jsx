
import React from "react";

export default function AvolixLandingPage() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-purple-600 to-indigo-700 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Avolix</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl">
          Full-Stack Tech & Growth for D2C E-commerce Brands
        </p>
        <a href="#contact" className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-100 transition">Let’s Talk</a>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ["Tech Management", "Domain, Hosting, E-commerce Site & Maintenance"],
            ["Digital Marketing & Ads", "Meta, Google, TikTok Campaign Management"],
            ["Live Chat & Social Commerce", "Messenger, WhatsApp, and Chat Integration"],
            ["CRM & Customer Support", "Track sales & engage customers effortlessly"],
            ["Project Delivery", "Client work managed as transparent projects"],
          ].map(([title, desc]) => (
            <div key={title} className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">How Avolix Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          {[
            ["We Set You Up", "Brand, domain, site, and CRM"],
            ["We Plug You In", "Integrate socials, marketing, and support"],
            ["We Help You Grow", "Manage and scale your operation"],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg w-full md:w-1/3 shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">{i + 1}</div>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Avolix?</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          <li>🇧🇩 Built in Bangladesh, Focused on D2C</li>
          <li>🧩 Everything in One Place</li>
          <li>📈 Scalable, Trackable, Transparent</li>
        </ul>
      </section>

      <section id="contact" className="py-20 px-4 bg-indigo-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Let’s Talk</h2>
        <p className="mb-6">Ready to build your brand the smart way?</p>
        <p className="mb-1">📬 hello@avolix.io</p>
        <p className="mb-6">💬 WhatsApp: +880-XXX-XXXXXX</p>
        <a href="mailto:hello@avolix.io" className="bg-white text-indigo-800 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition">
          Contact Us
        </a>
      </section>

      <footer className="text-center text-gray-500 py-6 text-sm">
        &copy; {new Date().getFullYear()} Avolix. All rights reserved.
      </footer>
    </div>
  );
}
