"use client";
import React from "react";
import { Layers } from "lucide-react";

const ServiceHero = () => {
  const services = [
  { name: "Voice-Over", position: "top-12 left-[6%]" },

  { name: "Localization", position: "top-28 left-[22%]" },

  { name: "Digital Marketing", position: "top-48 left-1/2 -translate-x-1/2" },

  { name: "Music & Sound Effects", position: "top-28 right-[22%]" },

  { name: "Content Distribution", position: "top-12 right-[6%]" },
];


  return (
    <section className="relative w-full h-[400px] md:h-[300px] overflow-hidden flex items-center justify-center">
      {/* Background with soft blue-grey gradient */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Floating Service Pills */}
        {services.map((service, index) => (
          <div
            key={index}
            className={`absolute ${service.position} flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full shadow-2xl transition-transform hover:scale-105 cursor-default group z-10`}
          >
            <span className="text-sm md:text-base font-medium tracking-wide">
              {service.name}
            </span>
            <Layers 
              size={18} 
              className="text-white opacity-80 group-hover:rotate-12 transition-transform" 
            />
          </div>
        ))}

        {/* Central Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full"></div>
      </div>
    </section>
  );
};

export default ServiceHero;