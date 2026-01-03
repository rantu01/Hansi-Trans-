"use client";
import React, { useEffect, useState } from "react";
import { Menu, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

const HansiTrans = () => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // 🔹 State updated to hold full site info
  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi Trans" // Default text
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Others", path: "/others" },
  ];

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success && data?.data) {
          setSiteConfig({
            logo: data.data.logo || null,
            brandText: data.data.brandText || "Hansi Trans"
          });
        }
      } catch (error) {
        console.error("Site data fetch failed", error);
      }
    };
    fetchSiteData();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      {/* 🔹 Video Background (GIF replaced, design unchanged) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Gif-latest-dev.webm" type="video/webm" />
      </video>

      {/* overlay (same visual depth as GIF) */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo & Brand Text (Dynamic & Centered) */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center space-y-1 flex-1 text-center"
          >
            <img
              src={siteConfig.logo || "/Hansi-Logo1.png"}
              onError={(e) => {
                e.currentTarget.src = "/Hansi-Logo1.png";
              }}
              alt="hansi logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            {/* Dynamic Brand Text exactly below logo */}
            <span className="text-xl md:text-2xl font-bold tracking-wider">
              {siteConfig.brandText}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8 flex-[2]">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="hover:bg-blue-400 text-sm lg:text-base text-white bg-[#4e728e] bg-opacity-20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-gray-500 rounded px-2 py-1 text-white outline-none cursor-pointer"
            >
              <option className="text-black" value="EN">EN</option>
              <option className="text-black" value="ES">ES</option>
              <option className="text-black" value="FR">FR</option>
            </select>

            <Link
              href="/contact"
              className="bg-transparent border border-gray-500 px-4 lg:px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition whitespace-nowrap text-sm lg:text-base"
            >
              Let's connect
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-6 z-40 p-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="text-xl hover:text-blue-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-[#347fb9] text-center w-full max-w-xs py-3 rounded-full font-semibold"
            >
              Let's connect
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section (UNCHANGED) */}
      <section className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 font-bold">
            Global Localization, Voice-Over &{" "}
            <span className="text-blue-400">Cross-Border</span> Marketing
          </h1>

          <p className="text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto px-2">
            From websites to memorable brand identities, we turn your vision
            into a digital experience. Let's build something
            unforgettable—together!
          </p>
        </div>
      </section>
    </div>
  );
};

export default HansiTrans;