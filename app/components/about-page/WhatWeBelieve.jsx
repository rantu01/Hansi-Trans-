"use client";
import React, { useEffect, useState } from "react";
import { Search, Files, Rocket, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const WhatWeBelieve = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const json = await res.json();
        setData(json?.whatWeBelieve);
      } catch (err) {
        console.error("Failed to load WhatWeBelieve data", err);
      }
    };
    fetchData();
  }, []);

  const iconMap = {
    Search: <Search className="w-10 h-10 text-white" />,
    Files: <Files className="w-10 h-10 text-white" />,
    Rocket: <Rocket className="w-10 h-10 text-white" />,
    Sparkles: <Sparkles className="w-10 h-10 text-white" />,
  };

  const cards = data?.cards || [
    {
      title: "Localization Is A Production Discipline",
      description:
        "Global content succeeds when language, voice, sound, distribution, and marketing are treated as connected production systems—not isolated services.",
      iconName: "Search",
    },
    {
      title: "Consistency Builds",
      description:
        "Across languages, updates, and releases, audiences expect characters, tone, and messaging to stay familiar. We build workflows that protect consistency over time.",
      iconName: "Files",
    },
    {
      title: "Growth Starts with Understanding",
      description:
        "Effective global growth starts with cultural understanding—before amplification, before spend, and before scale.",
      iconName: "Rocket",
    },
  ];

  const badge = data?.badge || "Believe";
  const title = data?.title || "What We Believe";

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
              {badge}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-['Inter'] font-medium text-[48px] leading-[1.2] tracking-[-0.03em] capitalize text-[#0A0A0A] mb-16">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const isMiddle = index === 1;

            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-[40px] p-10 min-h-[550px] flex flex-col transition-transform duration-300 hover:-translate-y-2 shadow-2xl bg-[#0A0A0A]"
              >
                {/* --- Dynamic Blue Overlay Circle --- */}
                <div
                  className={`absolute w-[464px] h-[464px] rounded-full bg-[#0168B4]  blur-[50px] pointer-events-none z-0 
            ${isMiddle
                      ? "-top-60 " // Middle card: Circle at Top
                      : "-bottom-60 " // Left/Right cards: Circle at Bottom
                    }`}
                ></div>

                {/* --- Backdrop Filter Layer --- */}
                <div className="absolute inset-0 backdrop-blur-[200px] z-[1]"></div>

                {/* --- Top Icon (Only for Middle Card) --- */}
                {isMiddle && (
                  <div className="mb-40 relative z-10">
                    <div className=" w-fit p-1 rounded-lg ">
                      {iconMap[card.iconName] || iconMap.Search}
                    </div>
                  </div>
                )}

                {/* --- Content Section --- */}
                <div className="relative z-10">
                  <h3 className="font-['Inter'] font-medium text-[32px] leading-[1.2] tracking-normal capitalize text-[#FFFFFF] mb-6">
                    {card.title}
                  </h3>
                  <p className="font-['Poppins'] font-normal text-[16px] leading-[1.4] tracking-[0.02em] text-[#B3B3B3]">
                    {card.description}
                  </p>
                </div>

                {/* --- Bottom Icon (Only for Left & Right Cards) --- */}
                {!isMiddle && (
                  <div className="mt-auto pt-10 relative z-10">
                    <div className=" w-fit p-1 rounded-lg ">
                      {iconMap[card.iconName] || iconMap.Search}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;