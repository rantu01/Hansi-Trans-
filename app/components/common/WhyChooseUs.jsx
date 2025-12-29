"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Settings,
  Globe2,
  Gamepad2,
  Clock,
} from "lucide-react";
import { API } from "@/app/config/api";

/* icon mapper */
const ICONS = {
  Gamepad2: Gamepad2,
  Settings: Settings,
  Globe2: Globe2,
  Clock: Clock,
};

const WhyChooseUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWhyChoose = async () => {
      try {
        const res = await fetch(API.WhyChooseUs, {
          cache: "no-store",
        });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("WhyChooseUs fetch failed");
      }
    };

    fetchWhyChoose();
  }, []);

  if (!data) return null;

  const getCard = (key) =>
    data.cards.find((c) => c.key === key);

  const left = getCard("left");
  const middleTop = getCard("middleTop");
  const middleBottom = getCard("middleBottom");
  const right = getCard("right");

  const LeftIcon = ICONS[left?.icon];
  const MidTopIcon = ICONS[middleTop?.icon];
  const MidBottomIcon = ICONS[middleBottom?.icon];
  const RightIcon = ICONS[right?.icon];

  return (
    <section className="py-20 bg-[#020d1f] text-white rounded-t-4xl">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-700 text-sm font-medium text-gray-300 mb-6 bg-white/5 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why People Choose HS+?
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Left Large Card */}
          <div className="bg-white rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl">
            <div className="text-left">
              <h3 className="text-[#0066b2] text-3xl font-bold mb-6">
                {left.title.split("<br />")[0]} <br />
                {left.title.split("<br />")[1]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {left.description}
              </p>
            </div>
            <div className="mt-10">
              {LeftIcon && (
                <LeftIcon className="w-14 h-14 text-[#0066b2]" />
              )}
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl">
              <div className="mt-2">
                {MidTopIcon && (
                  <MidTopIcon className="w-10 h-10 text-[#0066b2]" />
                )}
              </div>
              <div className="text-left">
                <h3 className="text-[#0066b2] text-xl font-bold mb-3">
                  {middleTop.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  {middleTop.description}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[35px] p-8 flex flex-row items-start gap-6 h-1/2 shadow-xl">
              <div className="mt-2">
                {MidBottomIcon && (
                  <MidBottomIcon className="w-10 h-10 text-[#0066b2]" />
                )}
              </div>
              <div className="text-left">
                <h3 className="text-[#0066b2] text-xl font-bold mb-3">
                  {middleBottom.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  {middleBottom.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Large Card */}
          <div className="bg-white rounded-[35px] p-10 flex flex-col justify-between h-[500px] md:h-auto shadow-xl">
            <div className="text-left">
              <h3 className="text-[#0066b2] text-3xl font-bold mb-6">
                {right.title.split("<br />")[0]} <br />
                {right.title.split("<br />")[1]}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {right.description}
              </p>
            </div>
            <div className="mt-10 flex justify-end">
              <div className="relative">
                {RightIcon && (
                  <RightIcon className="w-14 h-14 text-[#0066b2]" />
                )}
                {right.badge && (
                  <span className="absolute -bottom-1 -right-1 bg-[#0066b2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {right.badge}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
