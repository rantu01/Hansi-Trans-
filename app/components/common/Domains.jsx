"use client";
import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react"; 
import { ChevronDown } from "lucide-react";
import { API } from "@/app/config/api";

const Domains = () => {
  const [domainsData, setDomainsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await fetch(API.Domains);
        const data = await res.json();
        setDomainsData(data);
      } catch (err) {
        console.error("Failed to fetch domains:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  // Icon Rendering Function synced with primary color
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="text-primary w-6 h-6" /> : <Icons.HelpCircle className="text-primary w-6 h-6" />;
  };

  if (loading) return <div className="py-20 text-center text-primary font-medium">Loading Domains...</div>;

  return (
    /* Replaced hardcoded bg-[#e0f0ff] with a 15% opacity primary on background */
    <section className="bg-primary/10 py-20 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-background/80 px-4 py-1.5 rounded-full mb-6 w-fit border border-primary/10">
              <span className="text-primary text-sm">✦</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Domains</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Vertical Domains
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Main Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {domainsData.map((domain, index) => (
            <div 
              key={domain._id || index} 
              className="bg-background p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-start border border-primary/5 group"
            >
              {/* Icon Container using primary variables */}
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <div className="group-hover:text-white">
                  {renderIcon(domain.icon)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{domain.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {domain.description || "Global network of linguists and 3,000+ voice talents ready to scale."}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {domain.tags?.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-medium text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Faded Row (Visual Effect) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30 blur-[1px] pointer-events-none">
          {domainsData.slice(0, 4).map((domain, index) => (
            <div key={`faded-${index}`} className="bg-background p-8 rounded-[32px] flex flex-col items-start border border-primary/5">
               <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                {renderIcon(domain.icon)}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{domain.title}</h3>
              <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-gray-50 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-50 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Down Button - Replaced #0066b2 with primary */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <button className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent transition-all shadow-xl shadow-primary/30 border-4 border-background">
            <ChevronDown size={32} />
          </button>
        </div>
        
        {/* Bottom Fade Gradient Overlay - Synced with bg variable */}
        <div className="h-48 w-full absolute bottom-0 left-0 bg-gradient-to-t from-primary/10 via-primary/5 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Domains;