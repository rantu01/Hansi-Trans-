"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  
  // কার্ড কন্টেইনারের জন্য আলাদা রেফারেন্স
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
      // কার্ড কন্টেইনার না থাকলে বা সার্ভিস না থাকলে রিটার্ন
      if (!cardContainerRef.current || services.length === 0) return;

      // মাউস কি শুধুমাত্র কার্ড কন্টেইনারের ওপরে আছে?
      const rect = cardContainerRef.current.getBoundingClientRect();
      const isMouseOverCards = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      // মাউস কার্ডের ওপরে না থাকলে স্বাভাবিক স্ক্রল হতে দাও
      if (!isMouseOverCards) return;

      if (isAnimating.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // নিচের দিকে স্ক্রল (Next Card)
      if (e.deltaY > 0 && activeIndex < services.length - 1) {
        if (e.cancelable) e.preventDefault();
        isAnimating.current = true;
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => (isAnimating.current = false), 800);
      } 
      // উপরের দিকে স্ক্রল (Previous Card)
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
    return <div className="py-20 text-center">Loading Services...</div>;

  return (
    <section className="py-20 bg-white min-h-screen overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section - এখানে মাউস থাকলে এখন নরমাল স্ক্রল হবে */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Service
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0066b2] leading-[1.1]">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Stacked Cards Container - শুধুমাত্র এই এরিয়াতে মাউস থাকলে স্ক্রল লক হবে */}
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

            return (
              <div
                key={service._id}
                className={`absolute left-1/2 -translate-x-1/2 w-full transition-all duration-700 ease-in-out ${zIndex} ${topOffset} ${scale} 
                ${isExiting ? "opacity-0 -translate-y-20 scale-95" : "opacity-100"}`}
              >
                <div className={`
                  ${position === 0 ? "bg-gradient-to-b from-[#abdbff] to-white" : position === 1 ? "bg-[#91c9f0]" : "bg-[#6db3e6]"} 
                  rounded-[40px] md:rounded-[60px] shadow-md border border-white/50 overflow-hidden
                `}>
                  
                  <div className={`p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 transition-opacity duration-500 ${position === 0 ? "opacity-100" : "opacity-0 h-[500px]"}`}>
                    
                    <div className="w-full lg:w-1/2">
                      <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">{service.title}</h3>
                      <p className="text-gray-600 text-lg mb-8">{service.description}</p>
                      <div className="space-y-4 mb-10">
                        <h4 className="font-bold text-gray-900 text-lg">Key Features:</h4>
                        <ul className="space-y-3">
                          {service.features?.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                              <span className="text-sm md:text-base font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="inline-flex items-center gap-3 bg-[#0070c0] text-white pl-8 pr-2 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg group">
                        Explore Services
                        <span className="bg-white text-[#0070c0] rounded-full p-2 transition-transform group-hover:rotate-45">
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