"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import Marquee from "react-fast-marquee"; 
import Stats from "../common/stats";
import { API } from "@/app/config/api";

const Achievement = () => {
  const [statsData, setStatsData] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    FaUser: <FaUser />,
    FaStar: <FaStar />,
    FaGlobe: <FaGlobe />,
    FaBriefcase: <FaBriefcase />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, partnersRes] = await Promise.all([
          fetch(`${API.Stats}?category=general`),
          fetch(API.Partners),
        ]);

        const statsJson = await statsRes.json();
        const partnersJson = await partnersRes.json();

        const formattedStats = statsJson.map((item) => ({
          ...item,
          icon: iconMap[item.icon] || item.icon,
        }));

        setStatsData(formattedStats);
        setPartners(partnersJson);
      } catch (error) {
        console.error("Error fetching achievement data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const firstRow = partners.slice(0, Math.ceil(partners.length / 2));
  const secondRow = partners.slice(Math.ceil(partners.length / 2));

  if (loading) return null; 

  return (
    <section className="flex items-center bg-background overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center gap-2">
            Our Big Achievement 
            <span className="text-2xl">✨</span>
          </h2>
        </div>

        <Stats stats={statsData} />

        <div className="text-center mt-12">
          <h3 className="text-xl md:text-2xl font-semibold mb-10 text-foreground">
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          <div className="flex flex-col gap-8">
            {/* First Row: Marquee (pauseOnHover={false} ensuring it doesn't stop) */}
            <Marquee gradient={false} speed={40} pauseOnHover={false}>
              {firstRow.map((partner, i) => (
                <div key={`row1-${i}`} className="mx-6">
                  <img
                    src={partner.logo}
                    alt={partner.name || "Partner"}
                    className="h-16 w-16 md:h-20 md:w-34 object-cover rounded-full  shadow-sm p-1 bg-white"
                  />
                </div>
              ))}
            </Marquee>

            {/* Second Row: Marquee (pauseOnHover={false} ensuring it doesn't stop) */}
            <Marquee gradient={false} speed={40} pauseOnHover={false} direction="right">
              {secondRow.map((partner, i) => (
                <div key={`row2-${i}`} className="mx-6">
                  <img
                    src={partner.logo}
                    alt={partner.name || "Partner"}
                    className="h-16 w-16 md:h-20 md:w-34 object-cover rounded-full shadow-sm p-1 bg-white"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;