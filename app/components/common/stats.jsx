"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup"; // প্যাকেজ ১
import { useInView } from "react-intersection-observer"; // প্যাকেজ ২
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // স্ক্রিনে আসলে এনিমেশন শুরু করার জন্য রেফ
  const { ref, inView } = useInView({
    triggerOnce: true, // একবার স্ক্রিনে আসলে এনিমেশন হবে, বারবার হবে না
    threshold: 0.2,    // ২০% সেকশন দেখা গেলে শুরু হবে
  });

  const iconMap = {
    FaUser: <FaUser />,
    FaStar: <FaStar />,
    FaGlobe: <FaGlobe />,
    FaBriefcase: <FaBriefcase />,
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API.Stats);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || stats.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mb-20" ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[80px] overflow-hidden shadow-sm bg-gradient-to-b from-[#abdbfe] to-white border border-blue-100">
        {stats.map((stat, index) => {
          // ভ্যালু থেকে যদি কোনো চিহ্ন থাকে (+ বা %) সেটা আলাদা করার জন্য
          const numericValue = parseInt(stat.value.replace(/\D/g, "")) || 0;
          const suffix = stat.value.replace(/[0-9]/g, "");

          return (
            <div
              key={index}
              className="p-8 flex flex-col items-center text-center hover:bg-blue-100/50 transition duration-300"
            >
              {/* আইকন রেন্ডারিং */}
              <div className="text-3xl mb-4 text-[#0066b2]">
                {iconMap[stat.icon] || stat.icon}
              </div>

              {/* কাউন্টার আপ এনিমেশন */}
              <h3 className="text-3xl font-extrabold text-gray-800">
                {inView ? (
                  <CountUp 
                    end={numericValue} 
                    duration={2.5} 
                    suffix={suffix} 
                  />
                ) : (
                  "0"
                )}
              </h3>

              <p className="text-gray-500 text-sm font-medium mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;