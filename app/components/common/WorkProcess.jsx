"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Layers,
  Rocket,
  Handshake,
  Settings,
  CheckCircle2,
  Sparkles,
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
    <section className="py-20 bg-gradient-to-b from-gradient-base to-background rounded-t-4xl">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-background shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Work Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight">
              Guiding Lights Of Our <br /> Works
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14">
            <p className="text-gray-600 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </motion.div>

        {/* 4 Card Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const TopIcon = iconMap[step.topIcon];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="bg-background rounded-[30px] p-8 flex flex-col justify-between min-h-[350px] shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
              >
                <div>
                  {TopIcon && (
                    <div className="mb-6">
                      <TopIcon className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {Icon && (
                  <div className="mt-6">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Lower Section - Partner Studios & Tools (Equal Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          {/* Partner Studios */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center "
          >
            <div className="flex items-center  gap-4 mb-8">
              <Handshake className="w-10 h-10 text-primary" />
              <div className="text-left">
                <h3 className="text-3xl font-bold text-foreground">Partner Studios</h3>
                <p className="text-gray-500 text-xs">Professional recording facilities...</p>
              </div>
            </div>

            <div className="space-y-12 w-full flex flex-col items-center flex-grow">
              {studios.map((studio, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-background rounded-full py-3 px-8 flex items-center h-[85] gap-6 shadow-sm w-full max-w-[400px] cursor-pointer border border-gray-50"
                >
                  <span className="text-primary font-bold text-xl">{studio.code}</span>
                  <div className="text-left">
                    <p className="text-foreground font-bold text-sm leading-none">{studio.name}</p>
                    <p className="text-gray-400 text-[10px] mt-1">{studio.lang}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Technology */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col  p-8 rounded-[40px] border-l border-gray-200"
          >
            <div className="flex items-center gap-4 mb-8">
              <Settings className="w-10 h-10 text-primary" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-foreground">Tools & Technology</h3>
                <p className="text-gray-500 text-xs">Industry-leading tools...</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 flex-grow">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  whileTap={{ scale: 0.9 }}
                  className="aspect-square bg-background rounded-2xl flex items-center justify-center shadow-sm overflow-hidden p-2 cursor-pointer border border-gray-100"
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
                    ) : (
                      tool.name || `TOOL`
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Huhu Secure File Transfer Card (Based on your image) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-b from-[#A9DAFF] to-[#fff] rounded-[30px] p-6 flex items-center gap-5"
            >
              <div className="bg-[#00c800] rounded-full p-1.5 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-white stroke-[3px]" />
              </div>
              <div className="text-left">
                <p className="text-foreground font-extrabold text-base mb-1">Secure File Transfer</p>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">
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