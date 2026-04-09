"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
        const data = await res.json();
        const list = data.testimonials || [];
        setTestimonials(list);
        if (list.length > 0) {
          // শুরুর দিকে মাঝখানের আইটেমটি ফোকাসে রাখার জন্য
          setCurrentIndex(Math.floor(list.length / 2));
        }
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };

    fetchTestimonials();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!isMounted || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white rounded-full shadow-sm gap-2">
              <img src="/Frame.svg" alt="icon" className="w-5 h-5" />
              <span style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', fontWeight: '500' }}>Testimonials</span>
            </div>
            <h2
              style={{
                color: '#0168B4',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)', // রেসপনসিভ ফন্ট
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%',
                textTransform: 'capitalize'
              }}
            >
              What Our Clients Say <br /> About Us!
            </h2>
          </div>
          <div className="md:max-w-lg pt-4 md:pt-14 text-left">
            <p className="text-[#616161] text-base leading-[1.5]">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Testimonial Slider Wrapper */}
        <div
          className="relative h-[750px] md:container md:mx-auto flex items-center justify-center"
        >
          <div className="flex items-center justify-center w-full relative">
            {testimonials.map((item, index) => {
              const isCenter = index === currentIndex;
              const isLeft = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              const isRight = index === (currentIndex + 1) % testimonials.length;

              // Visibility Logic
              if (!isCenter && !isLeft && !isRight) return null;

              return (
                <div
                  key={item._id}
                  className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center ${isCenter
                      ? "z-30 w-[90%] md:w-full md:max-w-5xl opacity-100 scale-100"
                      : "z-10 w-[70%] md:w-[80%] md:max-w-4xl opacity-100 scale-90 "
                    }`}
                  style={{
                    transform: isLeft
                      ? "translateX(-110%)"
                      : isRight
                        ? "translateX(110%)"
                        : "translateX(0)",
                  }}
                >
                  {/* Image/Video Card */}
                  <div
                    className="group relative w-full aspect-video md:h-[520px] bg-white rounded-[40px] p-0 overflow-hidden shadow-xl border border-white"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <img
                      src={item.thumbnail || item.avatar}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-[40px]"
                    />

                    {/* Play Button on Hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setActiveVideo(item.videoUrl)}
                        className="bg-white/20 backdrop-blur-md p-6 rounded-full hover:bg-[#0168B4] hover:text-white transition-all transform scale-90 group-hover:scale-100"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Quote and User Details (Only for center card) */}
                  <div className={`mt-10 text-start transition-opacity duration-500 ${isCenter ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex justify-start mb-6">
                      <img src="/qoute.png" alt="quote" className="w-[60px] md:w-[83px] object-contain" />
                    </div>
                    <p className="text-[#262626] text-xl md:text-[32px] font-medium leading-[1.2] mb-8 max-w-[800px]">
                      "{item.quote}"
                    </p>
                    <div className="flex flex-col items-start gap-2">
                      <h4 className="text-[#0168B4] text-lg md:text-[24px] font-medium">{item.name}</h4>
                      <p className="text-[#7B7B7B] text-sm md:text-base">{item.role || item.company || "Audio Producer, RPG Studio"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Updated Navigation Bar */}
        {/* <div className="mx-auto max-w-5xl flex items-center justify-between shadow-sm border border-gray-100 mt-10 px-6 py-4 bg-white rounded-full">
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#0168B4] rounded-full text-white hover:bg-[#015FA4] transition-all active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#0168B4] rounded-full text-white hover:bg-[#015FA4] transition-all active:scale-95"
            >
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-around items-center px-10">
            {testimonials.slice(0, 3).map((item, i) => (
              <div key={i} className="text-center px-4 border-r last:border-0 border-gray-100 flex-1">
                <h5 className="text-[#015FA4] text-xl font-medium truncate">{item.name}</h5>
                <p className="text-[#7B7B7B] text-sm truncate">{item.company || "Client"}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-4xl aspect-video">
            <button onClick={() => setActiveVideo(null)} className="absolute -top-14 right-0 p-3 text-white">
              <X className="w-10 h-10" />
            </button>
            <div className="w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl">
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