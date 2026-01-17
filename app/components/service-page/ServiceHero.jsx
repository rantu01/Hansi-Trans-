"use client";
import React, { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import axios from "axios";
import { API } from "@/app/config/api";

const ServiceHero = () => {
  const [services, setServices] = useState([]);

  const positions = [
    "top-12 left-[0%]",
    "top-28 left-[15%]",
    "top-48 left-1/2 -translate-x-1/2",
    "top-28 right-[15%]",
    "top-12 right-[0%]",
  ];

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
    <section className="relative w-full h-[400px] md:h-[300px] overflow-hidden flex items-center justify-center">
      {/* Subtle background texture or overlay could go here */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Floating Service Pills */}
        {services.map((service, index) => (
          <div
            key={service._id}
            className={`absolute ${
              positions[index % positions.length]
            } flex items-center gap-3 bg-secondary text-white px-6 py-4 rounded-full shadow-xl shadow-secondary/20 transition-all hover:scale-105 hover:bg-primary cursor-default group z-10 whitespace-nowrap border border-white/10`}
          >
            <span className="text-sm md:text-base font-semibold tracking-wide uppercase">
              {service.title}
            </span>
            <Layers
              size={18}
              className="text-cta-text opacity-80 group-hover:rotate-12 group-hover:scale-110 transition-transform"
            />
          </div>
        ))}

        {/* Central Subtle Glow - Uses Brand Gradient Color */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-base/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </section>
  );
};

export default ServiceHero;