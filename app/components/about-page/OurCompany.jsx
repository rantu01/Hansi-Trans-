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
  const missionImages = images.slice(0, 4);
  const visionImages = images.slice(4, 8);

  const ImageGrid = ({ imgs }) => (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-8">
        <img
          src={imgs[0]}
          alt="Layout 1"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
      <div className="col-span-4">
        <img
          src={imgs[1]}
          alt="Layout 2"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
      <div className="col-span-4">
        <img
          src={imgs[2]}
          alt="Layout 3"
          className="w-full h-48 md:h-64 object-cover rounded-[30px] border border-gray-50"
        />
      </div>
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
                  color: '#404040',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                {company?.badge || "Mission & Vision"}
              </span>
            </div>
            <h1 className="text-primary text-2xl md:text-[48px]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0168B4',
              }}
            >
              {company?.sectionTitle || "Our Company Main Mission"}
            </h1>
          </div>

          <div className="max-w-lg">
            <p className="text-sm md:text-base"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                fontStyle: 'normal',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#616161',
              }}
            >
              {company?.sectionDescription || "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">

          {/* Image Grid Left */}
          <ImageGrid imgs={missionImages} />

          {/* Text Content Right — vertically centered */}
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="mb-6">
                <span className="text-xl md:text-[32px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0168B4'
                  }}
                >
                  {company?.missionLabel || "Mission Statement:"}
                </span>{" "}
                <span className="text-xl md:text-[32px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
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
                  marginBottom: '32px'
                }}
              >
                {company?.missionDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Content Left — vertically centered */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div>
              <h2 className="mb-6">
                <span className="text-xl md:text-[32px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize',
                    color: '#0168B4'
                  }}
                >
                  {company?.visionLabel || "Vision Statement:"}
                </span>{" "}
                <span className="text-xl md:text-[32px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
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
          </div>

          {/* Image Grid Right */}
          <div className="order-1 lg:order-2">
            <ImageGrid imgs={visionImages} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurCompany;