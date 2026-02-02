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
    <section className="relative w-full h-[450px] md:h-[600px] overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Floating Service Pills - Using same logic as Hero */}
        <div className="absolute inset-0 pointer-events-none">
          {services.map((service, index) => {
            // Matching the positions used in your HansiTrans hero section
            const positions = [
              "top-[15%] left-[0%]",
              "top-[35%] left-[20%]",
              "top-[15%] right-[0%]",
              "top-[35%] right-[20%]",
              "bottom-[35%] left-1/2 -translate-x-1/2",
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
                  className="flex transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
                  style={{
                    width: "auto",
                    height: "61px",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "38px",
                    background: "#0A0A0A",
                    backdropFilter: "blur(186.9px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      lineHeight: "160%",
                      letterSpacing: "0.16px",
                      color: "#FFF",
                    }}
                  >
                    {service.title}
                  </span>
                  <span className="bg-gray-800 p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                    <Layers size={16} className="text-white" />
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