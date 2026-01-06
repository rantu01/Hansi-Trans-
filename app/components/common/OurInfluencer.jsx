"use client";
import React, { useEffect, useState } from "react";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import Marquee from "react-fast-marquee"; 
import { motion } from "framer-motion"; 
import { API } from "@/app/config/api";

const OurInfluencer = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const res = await fetch(API.OurInfluencer.getInfluencers, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch influencers");

        const data = await res.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Influencer fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-background py-20 px-6 md:px-12 font-sans overflow-hidden w-full">
      <div className="mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 container mx-auto"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 w-fit">
              <span className="text-gray-600 text-sm">✦</span>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">
                Influencer
              </span>
            </div>
            {/* Replaced [#0066b2] with primary brand color */}
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              What Our Influencer Say <br /> About Us!
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </motion.div>

        {/* Marquee Area */}
        <div className="w-full mt-10">
          <Marquee 
            speed={40} 
            pauseOnHover={true} 
            gradient={false}
          >
            {influencers.map((person) => (
              <motion.div 
                key={person._id}
                whileHover={{ y: -5 }} 
                className="flex flex-col items-center text-center group mx-6 w-[250px]"
              >
                {/* Image Card */}
                <div className="w-full aspect-square mb-6 overflow-hidden rounded-[40px] shadow-sm border border-gray-50">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {person.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {person.role}
                </p>

                {/* Social Icons - Using primary and accent for hover states */}
                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Twitter size={18} fill="currentColor" stroke="none" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                    <Facebook size={18} fill="currentColor" stroke="none" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                    <Linkedin size={18} fill="currentColor" stroke="none" />
                  </a>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
};

export default OurInfluencer;