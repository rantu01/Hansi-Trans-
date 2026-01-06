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
import { motion } from "framer-motion"; // প্যাকেজ ইমপোর্ট
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
    <section className="py-20 bg-gradient-to-b from-[#aadbff] to-white rounded-t-4xl">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Work Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight">
              GUIDING LIGHTS OF OUR <br /> WORKS
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
                transition={{ delay: index * 0.1 }} // স্ট্যাগার্ড এনিমেশন (একে একে আসবে)
                whileHover={{ y: -10, scale: 1.02 }} // হোভারে সামান্য বড় হবে
                whileTap={{ scale: 0.96 }} // ক্লিক করলে প্রফেশনাল শ্রিন্ক (Shrink)
                className="bg-white rounded-[30px] p-8 flex flex-col justify-between min-h-[350px] shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div>
                  {TopIcon && (
                    <div className="mb-6">
                      <TopIcon className="w-10 h-10 text-blue-600" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {Icon && (
                  <div className="mt-6">
                    <Icon className="w-10 h-10 text-blue-600" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Partner Studios */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <Handshake className="w-10 h-10 text-blue-600" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Partner Studios</h3>
                <p className="text-gray-500 text-xs">Professional recording facilities...</p>
              </div>
            </div>

            <div className="space-y-4 flex flex-col items-center">
              {studios.map((studio, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-full py-3 px-8 flex items-center gap-6 shadow-sm min-w-[300px] cursor-pointer"
                >
                  <span className="text-blue-600 font-bold text-xl">{studio.code}</span>
                  <div className="text-left">
                    <p className="text-gray-900 font-bold text-sm leading-none">{studio.name}</p>
                    <p className="text-gray-400 text-[10px]">{studio.lang}</p>
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
          >
            <div className="flex items-center gap-4 mb-8">
              <Settings className="w-10 h-10 text-blue-600" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900">Tools & Technology</h3>
                <p className="text-gray-500 text-xs">Industry-leading tools...</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {tools.map((tool, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, rotate: 2 }} // হোভারে হালকা রোটেশন ও স্কেল
                  whileTap={{ scale: 0.9 }} // ক্লিক করলে শ্রিন্ক
                  className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden p-2 cursor-pointer"
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-[10px] text-gray-400 font-bold">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.name} className="w-full h-full object-contain" />
                    ) : (
                      tool.name || `TOOL`
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-blue-100/50 rounded-2xl p-4 flex items-center gap-4 border border-blue-200/50"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
              <div className="text-left">
                <p className="text-gray-900 font-bold text-sm">Secure File Transfer</p>
                <p className="text-gray-500 text-[10px]">Enterprise-grade security...</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WorkProcess;