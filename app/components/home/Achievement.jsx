"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaStar, FaGlobe, FaBriefcase, } from "react-icons/fa";
import { Sparkles } from "lucide-react";
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
          <h2
            className="flex items-center justify-center gap-3 capitalize"
            style={{
              color: '#0168B4',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(30px, 4vw, 48px)', // রেসপনসিভ করার জন্য clamp ব্যবহার করা হয়েছে
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '120%', // 57.6px
            }}
          >
            Our Big Achievement
            <Sparkles className="w-8 h-8 text-[#0168B4]" strokeWidth={2.5} />
          </h2>
        </div>

        <Stats stats={statsData} />

        <div className="text-center mt-12">
          <h3
            className="mb-10 capitalize"
            style={{
              color: '#0F0F0F',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '120%', // 33.6px
            }}
          >
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