"use client";

import React, { useEffect, useState } from "react";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { API } from "@/app/config/api";

const CEO = () => {
  const [ceo, setCeo] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchCEO = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setCeo(data?.ceo || null);
      } catch (err) {
        console.error("Failed to fetch CEO data", err);
      }
    };
    fetchCEO();
  }, []);

  const extractNumber = (str) => {
    if (!str) return 0;
    const num = parseInt(str.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const defaultStats = [
    { label: "Project complete", value: "400+", targetValue: 400 },
    { label: "Experience", value: "12+", targetValue: 12 },
    { label: "User Trusted", value: "99%", targetValue: 99 },
    { label: "User Trusted", value: "99%", targetValue: 99 },
  ];

  const stats = ceo?.stats?.length > 0
    ? ceo.stats.map(stat => ({
      label: stat.label,
      value: stat.value,
      targetValue: extractNumber(stat.value)
    }))
    : defaultStats;

  return (
    <section className="relative w-full overflow-hidden flex items-center bg-[#0168B4] pt-10 pb-0 px-5 md:py-24 md:px-20 rounded-t-[32px]">

      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #A9DAFF 0%, transparent 50%)',
          filter: 'blur(80px)'
        }}
      ></div>

      <div className="container mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 gap-0 lg:gap-[60px]">

        {/* Left Content */}
        <div className="flex flex-col items-start text-left">

          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-4 md:mb-6" style={{ display: 'flex', height: '42px', width: 'auto', padding: '8px 16px', gap: '8px', borderRadius: '49px', background: '#F5f5f5' }}>
            <img src="/Frame.svg" alt="icon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
            <span style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '14px', fontWeight: '500' }}>
              {ceo?.designation || "CEO"}
            </span>
          </div>

          {/* Title */}
          <h2
            className="leading-tight mb-4 md:mb-8 max-w-md"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: 'clamp(26px, 5vw, 48px)',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#FFFFFF'
            }}
          >
            {ceo?.name || "Our Company Most Wonderful Person"}
          </h2>

          {/* Description */}
          <p
            className="mb-8 md:mb-16 max-w-2xl"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: 'clamp(13px, 3.5vw, 16px)',
              lineHeight: '150%',
              letterSpacing: '0%',
              color: '#F5F5F5'
            }}
          >
            {ceo?.description ||
              "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis. Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
          </p>

          {/* Stats */}
          <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 md:mb-16 md:flex md:flex-wrap md:items-center md:gap-12 w-full">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start justify-center">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    lineHeight: '120%',
                    color: '#FFFFFF',
                    fontSize: 'clamp(22px, 6vw, 40px)',
                  }}
                  className="mb-1"
                >
                  {inView ? (
                    <>
                      <CountUp end={stat.targetValue} duration={2.5} />
                      {stat.value.includes('+') && '+'}
                      {stat.value.includes('%') && '%'}
                    </>
                  ) : (
                    "0"
                  )}
                </span>
                <span
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '400',
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    lineHeight: '150%',
                    color: '#F5F5F5'
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 mb-8 md:mb-0">
            {ceo?.socials?.twitter && ceo.socials.twitter !== "#" && (
              <a href={ceo.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer hover:opacity-70 transition-opacity">
                <Twitter size={20} fill="currentColor" stroke="none" />
              </a>
            )}
            {ceo?.socials?.facebook && ceo.socials.facebook !== "#" && (
              <a href={ceo.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer hover:opacity-70 transition-opacity">
                <Facebook size={20} fill="currentColor" stroke="none" />
              </a>
            )}
            {ceo?.socials?.linkedin && ceo.socials.linkedin !== "#" && (
              <a href={ceo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white cursor-pointer hover:opacity-70 transition-opacity">
                <Linkedin size={20} fill="currentColor" stroke="none" />
              </a>
            )}
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center lg:justify-end items-end h-full min-h-0 mt-0 lg:mt-37">
          <div className="relative flex items-end">
            <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full translate-y-10 translate-x-12 scale-75 bottom-0"></div>
            <img
              src={ceo?.image || "/photo/About US/portrait-successful-business-woman 1.png"}
              alt={ceo?.name || "CEO"}
              className="relative z-10 w-auto object-contain lg:scale-130 origin-bottom"
              style={{
                display: 'block',
                maxHeight: '500px',
                marginBottom: '-24px'
              }}
              // Mobile এ image size control করতে
              onLoad={(e) => {
                if (window.innerWidth < 1024) {
                  e.target.style.maxHeight = '280px';
                }
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CEO;