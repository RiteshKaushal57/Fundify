import React from 'react';

const steps = [
  {
    title: "Sign Up & Choose Your Role",
    description:
      "Register as an Investor, Entrepreneur, Banker, or Business Advisor. Set up your profile to get started.",
    icon: "📝",
  },
  {
    title: "Post or Explore Opportunities",
    description:
      "Entrepreneurs post their business ideas. Investors browse proposals. Bankers share loan details. Advisors offer expertise.",
    icon: "💡",
  },
  {
    title: "Connect & Communicate",
    description:
      "Use our secure platform to message, ask questions, and get advice. Advisors respond to queries and post solutions.",
    icon: "💬",
  },
  {
    title: "Collaborate & Grow",
    description:
      "Form partnerships, secure investments, get expert guidance, and grow your business with confidence.",
    icon: "🚀",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      {/* Top Illustration or Animation */}
      <div className="max-w-3xl mx-auto mb-12">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
          alt="How It Works illustration"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-3">
        <span role="img" aria-label="gear">⚙️</span> How It Works
      </h2>

      {/* Steps */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-8 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 flex justify-center">
        <a
          href="/register"
          className="inline-block bg-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Get Started Today
        </a>
      </div>
    </section>
  );
};

export default HowItWorks;
