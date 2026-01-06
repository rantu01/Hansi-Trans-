"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  
  // Reference for the card container
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API.services.main}/main/list`);
        const result = await response.json();
        if (result.success) setServices(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      if (!cardContainerRef.current || services.length === 0) return;

      const rect = cardContainerRef.current.getBoundingClientRect();
      const isMouseOverCards = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      if (!isMouseOverCards) return;

      if (isAnimating.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && activeIndex < services.length - 1) {
        if (e.cancelable) e.preventDefault();
        isAnimating.current = true;
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => (isAnimating.current = false), 800);
      } 
      else if (e.deltaY < 0 && activeIndex > 0) {
        if (e.cancelable) e.preventDefault();
        isAnimating.current = true;
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => (isAnimating.current = false), 800);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIndex, services.length]);

  if (loading)
    return <div className="py-20 text-center text-primary">Loading Services...</div>;

  return (
    <section className="py-20 bg-background min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-background shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Service
            </div>
            {/* Replaced [#0066b2] with primary variable */}
            <h2 className="text-4xl md:text-6xl font-bold text-primary leading-[1.1]">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Stacked Cards Container */}
        <div 
          ref={cardContainerRef}
          className="relative max-w-7xl mx-auto mt-20 h-[600px] md:h-[700px]"
        >
          {services.map((service, index) => {
            const isVisible = index >= activeIndex && index <= activeIndex + 2;
            if (!isVisible) return null;

            const position = index - activeIndex; 
            const zIndex = position === 0 ? "z-30" : position === 1 ? "z-20" : "z-10";
            const topOffset = position === 0 ? "top-0" : position === 1 ? "-top-7" : "-top-14";
            const scale = position === 0 ? "scale-100" : position === 1 ? "scale-[0.94]" : "scale-[0.88]";
            const isExiting = index < activeIndex;

            // Logic to handle different card colors using your variables
            const cardBg = position === 0 
              ? "bg-gradient-to-b from-gradient-base to-background" 
              : position === 1 
                ? "bg-accent" 
                : "bg-secondary";

            return (
              <div
                key={service._id}
                className={`absolute left-1/2 -translate-x-1/2 w-full transition-all duration-700 ease-in-out ${zIndex} ${topOffset} ${scale} 
                ${isExiting ? "opacity-0 -translate-y-20 scale-95" : "opacity-100"}`}
              >
                <div className={`
                  ${cardBg} 
                  rounded-[40px] md:rounded-[60px] shadow-md border border-white/50 overflow-hidden
                `}>
                  
                  <div className={`p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 transition-opacity duration-500 ${position === 0 ? "opacity-100" : "opacity-0 h-[500px]"}`}>
                    
                    <div className="w-full lg:w-1/2">
                      <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{service.title}</h3>
                      <p className="text-gray-600 text-lg mb-8">{service.description}</p>
                      <div className="space-y-4 mb-10">
                        <h4 className="font-bold text-foreground text-lg">Key Features:</h4>
                        <ul className="space-y-3">
                          {service.features?.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                              <span className="text-sm md:text-base font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Replaced [#0070c0] with primary variable */}
                      <button className="inline-flex items-center gap-3 bg-primary text-white pl-8 pr-2 py-2 rounded-full font-semibold hover:opacity-90 transition shadow-lg group">
                        Explore Services
                        <span className="bg-white text-primary rounded-full p-2 transition-transform group-hover:rotate-45">
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </button>
                    </div>

                    <div className="w-full lg:w-1/2">
                      <div className="relative rounded-[40px] overflow-hidden shadow-xl border-4 border-white/30">
                        <img src={service.image} alt={service.title} className="w-full h-[350px] md:h-[500px] object-cover" />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;