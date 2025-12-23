import React from 'react';
import { ArrowRight, ArrowUpRight, Target } from 'lucide-react';

const OurCompany = () => {
  return (
    <div className="bg-white py-20 px-6 md:px-12 font-sans text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6">
              <Target size={16} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Mission & Vision</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#0066b2]">
              Our Company Main Mission
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image Grid Left */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000" alt="Space" className="w-full h-64 object-cover rounded-[30px]" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=500" alt="Audio" className="w-full h-48 object-cover rounded-[30px]" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1000" alt="Work" className="w-full h-48 object-cover rounded-[30px]" />
            </div>
          </div>

          {/* Text Content Right */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-[#0066b2]">Mission Statement:</span> To Help Brands Launch Globally With Cultural Precision And Creative Impact.
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We believe that every story deserves to be heard in its authentic cultural voice. That's why we combine expert linguists, professional voice talents, and global creators into a seamless workflow. Our mission is to empower entertainment and tech companies to scale internationally while maintaining cultural relevance and performance-driven results.
            </p>
            <button className="flex items-center gap-3 bg-[#0066b2] hover:bg-[#005596] text-white px-6 py-3 rounded-full font-medium transition-all group">
              Work with us?
              <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition-transform">
                <ArrowUpRight size={18} className="text-[#0066b2]" />
              </span>
            </button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-row-reverse">
          {/* Text Content Left */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="text-[#0066b2]">Vision Statement:</span> "To Become The World's Most Trusted Partner For ACG Localization, Voice-Over, And Creator Marketing."
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We believe that every story deserves to be heard in its authentic cultural voice. That's why we combine expert linguists, professional voice talents, and global creators into a seamless workflow. Our mission is to empower entertainment and tech companies to scale internationally while maintaining cultural relevance.
            </p>
            <button className="flex items-center gap-3 bg-[#0066b2] hover:bg-[#005596] text-white px-6 py-3 rounded-full font-medium transition-all group">
              Work with us?
              <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition-transform">
                <ArrowRight size={18} className="text-[#0066b2]" />
              </span>
            </button>
          </div>

          {/* Image Grid Right */}
          <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
            <div className="col-span-2">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" alt="Tech" className="w-full h-64 object-cover rounded-[30px]" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=500" alt="Code" className="w-full h-48 object-cover rounded-[30px]" />
            </div>
            <div className="col-span-1">
              <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=500" alt="Studio" className="w-full h-48 object-cover rounded-[30px]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurCompany;