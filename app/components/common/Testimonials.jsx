"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Quote, Sparkles } from "lucide-react";
import { API } from "@/app/config/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
        const data = await res.json();

        if (data) {
          setTestimonials(data.testimonials || []);
          setBottomNav(data.bottomNav || []);
        }
      } catch (err) {
        console.error("Failed to load testimonials", err);
      }z
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight">
              What Our Clients Say <br /> About Us!
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 container mx-auto">
          {testimonials.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-[40px] p-4 shadow-2xl shadow-blue-100/50 border border-gray-50 flex flex-col h-full"
            >
              {item.type === "text" ? (
                <div className="bg-gray-50/50 rounded-[35px] p-10 flex-grow flex flex-col justify-center items-start mb-6">
                  <Quote className="w-12 h-12 text-[#0066b2] fill-[#0066b2] opacity-20 mb-6" />
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
                    {item.quote}
                  </p>
                </div>
              ) : (
                <div className="relative rounded-[35px] overflow-hidden mb-6 h-[300px] md:h-full min-h-[300px]">
                  <img
                    src={item.thumbnail}
                    alt="Client"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <button className="bg-[#0070c0] text-white p-4 rounded-full shadow-lg transform transition hover:scale-110">
                      <Play className="w-6 h-6 fill-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* User Info */}
              <div className="flex items-center gap-4 px-6 pb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 leading-none mb-1">
                    {item.name}
                  </h4>
                  <p className="text-gray-400 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Navigation Bar */}
        <div className="max-w-6xl mx-auto bg-white border border-gray-100 rounded-full p-3 flex flex-wrap md:flex-nowrap items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 ml-2">
            <button className="p-4 bg-gray-50 rounded-full hover:bg-gray-100 transition">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-4 bg-[#0070c0] text-white rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:flex flex-grow justify-around items-center px-8">
            {bottomNav.map((nav, i) => (
              <div
                key={i}
                className="flex flex-col items-center border-r last:border-0 border-gray-100 px-10"
              >
                <p className="text-gray-900 font-bold text-sm">{nav.name}</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">
                  {nav.company}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
