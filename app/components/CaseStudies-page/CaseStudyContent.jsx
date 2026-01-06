"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/app/config/api";

const CaseStudyContent = () => {
  const { slug } = useParams();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(API.featuredCaseStudies);
        const data = await res.json();
        const found = data.data.find((c) => c.slug === slug);
        if (found) {
          setStats(found.stats || []);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchCase();
  }, [slug]);

  return (
    <section className="py-20 bg-background font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Stats Section (DYNAMIC) - Branded Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {stats.slice(0, 2).map((stat, index) => (
            <div
              key={index}
              className="bg-background border border-primary/10 rounded-[32px] py-10 text-center shadow-sm shadow-primary/5 hover:border-primary/30 transition-all"
            >
              <h2 className="text-5xl font-black text-primary mb-2">
                {stat.value}
              </h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Introduction */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-secondary mb-6">
            Introduction
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-4xl">
            Expanding your game into Asian markets is an exciting opportunity—but without proper localization, 
            even the best game can fail to connect. This guide walks you through cultural adaptation, language 
            challenges, voice-over best practices, and marketing strategies.
          </p>
        </div>

        {/* Market Analysis – Text Left */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-secondary leading-tight">
              Understanding The Asian Gaming Market
            </h3>
            <p className="text-gray-400 text-xs italic border-l-2 border-primary/30 pl-4">
              Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products.
            </p>
            <ol className="space-y-4 text-sm text-gray-600 list-decimal pl-5 marker:text-primary marker:font-bold">
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <div className="bg-primary/5 rounded-xl p-4 w-fit">
               <p className="text-primary font-bold text-xs uppercase tracking-wider">
                👉 Key takeaway: One region ≠ one strategy.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-primary/5 rounded-[40px] translate-x-3 translate-y-3 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full rounded-[40px] shadow-xl shadow-primary/5 object-cover h-[350px]"
              alt="Studio Mic"
            />
          </div>
        </div>

        {/* Market Analysis – Image Left */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 mb-24">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-secondary leading-tight">
              Strategic Cultural Integration
            </h3>
            <ol className="space-y-4 text-sm text-gray-600 list-decimal pl-5 marker:text-primary marker:font-bold">
              <li>Localization beyond mere translation.</li>
              <li>Adapting visual assets for local sensibilities.</li>
              <li>Regional voice acting with local nuances.</li>
              <li>Testing with local focus groups.</li>
            </ol>
          </div>

          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-base/10 rounded-[40px] -translate-x-3 translate-y-3 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"
              className="w-full rounded-[40px] shadow-xl shadow-primary/5 object-cover h-[350px]"
              alt="Voice Over"
            />
          </div>
        </div>

        {/* Quote Section - Branded */}
        <div className="border-2 border-dashed border-primary/20 rounded-[40px] p-16 text-center my-24 bg-primary/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full -translate-x-12 -translate-y-12"></div>
          <h4 className="text-2xl md:text-4xl font-black text-secondary italic leading-tight relative z-10">
            "People Will Forget What You Said, But They'll Remember How <span className="text-primary">Your Brand</span> Made Them Feel."
          </h4>
        </div>

        {/* Conclusion */}
        <div className="mb-20 py-12 border-t border-primary/10">
          <h3 className="text-2xl font-bold text-secondary mb-6">
            Conclusion
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-4xl">
            Expanding into Asian markets is more than just translation—it's about building 
            <span className="text-primary font-semibold"> authentic cultural connections</span>. 
            By choosing the right partners and respecting regional nuances, your brand can 
            achieve sustainable global growth.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyContent;