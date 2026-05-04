"use client";

import React, { useEffect, useState } from "react";
import {
  Settings,
  Globe2,
  Gamepad2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { API } from "@/app/config/api";

const ICONS = {
  Gamepad2: Gamepad2,
  Settings: Settings,
  Globe2: Globe2,
  Clock: Clock,
};

const WhyChooseUs = () => {
  const [data, setData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchWhyChoose = async () => {
      try {
        const res = await fetch(API.WhyChooseUs, { cache: "no-store" });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("WhyChooseUs fetch failed");
      }
    };
    fetchWhyChoose();
  }, []);

  if (!isMounted || !data) return null;

  const getCard = (key) => data.cards?.find((c) => c.key === key);
  const left = getCard("left");
  const middleTop = getCard("middleTop");
  const middleBottom = getCard("middleBottom");
  const right = getCard("right");

  const LeftIcon = ICONS[left?.icon];
  const MidTopIcon = ICONS[middleTop?.icon];
  const MidBottomIcon = ICONS[middleBottom?.icon];
  const RightIcon = ICONS[right?.icon];

  return (
    <section
      className="w-full py-20 lg:h-[979px] h-auto text-white rounded-t-[32px] md:rounded-t-[64px] overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: 'url("/Frame2147207920.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '200px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#FFF',
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                Why Choose Us
              </span>
            </div>
            <h2
              className="capitalize"
              style={{
                color: '#FFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '500',
                lineHeight: '120%'
              }}
            >
              Why HS+?
            </h2>
          </div>
          <div className="md:max-w-lg pt-4 md:pt-14 text-left">
            <p
              style={{
                color: '#FFF',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-8 mx-auto items-center">

          {/* Left Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="shadow-2xl cursor-pointer w-full max-w-[346px] md:min-h-[571px] p-6 md:p-8 rounded-[35px] bg-white flex flex-col justify-between items-start"
            style={{ background: '#FFFFFF' }}
          >
            <div className="text-left w-full">
              <h3
                className="capitalize mb-4 text-xl md:text-[32px]"
                style={{
                  color: '#0168B4',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500',
                  lineHeight: '120%',
                  whiteSpace: 'pre-line'
                }}
              >
                {left?.title?.replace(/<br\s*\/?>/gi, '\n')}
              </h3>
              <p className="text-sm md:text-base"
                style={{
                  color: '#575757',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {left?.description}
              </p>
            </div>

            {/* ✅ FIX: mobile-e center, desktop-e right */}
            <div className="mt-6 md:mt-10 flex justify-center md:justify-end w-full">
              <img
                src="/Vector.png"
                alt="icon"
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>
          </motion.div>

          {/* Middle Section */}
          {/* ✅ FIX: w-full max-w-[346px] lg:max-w-none lg:w-[500px] — mobile-e same width as left/right */}
          <div className="flex flex-col gap-[32px] w-full max-w-[346px] lg:max-w-none lg:w-[500px]">

            {/* Middle Top Card */}
            {/* ✅ FIX: flex class add kora hoyeche, icon center hobe mobile-e */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="shadow-xl cursor-pointer flex flex-col w-full p-6 md:h-[271px] md:p-8 rounded-[32px] bg-white"
              style={{ gap: '32px' }}
            >
              {/* ✅ FIX: mobile-e items-center (icon center), desktop-e items-start */}
              <div className="shrink-0 flex justify-center md:justify-start">
                <img
                  src="/Frame (1).png"
                  alt="icon-top"
                  className="w-10 h-10 md:w-14 md:h-14 object-contain mb-4 md:mb-0"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl md:text-[32px]"
                  style={{
                    color: '#0168B4',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    marginBottom: '8px'
                  }}
                >
                  {middleTop?.title}
                </h3>
                <p className="text-sm md:text-base" style={{ color: '#575757', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: '150%' }}>
                  {middleTop?.description}
                </p>
              </div>
            </motion.div>

            {/* Middle Bottom Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="shadow-xl cursor-pointer flex flex-col w-full p-6 md:h-[271px] md:p-8 rounded-[32px] bg-white"
              style={{ gap: '32px' }}
            >
              {/* ✅ FIX: mobile-e center, desktop-e start */}
              <div className="shrink-0 flex justify-center md:justify-start">
                <img
                  src="/Frame (2).png"
                  alt="icon-bottom"
                  className="w-10 h-10 md:w-14 md:h-14 object-contain mb-4 md:mb-0"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl md:text-[32px]"
                  style={{
                    color: '#0168B4',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    marginBottom: '8px'
                  }}
                >
                  {middleBottom?.title}
                </h3>
                <p className="text-sm md:text-base" style={{ color: '#575757', fontFamily: 'var(--font-poppins), sans-serif', lineHeight: '150%' }}>
                  {middleBottom?.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            className="shadow-2xl cursor-pointer w-full max-w-[346px] md:min-h-[571px] p-6 md:p-8 rounded-[35px] bg-white flex flex-col justify-between items-start"
            style={{ background: '#FFFFFF' }}
          >
            <div className="text-left w-full">
              <h3
                className="capitalize mb-4 text-xl md:text-[32px]"
                style={{
                  color: '#0168B4',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: '500',
                  lineHeight: '120%',
                  whiteSpace: 'pre-line'
                }}
              >
                {right?.title?.replace(/<br\s*\/?>/gi, '\n')}
              </h3>
              <p className="text-sm md:text-base"
                style={{
                  color: '#575757',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {right?.description}
              </p>
            </div>

            {/* ✅ FIX: mobile-e center, desktop-e right */}
            <div className="mt-6 md:mt-10 flex justify-center md:justify-end w-full">
              <div className="relative">
                <img
                  src="/Frame (3).png"
                  alt="right-icon"
                  className="w-10 h-10 md:w-14 md:h-14 object-contain"
                />
                {right?.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#0168B4] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {right.badge}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;