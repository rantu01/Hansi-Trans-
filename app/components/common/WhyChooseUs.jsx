"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Settings,
  Globe2,
  Gamepad2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { API } from "@/app/config/api";

/* icon mapper */
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
        const res = await fetch(API.WhyChooseUs, {
          cache: "no-store",
        });
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    /* Replaced [#020d1f] with secondary (Dark Blue) */
    <section className="py-20 bg-secondary text-white rounded-t-4xl overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6"
        >
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium text-cta-text mb-6 bg-white/5 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-gradient-base" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Why People Choose HS+?
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-cta-text/70 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          
          {/* Left Large Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="bg-background rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl cursor-pointer"
          >
            <div className="text-left">
              {/* Replaced [#0066b2] with primary */}
              <h3 className="text-primary text-3xl font-bold mb-6">
                {left.title.split("<br />")[0]} <br />
                {left.title.split("<br />")[1]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {left.description}
              </p>
            </div>
            <div className="mt-10">
              {LeftIcon && <LeftIcon className="w-14 h-14 text-primary" />}
            </div>
          </motion.div>

          {/* Middle Section */}
          <div className="flex flex-col gap-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl cursor-pointer"
            >
              <div className="mt-2">
                {MidTopIcon && <MidTopIcon className="w-10 h-10 text-primary" />}
              </div>
              <div className="text-left">
                <h3 className="text-primary text-xl font-bold mb-3">{middleTop.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{middleTop.description}</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-background rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl cursor-pointer"
            >
              <div className="mt-2">
                {MidBottomIcon && <MidBottomIcon className="w-10 h-10 text-primary" />}
              </div>
              <div className="text-left">
                <h3 className="text-primary text-xl font-bold mb-3">{middleBottom.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">{middleBottom.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Large Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="bg-background rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl cursor-pointer"
          >
            <div className="text-left">
              <h3 className="text-primary text-3xl font-bold mb-6">
                {right.title.split("<br />")[0]} <br />
                {right.title.split("<br />")[1]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {right.description}
              </p>
            </div>
            <div className="mt-10 flex justify-end">
              <div className="relative">
                {RightIcon && <RightIcon className="w-14 h-14 text-primary" />}
                {right.badge && (
                  /* Replaced [#0066b2] badge with primary */
                  <span className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {right.badge}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;