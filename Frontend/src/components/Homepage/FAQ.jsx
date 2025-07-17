import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I register as an investor or entrepreneur?",
    answer:
      "Click on the respective registration button on the homepage. Fill in your details, complete KYC, and start exploring or posting opportunities."
  },
  {
    question: "Is my data secure on Fundify?",
    answer:
      "Absolutely. All your data and communications are encrypted and protected with industry-standard security protocols."
  },
  {
    question: "Can I connect with business advisors for guidance?",
    answer:
      "Yes, our platform allows you to ask questions and receive expert guidance from seasoned business advisors."
  },
  {
    question: "Are there any charges for using the platform?",
    answer:
      "Both investors and entrepreneurs are charged a nominal fee for premium features and enhanced visibility."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-black text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#28243c] bg-opacity-80 rounded-xl shadow-lg"
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <span className="ml-4 text-purple-400">
                  {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-gray-300 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Optional: Add a simple fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease;
          }
        `}
      </style>
    </section>
  );
};

export default FAQSection;
