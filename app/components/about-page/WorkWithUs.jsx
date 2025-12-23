import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const WorkWithUs = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="container w-full  rounded-[40px] overflow-hidden p-8 md:p-12">
        
        {/* Video/Image Placeholder Section */}
        <div className="relative w-full aspect-video rounded-[30px] overflow-hidden bg-black group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072" 
            alt="Space Background" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold leading-snug tracking-tight text-gray-900">
            HS+ Is A Global Partner For Localization, Multilingual Voice-Over, And 
            <span className="text-gray-400"> Cross-Border Marketing. Since 2010, We’ve Helped Leading Game Studios, Anime Creators, And Tech Innovators Connect With In 40 Languages.</span>
          </h1>
        </div>

        {/* Button Section */}
        <div className="mt-10 flex justify-center">
          <button className="flex items-center gap-3 bg-[#0066b2] hover:bg-[#005596] text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg active:scale-95">
            Work with us?
            <span className="bg-white rounded-full p-1">
              <ArrowUpRight size={18} className="text-[#0066b2]" />
            </span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default WorkWithUs;