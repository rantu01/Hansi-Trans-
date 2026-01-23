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
                  color: '#404040', // var(--dark-5)
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
              Why people choose HS+?
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
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-8  mx-auto items-center">

          {/* Left Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '346px',
              minHeight: '527px',
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
                  lineHeight: '120%',
                  whiteSpace: 'pre-line'
                }}
              >
                {left?.title?.replace(/<br\s*\/?>/gi, '\n')}
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
              {/* LeftIcon er poriborrte Vector.png */}
              <img
                src="/Vector.png"
                alt="icon"
                style={{
                  width: '60px',  // w-14 equivalent
                  height: '60px', // h-14 equivalent
                  objectFit: 'contain'
                }}
              />
            </div>
          </motion.div>

          {/* Middle Section */}
          <div className="flex flex-col gap-[32px] w-full lg:w-[500px]">
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
                borderRadius: '32px',
                background: '#FFFFFF',
              }}
              className="shadow-xl cursor-pointer flex-col sm:flex-row"
            >
              <div className="shrink-0">
                {/* MidTopIcon er poriborrte Frame (1).png */}
                <img
                  src="/Frame (1).png"
                  alt="icon-top"
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                />
              </div>
              <div className="text-left">
                <h3
                  style={{
                    color: '#0168B4',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '32px',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    marginBottom: '8px'
                  }}
                >
                  {middleTop?.title}
                </h3>
                <p style={{ color: '#575757', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', lineHeight: '150%' }}>
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
                borderRadius: '32px',
                background: '#FFFFFF',
              }}
              className="shadow-xl cursor-pointer flex-col sm:flex-row"
            >
              <div className="shrink-0">
                {/* MidBottomIcon er poriborrte Frame (2).png */}
                <img
                  src="/Frame (2).png"
                  alt="icon-bottom"
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                />
              </div>
              <div className="text-left">
                <h3
                  style={{
                    color: '#0168B4',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '32px',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    marginBottom: '8px'
                  }}
                >
                  {middleBottom?.title}
                </h3>
                <p style={{ color: '#575757', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', lineHeight: '150%' }}>
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
              width: '100%',
              maxWidth: '346px',
              minHeight: '527px',
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
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '32px',
                  fontWeight: '500',
                  lineHeight: '120%',
                  whiteSpace: 'pre-line'
                }}
              >
                {right?.title?.replace(/<br\s*\/?>/gi, '\n')}
              </h3>
              <p
                style={{
                  color: '#575757',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {right?.description}
              </p>
            </div>

            <div className="mt-10">
              <div className="relative">
                {/* RightIcon er poriborrte Frame (3).png */}
                <img
                  src="/Frame (3).png"
                  alt="right-icon"
                  style={{
                    width: '60px', // w-14 equivalent
                    height: '60px',
                    objectFit: 'contain'
                  }}
                />

                {/* Badge thik image er uporei thakbe */}
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