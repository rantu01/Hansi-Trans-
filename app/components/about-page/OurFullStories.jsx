"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/app/config/api";

const OurFullStories = () => {
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setGallery(data?.gallery || null);
      } catch (err) {
        console.error("Failed to fetch gallery data", err);
      }
    };

    fetchGallery();
  }, []);

  const images = gallery?.images || [];

  return (
    <section className="bg-background py-20 px-6 md:px-12 font-sans text-foreground">
      <div className="container mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            {/* Replaced gray-100 with a subtle version of primary blue for the badge */}
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '120px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#fff',
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
                {gallery?.badge || "Gallery"}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500', // Medium
                fontStyle: 'normal',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0A0A0A'
              }}
            >
              {gallery?.title || "Our Full Stories"}
            </h2>
          </div>

          <div className="max-w-lg">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400', // Regular
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#616161',
              }}
            >
              {gallery?.description || "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
            </p>
          </div>
        </div>

        {/* Gallery Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Row 1 */}
          {images[0] && (
            <div className="md:col-span-5 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[0]}
                alt="Story 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {images[1] && (
            <div className="md:col-span-4 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[1]}
                alt="Story 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {images[2] && (
            <div className="md:col-span-3 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[2]}
                alt="Story 3"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {/* Row 2 */}
          {images[3] && (
            <div className="md:col-span-3 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[3]}
                alt="Story 4"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {images[4] && (
            <div className="md:col-span-4 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[4]}
                alt="Story 5"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {images[5] && (
            <div className="md:col-span-5 h-[300px] md:h-[350px] overflow-hidden rounded-[40px] group">
              <img
                src={images[5]}
                alt="Story 6"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default OurFullStories;