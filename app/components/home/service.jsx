"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { API } from "@/app/config/api";

const StackedCards = ({ services }) => {
  const containerRef = useRef(null);
  
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
                <Sparkles className="w-4 h-4 text-blue-400" />
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

          {/* Cards Container */}
          <div className="relative max-w-7xl mx-auto h-[500px] md:h-[550px]">
            {services.map((service, index) => {
              const start = index / services.length;
              const end = (index + 1) / services.length;
              
              // কার্ডগুলো দ্রুত আসার জন্য y পজিশন
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(smoothProgress, [start, end], [index === 0 ? 0 : 500, 0]);
              
              // স্কেলিং ইফেক্ট যাতে নিচের কার্ডগুলো স্তরে স্তরে দেখা যায়
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const scale = useTransform(smoothProgress, [start, end], [1 - (services.length - index) * 0.02, 1]);

              // ইমেজ অনুযায়ী কালার লজিক (F7F7F7, CCE7FB, A9DAFF)
              const colors = ["bg-[#CCE7FB]", "bg-[#A9DAFF]", "bg-[#E3F2FD]"];
              const cardBg = colors[index % colors.length];

              return (
                <motion.div
                  key={service._id}
                  style={{ 
                    y: index === 0 ? 0 : y,
                    scale,
                    zIndex: index + 10,
                    // ডাইনামিক টপ যাতে স্ট্যাকিংটা ইমেজের মতো বোঝা যায়
                    top: index * 12, 
                  }}
                  className="absolute inset-0 w-full"
                >
                  <div className={`${cardBg} rounded-[50px] md:rounded-[70px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden h-full`}>
                    <div className="p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10 h-full">
                      
                      {/* Left Side: Content */}
                      <div className="w-full lg:w-1/2">
                        <h3 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{service.title}</h3>
                        <p className="text-[#616161] text-lg mb-8 leading-snug">{service.description}</p>
                        
                        <div className="space-y-4 mb-10">
                          <h4 className="font-bold text-gray-900 text-lg">Key Features:</h4>
                          <ul className="space-y-2">
                            {service.features?.slice(0, 4).map((f, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-gray-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                <span className="text-sm md:text-base font-medium">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="inline-flex items-center gap-3 bg-[#0070c0] text-white pl-8 pr-2 py-2.5 rounded-full font-semibold hover:bg-[#005fa3] transition-all shadow-lg group">
                          Explore Services
                          <span className="bg-white text-[#0070c0] rounded-full p-2 transition-transform group-hover:rotate-45">
                            <ArrowUpRight className="w-5 h-5" />
                          </span>
                        </button>
                      </div>

                      {/* Right Side: Image (Rounded Like Example) */}
                      <div className="w-full lg:w-1/2 h-full">
                        <div className="relative rounded-[40px] md:rounded-[55px] overflow-hidden shadow-2xl border-[6px] border-white/20 h-full">
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <div className="text-xl font-bold text-blue-600 animate-pulse">Loading Services...</div>
      </div>
    );
  }

  return (
    <section className="bg-[#F7F7F7]">
      <StackedCards services={services} />
    </section>
  );
};

export default Service;