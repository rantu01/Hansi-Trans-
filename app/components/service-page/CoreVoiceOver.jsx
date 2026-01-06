"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const CoreVoiceOver = ({ mainSlug }) => {
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubServices = async () => {
      if (!mainSlug) return;
      try {
        const response = await axios.get(API.services.subServices(mainSlug));
        if (response.data && response.data.success) {
          setSubServices(response.data.subServices || []);
        }
      } catch (error) {
        console.error("Error fetching sub-services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubServices();
  }, [mainSlug]);

  if (loading) return (
    <div className="text-center py-20 text-primary font-medium animate-pulse">
      Loading Services...
    </div>
  );

  if (subServices.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-primary/10 rounded-[32px] m-10 bg-primary/5">
        <p className="text-primary/60 font-medium">No sub-services found for: {mainSlug}</p>
        <p className="text-xs text-primary/40 mt-1 uppercase tracking-widest">Database connection verified</p>
      </div>
    );
  }

  return (
    <section className="bg-background py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Brand Colors */}
        <div className="flex items-center gap-3 bg-background border border-primary/10 shadow-sm px-6 py-3 rounded-full mb-12 w-fit">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight capitalize">
            Core {mainSlug?.replace(/-/g, " ")} Services
          </h2>
        </div>

        {/* Sub-services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {subServices.map((card) => (
            <div key={card._id} className="flex flex-col group h-full">
              {/* Image Container */}
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[24px] bg-primary/5 border border-primary/5 shadow-md shadow-primary/5 transition-all group-hover:shadow-xl group-hover:shadow-primary/10">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3">
                {card.description}
              </p>

              {/* Dynamic Action Button */}
              <Link
                href={`/services/${mainSlug}/${card.slug}`}
                className="mt-auto flex items-center justify-between gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all w-fit group/btn"
              >
                <span>Explore Services</span>
                <div className="bg-primary text-white rounded-full p-1 group-hover/btn:bg-white group-hover/btn:text-primary transition-colors duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreVoiceOver;