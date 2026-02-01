"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { API } from "@/app/config/api";

const WorkWithUs = () => {
  const [data, setData] = useState(null);

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

  return (
    <div className="flex items-center justify-center ">
      <div className="container w-full rounded-[40px] overflow-hidden p-8 md:p-12">

        {/* Video/Image Section */}
        <div
          className="relative overflow-hidden bg-secondary group cursor-pointer shadow-2xl shadow-primary/10 mx-auto"
          style={{
            width: '1296px',
            height: '592px',
            opacity: '1',
            borderRadius: '32px',
            transform: 'rotate(0deg)', // Angle 0 deg
          }}
        >
          <img
            src={
              data?.hero?.videoImage ||
              "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072"
            }
            alt="Work with us background"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 text-center md:text-left">
          {/* Replaced text-gray-900 with foreground and styled headline with primary accents */}
          <h2
            className="mx-auto max-w-[1296px] px-6" // Container width maintain korar jonno
            style={{
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0A0A0A',
                display: 'inline', // Block soriye inline kora hoyeche jeno line break na hoy
              }}
            >
              {data?.workWithUs?.headline?.split(" And ")[0] || "HS+ Is A Global Partner For Localization,"}
            </span>
            {" "}
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#dbd2d2', // Apnar deya spec onujayi color (Footer pattern follow kore)
                display: 'inline',
              }}
            >
              {data?.workWithUs?.headline?.split(" And ")[1] ||
                "Multilingual Voice-Over, And Cross-Border Marketing. Since 2010, We’ve Helped Leading Game Studios, Anime Creators, And Tech Innovators Connect With In 40 Languages."}
            </span>
          </h2>
        </div>

        {/* Button Section */}
        <div className="mt-10 flex justify-center">
          {/* Replaced #0066b2 with primary/accent colors */}
          <button
            className="flex items-center transition-all group hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            style={{
              width: '185px',
              height: '52px',
              padding: '4px 4px 4px 12px',
              gap: '8px',
              borderRadius: '100px',
              background: '#0168B4',
              opacity: '1',
              transform: 'rotate(0deg)',
              border: 'none',
              cursor: 'pointer',
              // Typography
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              color: '#FFFFFF'
            }}
          >
            <span
              className="flex-grow text-left"
              style={{
                fontFamily: 'Poppins, sans-serif', // 'Family/Body' normally Poppins ba Inter ke bujhay
                fontWeight: '500', // Medium
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '160%', // Exact 25.6px
                letterSpacing: '0.16px', // 1% of 16px is 0.16px
                color: '#FFFFFF', // Spec-e background white deya mane text color white
                display: 'inline-block'
              }}
            >
              {data?.workWithUs?.buttonText || "Work with us?"}
            </span>
            <span
              className="bg-white rounded-full transition-transform duration-300 group-hover:rotate-45 flex items-center justify-center"
              style={{
                width: '44px',
                height: '44px',
                flexShrink: 0
              }}
            >
              <ArrowUpRight size={28} style={{ color: '#0168B4' }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;