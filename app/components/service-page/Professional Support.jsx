"use client";
import React from "react";
import { ArrowUpRight, Sparkles, Box } from "lucide-react";
import Link from "next/link";

const ProfessionalSupport = ({ data = [] }) => {
  const supportFeatures = [
    { id: "01", title: "Native Speakers Only", desc: "no robotic or machine-generated voices" },
    { id: "02", title: "Studio-Grade Quality", desc: "with noise-free output" },
    { id: "03", title: "Culturally Adapted", desc: "not just translated" },
    { id: "04", title: "Fast Turnaround Times", desc: "24-72 hours typical" },
    { id: "05", title: "Flexible Delivery Formats", desc: "Mp3, MP4, AVF, JPEG, whatever you want" },
    { id: "06", title: "Confidential & Secure", desc: "NDA-protected processes" },
  ];

  return (
    <section className="bg-background py-16 px-6 md:px-12 font-sans">
      <div className="container mx-auto">

        {/* Header Badge */}
        <div
          className="flex items-center justify-center mb-12"
          style={{
            width: "585px",
            height: "94px",
            padding: "8px 16px",
            gap: "8px",
            borderRadius: "49px",
            background: "#FFFFFF",
            opacity: "1",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", // Depth-er jonno
          }}
        >
          {/* Icon Frame matching your first block style */}
          <img
            src="/Frame2.svg" // Apni chaile Sparkles icon-er bodole ei frame-ti use korte paren consistency-r jonno
            alt="Icon Frame"
            style={{
              width: "36px",
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
            Professional Support Services
          </h2>
        </div>

        {/* Top Services Grid */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {data.map((card, index) => (
              <div key={index} className="flex flex-col group">
                <div
                  className="overflow-hidden mb-6"
                  style={{
                    width: "416px",
                    height: "262px",
                    borderRadius: "16px",
                    opacity: "1",
                    background: "rgba(1, 104, 180, 0.05)", // bg-primary/5 matching
                  }}
                >
                  <img
                    src={card.image || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      borderRadius: "16px", // Ensures the image corners align with the container
                    }}
                  />
                </div>
                <h3
                  className="transition-colors duration-300 group-hover:text-[#0168B4]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "24px",
                    fontWeight: "500", // Medium
                    color: "#0F0F0F",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    marginBottom: "8px", // mb-2 matching
                    fontStyle: "normal",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="line-clamp-3"
                  style={{
                    fontFamily: "Poppins, sans-serif", // Family/Body refers to Poppins in your design system
                    fontSize: "14px",
                    fontWeight: "400", // Regular
                    color: "#6B6B6B",
                    lineHeight: "150%",
                    letterSpacing: "0%",
                    marginBottom: "24px", // mb-6 matching
                    fontStyle: "normal",
                  }}
                >
                  {card.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/services`}
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

        {/* Numbered Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start transition-all duration-300 hover:shadow-md"
              style={{
                width: "424px",
                height: "204px",
                borderRadius: "32px",
                padding: "32px",
                gap: "12px",
                opacity: "1",
                background: "linear-gradient(180deg, #A9DAFF 0%, #CCE7FB 55.48%, #F7F7F7 100%)",
              }}
            >
              {/* Number/ID - Keeping it subtle as per the previous style */}
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "48px",
                  fontWeight: "500", // Medium
                  color: "#B0D0E8",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  display: "inline-block",
                  marginBottom: "8px", // Gap maintain korar jonno
                }}
              >
                {feature.id}
              </span>

              <h4
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "28px",
                  fontWeight: "500", // Medium
                  color: "#0A0A0A",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  margin: "0",
                  fontStyle: "normal",
                }}
              >
                {feature.title}
              </h4>

              <p
                className="line-clamp-3"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400", // Regular
                  color: "#616161",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  margin: "0",
                  fontStyle: "normal",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Coverage Footer */}
        <div
          className="mx-auto flex flex-col items-center justify-center"
          style={{
            width: "1232px",
            height: "127px",
            borderRadius: "32px",
            paddingTop: "16px",
            paddingBottom: "16px",
            gap: "8px",
            background: "#FFFFFF",
            opacity: "1",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "40px",
              fontWeight: "500", // Medium
              color: "#0A0A0A",
              lineHeight: "120%",
              letterSpacing: "0%",
              textAlign: "center",
              textTransform: "capitalize",
              margin: "0",
              fontStyle: "normal",
            }}
          >
            Coverage Across{" "}
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "48px", // Span er jonne spec onujayi boro size
                fontWeight: "500", // Medium
                color: "#0168B4", // Blue background spec color (text color hishebe)
                lineHeight: "120%",
                letterSpacing: "0%",
                textTransform: "capitalize",
              }}
            >
              40+
            </span>{" "}
            Languages
          </h3>

          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "18px",
              fontWeight: "400", // Regular
              color: "#6B6B6B",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "center",
              margin: "0 auto",
              fontStyle: "normal",
            }}
          >
            Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products.
            They sell trust, identity, and belonging.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSupport;