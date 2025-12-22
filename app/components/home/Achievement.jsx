"use client";
import React from "react";
import logo1 from "../../../public/Mission-3.png";
import Image from "next/image";

const Achievement = () => {
  const stats = [
    {
      label: "International Languages",
      value: "40+",
      icon: "🌐", // আপনি চাইলে Lucide বা FontAwesome আইকন ব্যবহার করতে পারেন
      bgColor: "bg-blue-50/50",
    },
    {
      label: "Successful Project",
      value: "600+",
      icon: "🏆",
      bgColor: "bg-sky-50/50",
    },
    {
      label: "Voice Talents",
      value: "3K+",
      icon: "🎙️",
      bgColor: "bg-blue-50/50",
    },
    {
      label: "Linguists",
      value: "2000+",
      icon: "🇬🇧",
      bgColor: "bg-sky-50/50",
    },
  ];

  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
    "/logo6.png",
    "/logo7.png",
    "/logo8.png",
    "/logo9.png",
    "/logo10.png",
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0066b2] flex items-center justify-center gap-2">
            Our Big Achievement <span className="text-2xl">✨</span>
          </h2>
        </div>

        {/* Stats Grid Container */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[80px] overflow-hidden shadow-sm bg-gradient-to-b from-[#abdbfe] to-white">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-8 flex flex-col items-center justify-center text-center transition-all hover:bg-blue-100/50`}
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-10">
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          {/* Logo Marquee or Grid */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-w-[120px]"
              >
                <Image
                  src={logo1}
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
