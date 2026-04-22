"use client";
import React, { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import axios from "axios";
import { API } from "@/app/config/api";
import { motion } from "framer-motion";

const ServiceHero = () => {
  const [services, setServices] = useState([]);

  // Animation variant from your HansiTrans code
  const dropIn = {
    hidden: { y: -100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
          const mainServicesOnly = response.data.data.filter(
            (service) => !service.parentService
          );
          setServices(mainServicesOnly.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching services for hero:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="relative w-full h-[300px] sm:h-[360px] md:h-[600px] overflow-hidden flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Floating Service Pills - Using same logic as Hero */}
        <div className="absolute inset-0 pointer-events-none mt-12 md:mt-0">
          {services.map((service, index) => {
            // Matching the positions used in your HansiTrans hero section
            const positions = [
              "top-[8%] left-4 md:top-[15%] md:left-[0%]",
              "top-[30%] left-4 md:top-[35%] md:left-[20%]",
              "top-[8%] right-4 md:top-[15%] md:right-[0%]",
              "top-[30%] right-4 md:top-[35%] md:right-[20%]",
              "bottom-[18%] left-1/2 -translate-x-1/2 md:bottom-[35%]",
            ];

            return (
              <motion.div
                key={service._id || index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={dropIn}
                className={`absolute ${positions[index % positions.length]} pointer-events-auto`}
              >
                <button
                  className="flex transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 h-10 sm:h-12 md:h-[61px] px-3 sm:px-4 md:px-6 items-center gap-2 md:gap-3 rounded-[38px] bg-[#0A0A0A] border border-white/10 text-white"
                  style={{ backdropFilter: "blur(186.9px)" }}
                >
                  <span className="text-xs sm:text-sm md:text-base font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {service.title}
                  </span>
                  <span className="bg-gray-800 p-1 rounded-full flex items-center justify-center flex-shrink-0 md:p-1.5">
                    <Layers size={16} className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Central Subtle Glow */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0168B4]/10 blur-[100px] rounded-full pointer-events-none"></div> */}
      </div>
    </section>
  );
};

export default ServiceHero;