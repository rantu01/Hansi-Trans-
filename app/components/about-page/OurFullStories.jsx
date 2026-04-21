"use client";

import React, { useEffect, useState, useRef } from "react";
import { API } from "@/app/config/api";

function ImageScroller({ images = [], direction = -1, speed = 40, onOpen = () => {} }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const lastTimeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!innerRef.current) return;
    const inner = innerRef.current;
    let width = inner.scrollWidth / 2 || 0;

    // initialize position so rightward scrollers start from the duplicated half
    posRef.current = direction > 0 ? -width : 0;
    inner.style.transform = `translateX(${posRef.current}px)`;

    function step(t) {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const delta = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      if (!isPaused) {
        posRef.current += direction * speed * delta;
        if (direction < 0 && Math.abs(posRef.current) >= width) {
          posRef.current += width;
        }
        if (direction > 0 && posRef.current >= width) {
          posRef.current -= width;
        }
        inner.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    const handleResize = () => {
      width = inner.scrollWidth / 2 || 0;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, direction, speed, isPaused]);

  if (!images || images.length === 0) return null;

  const items = [...images, ...images];

  return (
    <div className="overflow-hidden rounded-[40px]">
      <div
        ref={containerRef}
        className="w-full h-[220px] md:h-[350px]"
      >
        <div
          ref={innerRef}
          className="flex items-center space-x-6"
          style={{ willChange: 'transform' }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="min-w-[220px] md:min-w-[420px] h-[220px] md:h-[350px] overflow-hidden rounded-[30px] bg-white flex-shrink-0"
            >
              <img
                src={src}
                alt={`story-${i}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => onOpen(src)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const OurFullStories = () => {
  const [gallery, setGallery] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setGallery(data?.gallery || null);
      } catch (err) {
        console.error("Failed to fetch gallery data", err);
      }
    };

    fetchGallery();
  }, []);

  const images = gallery?.images || [];

  return (
    <section className="bg-background py-20 px-6 md:px-12 font-sans text-foreground">
      <div className="container mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            {/* Replaced gray-100 with a subtle version of primary blue for the badge */}
            <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '120px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#fff',
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
                {gallery?.badge || "Gallery"}
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500', // Medium
                fontStyle: 'normal',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0A0A0A'
              }}
            >
              {gallery?.title || "Our Full Stories"}
            </h2>
          </div>

          <div className="max-w-lg">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400', // Regular
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#616161',
              }}
            >
              {gallery?.description || "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
            </p>
          </div>
        </div>

        {/* Animated Gallery Rows: top -> moves left, bottom -> moves right */}
        <div className="space-y-6">
          {/* Top row: images[0..2] sliding from right to left */}
          <ImageScroller
            images={images.slice(0, 3)}
            direction={-1} /* -1: leftwards */
            speed={40}
            onOpen={(src) => setModalImage(src)}
          />

          {/* Bottom row: images[3..5] sliding from left to right */}
          <ImageScroller
            images={images.slice(3, 6)}
            direction={1} /* 1: rightwards */
            speed={40}
            onOpen={(src) => setModalImage(src)}
          />
        </div>
        {/* Modal for enlarged image */}
        {modalImage && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80">
            <div className="relative w-full max-w-5xl">
              <button
                onClick={() => setModalImage(null)}
                className="absolute -top-10 right-0 text-white p-2"
              >
                ✕
              </button>
              <div className="w-full h-auto rounded-md overflow-hidden shadow-2xl">
                <img src={modalImage} alt="Enlarged" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurFullStories;