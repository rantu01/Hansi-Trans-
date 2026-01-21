"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Youtube,
  BarChart3,
  PenLine,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { API } from "@/app/config/api";
import Link from "next/link";

/* --- Counter Up Component --- */
const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Math.floor(latest)
        );
      }
    });
  }, [springValue]);

  return (
    <span className="flex items-center">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

/* icon mapper */
const iconMap = {
  youtube: <Youtube className="w-5 h-5 text-primary" />,
  chart: <BarChart3 className="w-5 h-5 text-primary" />,
  pen: <PenLine className="w-5 h-5 text-primary" />,
};

const FeaturedCaseStudies = () => {
  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(API.featuredCaseStudies, { cache: "no-store" });
        const data = await res.json();
        setCases(data.data || []);
      } catch (err) {
        console.error("Failed to load case studies");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const handleViewCaseStudy = (slug) => {
    router.push(`/case-studies/${slug}`);
  };

  if (loading) return null;

  return (
    <section className="py-20 bg-[#f7f7f7]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl">
            {/* SVG Path used here */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-background shadow-sm">
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Case studies
            </div>
            {/* Title Update: Inter 48px, #0168B4 */}
            <h2
              className="capitalize"
              style={{
                color: '#0168B4',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '500',
                lineHeight: '120%'
              }}
            >
              Featured Case Studies
            </h2>
          </div>

          <div className="md:max-w-xs pt-4 md:pt-14 text-right">
            {/* Paragraph Update: Inter 16px, #616161 */}
            <p
              style={{
                color: '#616161',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.128px'
              }}
            >
              See how HS+ helps games, anime, and tech brands go global through
              localization, voice-over, and creator-led marketing.
            </p>
          </div>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12">
          {cases.map((item) => (
            <div
              key={item._id}
              className={`flex flex-col ${item.isReverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } bg-background rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[560px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  {/* Item Title Update: Inter 32px, #0A0A0A */}
                  <h3
                    className="pr-4 capitalize"
                    style={{
                      color: '#0A0A0A',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '32px',
                      fontWeight: '500',
                      lineHeight: '120%'
                    }}
                  >
                    {item.title}
                  </h3>
                  {/* Tag Update with SVG */}
                  <span className="bg-primary text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                    <img src="/Frame.svg" alt="icon" className="w-3 h-3 brightness-0 invert" />
                    {item.tag}
                  </span>
                </div>

                <p className="text-gray-500 mb-8">{item.description}</p>

                {/* Stats Section */}
                <div className="space-y-6 mb-10">
                  {item.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 border-b border-[#D9D9D9] pb-4 last:border-0"
                    >
                      <div
                        className="min-w-[100px] capitalize"
                        style={{
                          color: '#0168B4',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '40px',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          lineHeight: '120%', // 48px
                        }}
                      >
                        <Counter value={stat.value} />
                      </div>

                      {iconMap[stat.icon]}

                      {/* Stat Label Update: Poppins 16px, #616161 */}
                      <div
                        style={{
                          color: '#616161',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '16px',
                          fontWeight: '400',
                          lineHeight: '150%'
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleViewCaseStudy(item.slug)}
                  className="inline-flex items-center gap-3 border border-accent text-primary pl-6 pr-2 py-1.5 rounded-full font-semibold hover:bg-gradient-base/10 transition group self-start"
                >
                  View Case Studies
                  <span className="bg-primary text-white rounded-full p-2 group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Link href="/case-studies" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition shadow-lg">
            View All Case Studies
            <span className="bg-white text-primary rounded-full p-2">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;