"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";

const ServiceCard = ({ service }) => {
  return (
    <section className="py-20 px-6 md:px-12 font-sans ">
      <div className="container mx-auto">
        <div
          /* Default to a very light version of primary (bg-primary/5) 
             if no specific branded color is passed.
          */
          className={`${service.bgColor || "bg-primary/5"} rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 shadow-xl shadow-primary/5 border border-primary/10`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {service.title}
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {service.description}
            </p>

            <div className="space-y-3">
              <p className="font-bold text-secondary uppercase text-xs tracking-wider">
                Key Features:
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button className="inline-flex items-center gap-3 bg-primary hover:bg-accent text-white px-8 py-3 rounded-full text-sm font-bold transition-all group mt-4 shadow-lg shadow-primary/20">
              Explore More
              <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={16} className="text-primary" />
              </span>
            </button>
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
      </div>
    </section>
  );
};

export default ServiceCard;