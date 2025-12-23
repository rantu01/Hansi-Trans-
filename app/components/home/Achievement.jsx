"use client";
import React from "react";



import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import Stats from "../common/stats";

const statsData = [
  { icon: <FaUser />, value: "120K+", label: "Users" },
  { icon: <FaStar />, value: "4.9", label: "Rating" },
  { icon: <FaGlobe />, value: "50+", label: "Countries" },
  { icon: <FaBriefcase />, value: "300+", label: "Projects" },
];

const Achievement = () => {
  const stats = [
    { label: "International Languages", value: "40+", icon: "🌐" },
    { label: "Successful Project", value: "600+", icon: "🏆" },
    { label: "Voice Talents", value: "3K+", icon: "🎙️" },
    { label: "Linguists", value: "2000+", icon: "🇬🇧" },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0066b2]">
            Our Big Achievement ✨
          </h2>
        </div>

        {/* Stats */}
        <Stats stats={statsData} />

        {/* Trusted By */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-10">
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border px-6 py-3 rounded-full shadow-sm"
              >
                <img
                  src="/Mission-3.png"
                  alt="Trusted Partner Logo"
                  className="h-10 w-auto object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
