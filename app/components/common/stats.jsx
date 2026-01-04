"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="max-w-6xl mx-auto mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[80px] overflow-hidden shadow-sm bg-gradient-to-b from-[#abdbfe] to-white">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-8 flex flex-col items-center text-center hover:bg-blue-100/50 transition"
          >
            <div className="text-3xl mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-extrabold text-gray-800">
              {stat.value}
            </h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;