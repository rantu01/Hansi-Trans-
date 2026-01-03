"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api"; // আপনার API পাথ অনুযায়ী নিশ্চিত হয়ে নিন

const OurServices = () => {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
          setServiceList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return null; // অথবা একটি subtle Skeleton দিতে পারেন

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 w-fit">
              <Sparkles size={14} className="text-gray-600" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">
                Service
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2]">
              Our Best Valuable <br /> Service For You
            </h2>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-10">
          {serviceList.map((service, index) => (
            <div
              key={service.slug}
              className={`${service.bgColor || "bg-[#e0f2fe]"} rounded-[40px] p-8 md:p-12 flex flex-col ${
                index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-12`}
            >
              {/* Text */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs font-medium transition group"
                >
                  Explore Services
                  <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition">
                    <ArrowUpRight size={14} className="text-[#0066b2]" />
                  </span>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 w-full h-[300px] md:h-[400px]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-[30px]"
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