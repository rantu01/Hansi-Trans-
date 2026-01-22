"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, X } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
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

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const nextSlide = useCallback(() => {
    const maxIndex = isMobile ? testimonials.length - 1 : Math.max(0, testimonials.length - 2);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [isMobile, testimonials.length]);

  const prevSlide = useCallback(() => {
    const maxIndex = isMobile ? testimonials.length - 1 : Math.max(0, testimonials.length - 2);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [isMobile, testimonials.length]);

  if (!isMounted || testimonials.length === 0) return null;

  // স্লাইডার গ্যাপ এবং উইডথ ক্যালকুলেশন ফিক্স
  const translateValue = isMobile 
    ? currentIndex * 100 
    : currentIndex * 50;

  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 mb-6 bg-white shadow-sm"
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.16px'
              }}
            >
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Testimonials
            </div>

            <h2
              className="capitalize"
              style={{
                color: '#0168B4',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '500',
                lineHeight: '120%',
              }}
            >
              What Our Clients Say <br /> About Us!
            </h2>
          </div>

          <div className="md:max-w-xs pt-4 md:pt-14 text-left">
            <p
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Slider */}
        <div className="relative overflow-visible mb-12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${translateValue}%)`,
              gap: isMobile ? '0px' : '32px' 
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="group relative w-full md:w-[calc(50%-16px)] flex-shrink-0 bg-white rounded-[40px] p-4 border border-gray-50 flex flex-col h-[450px] md:h-[550px]"
              >
                <div className="relative flex-grow overflow-hidden rounded-[35px] mb-6">
                  {/* Quote Text State */}
                  <div className="absolute inset-0 bg-[#F7F7F7] p-6 md:p-10 flex flex-col justify-center items-start transition-opacity duration-500 group-hover:opacity-0 z-10">
                    <Quote className="w-10 h-10 md:w-12 md:h-12 text-[#0168B4] opacity-20 mb-6" />
                    <p
                      style={{
                        color: '#0A0A0A',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(20px, 3vw, 32px)',
                        fontWeight: '500',
                        lineHeight: '1.2'
                      }}
                    >
                      {item.quote}
                    </p>
                  </div>

                  {/* Image/Video State */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <img src={item.thumbnail || item.avatar} alt="Client" className="w-full h-full object-cover rounded-[35px]" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button
                        onClick={() => item.type === "video" && setActiveVideo(item.videoUrl)}
                        className="bg-[#0168B4] text-white p-6 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                      >
                        <Play className="w-8 h-8 fill-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 px-6 pb-4 shrink-0">
                  <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" />
                  <div className="text-left">
                    <h4 style={{ color: '#262626', fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '500' }}>
                      {item.name}
                    </h4>
                    <p style={{ color: '#616161', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '400' }}>
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Bar */}
        <div
          className="max-w-6xl mx-auto flex items-center shadow-sm border border-gray-100 mt-10"
          style={{
            padding: '16px 24px',
            borderRadius: '100px',
            background: '#FFFFFF'
          }}
        >
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              className="p-3 md:p-4 bg-[#F7F7F7] text-[#0A0A0A] hover:bg-[#0168B4] hover:text-white rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 md:p-4 bg-[#F7F7F7] text-[#0A0A0A] hover:bg-[#0168B4] hover:text-white rounded-full transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex flex-grow justify-around items-center overflow-hidden">
            {bottomNav.map((nav, i) => {
               const isActive = i >= currentIndex && i < currentIndex + 2;
               return (
                <div
                  key={i}
                  className={`flex flex-col items-center border-r last:border-0 border-gray-100 px-8 transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-90"}`}
                >
                  <h5 style={{ color: '#015FA4', fontFamily: 'Inter, sans-serif', fontSize: '24px', fontWeight: '500' }}>
                    {nav.name}
                  </h5>
                  <p style={{ color: '#7B7B7B', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>
                    {nav.company}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video">
            <button 
              onClick={() => setActiveVideo(null)} 
              className="absolute -top-14 right-0 p-3 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <iframe 
                src={getEmbedUrl(activeVideo)} 
                className="w-full h-full" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;