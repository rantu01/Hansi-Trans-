"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Users,
  Layers,
  Rocket,
  Handshake,
  Settings,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { API } from "@/app/config/api";

// আইকন ম্যাপার (সবগুলো ছোট হাতের অক্ষরে রাখা হয়েছে সেফটির জন্য)
const iconMap = {
  search: Search,
  users: Users,
  layers: Layers,
  rocket: Rocket
};

const WorkProcess = () => {
  const [steps, setSteps] = useState([]);
  const [studios, setStudios] = useState([]);
  const [tools, setTools] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      try {
        const res = await fetch(API.WorkProcess, { cache: "no-store" });
        const data = await res.json();
        setSteps(data.steps || []);
        setStudios(data.studios || []);
        setTools(data.tools || []);
      } catch (err) {
        console.error("Failed to load work process", err);
      }
    };
    fetchData();
  }, []);

  // হাইড্রেশন এরর এড়াতে মাউন্ট চেক
  if (!isMounted) return null;

  return (
    <section
      style={{
        borderRadius: '32px 32px 0 0',
        background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)'
      }}
      className="py-12 md:py-20"
    >
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-6"
        >
          <div className="max-w-2xl">
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
                Work Process
              </span>
            </div>
            <h2
              className="capitalize"
              style={{
                color: '#0A0A0A',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '500',
                lineHeight: '120%'
              }}
            >
              How We Work
            </h2>
          </div>
          <div className="md:max-w-lg pt-0 md:pt-14">
            <p
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              A clear pipeline from brief to delivery—built for cross-border production.
            </p>
          </div>
        </motion.div>

        {/* 4 Card Steps Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 md:mb-20">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon?.toLowerCase()];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // Hover state start
                whileHover="hover"
                style={{
                  width: '100%',
                  maxWidth: '306px',
                  height: '462px',
                  padding: '40px 32px',
                  borderRadius: '40px',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: isEven ? 'column' : 'column-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer'
                }}
                variants={{
                  hover: {
                    y: -12,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }}
                className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-white/40"
              >
                <div className="w-full">
                  <h3
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '32px',
                      fontWeight: '500',
                      color: '#0A0A0A',
                      marginBottom: '16px',
                      lineHeight: '1.2'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '16px',
                      color: '#616161',
                      lineHeight: '1.6',
                      fontWeight: '500'
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Icon Container with Hover Animation */}
                <motion.div
                  className="flex items-center justify-center"
                  // Ekhane variants define kora holo
                  variants={{
                    initial: { scale: 1, rotate: 0 },
                    hover: {
                      scale: 1.15,
                      rotate: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                        mass: 0.8 // Ektu fast and snappy korar jonno
                      }
                    }
                  }}
                  // Parent er whileHover="hover" thakle eta auto trigger hobe
                  style={{
                    height: '64px',
                    width: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {IconComponent ? (
                    <IconComponent
                      size={52}
                      strokeWidth={3}
                      className="text-[#0168B4]"
                    />
                  ) : (
                    <Settings
                      size={52}
                      strokeWidth={3}
                      className="text-[#0168B4] opacity-20"
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Lower Section - Partner Studios & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* Partner Studios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start w-full"
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                maxWidth: '636px',
                minHeight: '678px',
                padding: '24px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '45px',
              }}
              className="text-center"
            >
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center gap-4 mb-2 self-start">
                  {/* Handshake icon-er poriborrte Frame.png use kora hoyeche */}
                  <img
                    src="/Frame.png"
                    alt="Partner Studios Icon"
                    className="w-10 h-10 md:w-[80px] md:h-[80px] object-contain"
                  />

                  <div className="text-left">
                    <h3
                      className="capitalize"
                      style={{
                        color: '#0F0F0F',
                        fontFamily: 'var(--font-inter), sans-serif', // Layout variable theke Inter font
                        fontSize: 'clamp(30px, 4vw, 40px)',
                        fontWeight: '500',
                        lineHeight: '120%'
                      }}
                    >
                      Partner Studios
                    </h3>
                  </div>
                </div>
                <p className="ml-24"
                  style={{
                    color: '#616161',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '150%',
                    textAlign: 'left'
                  }}
                >
                  Professional recording facilities across key markets ensuring authentic, high-quality voice production.
                </p>
              </div>

              {/* Studios List */}
              <div
                className="w-full flex flex-col items-center overflow-y-visible md:overflow-y-auto pr-0 md:pr-2 custom-scrollbar"
                style={{
                  gap: '30px',
                  flexGrow: 1
                }}
              >
                {studios.map((studio, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "#fff" }}
                    style={{
                      width: '100%',
                      maxWidth: '306px',
                      padding: '16px 40px',
                      borderRadius: '100px',
                      background: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexShrink: 0
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-[#0168B4] font-bold text-xl">{studio.code}</span>
                    <div className="text-left flex-grow ml-6">
                      <p
                        style={{
                          color: '#0F0F0F',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '18px',
                          fontWeight: '500',
                          lineHeight: '150%'
                        }}
                      >
                        {studio.name}
                      </p>
                      <p
                        className="uppercase tracking-wider"
                        style={{
                          color: '#616161',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '150%'
                        }}
                      >
                        {studio.lang}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools & Technology */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col p-4 md:p-8 rounded-[40px] w-full"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              {/* Icon-er poriborrte Frame2.png */}
              <img
                src="/Frame2.png"
                alt="Tools and Technology Icon"
                style={{
                  width: '80px',
                  height: '80px',
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                  flexShrink: 0
                }}
              />

              <div className="text-left">
                <h3
                  className="capitalize"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: 'clamp(30px, 4vw, 40px)',
                    fontWeight: '500',
                    lineHeight: '120%'
                  }}
                >
                  Tools & Technology
                </h3>
                <p
                  style={{
                    color: '#616161',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '150%'
                  }}
                >
                  Industry-leading tools and secure workflows...
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 flex-grow">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.1,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    width: '93.67px',
                    alignSelf: 'stretch',
                    aspectRatio: '1 / 1',
                    // Background spec: direct image thakle bg remove kore dewa holo
                    background: 'transparent',
                    borderRadius: '24px',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-full h-full object-contain"
                        style={{
                          filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.05))' // Ektu depth dewar jonno
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '12px',
                          color: '#616161',
                          fontWeight: '500',
                          textAlign: 'center'
                        }}
                      >
                        {tool.name}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secure File Transfer Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex',
                padding: '20px 24px',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch',
                borderRadius: '32px',
                background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)'
              }}
              className="flex-col md:flex-row text-center md:text-left"
            >
              <div className="bg-[#00c800] rounded-full p-2 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '16px 24px',
                  alignItems: 'center',
                  gap: '16px',
                  alignSelf: 'stretch',
                  borderRadius: '32px',
                }}
              >
                <div className="text-left">
                  <p
                    style={{
                      color: '#0F0F0F',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '18px',
                      fontWeight: '500',
                      lineHeight: '150%',
                      margin: 0
                    }}
                  >
                    Secure File Transfer
                  </p>
                  <p
                    style={{
                      color: '#616161',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '150%',
                      margin: '4px 0 0 0' // Title theke ektu gap rakhar jonno
                    }}
                  >
                    Enterprise-grade security with encrypted file transfer and NDA compliance for all projects.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WorkProcess;