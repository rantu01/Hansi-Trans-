"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const OurServices2 = () => {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
          // Filtering main services (excluding sub-services)
          const mainServices = response.data.data.filter(
            (service) => !service.parentService
          );
          setServiceList(mainServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-[#F7F7F7] my-6 md:py-20 px-6 md:px-12 md:">
      <div className="container mx-auto">
        {/* Header matching the provided image style */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl">
            {/* <div
              className="inline-flex items-center justify-center mb-6"
              style={{
                height: "50px",
                padding: "8px 20px",
                gap: "8px",
                borderRadius: "49px",
                background: "#FFF",
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: "20px", height: "20px", objectFit: "contain" }}
              />
              <span
                style={{
                  color: "#404040",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Service
              </span>
            </div> */}
            <h2 className="font-['Inter'] font-medium capitalize text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-[1.15] text-[#0168B4]">
              Related More <br /> Service
            </h2>
          </div>
          <div className="max-w-lg">
            <p className="text-sm sm:text-base md:text-lg text-[#6B6B6B] leading-[1.6] font-['Poppins']">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Services List with Image-accurate styling */}
        <div className="space-y-10">
          {serviceList.map((service, index) => (
            <div
              key={service.slug || index}
              style={{
                background: "linear-gradient(180deg, #A9DAFF 0%, #CCE7FB 45%, #F7F7F7 100%)",
              }}
              className={`rounded-[45px] md:rounded-[60px] p-8 md:p-12 flex flex-col ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 border border-white/50 shadow-lg`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-[#0A0A0A]">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-[#616161] leading-[1.6] font-['Poppins']">
                  {service.description}
                </p>

                {/* Features list based on image design */}
                {/* Key Features Section */}
                <div className="space-y-4 mb-10">
                  <h4 className="text-base sm:text-lg font-semibold text-[#090E2F]">
                    Key Features:
                  </h4>

                  <ul className="grid grid-cols-1 md:grid-cols-1 gap-x-4 gap-y-3">
                    {service.features?.slice(0, 4).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                      >
                        {/* Custom Dot/Bullet */}
                        <span
                          className="w-2 h-2 rounded-full bg-black shrink-0"
                          style={{ opacity: 0.8 }}
                        />

                        <span className="text-sm sm:text-base text-[#0A0A0A] font-['Poppins'] leading-[1.4]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/services/${service.slug}`} className="group inline-flex items-center justify-between transition-all duration-300 rounded-full w-full sm:w-auto max-w-[280px] h-12 sm:h-14 bg-[#0168B4] text-white px-4 gap-3 text-sm sm:text-base font-medium">
                  <span>Explore Services</span>
                  <span className="bg-white rounded-full w-11 h-11 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 text-[#0168B4]" />
                  </span>
                </Link>
              </div>

              {/* Image Container matching rounded borders in screenshot */}
              <div className="flex-1 w-full h-[320px] md:h-[420px]">
                <div className="relative rounded-[35px] md:rounded-[50px] overflow-hidden h-full border-4 border-white/20">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices2;