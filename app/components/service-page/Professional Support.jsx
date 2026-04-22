"use client";
import React from "react";
import { Box } from "lucide-react";

const ProfessionalSupport = ({ data = [], section = {} }) => {
  const supportFeatures = section.supportHighlights || [];

  return (
    <section className="bg-background py-16 px-4 sm:px-6 md:px-12 font-sans">
      <div className="container mx-auto">

        {/* Header Badge */}
        <div className="flex items-center justify-start mb-12 inline-flex gap-3 bg-white px-3 py-2 md:py-3 rounded-[49px] shadow-md">
          <img src="/Frame2.svg" alt="Icon Frame" className="w-9 h-9 object-contain flex-shrink-0" />
          <h2 className="capitalize text-[#0168B4] font-medium text-lg sm:text-xl md:text-2xl leading-[1.15] whitespace-nowrap">
            Add-Ons
          </h2>
        </div>

        {section.supportDescription ? (
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm sm:text-base text-slate-500 leading-7">
            {section.supportDescription}
          </p>
        ) : null}

        {/* Top Services Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {data.map((card, index) => (
              <div key={card._id?.$oid || index} className="flex flex-col group">
                <div
                  className="overflow-hidden mb-6 w-full"
                  style={{
                    aspectRatio: '416 / 262',
                    borderRadius: "16px",
                    opacity: "1",
                    background: "rgba(1, 104, 180, 0.05)",
                  }}
                >
                  <img
                    src={card.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ borderRadius: "16px" }}
                  />
                </div>
                <h3 className="transition-colors duration-300 group-hover:text-[#0168B4] text-base sm:text-lg md:text-xl font-medium text-[#0F0F0F] mb-2 capitalize">
                  {card.title}
                </h3>
                <p className="line-clamp-4 text-sm sm:text-base text-[#6B6B6B] mb-6" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.5' }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full py-20 mb-20 border-2 border-dashed border-primary/10 rounded-[40px] flex flex-col items-center justify-center text-center bg-primary/5">
            <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
              <Box size={40} className="text-primary/30" />
            </div>
            <h3 className="text-xl font-bold text-primary/60">No Support Services Found</h3>
            <p className="text-primary/40 text-sm max-w-xs mt-2 uppercase tracking-tighter">
              Currently there are no additional support services listed.
            </p>
          </div>
        )}

        
      </div>
    </section>
  );
};

export default ProfessionalSupport;