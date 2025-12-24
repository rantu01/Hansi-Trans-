"use client";
import React from "react";
import { 
  Gamepad2, 
  Clapperboard, 
  Smartphone, 
  Zap, 
  FlaskConical, 
  Megaphone, 
  Globe, 
  ShoppingBag,
  ChevronDown 
} from "lucide-react";

const Domains = () => {
  const domainsData = [
    {
      title: "Games",
      icon: <Gamepad2 className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Anime & Animation",
      icon: <Clapperboard className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Apps & Saas",
      icon: <Smartphone className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Comic & Manga",
      icon: <Zap className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Life Sciences",
      icon: <FlaskConical className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Marketing & AdTech",
      icon: <Megaphone className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Entertainment IP",
      icon: <Globe className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
    {
      title: "Retail & Ecom",
      icon: <ShoppingBag className="text-blue-600 w-6 h-6" />,
      tags: ["Localization", "Digital", "Music", "Voice over", "Distribution"],
    },
  ];

  return (
    <section className="bg-[#e0f0ff] py-20 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-white/50 px-4 py-1.5 rounded-full mb-6 w-fit">
              <span className="text-gray-600 text-sm">✦</span>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Domains</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Vertical Domains
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Main Domains Grid (Full Opacity) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {domainsData.slice(0, 8).map((domain, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{domain.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Global network of linguists and 3,000+ voice talents ready to scale.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {domain.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-medium text-gray-500 border border-gray-100 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Faded Row (Bottom Row with reduced opacity and blur) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30 blur-[1px] pointer-events-none">
          {domainsData.slice(0, 4).map((domain, index) => (
            <div key={`faded-${index}`} className="bg-white p-8 rounded-[32px] flex flex-col items-start">
               <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{domain.title}</h3>
              <div className="h-4 w-full bg-gray-100 rounded mb-4"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-gray-50 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-50 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Down Button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <button className="w-14 h-14 bg-[#0066b2] rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-2xl border-4 border-[#e0f0ff]">
            <ChevronDown size={32} />
          </button>
        </div>
        
        {/* Bottom Fade Gradient Overlay */}
        <div className="h-48 w-full absolute bottom-0 left-0 bg-gradient-to-t from-[#e0f0ff] via-[#e0f0ff]/80 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Domains;