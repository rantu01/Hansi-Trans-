"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API } from "@/app/config/api"; // আপনার API কনফিগ পাথ অনুযায়ী ইম্পোর্ট করুন

const CaseStudies = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // API থেকে ডেটা নিয়ে আসা
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(API.CaseStudies.getAll);
        const data = await response.json();
        setSlides(data);
        if (data.length > 0) {
          setCurrentIndex(Math.floor(data.length / 2)); // মাঝে সেট করার জন্য
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (slides.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden relative">
      <div className="relative w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full overflow-hidden relative gap-4 md:gap-6">
          {slides.map((slide, index) => {
            const isCenter = index === currentIndex;
            const isLeft = index === currentIndex - 1;
            const isRight = index === currentIndex + 1;

            let transformClass = "";
            if (isCenter) transformClass = "scale-100 z-20 opacity-100";
            if (isLeft) transformClass = "scale-90 z-10 opacity-70";
            if (isRight) transformClass = "scale-90 z-10 opacity-70";
            if (!isCenter && !isLeft && !isRight) transformClass = "scale-80 z-0 opacity-0 hidden";

            return (
              <div
                key={slide._id || slide.id}
                className={`relative transition-all duration-500 ease-in-out rounded-[40px] overflow-hidden shadow-2xl ${transformClass} h-[300px] md:h-[500px]`}
                style={{
                  width: isCenter ? "80%" : isLeft || isRight ? "15%" : "0%",
                  marginLeft: isLeft ? "-10%" : undefined,
                  marginRight: isRight ? "-10%" : undefined,
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt || "Case Study"}
                  className="w-full h-full object-cover rounded-[40px]"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : slides.length - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-30"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition z-30"
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