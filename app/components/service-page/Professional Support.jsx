"use client";
import React from "react";
import { ArrowUpRight, Sparkles, Box } from "lucide-react";
import Link from "next/link";

const ProfessionalSupport = ({ data = [] }) => {
  // সাপোর্ট ফিচারগুলো স্ট্যাটিক রাখা হয়েছে
  const supportFeatures = [
    { id: "01", title: "Native Speakers Only", desc: "no robotic or machine-generated voices" },
    { id: "02", title: "Studio-Grade Quality", desc: "with noise-free output" },
    { id: "03", title: "Culturally Adapted", desc: "not just translated" },
    { id: "04", title: "Fast Turnaround Times", desc: "24-72 hours typical" },
    { id: "05", title: "Flexible Delivery Formats", desc: "Mp3, MP4, AVF, JPEG, whatever you want" },
    { id: "06", title: "Confidential & Secure", desc: "NDA-protected processes" },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full mb-12 w-fit">
          <Sparkles size={20} className="text-[#0066b2]" />
          <h2 className="text-xl md:text-2xl font-bold text-[#0066b2] tracking-tight">
            Professional Support Services
          </h2>
        </div>

        {/* Top Services Grid - ডাটা চেক লজিক */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {data.map((card, index) => (
              <div key={index} className="flex flex-col group">
                <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[24px]">
                  <img 
                    src={card.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{card.title}</h3>
                <p className="text-gray-400 text-[10px] leading-relaxed mb-6">
                  {card.description}
                </p>
                <Link href="/services"> 
                  <button className="flex items-center justify-between border border-[#0066b2] text-[#0066b2] px-4 py-1.5 rounded-full text-[10px] font-semibold w-fit gap-4 hover:bg-blue-50 transition">
                    Explore Services
                    <div className="bg-[#0066b2] text-white rounded-full p-1">
                      <ArrowUpRight size={12} />
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* ডাটা না থাকলে এই মেসেজটি দেখাবে (ডিজাইন মেইনটেইন করে) */
          <div className="w-full py-20 mb-20 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Box size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No Support Services Found</h3>
            <p className="text-gray-400 text-sm max-w-xs mt-2">
              Currently there are no additional support services listed for this category.
            </p>
          </div>
        )}

        {/* Numbered Feature Grid - এটি সব সময় দেখাবে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {supportFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-[#e0f2ff] to-white p-8 rounded-[24px] flex flex-col items-start shadow-sm"
            >
              <span className="text-4xl font-bold text-blue-200/50 mb-4">{feature.id}</span>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-500 text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Coverage Footer */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-[40px] py-10 px-6 text-center max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Coverage Across <span className="text-[#0066b2]">40+</span> Languages
          </h3>
          <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto">
            Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSupport;