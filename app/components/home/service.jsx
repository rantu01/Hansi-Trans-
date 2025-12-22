import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const Service = () => {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Service
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0066b2] leading-[1.1]">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Stacked Cards Section */}
        <div className="relative max-w-7xl mx-auto mt-20">

          {/* Back Card – deepest */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-[88%] h-full bg-[#6db3e6] rounded-[50px] md:rounded-[70px] shadow-sm z-0" />

          {/* Middle Card */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[94%] h-full bg-[#91c9f0] rounded-[50px] md:rounded-[70px] shadow-sm z-10" />

          {/* Main Front Card */}
          <div className="relative z-20 bg-gradient-to-b from-[#abdbff] to-white rounded-[40px] md:rounded-[60px] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-md border border-white/50">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Multilingual Voice-Over
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Translate & adapt your product for 40+ languages with cultural precision.
              </p>

              <div className="space-y-4 mb-10">
                <h4 className="font-bold text-gray-900 text-lg">
                  Key Features:
                </h4>
                <ul className="space-y-3">
                  {[
                    "End-to-end game & product localization (UI, lore, marketing content)",
                    "Creation of termbase & style guides for consistency",
                    "LQA (Linguistic Quality Assurance) included",
                    "Coverage across 40+ languages",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span className="text-sm md:text-base font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="inline-flex items-center gap-3 bg-[#0070c0] text-white pl-8 pr-2 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg group">
                Explore Services
                <span className="bg-white text-[#0070c0] rounded-full p-2 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </button>
            </div>

            {/* Right Image Content */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-[40px] overflow-hidden shadow-xl border-4 border-white/30">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Voice over recording"
                  className="w-full h-[350px] md:h-[500px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
