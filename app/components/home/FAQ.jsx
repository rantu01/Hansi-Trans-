"use client";
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const typography = {
  colors: {
    dark: '#0A0A0A',
    dark5: '#404040',
    muted: '#616161',
    primary: '#0168B4',
    subtle: '#F5F5F5',
    bg: '#FFFFFF',
  },
  fonts: {
    inter: 'Inter, sans-serif',
    poppins: 'var(--font-poppins), sans-serif',
  },
  sizes: {
    h2: '48px',
    h6: '24px',
    p: '16px',
  },
  weights: {
    regular: 400,
    medium: 500,
  },
  lineHeights: {
    h2: '1.1',
    p: '1.5',
    h6: '1.2',
  },
};

const FAQ = () => {
  const [openLeft, setOpenLeft] = useState(-1);
  const [openRight, setOpenRight] = useState(-1);

  const faqs = [
    {
      question: "What Services Do You Offer?",
      answer: "We blend creativity and functionality to design user-focused digital products, modern websites, and scalable web applications tailored to your business goals."
    },
    {
      question: "Can You Update My Existing Website?",
      answer: "Yes — we can update UI/UX, add new features, migrate platforms, or perform full redesigns while preserving SEO and data."
    },
    {
      question: "Will My Website Be Mobile-Friendly?",
      answer: "Absolutely. Every site we build is responsive and tested across common devices and viewports for consistent UX."
    },
    {
      question: "How Much Does A New Website Cost?",
      answer: "Costs vary by scope. After a discovery call we provide a tailored quote with clear deliverables and milestones."
    },
    {
      question: "How Fast Can You Deliver?",
      answer: "Typical timelines range from 2–6 weeks depending on complexity, integrations, and review cycles."
    },
    {
      question: "Do You Offer Maintenance & Support?",
      answer: "Yes — maintenance, security updates, and content support packages are available on monthly or per-release plans."
    },
    {
      question: "Can You Improve SEO & Performance?",
      answer: "We optimize for performance, accessibility, and SEO best practices including metadata, structured data, and runtime improvements."
    },
    {
      question: "How Many Revisions Are Included?",
      answer: "Revision counts depend on the package; we typically include a few rounds of design revisions and a review period before final delivery."
    }
  ];

  // split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  return (
    <section className="w-full py-20 px-8 lg:px-24 rounded-t-[32px]" style={{ background: typography.colors.bg }}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-xl">
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
              <span className="text-sm md:text-base"
                style={{
                  color: '#404040', // var(--dark-5)
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                FAQs
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight" style={{ color: typography.colors.dark, fontFamily: typography.fonts.inter }}>
              Frequently Asked <br /> Questions
            </h2>
          </div>
          <div className="lg:pt-4">
            <p className="text-sm md:text-base leading-relaxed max-w-md" style={{ color: typography.colors.muted, fontFamily: typography.fonts.poppins, lineHeight: typography.lineHeights.p }}>
              Explore tips, guides, and industry trends shaping global launches today.
            </p>
          </div>
        </div>

        {/* FAQ Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">

          {/* Left Column */}
          <div className="flex flex-col">
            {leftFaqs.map((faq, index) => (
              <div key={`left-${index}`} className="border-b" style={{ borderColor: '#E5E5E5' }}>
                <div className="py-6">
                  <button
                    onClick={() => setOpenLeft(openLeft === index ? -1 : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="font-medium transition-colors text-lg md:text-2xl" style={{ fontFamily: typography.fonts.inter, color: openLeft === index ? typography.colors.primary : typography.colors.dark }}>
                      {faq.question}
                    </span>
                    <div className="shrink-0">
                      {openLeft === index ? (
                        <Minus style={{ width: 20, height: 20, color: typography.colors.primary }} />
                      ) : (
                        <Plus style={{ width: 20, height: 20, color: typography.colors.dark5 }} />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openLeft === index ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                    <p className="max-w-2xl text-sm md:text-base" style={{ color: typography.colors.muted, fontFamily: typography.fonts.poppins, lineHeight: typography.lineHeights.p }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {rightFaqs.map((faq, index) => (
              <div key={`right-${index}`} className="border-b" style={{ borderColor: '#E5E5E5' }}>
                <div className="py-6">
                  <button onClick={() => setOpenRight(openRight === index ? -1 : index)} className="w-full flex items-center justify-between text-left group">
                    <span className="text-lg md:text-2xl font-medium" style={{ fontFamily: typography.fonts.inter, color: openRight === index ? typography.colors.primary : typography.colors.dark }}>
                      {faq.question}
                    </span>
                    <div className="shrink-0">
                      {openRight === index ? (
                        <Minus style={{ width: 20, height: 20, color: typography.colors.primary }} />
                      ) : (
                        <Plus style={{ width: 20, height: 20, color: typography.colors.dark5 }} />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openRight === index ? 'max-h-40 mt-4' : 'max-h-0'}`}>
                    <p className="max-w-2xl text-sm md:text-base" style={{ color: typography.colors.muted, fontFamily: typography.fonts.poppins, lineHeight: typography.lineHeights.p }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;