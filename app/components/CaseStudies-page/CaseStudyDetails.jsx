"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/app/config/api";

const CaseStudiesDetails = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(API.featuredCaseStudies);
        const data = await res.json();
        const found = data.data.find((c) => c.slug === slug);
        setCaseStudy(found);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-primary font-medium animate-pulse">
        Loading Case Details...
      </div>
    );
  }

  if (!caseStudy) return null;

  return (
    <section className="py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Main Case Study Image Container */}
        <div 
          className="w-full h-[300px] md:h-[500px] mb-12 overflow-hidden rounded-[40px] 
                     bg-primary/5 border border-primary/10 shadow-2xl shadow-primary/5 
                     relative group"
        >
          <img
            src={caseStudy.image}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt={caseStudy.title}
          />
          
          {/* Subtle Branded Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Section (Optional: for title and description if needed) */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-fourground leading-tight">
            {caseStudy.title}
          </h1>
          <div className="w-20 h-1.5 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesDetails;