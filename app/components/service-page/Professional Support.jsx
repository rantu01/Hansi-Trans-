"use client";
import React from "react";
import { ArrowUpRight, Sparkles, Box } from "lucide-react";
import Link from "next/link";

const ProfessionalSupport = ({ data = [] }) => {
  const supportFeatures = [
    { id: "01", title: "Native Speakers Only", desc: "no robotic or machine-generated voices" },
    { id: "02", title: "Studio-Grade Quality", desc: "with noise-free output" },
    { id: "03", title: "Culturally Adapted", desc: "not just translated" },
    { id: "04", title: "Fast Turnaround Times", desc: "24-72 hours typical" },
    { id: "05", title: "Flexible Delivery Formats", desc: "Mp3, MP4, AVF, JPEG, whatever you want" },
    { id: "06", title: "Confidential & Secure", desc: "NDA-protected processes" },
  ];

  return (
    <section className="bg-background py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Badge */}
        <div className="flex items-center gap-3 bg-background border border-primary/10 shadow-sm px-6 py-3 rounded-full mb-12 w-fit">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Professional Support Services
          </h2>
        </div>

        {/* Top Services Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {data.map((card, index) => (
              <div key={index} className="flex flex-col group">
                <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[24px] bg-primary/5">
                  <img 
                    src={card.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-gray-400 text-[10px] leading-relaxed mb-6">
                  {card.description}
                </p>
                <Link href="/services"> 
                  <button className="flex items-center justify-between border border-primary text-primary px-4 py-1.5 rounded-full text-[10px] font-bold w-fit gap-4 hover:bg-primary hover:text-white transition-all group/btn">
                    Explore Services
                    <div className="bg-primary text-white group-hover/btn:bg-white group-hover/btn:text-primary rounded-full p-1 transition-colors">
                      <ArrowUpRight size={12} />
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 mb-20 border-2 border-dashed border-primary/10 rounded-[40px] flex flex-col items-center justify-center text-center bg-primary/5">
            <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
              <Box size={40} className="text-primary/30" />
            </div>
            <h3 className="text-xl font-bold text-primary/60">No Support Services Found</h3>
            <p className="text-primary/40 text-sm max-w-xs mt-2 uppercase tracking-tighter">
              Currently there are no additional support services listed.
            </p>
          </div>
        )}

        {/* Numbered Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {supportFeatures.map((feature, index) => (
            <div 
              key={index} 
              /* Gradient transition from brand sky-blue to white */
              className="bg-gradient-to-b from-gradient-base/10 to-background p-8 rounded-[24px] flex flex-col items-start shadow-sm border border-primary/5 hover:border-primary/20 transition-all"
            >
              <span className="text-4xl font-black text-primary/10 mb-4">{feature.id}</span>
              <h4 className="text-lg font-bold text-secondary mb-2">{feature.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Coverage Footer */}
        <div className="bg-background border border-primary/10 shadow-2xl shadow-primary/5 rounded-[40px] py-12 px-6 text-center max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Coverage Across <span className="text-primary">40+</span> Languages
          </h3>
          <p className="text-gray-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. 
            They sell <span className="text-secondary font-medium">trust, identity, and belonging.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSupport;