"use client";
import React, { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ChevronDown } from "lucide-react";
import { API } from "@/app/config/api";

const Domains = () => {
  const [domainsData, setDomainsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await fetch(API.Domains);
        const data = await res.json();
        setDomainsData(data);
      } catch (err) {
        console.error("Failed to fetch domains:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="text-primary w-6 h-6" /> : <Icons.HelpCircle className="text-primary w-6 h-6" />;
  };

  if (loading) return <div className="py-20 text-center text-primary font-medium">Loading Domains...</div>;

  return (
    <section
      style={{
        // Updated Linear Gradient
        background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)'
      }}
      className="bg-primary/10 py-20 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="container mx-auto">

        {/* Header Section - Unchanged */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center justify-center mb-6" style={{ display: 'flex', height: '50px', width: '150px', padding: '8px 16px', gap: '8px', borderRadius: '49px', background: '#F5f5f5' }}>
              <img src="/Frame.svg" alt="icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              <span style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', fontWeight: '500' }}>Domains</span>
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '48px', lineHeight: '120%', textTransform: 'capitalize', color: '#0A0A0A' }}>
              Vertical Domains
            </h2>
          </div>
          <div className="max-w-lg">
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '16px', lineHeight: '150%', color: '#616161' }}>
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Dynamic Grid - Ekhane showAll toggle kaj korbe */}
        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ease-in-out"
          style={{
            // 1050px (2 rows) + pray 200px (3rd row er half) = 1250px
            maxHeight: showAll ? '4000px' : '1250px',
            overflow: 'hidden'
          }}
        >
          {domainsData.map((domain, index) => (
            <div
              key={domain._id || index}
              className="p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-start group"
              style={{
                background: 'linear-gradient(0deg, #F7F7F7 0%, #CCE7FB 55.48%, #A9DAFF 100%)',
                border: '1px solid #FFFFFF'
              }}
            >
              <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                {renderIcon(domain.icon)}
              </div>

              <h3 className="mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontSize: '28px', color: '#0A0A0A', textTransform: 'capitalize' }}>
                {domain.title}
              </h3>

              <p className="mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '16px', color: '#616161' }}>
                {domain.description || "Global network of linguists and 3,000+ voice talents ready to scale."}
              </p>

              <div className="flex flex-wrap gap-[10px] mt-auto">
                {domain.tags?.map((tag, idx) => (
                  <span key={idx} className="flex items-center justify-center" style={{ width: '99px', height: '25px', borderRadius: '51px', background: '#FFFFFF', fontSize: '12px', fontWeight: '500', color: '#0A0A0A', border: '1px solid rgba(1, 104, 180, 0.1)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Glass Overlay - Jeta nicher card guloke blurred rakhbe */}
          {!showAll && (
            <div
              className="absolute bottom-0 left-0 w-full z-10 pointer-events-none transition-opacity duration-500 rounded-2xl"
              style={{
                height: '282px', // 3rd row er half theke shuru hoye niche porjonto
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1))',
                backdropFilter: 'blur(3px)'
              }}
            />
          )}
        </div>

        {/* Smooth Expand Button */}
        {!showAll && (
          <div className="flex justify-center mt-12 relative z-20">
            <button
              onClick={() => setShowAll(true)}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-xl shadow-primary/30 border-4 border-white animate-bounce"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Domains;