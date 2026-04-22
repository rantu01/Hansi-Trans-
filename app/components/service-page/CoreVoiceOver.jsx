"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const CoreVoiceOver = ({ mainSlug, subServices: prefetchedSubServices, section = {} }) => {
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(prefetchedSubServices)) {
      setSubServices(prefetchedSubServices);
      setLoading(false);
      return;
    }

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
  }, [mainSlug, prefetchedSubServices]);

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
    <section id="service-sub-services" className="bg-background py-10 md:py-16 px-4 sm:px-6 md:px-12 font-sans scroll-mt-24">
      <div className="container mx-auto">

        <div className="flex items-center justify-start mb-10 md:mb-12 inline-flex gap-3 bg-white px-3 py-2 rounded-[49px] " >
          {/* Icon Frame */}
          <img src="/Frame2.svg" alt="Achievement Frame" className="w-9 h-9 object-contain flex-shrink-0" />

          <h2 className="capitalize text-[#0168B4] font-medium text-lg sm:text-xl md:text-3xl md:py-3  leading-[1.15] whitespace-nowrap">
            {section.subServicesTitle || `Core ${mainSlug?.replace(/-/g, ' ')} Services`}
          </h2>
        </div>

        {section.subServicesDescription ? (
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm sm:text-base text-slate-500 leading-7">
            {section.subServicesDescription}
          </p>
        ) : null}

        {/* Sub-services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {subServices.map((card) => (
            <div key={card._id} className="flex flex-col group h-full">

              {/* Image Container */}
              <div
                className="overflow-hidden w-full"
                style={{
                  aspectRatio: '306 / 262',
                  borderRadius: '16px',
                  opacity: '1',
                  background: '#F1F5F9',
                  flexShrink: 0,
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ borderRadius: '16px' }}
                />
              </div>

              {/* Content Wrapper */}
              <div className="flex flex-col flex-grow">
                <h3 className="transition-colors duration-300 group-hover:text-[#0168B4] mt-4 w-full text-base sm:text-lg md:text-xl font-medium text-[#0F0F0F] mb-3 capitalize">
                  {card.title}
                </h3>

                <p className="line-clamp-3 w-full text-sm sm:text-base text-[#6B6B6B] mb-6 flex-grow" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.5' }}>
                  {card.description}
                </p>

                {/* Action Button */}
                <div className="mt-auto">
                  <Link href={`/services/${mainSlug}/${card.slug}`} className="group inline-flex items-center justify-between transition-all duration-300 whitespace-nowrap w-full max-w-[198px] h-12 rounded-full border border-[#0168B4] px-4 gap-3 text-sm sm:text-base font-medium text-[#0168B4]">
                    <span>Explore Services</span>
                    <div className="bg-[#0168B4] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 w-10 h-10 flex-shrink-0">
                      <ArrowUpRight size={20} className="text-white" strokeWidth={2.5} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreVoiceOver;