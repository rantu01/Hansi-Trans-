"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";
import { useRouter } from "next/navigation";

const CaseStudies2 = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(API.featuredCaseStudies, { cache: "no-store" });
        const data = await response.json();
        const caseData = Array.isArray(data.data) ? data.data : [];
        setSlides(caseData);
        if (caseData.length > 0) {
          setCurrentIndex(Math.floor(caseData.length / 2));
        }
      } catch (error) {
        console.error("Error fetching case studies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    if (slides.length === 0 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const router = useRouter();

  const handleViewCaseStudy = (slug) => {
    if (slug) router.push(`/case-studies/${slug}`);
  };

  if (loading) return (
    <div className="py-20 text-center text-primary font-medium animate-pulse">
      Loading Case Studies...
    </div>
  );

  if (slides.length === 0) return null;

  return (
    <section className="overflow-hidden relative mt-[-200px] z-1 pt-40">

      {/* Header Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center justify-center mb-6"
            style={{
              display: 'flex',
              height: '50px',
              width: '200px',
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
              Case studies
            </span>
          </div>
          <h2
            className="capitalize"
            style={{
              color: '#0168B4',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: '500',
              lineHeight: '120%'
            }}
          >
            Featured Case Studies
          </h2>
        </div>

        <div className="md:max-w-lg pt-4 md:pt-14 text-left">
          <p
            style={{
              color: '#616161',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: '500',
              lineHeight: '160%',
              letterSpacing: '0.128px'
            }}
          >
            See how HS+ helps games, anime, and tech brands go global through
            localization, voice-over, and creator-led marketing.
          </p>
        </div>
      </div>
      <div
        className="relative w-full flex justify-center items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex justify-center items-start w-full overflow-hidden relative gap-4 md:gap-6 px-4 min-h-[750px]">
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
                key={slide._id || index}
                className={`relative group transition-all duration-700 ease-in-out ${transformClass} flex flex-col`}
                style={{
                  width: isCenter ? "85%" : isLeft || isRight ? "15%" : "0%",
                  marginLeft: isLeft ? "-12%" : undefined,
                  marginRight: isRight ? "-12%" : undefined,
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[40px] h-[300px] md:h-[590px] lg:h-[600px] shadow-2xl shadow-primary/10">
                  <img
                    src={slide.image}
                    alt={slide.title || "Case Study"}
                    className="w-full h-full object-cover cursor-pointer"
                    onError={(e) => { e.currentTarget.src = "/fallback-case.png"; }}
                    onClick={() => handleViewCaseStudy(slide.slug)}
                    role="button"
                    tabIndex={0}
                  />
                  {/* Image Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none group-hover:bg-black/5 transition-colors duration-500"></div>
                  )}
                </div>

                {/* --- INFO BOX (Downwards transition outside image) --- */}
                {isCenter && (
                  <div className="w-full pt-6 opacity-0 translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                          {slide.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-start md:self-center">
                        <div className="inline-flex items-center gap-2 bg-[#0070f3] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30">
                          <img
                            src="/Frame.svg"
                            alt="icon"
                            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                          />
                          <span>{slide.tag || "Accent-Matched Voice-Over"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-100 ${idx === currentIndex
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

export default CaseStudies2;