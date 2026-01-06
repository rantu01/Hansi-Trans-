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
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            {/* Replaced gray-100 with a subtle version of primary blue for the badge */}
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full mb-6 w-fit border border-primary/10">
              <span className="text-primary">✦</span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Gallery
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-primary font-bold leading-tight">
              Our Full Stories
            </h2>
          </div>

          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your
              problems objectively, strategy, technology and analysis.
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