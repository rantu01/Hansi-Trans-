"use client";

import React, { useEffect, useState } from "react";
import { Twitter, Facebook, Linkedin, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const CEO = () => {
  const [ceo, setCeo] = useState(null);

  useEffect(() => {
    const fetchCEO = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        setCeo(data?.ceo || null);
      } catch (err) {
        console.error("Failed to fetch CEO data", err);
      }
    };

    fetchCEO();
  }, []);

  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#005596] to-[#0077cc] text-white py-20 px-6 md:px-12 overflow-hidden flex items-center">
      
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {ceo?.badge || "CEO"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            {ceo?.title || (
              <>
                Our Company Most <br /> Wonderful Person
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-blue-50 text-sm md:text-base leading-relaxed mb-12 max-w-xl opacity-90">
            {ceo?.description ||
              "Leadership is not about being in charge. It is about taking care of those in your charge."}
          </p>

          {/* Stats */}
          {ceo?.stats?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 w-full">
              {ceo.stats.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-bold">
                    {item.value}
                  </span>
                  <span className="text-xs text-blue-200 uppercase tracking-tighter mt-2 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Socials */}
          <div className="flex items-center gap-6">
            {ceo?.socials?.twitter && (
              <a
                href={ceo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                <Twitter size={20} fill="currentColor" stroke="none" />
              </a>
            )}

            {ceo?.socials?.facebook && (
              <a
                href={ceo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                <Facebook size={20} fill="currentColor" stroke="none" />
              </a>
            )}

            {ceo?.socials?.linkedin && (
              <a
                href={ceo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                <Linkedin size={20} fill="currentColor" stroke="none" />
              </a>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative w-[300px] sm:w-[400px] md:w-[450px]">
            <img
              src={
                ceo?.image ||
                "/photo/About US/portrait-successful-business-woman 1.png"
              }
              alt="CEO"
              className="w-full h-auto object-cover relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CEO;
