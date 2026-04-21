"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/app/config/api";

const WhoWeAre = () => {
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchWhoWeAre = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setSection(data?.whoWeAre || null);
      } catch (err) {
        console.error("Failed to fetch who we are content", err);
      }
    };

    fetchWhoWeAre();
  }, []);

  const avatars = Array.isArray(section?.avatars) && section.avatars.length > 0
    ? section.avatars
    : [
      "https://i.pravatar.cc/150?u=1",
      "https://i.pravatar.cc/150?u=2",
      "https://i.pravatar.cc/150?u=3",
    ];

  return (
    <section className="container mx-auto px-6 py-16 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left Side: Badge, Title and Image */}
        <div className="space-y-8">
          <div
            className="inline-flex items-center justify-center mb-6"
            style={{
              display: 'flex',
              height: '50px',
              width: '110px',
              padding: '8px 16px',
              gap: '8px',
              borderRadius: '49px',
              background: '#E6F0F8',
            }}
          >
            <img
              src="/Frame.svg"
              alt="icon"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            <span
              style={{
                color: '#404040',
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.16px',
              }}
            >
              {section?.badge || "About"}
            </span>
          </div>

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
            Who We Are?
          </h2>

          <div className="relative overflow-hidden shadow-sm w-full max-w-[569px] rounded-[30.6px]">
            <img
              src={section?.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"}
              alt="Team working"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col h-full lg:pt-10">

          {/* ✅ Badge এর বরাবর ডান পাশে — description */}
          <div className="mb-16">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#616161',
              }}
            >
              {section?.description || "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
            </p>
          </div>

          {/* ✅ Story + Stats — vertically centered in remaining space */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-['Inter'] font-medium text-lg md:text-[32px] leading-[120%] tracking-[0%] capitalize text-[#595959] mb-8">
              {section?.story || "Founded In 2010, HS+ Supports Projects Across 40+ Languages And Global Platforms For Games, Animation, And Digital Content—With A Focus On Long-Term Collaboration Rather Than One-Off Delivery. We Don't Operate As A Translation Marketplace Or A Chain Of Vendors. We Operate As One Integrated System, Built For Long-Term Global Delivery."}
            </p>

            <div className="flex items-center justify-between gap-6">
              <div>
                <h3 className="font-['Inter'] font-medium text-2xl md:text-[40px] leading-[120%] tracking-[0%] capitalize text-[#0168B4]">
                  {section?.statValue || "1k+"}
                </h3>
                <p className="font-['Poppins'] font-normal text-[18px] leading-[160%] tracking-[0%] text-[#0A0A0A] mt-1">
                  {section?.statLabel || "Satisfied client last 8 years"}
                </p>
              </div>

              {/* Avatar Group */}
              <div className="flex -space-x-3">
                {avatars.slice(0, 3).map((avatar, index) => (
                  <img
                    key={avatar || index}
                    className="inline-block h-12 w-12 rounded-full ring-4 ring-white object-cover"
                    src={avatar}
                    alt="Client avatar"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;