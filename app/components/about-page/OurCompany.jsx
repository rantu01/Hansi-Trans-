"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Target } from "lucide-react";
import { API } from "@/app/config/api";

const OurCompany = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setCompany(data?.company || null);
      } catch (err) {
        console.error("Failed to fetch company data", err);
      }
    };

    fetchData();
  }, []);

  const images = company?.images || [];
  // 4 images for Mission and 4 for Vision to match the layout
  const missionImages = images.slice(0, 4);
  const visionImages = images.slice(4, 8);

  // Helper component to keep the logic clean and reuse the 4-image layout
  const ImageGrid = ({ imgs }) => (
    <div className="grid grid-cols-12 gap-3">
      {/* Top Left: Large Image */}
      <div className="col-span-8">
        <img
          src={imgs[0]}
          alt="Layout 1"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
      {/* Top Right: Small Image */}
      <div className="col-span-4">
        <img
          src={imgs[1]}
          alt="Layout 2"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
      {/* Bottom Left: Small Image */}
      <div className="col-span-4">
        <img
          src={imgs[2]}
          alt="Layout 3"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
      {/* Bottom Right: Medium/Wide Image */}
      <div className="col-span-8">
        <img
          src={imgs[3]}
          alt="Layout 4"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white py-20 px-6 mx-7 md:px-12 font-sans text-foreground rounded-[32px]">
      <div className="container mx-auto ">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-xl">
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '200px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#F5f5f5',
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040', // var(--dark-5)
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                Mission & Vision
              </span>
            </div>
            <h1
              className="text-primary"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500', // Medium
                fontStyle: 'normal',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize', // Spec onujayi
                color: '#0168B4', // Spec background/color onujayi
              }}
            >
              Our Company Main Mission
            </h1>
          </div>

          <div className="max-w-lg">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                fontStyle: 'normal', // Regular
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#616161',
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

          {/* Image Grid Left (4 Images) */}
          <ImageGrid imgs={missionImages} />

          {/* Text Content Right */}
          <div className="flex flex-col h-full justify-between items-start">
            {/* h-full use kora hoyeche jeno height-er shob tuku jayga ney */}

            <div>
              <h2 className="mb-6">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '32px',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0168B4'
                  }}
                >
                  Mission Statement:
                </span>{" "}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '32px',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0A0A0A'
                  }}
                >
                  {company?.missionTitle}
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#616161',
                  marginBottom: '32px' // Text theke button-er gap maintain korbe
                }}
              >
                {company?.missionDescription}
              </p>
            </div>

            {/* --- Exact Spec Button --- */}
            <button
              className="flex items-center transition-all group hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 mt-auto"
              style={{
                width: '185px',
                height: '52px',
                padding: '4px 4px 4px 12px',
                gap: '8px',
                borderRadius: '100px',
                background: '#0168B4',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  flexGrow: 1,
                  textAlign: 'left',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                  color: '#FFFFFF'
                }}
              >
                Work with us?
              </span>
              <span
                className="bg-white rounded-full transition-transform duration-300 group-hover:rotate-45 flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0
                }}
              >
                <ArrowUpRight size={28} style={{ color: '#0168B4' }} />
              </span>
            </button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">

          {/* Text Content Left */}
          <div className="order-2 lg:order-1 flex flex-col h-full justify-between items-start">
            {/* Flex container ensure korbe jeno button niche thake */}

            <div>
              <h2 className="mb-6">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '32px',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0168B4'
                  }}
                >
                  Vision Statement:
                </span>{" "}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    fontSize: '32px',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0A0A0A'
                  }}
                >
                  "{company?.visionTitle}"
                </span>
              </h2>

              <p
                className="mb-8"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#616161',
                }}
              >
                {company?.visionDescription}
              </p>
            </div>

            {/* Exact Spec Button - mt-auto ensures it stays at the bottom */}
            <button
              className="flex items-center transition-all group hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 mt-auto"
              style={{
                width: '185px',
                height: '52px',
                padding: '4px 4px 4px 12px',
                gap: '8px',
                borderRadius: '100px',
                background: '#0168B4',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  flexGrow: 1,
                  textAlign: 'left',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                  color: '#FFFFFF'
                }}
              >
                Work with us?
              </span>
              <span
                className="bg-white rounded-full transition-transform duration-300 group-hover:rotate-45 flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  flexShrink: 0
                }}
              >
                <ArrowRight size={20} style={{ color: '#0168B4' }} />
              </span>
            </button>
          </div>

          {/* Image Grid Right (4 Images) */}
          <div className="order-1 lg:order-2">
            <ImageGrid imgs={visionImages} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurCompany;