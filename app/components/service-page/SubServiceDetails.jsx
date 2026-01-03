"use client";
import React from "react";

const SubServiceDetails = ({ subService }) => {
  const features = subService.features || [];

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Hero Image */}
        {subService.image && (
          <div className="w-full h-[350px] md:h-[600px] mb-16 overflow-hidden rounded-[32px] md:rounded-[48px] shadow-2xl shadow-blue-100/50 group relative bg-gray-100">
            <img
              src={subService.image}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
              /* object-top ব্যবহার করা হয়েছে যাতে মাথার অংশ না কাটে */
              alt={subService.title}
            />
            {/* Overlay for better depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-gray-50 rounded-[30px] border border-gray-100 hover:bg-white hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 group"
              >
                <span className="text-[#0066b2] font-bold text-xl mb-4 block group-hover:scale-110 transition-transform origin-left">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceDetails;