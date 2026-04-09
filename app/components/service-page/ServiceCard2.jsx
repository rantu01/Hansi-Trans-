"use client";
import React from "react";
import { ArrowDown } from "lucide-react";

const ServiceCard2 = ({ service }) => {
  return (
    <section className="py-10 px-0">
      <div className="container mx-auto">
        <div
          style={{
            background: "linear-gradient(180deg, #CCE7FB 0%, #F7F7F7 100%)",
          }}
          className="rounded-[60px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Text Content */}
          <div className="flex-1 space-y-10">
            <h3
              className="font-['Inter'] font-semibold text-[#0A0A0A] leading-[1.1]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              {service.title || "Voice Over & Dubbing"}
            </h3>

            {/* More Details Button */}
            <button
              className="flex items-center gap-3 px-6 py-2 bg-[#0168B4] text-white rounded-full transition-all hover:bg-[#015696]"
              style={{ height: "54px" }}
            >
              <span className="font-['Poppins'] font-medium text-[16px]">
                More details
              </span>
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-[#0168B4]" strokeWidth={3} />
              </div>
            </button>
          </div>

          {/* Image Container */}
          <div className="flex-1 w-full max-w-[650px]">
            <div className="rounded-[40px] overflow-hidden ">
              <img
                src={service.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000"}
                alt={service.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCard2;