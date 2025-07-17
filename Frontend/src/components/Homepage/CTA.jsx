import React from "react";

const CTASection = () => (
  <section className="bg-white py-16 px-4">
    <div className="max-w-2xl mx-auto text-center rounded-2xl  p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
        Join India’s Smartest Investment Community
      </h2>
      <p className="text-gray-700 text-lg mb-8">
        Connect, invest, and grow with the best startups and investors. 
        Take your next step with Fundify—where ideas meet opportunity.
      </p>
      <a
        href="/register"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg text-lg transition"
      >
        Get Started Now
      </a>
    </div>
  </section>
);

export default CTASection;
