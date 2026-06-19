import React, { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const FAQs = () => {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = [
    {
      id: 1,
      question: "How can I place an order?",
      answer:"If you like a shawls from our site, simply place an order for it. After the order, our team will contact you through WatsApp. We'll confirm it with you, tell you the Price, and then it will be delivered to you.",
      category: "Orders",
    },
    {
      id: 2,
      question: "What payment methods do you support?",
      answer:
        "We accept all major debit and credit cards, PayPal, and cash on delivery in selected areas.",
      category: "Payments",
    },
    {
      id: 3,
      question: "How can I track my shipment?",
      answer:
        "Once your order ships, you’ll receive an email or use a WatsApp with your tracking number and a link to track your package in real time.",
      category: "Shipping",
    },
    {
      id: 4,
      question: "Can I return or exchange my order?",
      answer:
        "Yes, we offer a 14-day return and exchange policy. Make sure items are unused and in their original packaging.",
      category: "Returns",
    },
    {
      id: 5,
      question: "Do you provide international shipping?",
      answer:
        "Yes, we ship worldwide. International shipping times vary depending on location.",
      category: "Shipping",
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer:
        "You can reach us anytime at anwarrahman1315@gmail.com or through our live chat option available on the website.",
      category: "Support",
    },
  ];

  const categories = useMemo(() => ["All", ...new Set(faqs.map((f) => f.category))], []);

  const filteredFaqs = faqs.filter((f) => {
    const search = query.toLowerCase();
    const matchesQuery =
      f.question.toLowerCase().includes(search) || f.answer.toLowerCase().includes(search);
    const matchesCategory = activeCategory === "All" || f.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-lg">
            <HelpCircle size={22} />
            <span>FAQs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Find quick answers to your most common questions. Still need help? Reach out to our support team.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 text-gray-400" size={18} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border
                    ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white border-transparent"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-50"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((f) => (
                <div
                  key={f.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    className="w-full flex justify-between items-start text-left px-5 py-4"
                    onClick={() => setOpenId(openId === f.id ? null : f.id)}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{f.question}</h3>
                      <p className="text-sm text-gray-500 mt-1">Category: {f.category}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: openId === f.id ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: openId === f.id ? "auto" : 0, opacity: openId === f.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {openId === f.id && (
                      <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed">
                        {f.answer}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No FAQs found. Try adjusting your search.</p>
            )}
          </div>

                    <div className="mt-10 text-center text-sm text-gray-600">
            Still have questions? Email me at{" "}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anwarrahman1315@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
               className="text-indigo-600 hover:underline"
            >anwarrahman1315@gmail.com</a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;