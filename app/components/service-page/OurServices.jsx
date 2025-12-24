"use client";
import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const OurServices = () => {
  const serviceList = [
    {
      title: "Multilingual Voice-Over",
      description: "Translate & adapt your product for 40+ languages with cultural precision.",
      features: [
        "End-to-end game & product localization (UI, lore, marketing content)",
        "Creation of termbase & style guides for consistency",
        "LQA (Linguistic Quality Assurance) included",
        "Coverage across 40+ languages"
      ],
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
      bgColor: "bg-[#cce9ff]"
    },
    {
      title: "Localization",
      description: "Translate & adapt your product for 40+ languages with cultural precision.",
      features: [
        "End-to-end game & product localization (UI, lore, marketing content)",
        "Creation of termbase & style guides for consistency",
        "LQA (Linguistic Quality Assurance) included",
        "Coverage across 40+ languages"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
      bgColor: "bg-[#e0f2fe]"
    },
    {
      title: "Content Distribution & UA",
      description: "Translate & adapt your product for 40+ languages with cultural precision.",
      features: [
        "End-to-end game & product localization (UI, lore, marketing content)",
        "Creation of termbase & style guides for consistency",
        "LQA (Linguistic Quality Assurance) included",
        "Coverage across 40+ languages"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      bgColor: "bg-[#f0f9ff]"
    },
    {
      title: "LQA / Testing",
      description: "Translate & adapt your product for 40+ languages with cultural precision.",
      features: [
        "End-to-end game & product localization (UI, lore, marketing content)",
        "Creation of termbase & style guides for consistency",
        "LQA (Linguistic Quality Assurance) included",
        "Coverage across 40+ languages"
      ],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
      bgColor: "bg-[#e0f2fe]"
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 w-fit">
              <Sparkles size={14} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Service</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-10">
          {serviceList.map((service, index) => (
            <div 
              key={index} 
              className={`${service.bgColor} rounded-[40px] p-8 md:p-12 flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-[#1a1a1a]">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                
                <div className="space-y-3">
                  <p className="font-bold text-sm text-[#1a1a1a]">Key Features:</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="flex items-center gap-2 bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-medium transition group">
                  Explore Services
                  <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition">
                    <ArrowUpRight size={14} className="text-[#0066b2]" />
                  </span>
                </button>
              </div>

              {/* Image Side */}
              <div className="flex-1 w-full h-[300px] md:h-[400px]">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover rounded-[30px] shadow-lg" 
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurServices;