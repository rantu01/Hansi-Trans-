"use client";
import React from "react";
import { Twitter, Facebook, Linkedin } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';

const OurInfluencer = () => {
  const influencers = [
    {
      name: "Stone Mccoy",
      role: "CEO, Co-founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
    },
    {
      name: "Alina Rose",
      role: "CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
    },
    {
      name: "Jhon Dever",
      role: "Accounts",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500",
    },
    {
      name: "Lira Flor",
      role: "Co-founder",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
    },
    {
      name: "Jhon Dever",
      role: "Accounts",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
    },
    {
      name: "Stone Mccoy",
      role: "CEO, Co-founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans overflow-hidden w-full">
      <div className="mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 container mx-auto">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 w-fit">
              <span className="text-gray-600 text-sm">✦</span>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">Influencer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight">
              What Our Influencer Say <br /> About Us!
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Swiper Slider Area */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="mySwiper"
          >
            {influencers.map((person, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center group">
                  {/* Image Card */}
                  <div className="w-full aspect-square mb-6 overflow-hidden rounded-[40px]">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover shadow-sm transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{person.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{person.role}</p>

                  {/* Social Icons */}
                  <div className="flex items-center gap-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Twitter size={18} fill="currentColor" stroke="none" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <Facebook size={18} fill="currentColor" stroke="none" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-800 transition-colors">
                      <Linkedin size={18} fill="currentColor" stroke="none" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default OurInfluencer;