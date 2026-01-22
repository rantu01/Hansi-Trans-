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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm">
                <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
                Service
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
            <div className="md:max-w-xs pt-4 md:pt-14">
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
              const scale = useTransform(smoothProgress, [start, end], [1.05, 0.9 + (index * 0.02)]);

              return (
                <motion.div
                  key={service._id || index}
                  style={{
                    y: index === 0 ? 0 : y,
                    scale: index === 0 ? 0.9 : scale,
                    zIndex: index + 10,
                    top: index * 15,
                  }}
                  className="absolute inset-0 w-full origin-top"
                >
                  <div
                    style={{
                      background: `linear-gradient(to bottom, #A9DAFF, #CCE7FB, #F7F7F7 )`
                    }}
                    className="rounded-[50px] md:rounded-[70px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden h-full"
                  >
                    <div className="p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10 h-full">
                      <div className="w-full lg:w-1/2">
                        <h3
                          className="mb-6 capitalize"
                          style={{
                            color: '#0A0A0A',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '48px',
                            fontWeight: '500',
                            lineHeight: '120%'
                          }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="mb-8"
                          style={{
                            color: '#616161',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '18px',
                            fontWeight: '500',
                            lineHeight: '150%'
                          }}
                        >
                          {service.description}
                        </p>
                        <div className="space-y-4 mb-10">
                          <h4 style={{ color: '#090E2F', fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '500' }}>Key Features:</h4>
                          <ul className="space-y-2">
                            {service.features?.slice(0, 4).map((f, idx) => (
                              <li key={idx} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                <span style={{ color: '#0A0A0A', fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link href="/services" className="inline-flex items-center gap-3 bg-[#0070c0] text-white pl-8 pr-2 py-2.5 rounded-full font-semibold hover:bg-[#005fa3] transition-all shadow-lg group">
                          Explore Services
                          <span className="bg-white text-[#0070c0] rounded-full p-2 transition-transform group-hover:rotate-45">
                            <ArrowUpRight className="w-5 h-5" />
                          </span>
                        </Link>
                      </div>
                      <div className="w-full lg:w-1/2 h-full">
                        <div className="relative rounded-[40px] md:rounded-[55px] overflow-hidden shadow-2xl border-[6px] border-white/20 h-full">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
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
    <section className="bg-[#F7F7F7]">
      {services.length > 0 && <StackedCards services={services} />}
    </section>
  );
};

export default Service;