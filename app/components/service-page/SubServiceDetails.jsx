"use client";
import React from "react";

const SubServiceDetails = ({ subService }) => {
  const features = subService.features || [];

  return (
    <section className="py-6 px-4 sm:px-6 md:px-12 font-sans overflow-hidden md:mt-0 mt-40">
      <div className="mx-auto max-w-full md:max-w-6xl">

        {/* Main Hero Image with Brand Shadow */}
        {subService.image && (
          <div
            className="mx-auto mb-2 overflow-hidden group relative w-full max-w-full md:max-w-[1078px]"
            style={{
              aspectRatio: "1078 / 539",
              borderRadius: "clamp(16px, 2.5vw, 32px)",
              opacity: "1",
              background: "rgba(1, 104, 180, 0.05)",
              boxShadow: "0px 20px 40px rgba(1, 104, 180, 0.1)",
            }}
          >
            <img
              src={subService.image}
              alt={subService.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              style={{
                borderRadius: "clamp(16px, 2.5vw, 32px)",
              }}
            />

            {/* Brand-aligned overlay matching your secondary theme */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(10, 10, 10, 0.2), transparent)",
                borderRadius: "clamp(16px, 2.5vw, 32px)",
              }}
            ></div>
          </div>
        )}
{/* 
        {features.length > 0 ? (
          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-3 px-2">
            {features.map((feature, index) => (
              <span key={`${feature}-${index}`} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                {feature}
              </span>
            ))}
          </div>
        ) : null} */}

      </div>
    </section>
  );
};

export default SubServiceDetails;