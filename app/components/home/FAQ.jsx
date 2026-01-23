"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What Services Do You Offer?",
      answer:
        "We blend creativity and functionality to design user-focused digital products, modern websites, and scalable web applications tailored to your business goals."
    },
    {
      question: "Can You Update My Existing Website?",
      answer:
        "Yes. We can upgrade your existing website with UI/UX improvements, performance optimization, new features, or complete backend and design overhauls."
    },
    {
      question: "Will My Website Be Mobile-Friendly?",
      answer:
        "Absolutely. Every website we build is fully responsive and optimized for mobile, tablet, and desktop devices."
    },
    {
      question: "How Much Does A New Website Cost?",
      answer:
        "Pricing depends on the project scope, features, and complexity. After an initial discussion, we provide a clear and customized quote with no hidden costs."
    },
    {
      question: "How Fast Can You Deliver?",
      answer:
        "Most projects are completed within 2–4 weeks. Timelines may vary based on project size, revisions, and feedback cycles."
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
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '100px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#F5F5F5',
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040', // var(--dark-5)
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                FAQ
              </span>
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
                      className={`transition-colors capitalize ${openIndex === index ? 'text-[#0168B4]' : 'text-[#0A0A0A] group-hover:text-[#0168B4]'
                        }`}
                      style={{
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '24px', // Fixed H6 size
                        fontStyle: 'normal',
                        fontWeight: '500', // Medium weight from spec
                        lineHeight: '120%', // 28.8px
                        textTransform: 'capitalize',
                      }}
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