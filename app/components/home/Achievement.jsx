"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";
import Stats from "../common/stats";
import { API } from "@/app/config/api";

const Achievement = () => {
  const [mounted, setMounted] = useState(false); // Hydration mismatch রক্ষা করবে
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
    setMounted(true); // কম্পোনেন্ট মাউন্ট হয়েছে কিনা চেক
    const fetchData = async () => {
      try {
        const [statsRes, partnersRes] = await Promise.all([
          fetch(`${API.Stats}?category=general`),
          fetch(API.Partners),
        ]);

        const statsJson = await statsRes.json();
        const partnersJson = await partnersRes.json();

        // API যদি অ্যারে না পাঠিয়ে অবজেক্ট পাঠায় তার সুরক্ষা
        const statsArray = Array.isArray(statsJson) ? statsJson : (statsJson.data || []);
        const partnersArray = Array.isArray(partnersJson) ? partnersJson : (partnersJson.data || []);

        const formattedStats = statsArray.map((item) => ({
          ...item,
          icon: iconMap[item.icon] || item.icon,
        }));

        setStatsData(formattedStats);
        setPartners(partnersArray);
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

  // মাউন্ট হওয়ার আগে কিছু রেন্ডার করবে না (Hydration error fix)
  if (!mounted || loading) return null;

  return (
    <section className="flex items-center bg-background overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2
            className="flex items-center justify-center gap-3 capitalize"
            style={{
              color: '#0168B4',
              textAlign: 'center',
              fontFamily: 'var(--font-inter), sans-serif', // layout.js theke Inter variable
              fontSize: 'clamp(30px, 5vw, 48px)', // Mobile-e 30px theke Desktop-e 48px
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '120%', // 57.6px
              textTransform: 'capitalize',
            }}
          >
            Our Big Achievement
            <img
              src="/Frame2.svg"
              alt="Achievement Frame"
              className="w-10 h-10 object-contain "
              style={{ display: 'inline-block' }}
            />
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
              lineHeight: '120%',
            }}
          >
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          <div className="flex flex-col gap-8">
            {/* First Row Marquee */}
            {firstRow.length > 0 && (
              <Marquee gradient={false} speed={40} pauseOnHover={false}>
                {firstRow.map((partner, i) => (
                  <div key={`row1-${partner._id || i}`} className="mx-6 h-16 w-16 md:h-20 md:w-34 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name || "Partner"}
                      className="h-full w-full object-contain rounded-full shadow-sm p-1 bg-white"
                      onError={(e) => { e.currentTarget.src = "/fallback-logo.png" }} // ইমেজ না থাকলে ক্র্যাশ করবে না
                    />
                  </div>
                ))}
              </Marquee>
            )}

            {/* Second Row Marquee */}
            {secondRow.length > 0 && (
              <Marquee gradient={false} speed={40} pauseOnHover={false} direction="right">
                {secondRow.map((partner, i) => (
                  <div key={`row2-${partner._id || i}`} className="mx-6 h-16 w-16 md:h-20 md:w-34 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name || "Partner"}
                      className="h-full w-full object-contain rounded-full shadow-sm p-1 bg-white"
                      onError={(e) => { e.currentTarget.src = "/fallback-logo.png" }}
                    />
                  </div>
                ))}
              </Marquee>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievement;