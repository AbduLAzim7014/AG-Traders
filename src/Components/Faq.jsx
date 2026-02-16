import { useState } from "react";

const faqs = [
  {
    question: "What is AG Traders?",
    answer:
      "AG Traders is a Shop that provides high-quality wooden products like chakla, belan, and more.",
  },
  {
    question: "Do you deliver all over India?",
    answer: "Yes, we deliver our products across India with safe packaging.",
  },
  {
    question: "How can I contact you?",
    answer: "You can contact us via phone or WhatsApp for quick support.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 7 days if the product is unused and in original condition.",
  },
  {
    question: "Why is a Choose of products?",
    answer: "All India Transport in customer to delever to shipping trust.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6  ">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4  ">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 p-4 pt-0" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
