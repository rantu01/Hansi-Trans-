"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const CoreVoiceOver = ({ mainSlug }) => {
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubServices = async () => {
      if (!mainSlug) return;
      try {
        const response = await axios.get(API.services.subServices(mainSlug));
        if (response.data && response.data.success) {
          setSubServices(response.data.subServices || []);
        }
      } catch (error) {
        console.error("Error fetching sub-services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubServices();
  }, [mainSlug]);

  if (loading) return (
    <div className="text-center py-20 text-primary font-medium animate-pulse">
      Loading Services...
    </div>
  );

  if (subServices.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/10 rounded-[32px] m-10 bg-primary/5">
        <p className="text-primary/60 font-medium">No sub-services found for: {mainSlug}</p>
        <p className="text-xs text-primary/40 mt-1 uppercase tracking-widest">Database connection verified</p>
      </div>
    );
  }

  return (
    <section className="bg-background py-16 px-6 md:px-12 font-sans">
      <div className="container mx-auto">

        {/* Section Header with Brand Colors */}
        <div
          className="flex items-center justify-center mb-12"
          style={{
            width: "636px",
            height: "94px",
            padding: "8px 16px 8px 16px",
            gap: "8px",
            borderRadius: "49px",
            background: "#FFFFFF",
            opacity: "1",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", // Optional: design-ke depth deoyar jonno
          }}
        >
          {/* Icon Frame */}
          <img
            src="/Frame2.svg"
            alt="Achievement Frame"
            style={{
              width: "36px", // Specs onujayi icon size halka barano hoyeche height er sathe mil rekhe
              height: "36px",
              objectFit: 'contain'
            }}
          />

          <h2
            className="capitalize"
            style={{
              color: "#0168B4",
              fontFamily: "Inter, sans-serif",
              fontSize: "32px",
              fontWeight: "500",
              lineHeight: "120%",
              letterSpacing: "0%",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            Core {mainSlug?.replace(/-/g, " ")} Services
          </h2>
        </div>

        {/* Sub-services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {subServices.map((card) => (
            <div key={card._id} className="flex flex-col group h-full">

              {/* Image Container - Dimensions Fixed as per your specs */}
              <div
                className="overflow-hidden"
                style={{
                  width: "306px",
                  height: "262px",
                  borderRadius: "16px",
                  opacity: "1",
                  background: "#F1F5F9",
                  flexShrink: 0, // Image size fix thakbe
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{
                    borderRadius: "16px",
                  }}
                />
              </div>

              {/* Content Wrapper - flex-grow use kora hoyeche height same rakhar jonno */}
              <div className="flex flex-col flex-grow">
                <h3
                  className="transition-colors duration-300 group-hover:text-[#0168B4] mt-4 "
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#0F0F0F",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    marginBottom: "12px",
                    width: "274px",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="line-clamp-3"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#6B6B6B",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                    marginBottom: "24px",
                    fontStyle: "normal",
                    width: "274px",
                    flexGrow: 1, // Eta baki khali jayga puron korbe jate button niche thake
                  }}
                >
                  {card.description}
                </p>

                {/* Dynamic Action Button - Bottom Aligned */}
                <div className="mt-auto">
                  <Link
                    href={`/services/${mainSlug}/${card.slug}`}
                    className="group inline-flex items-center justify-center transition-all duration-300 whitespace-nowrap"
                    style={{
                      width: "198px",
                      height: "52px",
                      borderRadius: "100px",
                      border: "1px solid #0168B4",
                      padding: "4px 4px 4px 12px",
                      gap: "8px",
                      opacity: "1",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "160%",
                      letterSpacing: "0.16px",
                      color: "#0168B4",
                      textDecoration: "none",
                    }}
                  >
                    <span>Explore Services</span>

                    <div
                      className="bg-[#0168B4] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                      style={{
                        width: "42px",
                        height: "42px",
                        flexShrink: 0,
                      }}
                    >
                      <ArrowUpRight
                        size={25}
                        className="text-[#fff]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreVoiceOver;