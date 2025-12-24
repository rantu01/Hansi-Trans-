"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CaseStudies = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200",
      alt: "Recording session 1",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200",
      alt: "Recording session 2",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?q=80&w=1200",
      alt: "Recording session 3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // Start from center slide

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="relative w-full flex justify-center items-center">
        {/* Slider Container */}
        <div className="flex justify-center items-center w-full overflow-hidden relative gap-4 md:gap-6">

          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const isLeft = index === currentIndex - 1;
            const isRight = index === currentIndex + 1;

            // Determine transform and style
            let transformClass = "";
            if (isCenter) transformClass = "scale-100 z-20 opacity-100";
            if (isLeft) transformClass = "scale-90 z-10 opacity-70";
            if (isRight) transformClass = "scale-90 z-10 opacity-70";
            if (!isCenter && !isLeft && !isRight) transformClass = "scale-80 z-0 opacity-0";

            return (
              <div
                key={slide.id}
                className={`relative transition-all duration-500 ease-in-out rounded-[40px] overflow-hidden shadow-2xl ${transformClass} h-[300px] md:h-[500px]`}
                style={{
                  width: isCenter ? "80%" : "15%", // Center image 80%, side images 15%
                  marginLeft: isLeft ? "-10%" : undefined, // Slight overlap from left
                  marginRight: isRight ? "-10%" : undefined, // Slight overlap from right
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-[40px]"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() =>
            setCurrentIndex(prev => (prev > 0 ? prev - 1 : slides.length - 1))
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() =>
            setCurrentIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-[#0066b2]" : "w-2 bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
