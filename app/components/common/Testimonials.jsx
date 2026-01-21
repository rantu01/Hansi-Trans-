"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, Sparkles, X } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // ভিডিও মোডাল এর জন্য স্টেট
  const [activeVideo, setActiveVideo] = useState(null);

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

  // ইউটিউব ইউআরএল থেকে এম্বেড লিংক বের করার ফাংশন
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

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
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Testimonials
            </div>
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

        {/* Testimonial Cards Slider */}
        <div className="overflow-hidden mb-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-8"
            style={{ transform: `translateX(-${translateValue}%)` }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="group relative w-full md:w-[calc(50%-16px)] flex-shrink-0 bg-background rounded-[40px] p-4 shadow-2xl shadow-primary/10 border border-gray-50 flex flex-col h-[450px] md:h-[550px] transition-all duration-300"
              >
                {/* Content Container */}
                <div className="relative flex-grow overflow-hidden rounded-[35px] mb-6">
                  
                  {/* Default State: Quotation Text */}
                  <div className="absolute inset-0 bg-gray-50/50 p-10 flex flex-col justify-center items-start transition-opacity duration-500 group-hover:opacity-0 z-10">
                    <Quote className="w-12 h-12 text-primary fill-primary opacity-20 mb-6" />
                    <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                      {item.quote}
                    </p>
                  </div>

                  {/* Hover State: Image & Play Button */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <img
                      src={item.thumbnail || item.avatar}
                      alt="Client Presentation"
                      className="w-full h-full object-cover rounded-[35px]"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button 
                        onClick={() => item.type === "video" && setActiveVideo(item.videoUrl)}
                        className="bg-primary text-white p-6 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300 active:scale-90"
                      >
                        <Play className="w-8 h-8 fill-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* User Info (Always Visible) */}
                <div className="flex items-center gap-4 px-6 pb-4 shrink-0">
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
              className="p-4 hover:bg-primary hover:text-white rounded-full hover:opacity-90 transition shadow-lg shadow-accent/20 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-4 hover:bg-primary hover:text-white rounded-full hover:opacity-90 transition shadow-lg shadow-accent/20 active:scale-95"
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

      {/* Video Modal Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video">
            {/* Close Button (Icon) */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 -right-2 md:-right-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
              aria-label="Close video"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            {/* iframe container */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={getEmbedUrl(activeVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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