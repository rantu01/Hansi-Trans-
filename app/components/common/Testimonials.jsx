"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        setTestimonials(data.testimonials || []);
        setBottomNav(data.bottomNav || []);
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };

    fetchTestimonials();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = isMobile ? testimonials.length - 1 : testimonials.length - 2;
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const maxIndex = isMobile ? testimonials.length - 1 : testimonials.length - 2;
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  };

  const translateValue = currentIndex * (isMobile ? 100 : 50);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Testimonials
            </div>
            {/* Replaced [#0066b2] with primary */}
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              What Our Clients Say <br /> About Us!
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Slider Container */}
        <div className="overflow-hidden mb-12 container mx-auto">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-8"
            style={{ transform: `translateX(-${translateValue}%)`, display: 'flex' }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                /* Replaced blue shadow with accent/primary-based transparency */
                className="w-full md:w-[calc(50%-16px)] flex-shrink-0 bg-background rounded-[40px] p-4 shadow-2xl shadow-primary/10 border border-gray-50 flex flex-col h-full"
              >
                {item.type === "text" ? (
                  <div className="bg-gray-50/50 rounded-[35px] p-10 flex-grow flex flex-col justify-center items-start mb-6">
                    {/* Replaced hex with primary */}
                    <Quote className="w-12 h-12 text-primary fill-primary opacity-20 mb-6" />
                    <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                      {item.quote}
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-[35px] overflow-hidden mb-6 h-[300px] md:h-[400px] min-h-[300px]">
                    <img
                      src={item.thumbnail}
                      alt="Client"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      {/* Replaced [#0070c0] with primary */}
                      <button className="bg-primary text-white p-4 rounded-full shadow-lg transform transition hover:scale-110">
                        <Play className="w-6 h-6 fill-white" />
                      </button>
                    </div>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center gap-4 px-6 pb-4">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-md"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-foreground leading-none mb-1">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Bar */}
        <div className="max-w-6xl mx-auto bg-background border border-gray-100 rounded-full p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 ml-2 shrink-0">
            <button 
              onClick={prevSlide}
              className="p-4 bg-gray-50 rounded-full hover:bg-gray-100 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={nextSlide}
              /* Replaced hardcoded blue with primary and accent-based shadow */
              className="p-4 bg-primary text-white rounded-full hover:opacity-90 transition shadow-lg shadow-accent/20 active:scale-95"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:flex flex-grow justify-around items-center px-8 overflow-hidden">
            {bottomNav.map((nav, i) => (
              <div
                key={i}
                className={`flex flex-col items-center border-r last:border-0 border-gray-100 px-10 transition-opacity duration-300 ${
                  i >= currentIndex && i < currentIndex + 4 ? "opacity-100" : "opacity-40"
                }`}
              >
                <p className="text-foreground font-bold text-sm whitespace-nowrap">{nav.name}</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider whitespace-nowrap">
                  {nav.company}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;