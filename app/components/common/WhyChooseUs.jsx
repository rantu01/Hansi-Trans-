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

  useEffect(() => {
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

  if (!data) return null;

  const getCard = (key) => data.cards.find((c) => c.key === key);
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

      className="w-full py-20 bg-secondary lg:h-[979px] h-auto text-white rounded-t-4xl overflow-hidden flex flex-col justify-center"
    >
      <div className="container mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            {/* Tag Update: Frame.svg and Specific Typography */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 mb-6 bg-white backdrop-blur-sm shadow-sm"
              style={{
                color: '#404040',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.16px'
              }}
            >
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Why Choose Us
            </div>
            {/* H2 Update: Inter 48px, Capitalize */}
            <h2
              className="capitalize"
              style={{
                color: '#FFF',
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontWeight: '500',
                lineHeight: '120%'
              }}
            >
              Why people choose HS+?
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left">
            {/* Paragraph Update: Poppins 16px */}
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
        {/* Main Grid Layout - Updated with specific dimensions */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 max-w-7xl mx-auto items-center">

          {/* Left Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{
              display: 'flex',
              width: '346px',
              height: '527px',
              padding: '32px',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderRadius: '35px',
              background: '#FFFFFF',
            }}
            className="shadow-2xl cursor-pointer"
          >
            <div className="text-left w-full">
              <h3
                className="capitalize mb-6"
                style={{
                  color: '#0168B4',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '32px',
                  fontWeight: '500',
                  lineHeight: '120%'
                }}
              >
                {left?.title.replace("<br />", "\n")}
              </h3>
              <p
                style={{
                  color: '#575757',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {left?.description}
              </p>
            </div>
            <div className="mt-10">
              {LeftIcon && <LeftIcon className="w-14 h-14 text-[#0168B4]" />}
            </div>
          </motion.div>

          {/* Middle Section - Two horizontal-style cards */}
          <div className="flex flex-col gap-[32px] w-full lg:w-[450px]">
            {/* Middle Top Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex',
                height: '247.5px',
                padding: '32px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
                alignSelf: 'stretch',
                borderRadius: '35px',
                background: '#FFFFFF',
              }}
              className="shadow-xl cursor-pointer"
            >
              <div className="shrink-0">
                {MidTopIcon && <MidTopIcon className="w-12 h-12 text-[#0168B4]" />}
              </div>
              <div className="text-left">
                <h3 className="capitalize mb-2" style={{ color: '#0168B4', fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: '500' }}>
                  {middleTop?.title}
                </h3>
                <p style={{ color: '#575757', fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: '150%' }}>
                  {middleTop?.description}
                </p>
              </div>
            </motion.div>

            {/* Middle Bottom Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex',
                height: '247.5px',
                padding: '32px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
                alignSelf: 'stretch',
                borderRadius: '35px',
                background: '#FFFFFF',
              }}
              className="shadow-xl cursor-pointer"
            >
              <div className="shrink-0">
                {MidBottomIcon && <MidBottomIcon className="w-12 h-12 text-[#0168B4]" />}
              </div>
              <div className="text-left">
                <h3 className="capitalize mb-2" style={{ color: '#0168B4', fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: '500' }}>
                  {middleBottom?.title}
                </h3>
                <p style={{ color: '#575757', fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: '150%' }}>
                  {middleBottom?.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{
              display: 'flex',
              width: '346px',
              height: '527px',
              padding: '32px',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderRadius: '35px',
              background: '#FFFFFF',
            }}
            className="shadow-2xl cursor-pointer"
          >
            <div className="text-left w-full">
              <h3
                className="capitalize mb-6"
                style={{
                  color: '#0168B4',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '32px',
                  fontWeight: '500',
                  lineHeight: '120%'
                }}
              >
                {right?.title.replace("<br />", "\n")}
              </h3>
              <p
                style={{
                  color: '#575757',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {right?.description}
              </p>
            </div>
            <div className="mt-10 self-end">
              <div className="relative">
                {RightIcon && <RightIcon className="w-14 h-14 text-[#0168B4]" />}
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