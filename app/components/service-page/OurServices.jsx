"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const OurServices = () => {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
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
    <section className="bg-background py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-xl">
            {/* Badge updated to use primary theme colors */}
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full mb-6 w-fit border border-primary/10">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Service
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-12">
          {serviceList.map((service, index) => (
            <div
              key={service.slug}
              className={`rounded-[40px] p-8 md:p-12 flex flex-col ${
                index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 border border-primary/5 
              ${index % 2 === 0 ? "bg-primary/30" : "bg-gradient-base/10"}`} // Alternates between primary blue and sky blue theme
            >
              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-foreground">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed md:text-base">
                  {service.description}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-accent text-white px-8 py-3 rounded-full text-sm font-bold transition-all group"
                >
                  Explore Services
                  <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight size={16} className="text-primary" />
                  </span>
                </Link>
              </div>

              {/* Image Content */}
              <div className="flex-1 w-full h-[300px] md:h-[450px] overflow-hidden rounded-[30px] group/img">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;