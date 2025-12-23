"use client";
import React from "react";
import { Upload, ArrowUpRight, ChevronDown } from "lucide-react";

const Schedule = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side Content */}
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight mb-8">
            Let's Talk And Create <br /> Schedule
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
            Our services help you create digital products and solve your 
            problems objectively, strategy, technology and analysis.
          </p>
          
          {/* Decorative Abstract Shape (Optional matching image vibe) */}
          <div className="mt-12 hidden lg:block opacity-50">
            <div className="w-64 h-64 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">First name</label>
              <input 
                type="text" 
                placeholder="First name" 
                className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-gray-600">Last name</label>
              <input 
                type="text" 
                placeholder="Last name" 
                className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input 
              type="email" 
              placeholder="you@company.com" 
              className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Company or studio Name</label>
            <input 
              type="text" 
              placeholder="you@company.com" 
              className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-xs font-medium text-gray-600">Service Needed</label>
            <div className="relative">
              <select className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full appearance-none cursor-pointer">
                <option>Select Services</option>
                <option>Localization</option>
                <option>Voice-Over</option>
                <option>Marketing</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Phone number</label>
            <div className="flex items-center bg-[#f1f7fc] rounded-lg overflow-hidden">
               <div className="flex items-center gap-1 px-3 border-r border-gray-200">
                 <span className="text-sm">US</span>
                 <ChevronDown size={14} className="text-gray-400" />
               </div>
               <input 
                type="tel" 
                placeholder="+1 (555) 000-0000" 
                className="bg-transparent border-none px-4 py-3 text-sm outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600">Message</label>
            <textarea 
              rows={4} 
              className="bg-[#f1f7fc] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full resize-none"
            ></textarea>
          </div>

          {/* Attachment Area */}
          <div className="border-2 border-dashed border-blue-200 bg-gray-50/50 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition">
            <Upload className="text-gray-400 w-6 h-6" />
            <span className="text-sm font-semibold text-gray-700">Attachment (optional)</span>
            <span className="text-[10px] text-gray-400 uppercase">Upload brief/script/assets (max 50 MB)</span>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-gray-500">You agree to our friendly privacy policy.</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-xs text-gray-500 italic">NDA (Non Discloser agreement) - "I'd like to sign an NDA before sharing files."</span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="flex items-center gap-3 bg-[#0066b2] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition group mt-4">
            Send massage
            <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition">
              <ArrowUpRight size={18} className="text-[#0066b2]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schedule;