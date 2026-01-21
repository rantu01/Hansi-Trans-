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
    <section className="bg-[#F7F7F7] py-20 px-6 md:px-12 overflow-hidden w-full">
      <div className="mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 container mx-auto"
        >
          <div className="max-w-xl">
            {/* Badge with Frame.svg */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 mb-6 bg-white shadow-sm"
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Influencer
            </div>
            
            <h2 
              style={{
                color: '#0168B4',
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%',
                textTransform: 'capitalize'
              }}
            >
              What Our Influencer Say <br /> About Us!
            </h2>
          </div>
          
          <div className="max-w-sm md:mt-12">
            <p 
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </motion.div>

        {/* Marquee Area */}
        <div className="w-full mt-10">
          <Marquee speed={50} pauseOnHover={true} gradient={false}>
            {influencers.map((person) => (
              <motion.div 
                key={person._id}
                whileHover={{ y: -5 }} 
                className="flex flex-col items-center text-center group mx-6" 
              >
                {/* Image Card */}
                <div className="w-[304px] h-[353px] mb-6 overflow-hidden rounded-[40px] shadow-sm border border-gray-100 bg-gray-50">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Influencer Name */}
                <h3 
                  style={{
                    color: '#0F0F0F',
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '28px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize'
                  }}
                  className="mb-1"
                >
                  {person.name}
                </h3>

                {/* Influencer Role */}
                <p 
                  style={{
                    color: '#575757',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '160%'
                  }}
                  className="mb-4"
                >
                  {person.role}
                </p>

                {/* Social Icons with updated specs */}
                <div className="flex items-center gap-4">
                  <a href="#" className="transition-opacity hover:opacity-70">
                    <Twitter 
                      style={{ width: '22.519px', height: '18.29px' }} 
                      fill="#0F0F0F" 
                      stroke="none" 
                    />
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-70">
                    <Facebook 
                      style={{ width: '22px', height: '22px' }} 
                      fill="#0F0F0F" 
                      stroke="none" 
                    />
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-70">
                    <Linkedin 
                      style={{ width: '22px', height: '22px' }} 
                      fill="#0F0F0F" 
                      stroke="none" 
                    />
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