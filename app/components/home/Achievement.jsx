"use client";

import React, { useEffect, useState } from "react";
import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import Marquee from "react-fast-marquee"; // Package Import
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
    /* Used background variable */
    <section className="min-h-screen flex items-center bg-background overflow-hidden py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Replaced [#0066b2] with primary variable */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Big Achievement
          </h2>
        </div>

        <Stats stats={statsData} />

        <div className="text-center mt-10">
          {/* Used foreground variable for text */}
          <h3 className="text-xl md:text-2xl font-semibold mb-10 text-foreground">
            Trusted By Teams In Games, Anime, And Tech
          </h3>

          <div className="flex flex-col gap-6">
            {/* First Row: Marquee */}
            <Marquee gradient={false} speed={50} pauseOnHover={true}>
              {firstRow.map((partner, i) => (
                <div
                  key={`row1-${i}`}
                  /* Used background and foreground colors */
                  className="bg-background border border-gray-100 px-8 py-3 mx-3 rounded-full shadow-sm flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name || "Partner"}
                    className="h-10 w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </Marquee>

            {/* Second Row: Marquee */}
            <Marquee gradient={false} speed={50} pauseOnHover={true} direction="right">
              {secondRow.map((partner, i) => (
                <div
                  key={`row2-${i}`}
                  /* Used background and foreground colors */
                  className="bg-background border border-gray-100 px-8 py-3 mx-3 rounded-full shadow-sm flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name || "Partner"}
                    className="h-10 w-auto object-contain opacity-80"
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