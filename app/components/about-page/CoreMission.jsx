"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/app/config/api";

const CoreMission = () => {
  const [coreMission, setCoreMission] = useState(null);

  useEffect(() => {
    const fetchCoreMission = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setCoreMission(data?.coreMission || null);
      } catch (err) {
        console.error("Failed to fetch core mission data", err);
      }
    };

    fetchCoreMission();
  }, []);

  return (
    <section 
      className="container mx-auto flex flex-col items-start overflow-hidden mb-10"
      style={{
        
        height: '590px',
        background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)',
        borderRadius: '44px',
        padding: ' 50px 16px',
        opacity: 1,
      }}
    >
      {/* Inner White Card */}
      <div className="w-full h-full bg-white rounded-[44px] p-[60px] relative flex flex-col gap-[60px] overflow-hidden">
        
        {/* Top Decorative Image (Glassy 3D Shape) */}
        <div className="absolute -top-60 -right-35 w-[500px] h-[500px]">
          <img 
            src={coreMission?.decorativeImage || "CoreMission.png"}
            alt="Decorative shape" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Core Promise Badge */}
        <div
            className="inline-flex items-center justify-center mb-6"
            style={{
              display: 'flex',
              height: '50px',
              width: '180px',
              padding: '8px 16px',
              gap: '8px',
              borderRadius: '49px',
              background: '#F5F5F5',
            }}
          >
            <img
              src="/Frame.svg"
              alt="icon"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            <span
              style={{
                color: '#404040', // var(--dark-5)
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.16px',
              }}
            >
              {coreMission?.badge || "Core promise"}
            </span>
          </div>

        {/* Content Section */}
        <div className="space-y-10 z-10">
          {/* Main Title */}
          <h2 
            className="font-['Inter'] font-medium capitalize"
            style={{
              fontSize: '40px',
              lineHeight: '120%',
              color: '#0168B4',
              letterSpacing: '0%'
            }}
          >
            {coreMission?.title || "Our Company Main Mission"}
          </h2>

          {/* Mission Description */}
          <p 
            className="font-['Inter'] font-medium capitalize max-w-[1100px]"
            style={{
              fontSize: '40px',
              lineHeight: '120%',
              color: '#595959',
              letterSpacing: '0%'
            }}
          >
            {coreMission?.description || "We bring together localization, voice-over, music & sound design, content distribution and digital marketing into a single, coordinated workflow—so global releases stay consistent, on time, and on spec."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoreMission;