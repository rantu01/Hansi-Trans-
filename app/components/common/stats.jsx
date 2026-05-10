"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
// Using SVG icons from public/hansi all icon instead of react-icons

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const hardCodedIcons = [
    { src: "/hansi all icon/Sicne.svg",  alt: "Sicne" },
    { src: "/hansi all icon/succesful project.svg",  alt: "Succesful Project" },
    { src: "/hansi all icon/Languase.svg",  alt: "Languase" },
    { src: "/hansi all icon/Voice talent.svg",  alt: "Voice talent" },
  ];

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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Height: 218px
            Stroke/Border: #E0E4FF
            Gradient: #A9DAFF to #F7F7F7
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[50px] md:rounded-full overflow-hidden   md:h-[218px] items-center"
          style={{
            background: "linear-gradient(to bottom, #A9DAFF 0%, #F7F7F7 100%)"
          }}
        >
          {stats.map((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/\D/g, "")) || 0;
            const suffix = stat.value.replace(/[0-9]/g, "");
            const iconData = hardCodedIcons[index % hardCodedIcons.length];

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center px-6 py-10 md:py-0 h-full justify-center relative ${index !== stats.length - 1 ? "lg:border-r-2 border-[#E0E4FF]/60" : ""
                  }`}
              >
                {/* Icon and Counter side-by-side */}
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className={`rounded-full ${iconData.color} flex items-center justify-center `}>
                    <div className="flex items-center justify-center w-20 h-20 sm:w-14 sm:h-14">
                      <img src={encodeURI(iconData.src)} alt={iconData.alt} className="md:w-10 md:h-10 w-8 h-8 object-contain" />
                    </div>
                  </div>

                  {/* Counter Value */}
                  <h3
                    className="capitalize text-2xl sm:text-[40px]"
                    style={{
                      color: '#0A0A0A',
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: '120%', // 48px
                    }}
                  >
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
                </div>

                {/* Label */}
                <p
                  className="mt-0 text-sm sm:text-base"
                  style={{
                    color: '#616161',
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '150%', // 27px
                  }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;