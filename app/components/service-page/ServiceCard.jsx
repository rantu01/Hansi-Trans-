"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <section className="py-20 px-6 md:px-12 font-sans">
      <div className="container mx-auto">
        <div
          className={`${service.bgColor} rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-lg`}
        >
          {/* Text */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              {service.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">{service.description}</p>

            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Key Features:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {service.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>

            <button className="inline-flex items-center gap-2 bg-[#0066b2] hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-xs md:text-sm font-medium transition group mt-4">
              Explore More
              <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition">
                <ArrowUpRight size={14} className="text-[#0066b2]" />
              </span>
            </button>
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
      </div>
    </section>
  );
};

export default ServiceCard;
