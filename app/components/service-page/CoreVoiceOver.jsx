"use client";
import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CoreVoiceOver = ({ mainSlug = "voice-over" }) => {
  const serviceCards = [
    {
      title: "Commercial & Promotional VO",
      slug: "commercial-vo",
      description:
        "We go beyond translation. Our linguists and cultural consultants keep your message both accurate and relatable.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    {
      title: "Narration & Storytelling VO",
      slug: "narration-vo",
      description:
        "Professional narration and storytelling voice services for all media.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    {
      title: "Character & Animation VO",
      slug: "character-vo",
      description:
        "Bring your characters to life with professional voice acting.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    {
      title: "E-Learning VO",
      slug: "e-learning-vo",
      description:
        "Engaging and clear voiceovers for educational content.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full mb-12 w-fit">
          <Sparkles size={20} className="text-[#0066b2]" />
          <h2 className="text-xl md:text-2xl font-bold text-[#0066b2] tracking-tight">
            Core Voice-Over Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceCards.map((card) => (
            <div key={card.slug} className="flex flex-col group">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[24px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 leading-snug">
                {card.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Link Button to Sub-Service */}
              <Link
                href={`/services/${mainSlug}/${card.slug}`}
                className="flex items-center justify-between gap-2 border border-[#0066b2] text-[#0066b2] hover:bg-[#0066b2] hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition-all w-fit group/btn"
              >
                <span>Explore Services</span>
                <div className="bg-[#0066b2] text-white rounded-full p-1 group-hover/btn:bg-white group-hover/btn:text-[#0066b2] transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreVoiceOver;
