import React from 'react';
import { Sparkles, Settings, Globe2, Zap, Gamepad2, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#020d1f] text-white rounded-t-4xl">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-sm font-medium text-gray-300 mb-6 bg-white/5 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why People Choose HS+?
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Left Large Card: ACG Focus */}
          <div className="bg-white rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl">
            <div className="text-left">
              <h3 className="text-[#0066b2] text-3xl font-bold mb-6">
                ACG Focus Since <br /> 2010
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Deep expertise in anime, comics, and gaming culture with 14+ years of specialized experience in entertainment localization.
              </p>
            </div>
            <div className="mt-10">
              <Gamepad2 className="w-14 h-14 text-[#0066b2]" />
            </div>
          </div>

          {/* Middle Section: Two Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Integrated Workflow */}
            <div className="bg-white rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl">
              <div className="mt-2">
                <Settings className="w-10 h-10 text-[#0066b2]" />
              </div>
              <div className="text-left">
                <h3 className="text-[#0066b2] text-xl font-bold mb-3">Integrated Workflow</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  Seamless integration between localization, voice-over, and KOL marketing for consistent brand messaging across all touchpoints.
                </p>
              </div>
            </div>

            {/* Scalable Network */}
            <div className="bg-white rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl">
              <div className="mt-2">
                <Globe2 className="w-10 h-10 text-[#0066b2]" />
              </div>
              <div className="text-left">
                <h3 className="text-[#0066b2] text-xl font-bold mb-3">Scalable Network</h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  Global network of 2,000+ linguists and 3,000+ voice talents ready to scale with your project needs across 40+ languages.
                </p>
              </div>
            </div>
          </div>

          {/* Right Large Card: Fast & Reliable */}
          <div className="bg-white rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl">
            <div className="text-left">
              <h3 className="text-[#0066b2] text-3xl font-bold mb-6">
                Fast & Reliable <br /> Delivery
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Proven track record of on-time delivery with 24/7 project management and real-time progress tracking for peace of mind.
              </p>
            </div>
            <div className="mt-10 flex justify-end">
              <div className="relative">
                <Clock className="w-14 h-14 text-[#0066b2]" />
                <span className="absolute -bottom-1 -right-1 bg-[#0066b2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">24</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;