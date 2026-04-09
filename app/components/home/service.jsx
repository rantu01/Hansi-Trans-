"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { API } from "@/app/config/api";
import Link from "next/link";

const StackedCards = ({ services }) => {
  const containerRef = useRef(null);

  // useScroll সবসময় টপ লেভেলে রাখতে হয়
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#F7F7F7]">
        <div className="container mx-auto px-4">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center justify-center mb-6"
                style={{
                  display: 'flex',
                  height: '50px',
                  width: '120px',
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
                  Service
                </span>
              </div>
              <h2
                className="capitalize"
                style={{
                  color: '#0168B4',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(36px, 5vw, 60px)',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '120%',
                  textAlign: 'left'
                }}
              >
                Our Best Valuable <br className="hidden md:block" /> Service For You
              </h2>
            </div>
            <div className="md:max-w-lg pt-4 md:pt-14">
              <p
                style={{
                  color: '#6B6B6B',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '150%',
                  textAlign: 'left'
                }}
              >
                Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
              </p>
            </div>
          </div>

          {/* Cards Container */}
          <div className="relative max-w-7xl mx-auto h-[500px] md:h-[550px]">
            {services.map((service, index) => {
              const start = index / services.length;
              const end = (index + 1) / services.length;

              const y = useTransform(smoothProgress, [start, end], [index === 0 ? 0 : 550, 0]);
              const scale = useTransform(smoothProgress, [start, end], [1.05, 0.9 + index * 0.02]);

              /* Dynamic Darkening Logic:
                 Joto index kom (mane joto niche thakbe), toto beshi deep hobe.
                 'brightnessAmount' calculate hobe index er upore base kore.
              */
              const darknessIntensity = 1 - (services.length - index) * 0.1;
              const finalDarkness = Math.max(darknessIntensity, 0.4); // 0.4 er niche jabe na jate ekdom kalo na hoye jay

              const cardBrightness = useTransform(
                smoothProgress,
                [end, end + 0.15],
                ["brightness(1)", `brightness(${finalDarkness})`]
              );

              return (
                <motion.div
                  key={service._id || index}
                  style={{
                    y: index === 0 ? 0 : y,
                    scale: index === 0 ? 0.9 : scale,
                    filter: cardBrightness, // Card sore gele dhire dhire deep hobe
                    zIndex: index + 10,
                    top: index * 15,
                  }}
                  className="absolute inset-0 w-full origin-top"
                >
                  <div
                    style={{
                      background: `linear-gradient(to bottom, #A9DAFF, #CCE7FB, #F7F7F7 )`,
                    }}
                    className="rounded-[50px] md:rounded-[70px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b border-white/40 overflow-hidden h-full"
                  >
                    <div className="p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10 h-full">
                      <div className="w-full lg:w-1/2">
                        <h3
                          className="mb-6 capitalize"
                          style={{
                            color: "#0A0A0A",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "48px",
                            fontWeight: "500",
                            lineHeight: "120%",
                          }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="mb-8"
                          style={{
                            color: "#616161",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "18px",
                            fontWeight: "500",
                            lineHeight: "150%",
                          }}
                        >
                          {service.description}
                        </p>
                        <div className="space-y-4 mb-10">
                          <h4
                            style={{
                              color: "#090E2F",
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                          >
                            Key Features:
                          </h4>
                          <ul className="space-y-2">
                            {service.features?.slice(0, 4).map((f, idx) => (
                              <li key={idx} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                <span
                                  style={{
                                    color: "#0A0A0A",
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "14px",
                                  }}
                                >
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          href="/services"
                          className="group inline-flex items-center justify-center transition-all duration-300 whitespace-nowrap rounded-[100px] flex-shrink-0"
                          style={{
                            height: '52px',
                            padding: '4px 4px 4px 12px',
                            gap: '8px',
                            background: '#0168B4',
                            // Text Typography
                            fontFamily: 'var(--font-poppins), sans-serif',
                            fontSize: '16px',
                            fontWeight: '500',
                            lineHeight: '160%',
                            letterSpacing: '0.16px',
                            color: '#FFF',
                            fontStyle: 'normal'
                          }}
                        >
                          Explore Services
                          <span
                            className="bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                            style={{
                              width: '42px',
                              height: '42px',
                              aspectRatio: '1/1',
                              padding: '8px',
                              borderRadius: '24px'
                            }}
                          >
                            <ArrowUpRight className="w-6 h-6 text-[#0168B4]" strokeWidth={2} />
                          </span>
                        </Link>
                      </div>
                      <div className="w-full lg:w-1/2 h-full">
                        <div className="relative rounded-[40px] md:rounded-[55px] overflow-hidden  h-full">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
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

  // Hydration এরর ফিক্স করার জন্য এটি সবচেয়ে গুরুত্বপূর্ণ অংশ
  if (!hasHydrated) {
    return <div className="min-h-screen bg-[#F7F7F7]" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <div className="text-xl font-bold text-blue-600 animate-pulse">Loading Services...</div>
      </div>
    );
  }

  return (
    <section className="bg-[#F7F7F7] mb-40">
      {services.length > 0 && <StackedCards services={services} />}
    </section>
  );
};

export default Service;