"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Sparkles,
  Youtube,
  BarChart3,
  PenLine,
} from "lucide-react";
import { API } from "@/app/config/api";

/* icon mapper - uses primary brand color */
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
        const res = await fetch(
          API.featuredCaseStudies,
          { cache: "no-store" }
        );
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
    /* Replaced bg-slate-50 with a subtle tint of your brand gradient color */
    <section className="py-20 bg-gradient-base/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-background shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Case studies
            </div>
            {/* Replaced [#0066b2] with primary variable */}
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Featured Case Studies
            </h2>
          </div>

          <div className="md:max-w-xs pt-4 md:pt-14 text-right">
            <p className="text-gray-500 text-sm leading-relaxed">
              See how HS+ helps games, anime, and tech brands go global through
              localization, voice-over, and creator-led marketing.
            </p>
          </div>
        </div>

        {/* List */}
        <div className="space-y-12">
          {cases.map((item) => (
            <div
              key={item._id}
              className={`flex flex-col ${
                item.isReverse
                  ? "lg:flex-row-reverse"
                  : "lg:flex-row"
              } bg-background rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[500px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground pr-4">
                    {item.title}
                  </h3>

                  {/* Replaced bg-[#0070c0] with primary variable */}
                  <span className="bg-primary text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                    <Sparkles className="w-3 h-3" />
                    {item.tag}
                  </span>
                </div>

                <p className="text-gray-500 mb-8">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="space-y-6 mb-10">
                  {item.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-b border-gray-100 pb-4"
                    >
                      {/* Replaced text-[#0070c0] with primary variable */}
                      <div className="text-2xl font-bold text-primary min-w-[60px]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                        {iconMap[stat.icon]}
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    handleViewCaseStudy(item.slug)
                  }
                  /* Replaced border and text colors with accent/primary variables */
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

        {/* View All */}
        <div className="mt-16 flex justify-center">
          {/* Replaced bg-[#0070c0] with primary variable */}
          <button className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition shadow-lg">
            View All Case Studies
            <span className="bg-white text-primary rounded-full p-2">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;