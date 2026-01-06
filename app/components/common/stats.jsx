"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
      {/* Updated gradient to use brand variables: from gradient-base/30 to background */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[80px] overflow-hidden shadow-xl shadow-primary/5 bg-gradient-to-b from-gradient-base to-background border border-primary/10">
        {stats.map((stat, index) => {
          const numericValue = parseInt(stat.value.replace(/\D/g, "")) || 0;
          const suffix = stat.value.replace(/[0-9]/g, "");

          return (
            <div
              key={index}
              /* Replaced blue-100 with primary/10 */
              className="p-8 flex flex-col items-center text-center hover:bg-primary/5 transition duration-300"
            >
              {/* Replaced [#0066b2] with primary */}
              <div className="text-3xl mb-4 text-primary">
                {iconMap[stat.icon] || stat.icon}
              </div>

              {/* Counter Color using foreground (text-black/white) */}
              <h3 className="text-3xl font-extrabold text-foreground">
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

              <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;