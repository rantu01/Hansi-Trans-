"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import Stats from "../common/stats";
import { API } from "@/app/config/api";

const Achievement = () => {
  const [statsData, setStatsData] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping logic
  const iconMap = {
    FaUser: <FaUser />,
    FaStar: <FaStar />,
    FaGlobe: <FaGlobe />,
    FaBriefcase: <FaBriefcase />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetching for performance
        const [statsRes, partnersRes] = await Promise.all([
          fetch(`${API.Stats}?category=general`),
          fetch(API.Partners)
        ]);

        const statsJson = await statsRes.json();
        const partnersJson = await partnersRes.json();

        // Convert icon strings to React Components
        const formattedStats = statsJson.map((item) => ({
          ...item,
          icon: iconMap[item.icon] || item.icon,
        }));

        setStatsData(formattedStats);
        setPartners(partnersJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0066b2]">
            Our Big Achievement ✨
          </h2>
        </div>

        {/* Stats Section */}
        {!loading && statsData.length > 0 && <Stats stats={statsData} />}

        {/* Trusted By Section */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-semibold mb-10">
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {partners.length > 0 ? (
              partners.map((partner, i) => (
                <div
                  key={partner._id || i}
                  className="bg-white border px-6 py-3 rounded-full shadow-sm"
                >
                  <img
                    src={partner.logo} 
                    alt={partner.name || "Partner Logo"}
                    className="h-10 w-auto object-contain opacity-80"
                  />
                </div>
              ))
            ) : (
              // Empty state jodi backend e data na thake (loading chara)
              !loading && Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-50 border px-6 py-3 rounded-full animate-pulse w-32 h-16"></div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;