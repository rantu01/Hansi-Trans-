"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API } from "@/app/config/api";

const CaseStudies = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(API.CaseStudies.getAll);
        const data = await response.json();
        setSlides(data);
        if (data.length > 0) {
          setCurrentIndex(Math.floor(data.length / 2));
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  if (loading) return (
    <div className="py-20 text-center text-primary font-medium animate-pulse">
      Loading Case Studies...
    </div>
  );
  
  if (slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  return (
    <section className="py-20 overflow-hidden relative ">
      <div className="relative w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full overflow-hidden relative gap-4 md:gap-6 px-4">
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const isLeft = index === currentIndex - 1;
            const isRight = index === currentIndex + 1;

            let transformClass = "";
            if (isCenter) transformClass = "scale-100 z-20 opacity-100";
            if (isLeft) transformClass = "scale-90 z-10 opacity-40 blur-[2px]";
            if (isRight) transformClass = "scale-90 z-10 opacity-40 blur-[2px]";
            if (!isCenter && !isLeft && !isRight) transformClass = "scale-75 z-0 opacity-0 hidden";

            return (
              <div
                key={slide._id || slide.id}
                className={`relative transition-all duration-700 ease-in-out rounded-[40px] overflow-hidden shadow-2xl shadow-primary/10 ${transformClass} h-[300px] md:h-[550px]`}
                style={{
                  width: isCenter ? "85%" : isLeft || isRight ? "15%" : "0%",
                  marginLeft: isLeft ? "-12%" : undefined,
                  marginRight: isRight ? "-12%" : undefined,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || "Case Study"}
                  className="w-full h-full object-cover rounded-[40px]"
                />
                {/* Subtle Brand Overlay for Center Image */}
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons - Styled with Brand Colors */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-background border border-primary/10 text-primary rounded-full shadow-xl hover:bg-primary hover:text-white transition-all z-30 group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-background border border-primary/10 text-primary rounded-full shadow-xl hover:bg-primary hover:text-white transition-all z-30 group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Pagination Dots - Brand Synchronized */}
      <div className="flex justify-center items-center gap-3 mt-12">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex 
                ? "w-10 bg-primary" 
                : "w-2 bg-primary/20 hover:bg-primary/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;