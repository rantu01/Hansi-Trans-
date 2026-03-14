"use client";
import React from "react";
import { Box } from "lucide-react";

const ProfessionalSupport = ({ data = [], section = {} }) => {
  const supportFeatures = section.supportHighlights || [];

  return (
    <section className="bg-background py-16 px-4 sm:px-6 md:px-12 font-sans">
      <div className="container mx-auto">

        {/* Header Badge */}
        <div
          className="flex items-start justify-start mb-12"  // mx-auto removed, justify-center → justify-start, items-center → items-start
          style={{
            width: 'fit-content',     // auto width based on content
            maxWidth: 'none',         // no width limit
            minHeight: "70px",
            padding: "8px 16px",
            gap: "8px",
            borderRadius: "49px",
            background: "#FFFFFF",
            opacity: "1",
            display: "flex",
            alignItems: "center",      // center থেকে start করলাম
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="/Frame2.svg"
            alt="Icon Frame"
            style={{ width: "36px", height: "36px", objectFit: 'contain', flexShrink: 0 }}
          />
          <h2
            className="capitalize"
            style={{
              color: "#0168B4",
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(18px, 3vw, 32px)",
              fontWeight: "500",
              lineHeight: "120%",
              letterSpacing: "0%",
              textAlign: "left",       // center থেকে left করলাম
              display: "inline-block",
              whiteSpace: "nowrap",    // text একই লাইনে থাকবে
            }}
          >
            {section.supportTitle || "Professional Support Services"}
          </h2>
        </div>

        {section.supportDescription ? (
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm leading-7 text-slate-500 md:text-base">
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
                <h3
                  className="transition-colors duration-300 group-hover:text-[#0168B4]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(18px, 2vw, 24px)",
                    fontWeight: "500",
                    color: "#0F0F0F",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    marginBottom: "8px",
                    fontStyle: "normal",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="line-clamp-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6B6B6B",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                    marginBottom: "24px",
                    fontStyle: "normal",
                  }}
                >
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