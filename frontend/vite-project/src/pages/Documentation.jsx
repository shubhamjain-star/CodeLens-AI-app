import React, { useState } from "react";
import { docSections, faqData } from "../data/content";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    /* h-screen + overflow-hidden prevents outer browser window scrollbar */
    <div className="flex h-screen w-screen bg-gray-50 dark:bg-[#0A0F1C] text-gray-800 dark:text-[#9CA3AF] font-sans antialiased overflow-hidden transition-colors duration-300">
      
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-72 bg-white dark:bg-[#0E1526] border-r border-gray-200 dark:border-[#1F2937] flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F2937] shrink-0">
          <h1 className="text-xl font-bold text-gray-950 dark:text-[#F3F4F6] tracking-wide flex items-center gap-2">
            <span className="text-blue-600 dark:text-[#60A5FA]"></span> Code Lens
          </h1>
          <p className="text-xs text-gray-600 dark:text-[#9CA3AF] mt-1 font-medium dark:font-normal">
            Documentation & Guides
          </p>
        </div>

        {/* Scrollbar hidden cleanly here */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {docSections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-xs uppercase font-bold dark:font-semibold text-gray-900 dark:text-[#F3F4F6] tracking-wider px-3">
                {sec.category}
              </h2>
              <ul className="space-y-1">
                {sec.items.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                          isActive
                            ? "bg-blue-50 dark:bg-[#131B2E] text-blue-600 dark:text-[#60A5FA] font-semibold dark:font-medium border-l-2 border-blue-600 dark:border-[#60A5FA]"
                            : "text-gray-700 dark:text-[#9CA3AF] hover:text-gray-950 dark:hover:text-[#F3F4F6] hover:bg-gray-100 dark:hover:bg-[#131B2E]/50"
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* FAQ Link */}
          <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-[#1F2937]">
            <h2 className="text-xs uppercase font-bold dark:font-semibold text-gray-900 dark:text-[#F3F4F6] tracking-wider px-3">
              FAQ
            </h2>
            <button
              onClick={() => scrollToSection("faq-section")}
              className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                activeSection === "faq-section"
                  ? "bg-blue-50 dark:bg-[#131B2E] text-blue-600 dark:text-[#60A5FA] font-semibold dark:font-medium border-l-2 border-blue-600 dark:border-[#60A5FA]"
                  : "text-gray-700 dark:text-[#9CA3AF] hover:text-gray-950 dark:hover:text-[#F3F4F6] hover:bg-gray-100 dark:hover:bg-[#131B2E]/50"
              }`}
            >
              Frequently Asked
            </button>
          </div>
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <main className="flex-1 h-full overflow-y-auto bg-gray-50 dark:bg-[#0A0F1C] p-8 md:p-12 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-12">
          {docSections.map((sec) => (
            <div key={sec.category} className="space-y-8">
              {sec.items.map((item) => (
                <section
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-8 space-y-4 pb-6 border-b border-gray-200 dark:border-[#1F2937]"
                >
                  <h2 className="text-2xl font-bold dark:font-semibold text-gray-950 dark:text-[#F3F4F6]">
                    {item.title}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-800 dark:text-[#9CA3AF] font-normal">
                    {item.content}
                  </p>

                  {item.cards && (
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      {item.cards.map((card, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-white dark:bg-[#0E1526] border border-gray-200 dark:border-[#1F2937] p-4 rounded-lg shadow-sm"
                        >
                          <h3 className="text-sm font-bold dark:font-semibold text-gray-950 dark:text-[#F3F4F6] mb-1">
                            {card.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-[#9CA3AF] font-medium dark:font-normal">
                            {card.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.codeSnippet && (
                    <div className="bg-gray-900 dark:bg-[#131B2E] border border-gray-800 dark:border-[#1F2937] rounded-lg p-4 font-mono text-sm text-gray-100 dark:text-[#F3F4F6] overflow-x-auto mt-3 shadow-inner">
                      <pre>{item.codeSnippet}</pre>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ))}

          {/* FAQ ACCORDION SECTION */}
          <section id="faq-section" className="scroll-mt-8 space-y-6 pt-4">
            <h2 className="text-2xl font-bold dark:font-semibold text-gray-950 dark:text-[#F3F4F6]">
              Frequently Asked Questions
            </h2>

            <div className="divide-y divide-gray-200 dark:divide-[#1F2937] border-y border-gray-200 dark:border-[#1F2937]">
              {faqData.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.id} className="py-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex justify-between items-center text-left focus:outline-none group"
                    >
                      <span className="text-base font-semibold dark:font-medium text-gray-950 dark:text-[#F3F4F6] group-hover:text-blue-600 dark:group-hover:text-[#60A5FA] transition-colors">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 dark:text-[#9CA3AF] group-hover:text-blue-600 dark:group-hover:text-[#60A5FA] transform transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pr-6 text-sm text-gray-700 dark:text-[#9CA3AF] leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}