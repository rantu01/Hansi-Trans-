"use client";
import React, { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What Services Do You Offer?",
      answer: "Blending creativity and functionality, I design user-focused digital products and responsive websites that not only look stunning but also deliver."
    },
    {
      question: "Can You Update My Existing Website?",
      answer: "Yes, we can analyze your current website and provide updates ranging from UI/UX improvements to full backend migrations."
    },
    {
      question: "Will My Website Be Mobile-Friendly?",
      answer: "Absolutely. Every project we deliver is fully responsive and optimized for all screen sizes, including mobile and tablets."
    },
    {
      question: "How Much Does A New Website Cost?",
      answer: "The cost depends on the complexity and features of the project. We offer customized quotes after an initial consultation."
    },
    {
      question: "How Fast Can You Deliver?",
      answer: "A standard project typically takes 2-4 weeks, but this varies based on your specific requirements and feedback cycles."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          
          {/* Left Side - Header */}
          <div className="w-full lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50">
              <Sparkles className="w-4 h-4 text-gray-400" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-8 uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Explore tips, guides, and industry trends shaping global launches today.
            </p>
          </div>

          {/* Right Side - Accordion */}
          <div className="w-full lg:w-2/3">
            <div className="divide-y divide-gray-100">
              {faqs.map((faq, index) => (
                <div key={index} className="py-6 first:pt-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    {/* Replaced [#0070c0] with primary */}
                    <span className={`text-xl md:text-2xl font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                      {faq.question}
                    </span>
                    <div className="ml-4 shrink-0">
                      {openIndex === index ? (
                        <Minus className="w-6 h-6 text-primary" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Answer with Animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;