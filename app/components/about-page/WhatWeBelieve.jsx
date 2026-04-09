"use client";
import React from "react";
import { Search, Files, Rocket, Sparkles } from "lucide-react";

const WhatWeBelieve = () => {
  const cards = [
    {
      title: "Localization Is A Production Discipline",
      description:
        "Global content succeeds when language, voice, sound, distribution, and marketing are treated as connected production systems—not isolated services.",
      icon: <Search className="w-10 h-10 text-white" />,
    },
    {
      title: "Consistency Builds",
      description:
        "Across languages, updates, and releases, audiences expect characters, tone, and messaging to stay familiar. We build workflows that protect consistency over time.",
      icon: <Files className="w-10 h-10 text-white" />,
      isMiddle: true,
    },
    {
      title: "Growth Starts with Understanding",
      description:
        "Effective global growth starts with cultural understanding—before amplification, before spend, and before scale.",
      icon: <Rocket className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Top Tag */}
        <div className="flex justify-start mb-6">
          <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '120px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#ffffff',
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
                Belive
              </span>
            </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          What We Belive
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-[40px] p-10 min-h-[500px] flex flex-col transition-transform duration-300 hover:-translate-y-2 shadow-2xl ${
                card.isMiddle
                  ? "bg-gradient-to-b from-[#003d6b] via-[#005fa4] to-[#01080e]"
                  : "bg-black"
              }`}
            >
              {/* Background Gradient Glow (Subtle) */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none"></div>

              {/* Icon Section */}
              <div className="mb-auto">
                <div className="bg-white/10 w-fit p-1 rounded-lg backdrop-blur-sm">
                   {card.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="relative z-10 mt-10">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-tight">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Bottom Icon Position (Optional to match visual) */}
              {!card.isMiddle && (
                <div className="mt-12 opacity-80">
                   {/* This matches the bottom icon layout in your image */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;