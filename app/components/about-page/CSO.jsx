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

  // Helper function to extract number from string like "400+" or "99%"
  const extractNumber = (str) => {
    if (!str) return 0;
    const num = parseInt(str.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  // Default stats if API data is not available
  const defaultStats = [
    { label: "Project complete", value: "400+", targetValue: 400 },
    { label: "Experience", value: "12+", targetValue: 12 },
    { label: "User Trusted", value: "99%", targetValue: 99 },
    { label: "User Trusted", value: "99%", targetValue: 99 },
  ];

  // Use API stats if available, otherwise use defaults
  const stats = ceo?.stats?.length > 0 
    ? ceo.stats.map(stat => ({
        label: stat.label,
        value: stat.value,
        targetValue: extractNumber(stat.value)
      }))
    : defaultStats;

  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{
        width: '100%',
        minHeight: '746px',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px',
        paddingTop: '100px',
        paddingRight: '72px',
        paddingBottom: '0px',
        paddingLeft: '72px',
        background: '#0168B4',
      }}
    >
      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #A9DAFF 0%, transparent 50%)',
          filter: 'blur(80px)'
        }}
      ></div>

      <div className="container mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-end relative z-10" style={{ gap: '60px' }}>

        {/* Left Content */}
        <div className="flex flex-col items-start text-left pb-20">

          {/* Badge CEO - Dynamic */}
          <div className="inline-flex items-center justify-center mb-6" style={{ display: 'flex', height: '50px', width: 'auto', padding: '8px 16px', gap: '8px', borderRadius: '49px', background: '#F5f5f5' }}>
            <img src="/Frame.svg" alt="icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            <span style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', fontWeight: '500' }}>
              {ceo?.designation || "CEO"}
            </span>
          </div>

          {/* Title - Dynamic Name */}
          <h2
            className="leading-tight mb-8 max-w-md"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: '48px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#FFFFFF'
            }}
          >
            {ceo?.name || "Our Company Most Wonderful Person"}
          </h2>

          {/* Description - Dynamic */}
          <p
            className="mb-16 max-w-2xl"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              color: '#F5F5F5'
            }}
          >
            {ceo?.description ||
              "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis. Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
          </p>

          {/* Stats with Counter Up Animation - Dynamic */}
          <div ref={ref} className="flex flex-wrap items-center gap-12 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-start justify-center">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '40px',
                    lineHeight: '120%',
                    color: '#FFFFFF'
                  }}
                  className="mb-2"
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
                    fontSize: '16px',
                    lineHeight: '150%',
                    color: '#F5F5F5'
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Socials - Dynamic Links */}
          <div className="flex items-center gap-5">
            {ceo?.socials?.twitter && ceo.socials.twitter !== "#" && (
              <a 
                href={ceo.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Twitter size={20} fill="currentColor" stroke="none" />
              </a>
            )}
            {ceo?.socials?.facebook && ceo.socials.facebook !== "#" && (
              <a 
                href={ceo.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Facebook size={20} fill="currentColor" stroke="none" />
              </a>
            )}
            {ceo?.socials?.linkedin && ceo.socials.linkedin !== "#" && (
              <a 
                href={ceo.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white cursor-pointer hover:opacity-70 transition-opacity"
              >
                <Linkedin size={20} fill="currentColor" stroke="none" />
              </a>
            )}
          </div>
        </div>

        {/* Right Image Section - Dynamic Image */}
        <div className="relative flex justify-end items-end h-full">
          <div className="relative">
            {/* Shadow only on the right side */}
            <div className="absolute inset-0 bg-black/20 blur-3xl rounded-full translate-y-6 translate-x-12 scale-60"></div>

            <img
              src={ceo?.image || "/photo/About US/portrait-successful-business-woman 1.png"}
              alt={ceo?.name || "CEO"}
              className="relative z-10 w-full max-w-[600px] object-contain"
              style={{ display: 'block' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CEO;