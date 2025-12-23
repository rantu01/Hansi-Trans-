"use client";
import React from "react";
import { Twitter, Facebook, Linkedin, Sparkles } from "lucide-react";

const CEO = () => {
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-r from-[#005596] to-[#0077cc] text-white py-20 px-6 md:px-12 overflow-hidden flex items-center">
      {/* Background Decorative Blur (Optional, for that cloud-like effect in image) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content Side */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest">CEO</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Our Company Most <br /> Wonderful Person
          </h2>

          {/* Description */}
          <p className="text-blue-50 text-sm md:text-base leading-relaxed mb-12 max-w-xl opacity-90">
            Our services help you create digital products and solve your problems 
            objectively, strategy, technology and analysis. Our services help you create 
            digital products and solve your problems objectively, strategy, technology and analysis.
            Our services help you create digital products and solve your problems 
            objectively, strategy, technology and analysis.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12 w-full">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold">400+</span>
              <span className="text-xs text-blue-200 uppercase tracking-tighter mt-2 font-medium">Project complete</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold">12+</span>
              <span className="text-xs text-blue-200 uppercase tracking-tighter mt-2 font-medium">Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold">99%</span>
              <span className="text-xs text-blue-200 uppercase tracking-tighter mt-2 font-medium">User Trusted</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-bold">99%</span>
              <span className="text-xs text-blue-200 uppercase tracking-tighter mt-2 font-medium">User Trusted</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-blue-300 transition-colors">
              <Twitter size={20} fill="currentColor" stroke="none" />
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors">
              <Facebook size={20} fill="currentColor" stroke="none" />
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors">
              <Linkedin size={20} fill="currentColor" stroke="none" />
            </a>
          </div>
        </div>

        {/* Right Side - Person Image */}
        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative w-[300px] sm:w-[400px] md:w-[450px]">
             {/* Main Image */}
            <img 
              src="/photo/About US/portrait-successful-business-woman 1.png" // Representative image based on your upload
              alt="CSO / CEO" 
              className="w-full h-auto object-cover relative z-10 drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEO;