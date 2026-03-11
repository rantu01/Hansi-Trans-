"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { API } from "@/app/config/api";

const WorkWithUs = () => {
  const [data, setData] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load WorkWithUs data", err);
      }
    };
    fetchData();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // টেক্সট প্রসেসিং এবং এনিমেশন ফাংশন
  const renderAnimatedText = (text, startRange, endRange) => {
    if (!text) return null;
    const words = text.split(" ");
    
    return words.map((word, i) => {
      const start = startRange + (i / words.length) * (endRange - startRange);
      const end = startRange + ((i + 1) / words.length) * (endRange - startRange);
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const color = useTransform(smoothProgress, [start, end], ["#dbd2d2", "#0A0A0A"]);

      return (
        <motion.span
          key={i}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            fontSize: "clamp(20px, 3.5vw, 48px)",
            lineHeight: "120%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: color,
            display: "inline-block",
            marginRight: "clamp(5px, 1vw, 12px)",
          }}
        >
          {word}
        </motion.span>
      );
    });
  };

  const fullHeadline = data?.workWithUs?.headline || 
    "HS+ Is A Global Partner For Localization, Multilingual Voice-Over, And Cross-Border Marketing. Since 2010, We've Helped Leading Game Studios, Anime Creators, And Tech Innovators Connect With In 40 Languages.";

  return (
    <div ref={containerRef} className="flex items-center justify-center">
      <div className="container w-full rounded-[40px] overflow-hidden p-4 sm:p-8 md:p-12 mt-35 md:-mt-10">
        
        {/* Video/Image Section */}
        <div
          className="relative overflow-hidden bg-secondary group cursor-pointer shadow-2xl shadow-primary/10 mx-auto w-full"
          style={{
            maxWidth: "1296px",
            aspectRatio: "1296 / 592",
            borderRadius: "clamp(16px, 2.5vw, 32px)",
            transform: "rotate(0deg)",
          }}
        >
          <img
            src={data?.hero?.videoImage || "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072"}
            alt="Work with us background"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        {/* Content Section with Word-by-Word Animation */}
        <div className="mt-6 sm:mt-8 text-center">
          <h2
            className="mx-auto w-full px-2 sm:px-4 md:px-6"
            style={{
              maxWidth: "1296px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            {renderAnimatedText(fullHeadline, 0.3, 0.7)}
          </h2>
        </div>

        {/* Button Section */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            className="flex items-center transition-all group hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            style={{
              height: "52px",
              padding: "4px 4px 4px 12px",
              gap: "8px",
              borderRadius: "100px",
              background: "#0168B4",
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              color: "#FFFFFF",
              width: "auto",
              minWidth: "185px",
            }}
          >
            <span
              className="flex-grow text-left"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "0.16px",
                color: "#FFFFFF",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {data?.workWithUs?.buttonText || "Work with us?"}
            </span>
            <span
              className="bg-white rounded-full transition-transform duration-300 group-hover:rotate-45 flex items-center justify-center flex-shrink-0"
              style={{ width: "44px", height: "44px" }}
            >
              <ArrowUpRight size={28} style={{ color: "#0168B4" }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;