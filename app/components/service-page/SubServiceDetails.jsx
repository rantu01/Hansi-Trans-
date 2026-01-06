"use client";
import React from "react";

const SubServiceDetails = ({ subService }) => {
  const features = subService.features || [];

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden ">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Hero Image with Brand Shadow */}
        {subService.image && (
          <div className="w-full h-[350px] md:h-[600px] mb-16 overflow-hidden rounded-[32px] md:rounded-[48px] shadow-2xl shadow-primary/10 group relative bg-primary/5">
            <img
              src={subService.image}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
              alt={subService.title}
            />
            {/* Brand-aligned overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-background rounded-[30px] border border-primary/5 hover:bg-background hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                {/* Feature Number using Brand Primary Color */}
                <span className="text-primary font-bold text-xl mb-4 block group-hover:scale-110 transition-transform origin-left">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                
                {/* Feature Text using Foreground for clarity */}
                <p className="text-foreground/80 font-medium leading-relaxed group-hover:text-foreground transition-colors">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceDetails;