"use client";
import React from "react";

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
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[80px] overflow-hidden shadow-sm bg-gradient-to-b from-[#abdbfe] to-white">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 flex flex-col items-center text-center hover:bg-blue-100/50 transition"
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-extrabold text-gray-800">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

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
