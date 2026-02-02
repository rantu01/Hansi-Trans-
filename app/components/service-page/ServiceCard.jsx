"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <section className="py-10 px-6 md:px-12">
      <div className="container mx-auto">
        <div
          style={{
            background: "linear-gradient(180deg, #A9DAFF 0%, #CCE7FB 45%, #F7F7F7 100%)",
          }}
          className="rounded-[45px] md:rounded-[60px] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 border border-white/50 shadow-lg transition-all duration-500 hover:shadow-xl"
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h3
              style={{
                color: "#0A0A0A",
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(26px, 3vw, 42px)",
                fontWeight: "600",
                lineHeight: "1.2",
              }}
            >
              {service.title}
            </h3>
            
            <p
              style={{
                color: "#616161",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              {service.description}
            </p>

            {/* Key Features Section */}
            <div className="space-y-4 pt-2">
              <h4
                style={{
                  color: "#090E2F",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Key Features:
              </h4>

              <ul className="grid grid-cols-1 md:grid-cols-1 gap-x-4 gap-y-3">
                {service.features?.slice(0, 4).map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                  >
                    {/* Minimalist Black Bullet matching the design */}
                    <span
                      className="w-2 h-2 rounded-full bg-black shrink-0"
                      style={{ opacity: 0.8 }}
                    />

                    <span
                      style={{
                        color: "#0A0A0A",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium Button Action */}
            <button
              className="group inline-flex items-center justify-center transition-all duration-300 rounded-full mt-4"
              style={{
                height: "52px",
                padding: "4px 4px 4px 20px",
                gap: "12px",
                background: "#0168B4",
                color: "#FFF",
                fontFamily: "Poppins, sans-serif",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              Explore Services
              <span
                className="bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                style={{ width: "44px", height: "44px" }}
              >
                <ArrowUpRight className="w-6 h-6 text-[#0168B4]" strokeWidth={2.5} />
              </span>
            </button>
          </div>

          {/* Image Container with high-radius corners and subtle border */}
          <div className="flex-1 w-full h-[320px] md:h-[420px]">
            <div className="relative rounded-[35px] md:rounded-[50px] overflow-hidden h-full border-4 border-white/30 shadow-inner">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;