"use client";
import React, { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import axios from "axios";
import { API } from "@/app/config/api";

const ServiceHero = () => {
  const [services, setServices] = useState([]);

  // পজিশনগুলো আপনার দেওয়া কোড অনুযায়ী হুবহু রাখা হলো
  const positions = [
    "top-12 left-[6%]",
    "top-28 left-[22%]",
    "top-48 left-1/2 -translate-x-1/2",
    "top-28 right-[22%]",
    "top-12 right-[6%]",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
          // 🔹 ফ্রন্টএন্ড ফিল্টারিং: নিশ্চিত করা হচ্ছে শুধু মেইন সার্ভিস (যাদের parent নেই) আসবে
          const mainServicesOnly = response.data.data.filter(
            (service) => !service.parentService
          );
          
          // পজিশন অনুযায়ী প্রথম ৫টি সার্ভিস নেওয়া হলো
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
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative w-full h-full max-w-7xl mx-auto">
        {/* Floating Service Pills - ডিজাইন সম্পূর্ণ অপরিবর্তিত */}
        {services.map((service, index) => (
          <div
            key={service._id}
            className={`absolute ${
              positions[index % positions.length]
            } flex items-center gap-3 bg-black text-white px-6 py-4 rounded-full shadow-2xl transition-transform hover:scale-105 cursor-default group z-10 whitespace-nowrap`}
          >
            <span className="text-sm md:text-base font-medium tracking-wide">
              {service.title}
            </span>
            <Layers
              size={18}
              className="text-white opacity-80 group-hover:rotate-12 transition-transform"
            />
          </div>
        ))}

        {/* Central Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full"></div>
      </div>
    </section>
  );
};

export default ServiceHero;