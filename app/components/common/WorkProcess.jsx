"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Users,
  Layers,
  Rocket,
  Handshake,
  Settings,
  CheckCircle2,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { API } from "@/app/config/api";

const iconMap = { Search, Users, Layers, Rocket };

const WorkProcess = () => {
  const [steps, setSteps] = useState([]);
  const [studios, setStudios] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
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

  return (
    <section
      style={{
        borderRadius: '32px 32px 0 0',
        background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)'
      }}
      className="py-20 "
    >
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6"
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
                fontSize: '48px',
                fontWeight: '500',
                lineHeight: '120%'
              }}
            >
              Guiding Lights Of Our <br /> Works
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14">
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

        {/* 4 Card Steps Grid - Specific W:306px, H:462px */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon];
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
                  width: '306px',
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
                  {IconComponent && (
                    <IconComponent
                      size={48}
                      strokeWidth={2.5}
                      className="text-[#0168B4]"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lower Section - Partner Studios & Tools */}
        {/* Lower Section - Partner Studios & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* Partner Studios */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
          
            {/* Partner Studios Container Update */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                width: '636px',
                height: '678px',
                padding: '24px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '45px',
                flexShrink: 0,
              }}
              className="text-center"
            >
              {/* Header inside Partner Studios */}
              <div className="flex flex-col items-start w-full">
                <div className="flex items-center gap-4 mb-2 self-start">
                  <Handshake className="w-10 h-10 text-[#0168B4]" />
                  <div className="text-left">
                    <h3
                      className="capitalize"
                      style={{
                        color: '#0F0F0F',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '40px',
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

              {/* Studios List - কার্ডগুলো এখন ৪৫px গ্যাপে থাকবে */}
              <div
                className="w-full flex flex-col items-center overflow-y-auto pr-2 custom-scrollbar"
                style={{
                  gap: '45px', // আপনার দেওয়া নির্দিষ্ট গ্যাপ
                  flexGrow: 1
                }}
              >
                {studios.map((studio, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "#fff" }}
                    style={{
                      width: '306px',
                      padding: '16px 40px',
                      borderRadius: '100px',
                      background: '#FFFFFF',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexShrink: 0 // উচ্চতা ঠিক রাখতে এটি জরুরি
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
            </motion.div>
          </motion.div>

          {/* Tools & Technology */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col p-8 rounded-[40px] "
          >
            <div className="flex items-center gap-4 mb-8">
              <Settings className="w-10 h-10 text-[#0168B4]" />
              <div className="text-left">
                {/* Heading/H3: Inter 40px, #0F0F0F */}
                <h3
                  className="capitalize"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '40px',
                    fontWeight: '500',
                    lineHeight: '120%'
                  }}
                >
                  Tools & Technology
                </h3>
                {/* Body/Regular: Poppins 16px, #616161 */}
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

            <div className="grid grid-cols-4 gap-4 mb-8 flex-grow">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm p-2 cursor-pointer border border-white"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-gray-400 font-bold">{tool.name}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secure File Transfer Card - Updated Background and Padding */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{
                display: 'flex',
                padding: '16px 24px',
                alignItems: 'center',
                gap: '16px',
                alignSelf: 'stretch',
                borderRadius: '32px',
                background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)'
              }}
             
            >
              <div className="bg-[#00c800] rounded-full p-2 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <div className="text-left">
                {/* Paragraph/Medium: Poppins 18px, #0F0F0F */}
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
                {/* Body/Regular: Poppins 14px, #616161 */}
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