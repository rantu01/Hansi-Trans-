"use client";
import React, { useEffect, useState } from "react";
import { Menu, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";

const HansiTrans = () => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi Trans",
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
    const fetchData = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success && data?.data) {
          setSiteConfig({
            logo: data.data.logo || null,
            brandText: data.data.brandText || "Hansi Trans",
          });
        }
        const serviceRes = await axios.get(API.services.main);
        if (serviceRes.data.success) {
          const mainServices = serviceRes.data.data.filter((s) => !s.parentService);
          setServices(mainServices.slice(0, 5));
        }
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };
    fetchData();
  }, []);

  return (
    // md screen theke min-h-screen ensure kora hoyeche
    <div className="min-h-[auto] md:min-h-screen text-white overflow-x-hidden relative">
      {/* Background Video */}
      <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/Gif-latest-dev.webm" type="video/webm" />
      </video>

      {/* Navigation */}
      <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 relative z-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center justify-center space-y-1 flex-1 text-center">
            <img
              src={siteConfig.logo || "/Hansi-Logo1.png"}
              onError={(e) => { e.currentTarget.src = "/Hansi-Logo1.png"; }}
              alt="hansi logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span className="text-xl md:text-2xl font-bold tracking-wider">{siteConfig.brandText}</span>
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8 flex-[2]">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.path} className="hover:bg-gradient-base text-sm lg:text-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent border border-gray-500 rounded px-2 py-1 text-white outline-none cursor-pointer">
              <option className="text-black" value="EN">EN</option>
              <option className="text-black" value="ES">ES</option>
              <option className="text-black" value="FR">FR</option>
            </select>
            <Link href="/contact" className="bg-transparent border border-gray-500 px-4 lg:px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-black transition whitespace-nowrap text-sm lg:text-base">
              Let's connect
            </Link>
          </div>

          <button className="md:hidden p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-6 z-40 p-6">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.path} className="text-xl hover:text-gradient-base transition-colors" onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="bg-accent text-center w-full max-w-xs py-3 rounded-full font-semibold">
              Let's connect
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 md:py-12 flex flex-col items-center text-center relative z-10">
        <div className="max-w-5xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight mb-4 font-bold">
            Global Localization, Voice-Over & <span className="text-gradient-base">Cross-Border</span> Marketing
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto px-2">
            Make it once, bring it to take it worldwide—with Hansi Trans.
          </p>

          <div className="relative w-full min-h-[450px] md:min-h-[600px] flex items-center justify-center mt-4">
            
            {/* CTA & Customer Info Section */}
            <div className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 z-30">
              <Link href="/contact" className="bg-primary text-white pl-6 pr-2 py-2 rounded-full flex items-center gap-3 font-medium hover:opacity-90 transition shadow-lg text-sm md:text-base">
                Let's Work Together?
                <span className="bg-white text-primary rounded-full p-2"><ArrowRight className="w-4 h-4" /></span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  ))}
                </div>
                <div className="text-left text-sm leading-tight">
                  <p className="font-bold text-white">120K+</p>
                  <p className="text-gray-300 text-[10px] md:text-xs">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Middle Panda Video - Sizes increased */}
            <div className="relative z-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
              <video autoPlay loop muted playsInline className="w-full h-full object-contain scale-110 md:scale-125">
                <source src="/convertedPanda.webm" type="video/webm" />
              </video>
            </div>

            {/* Desktop Surrounding Service Buttons (Absolute Positioned) */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {/* Left Side Buttons */}
              <div className="absolute top-[35%] left-0 pointer-events-auto">
                {services[0] && (
                  <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                    {services[0].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
              <div className="absolute top-[55%] left-[10%] pointer-events-auto">
                {services[1] && (
                  <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                    {services[1].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>

              {/* Right Side Buttons */}
              <div className="absolute top-[35%] right-0 pointer-events-auto">
                {services[2] && (
                  <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                    {services[2].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
              <div className="absolute top-[55%] right-[10%] pointer-events-auto">
                {services[3] && (
                  <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                    {services[3].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>

              {/* Bottom Button */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 pointer-events-auto">
                {services[4] && (
                  <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                    {services[4].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile View Service Buttons (Visible only on small screens) */}
            <div className="md:hidden absolute bottom-[-40px] left-0 right-0 flex flex-wrap justify-center gap-3 px-4">
              {services.map((service, index) => (
                <button key={index} className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs flex items-center gap-1 shadow-lg">
                  {service.title} <span className="text-[8px]">📚</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HansiTrans;