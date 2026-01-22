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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm backdrop-blur-sm">
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Work Process
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
              Guiding Lights Of Our <br className="hidden md:block" /> Works
            </h2>
          </div>
          <div className="md:max-w-xs pt-0 md:pt-14">
            <p
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </motion.div>

        {/* 4 Card Steps Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 md:mb-20">
          {steps.map((step, index) => {
            // আইকন নামটিকে ছোট হাতের করে ম্যাপ থেকে খোঁজা হচ্ছে
            const IconComponent = iconMap[step.icon?.toLowerCase()];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
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
                  alignItems: 'flex-start'
                }}
                className="shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 border border-white/40"
              >
                <div className="w-full">
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
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
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      color: '#616161',
                      lineHeight: '1.6',
                      fontWeight: '400'
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                <div className="flex items-center justify-center" style={{ height: '64px', width: '64px' }}>
                  {IconComponent ? (
                    <IconComponent
                      size={48}
                      strokeWidth={2.5}
                      className="text-[#0168B4]"
                    />
                  ) : (
                    <Settings size={48} className="text-[#0168B4] opacity-20" /> // ফলব্যাক আইকন
                  )}
                </div>
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
                  <Handshake className="w-10 h-10 text-[#0168B4]" />
                  <div className="text-left">
                    <h3
                      className="capitalize"
                      style={{
                        color: '#0F0F0F',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(30px, 4vw, 40px)',
                        fontWeight: '500',
                        lineHeight: '120%'
                      }}
                    >
                      Partner Studios
                    </h3>
                  </div>
                </div>
                <p
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
                  gap: '45px',
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
                    className="shadow-sm cursor-pointer border border-gray-100"
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
              <Settings className="w-10 h-10 text-[#0168B4] flex-shrink-0" />
              <div className="text-left">
                <h3
                  className="capitalize"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'Inter, sans-serif',
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
                    fontFamily: 'Poppins, sans-serif',
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
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm p-4 cursor-pointer border border-white"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold text-center">{tool.name}</span>
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
              <div className="text-left">
                <p
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '150%'
                  }}
                >
                  Secure File Transfer
                </p>
                <p
                  style={{
                    color: '#616161',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '150%'
                  }}
                >
                  Enterprise-grade security with encrypted file transfer and NDA compliance for all projects.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WorkProcess;