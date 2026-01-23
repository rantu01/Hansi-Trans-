"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, X } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const marqueeRef = useRef(null);

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
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }
    };

    fetchTestimonials();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // অটো-প্লে লজিক (Marquee Effect)
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 1500); // ৪ সেকেন্ড পর পর স্লাইড হবে
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length, currentIndex]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const nextSlide = () => {
    const maxIndex = testimonials.length - (isMobile ? 1 : 2);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = testimonials.length - (isMobile ? 1 : 2);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (!isMounted || testimonials.length === 0) return null;

  // স্লাইড ভ্যালু: প্রতিটি স্লাইড কার্ডের সাইজ অনুযায়ী (১০০% মোবাইলে, ৫০% ডেসকটপে)
  const translateValue = isMobile ? currentIndex * 100 : currentIndex * 50;

  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4 container">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '180px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#FFF',
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040', // var(--dark-5)
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                Testimonials
              </span>
            </div>
            <h2
              className="capitalize"
              style={{
                color: '#0168B4', // Primary-blue-500
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)', // Responsive scaling with 48px max
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%', // 57.6px
                textTransform: 'capitalize'
              }}
            >
              What Our Clients Say <br /> About Us!
            </h2>
          </div>
          <div className="md:max-w-lg pt-4 md:pt-14 text-left">
            <p
              style={{
                color: '#616161', // paragraph-color-900
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%' // 24px
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Slider - Wrapper constrained to container */}
        <div
          className="relative mb-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-200 ease-in-out"
            style={{
              transform: `translateX(-${translateValue}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="w-full md:w-1/2 flex-shrink-0 px-2" // ২টা কার্ড ঠিকমতো দেখানোর জন্য width 1/2
              >
                <div className="group relative bg-white rounded-[40px] p-4 border border-gray-50 flex flex-col h-[450px] md:h-[534px] md:w[636px] transition-all duration-300">
                  <div className="relative flex-grow overflow-hidden rounded-[35px] mb-6">
                    {/* Quote Text */}
                    <div className="absolute inset-0 bg-[#F7F7F7] p-6 md:p-10 flex flex-col justify-center items-start transition-opacity duration-500 group-hover:opacity-0 z-10">
                      {/* Custom Quote Image Icon */}
                      <img
                        src="/qoute.png"
                        alt="quote-icon"
                        className="mb-6 flex-shrink-0 object-contain"
                        style={{
                          width: '83px',        // Exact width spec
                          height: '64px',       // Exact height spec
                          aspectRatio: '83/64', // Maintain aspect ratio
                        }}
                      />

                      <p
                        className="capitalize"
                        style={{
                          color: '#262626', // dark-800
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '32px',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: '120%', // 38.4px
                          textTransform: 'capitalize',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: '3', // Beshi boro quote hole 3 line por ellipsis hobe
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.quote}
                      </p>
                    </div>

                    {/* Image/Video Overlay */}
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
                  <div
                    className="shrink-0 text-left"
                    style={{
                      display: 'flex',
                      padding: '16px 32px', // Exact padding
                      alignItems: 'center',
                      gap: '24px', // Exact gap
                      alignSelf: 'stretch',
                      borderRadius: '100px', // Full rounded pill shape
                      background: '#FFFFFF', // White Shade 900
                      marginTop: 'auto' // Card-er niche thakar jonno
                    }}
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#F7F7F7] shadow-sm"
                    />
                    <div>
                      <h4
                        className="capitalize"
                        style={{
                          color: '#262626', // dark-800
                          fontFamily: 'var(--font-poppins), sans-serif', // Updated to Poppins
                          fontSize: '18px',
                          fontStyle: 'normal',
                          fontWeight: '500', // Medium
                          lineHeight: '150%', // 27px
                          textTransform: 'capitalize'
                        }}
                      >
                        {item.name}
                      </h4>
                      <p
                        style={{
                          color: '#616161',
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '150%'
                        }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Navigation Bar */}
        <div className="mx-auto flex items-center shadow-md border border-gray-100 mt-10 px-[16px] py-[32px] md:px-8 bg-white rounded-full">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                width: '80px',
                height: '80px',
                aspectRatio: '1/1',
                backgroundColor: '#0168B4', // Primary-blue-500
                borderRadius: '50%', // Rounded-full
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft
                style={{
                  width: '32px',
                  height: '32px',
                  color: '#FFFFFF' // Arrow color white for contrast on blue
                }}
              />
            </button>
            <button
              onClick={prevSlide}
              className="flex items-center justify-center transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                width: '80px',
                height: '80px',
                aspectRatio: '1/1',
                backgroundColor: '#0168B4', // Primary-blue-500
                borderRadius: '50%', // Rounded-full
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ArrowRight
                style={{
                  width: '32px',
                  height: '32px',
                  color: '#FFFFFF' // Arrow color white for contrast on blue
                }}
              />
            </button>
          </div>

          {/* Active Client Info - Displaying 3 names, highlighting the leftmost one in view */}
          <div className="hidden md:flex flex-grow justify-around items-center">
            {testimonials.slice(0, 3).map((nav, i) => {
              // currentIndex বাম পাশের কার্ডটিকে রিপ্রেজেন্ট করে, তাই সেটিই একটিভ
              const isActive = i === currentIndex % 3;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center border-r last:border-0 border-gray-100 px-10 transition-all duration-500 ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-90"
                    }`}
                >
                  <h5
                    className="capitalize mb-1"
                    style={{
                      color: '#015FA4', // Primary-blue-600
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '28px', // Updated from 20px to 28px
                      fontStyle: 'normal',
                      fontWeight: '500', // Medium
                      lineHeight: '120%', // 33.6px
                      textTransform: 'capitalize'
                    }}
                  >
                    {nav.name}
                  </h5>
                  <p
                    style={{
                      color: '#7B7B7B', // paragraph-color-900
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px', // Updated to 16px
                      fontStyle: 'normal',
                      fontWeight: '400', // Regular
                      lineHeight: '150%' // 24px
                    }}
                  >
                    {nav.company || "Client"}
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