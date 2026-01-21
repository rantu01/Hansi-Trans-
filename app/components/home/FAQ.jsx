"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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
    <section 
      style={{
        display: 'inline-flex',
        padding: '100px 72px',
        alignItems: 'flex-start',
        gap: '86px',
        borderRadius: '32px 32px 0 0',
        background: '#FFF',
        width: '100%',
        height: '786px'
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 w-full">

          {/* Left Side - Header */}
          <div className="w-full lg:w-1/3">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 mb-6 bg-white shadow-sm"
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.16px'
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                className="w-4 h-4"
              />
              FAQ
            </div>
            
            <h2 
              style={{
                color: '#0A0A0A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%',
                textTransform: 'capitalize'
              }}
              className="mb-8"
            >
              Frequently Asked Questions
            </h2>
            
            <p 
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%'
              }}
              className="max-w-sm"
            >
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
                    <span 
                      className={`text-xl md:text-2xl font-bold transition-colors ${openIndex === index ? 'text-[#0168B4]' : 'text-[#0A0A0A] group-hover:text-[#0168B4]'}`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {faq.question}
                    </span>
                    <div className="ml-4 shrink-0">
                      {openIndex === index ? (
                        <Minus className="w-6 h-6 text-[#0168B4]" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    <p 
                      style={{
                        color: '#616161',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '16px',
                        lineHeight: '150%'
                      }}
                      className="max-w-2xl"
                    >
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