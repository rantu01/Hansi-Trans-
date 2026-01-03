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
        
        // আপনার কন্ট্রোলার অনুযায়ী ডাটা response.data.subServices এ আছে
        if (response.data && response.data.success) {
          setSubServices(response.data.subServices || []); 
          console.log("Sub-services found:", response.data.subServices);
        }
      } catch (error) {
        console.error("Error fetching sub-services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubServices();
  }, [mainSlug]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  // যদি ডাটাবেজে ডাটা না থাকে তবে এটি কেন দেখাচ্ছে না তা বুঝতে নিচের মেসেজটি কাজে লাগবে
  if (subServices.length === 0) {
    return (
      <div className="text-center py-10 border-dashed border-2 border-gray-100 m-10">
        <p className="text-gray-400">No sub-services found for: {mainSlug}</p>
        <p className="text-xs text-gray-300">Check if parentService ID is correct in MongoDB</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-6 py-3 rounded-full mb-12 w-fit">
          <Sparkles size={20} className="text-[#0066b2]" />
          <h2 className="text-xl md:text-2xl font-bold text-[#0066b2] tracking-tight">
            Core {mainSlug?.replace(/-/g, " ")} Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {subServices.map((card) => (
            <div key={card._id} className="flex flex-col group">
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden rounded-[24px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 leading-snug">
                {card.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3">
                {card.description}
              </p>

              <Link
                href={`/services/${mainSlug}/${card.slug}`}
                className="flex items-center justify-between gap-2 border border-[#0066b2] text-[#0066b2] hover:bg-[#0066b2] hover:text-white px-5 py-2 rounded-full text-xs font-semibold transition-all w-fit group/btn"
              >
                <span>Explore Services</span>
                <div className="bg-[#0066b2] text-white rounded-full p-1 group-hover/btn:bg-white group-hover/btn:text-[#0066b2] transition-colors">
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