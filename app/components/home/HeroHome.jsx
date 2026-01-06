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
    <div className="min-h-screen text-white overflow-x-hidden relative">
      <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/Gif-latest-dev.webm" type="video/webm" />
      </video>

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
              <Link key={item.name} href={item.path} className="hover:bg-blue-400 text-sm lg:text-base text-white bg-[#4e728e] bg-opacity-20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2">
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
              <Link key={item.name} href={item.path} className="text-xl hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="bg-[#347fb9] text-center w-full max-w-xs py-3 rounded-full font-semibold">
              Let's connect
            </Link>
          </div>
        )}
      </nav>

      <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 font-bold">
            Global Localization, Voice-Over & <span className="text-blue-400">Cross-Border</span> Marketing
          </h1>
          <p className="text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto px-2">
            From websites to memorable brand identities, we turn your vision into a digital experience. Let's build something unforgettable—together!
          </p>

          <div className="relative w-full mt-10">
            <div className="relative md:absolute md:inset-0 flex flex-col items-center justify-center md:justify-start md:pt-10 z-0 mb-10 md:mb-0 order-1">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <Link href="/contact" className="bg-[#0066b2] text-white pl-6 pr-2 py-2 rounded-full flex items-center gap-3 font-medium hover:bg-blue-700 transition shadow-lg">
                  Let's Work Together?
                  <span className="bg-white text-[#0066b2] rounded-full p-2"><ArrowRight className="w-4 h-4" /></span>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    ))}
                  </div>
                  <div className="text-left text-sm leading-tight">
                    <p className="font-bold text-white">120K+</p>
                    <p className="text-gray-300 text-xs">Happy Customers</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                <div className="flex text-blue-400 text-lg md:text-xl">★★★★<span className="text-gray-400">★</span></div>
                <div className="text-xs md:text-sm text-gray-200 font-medium leading-tight text-center sm:text-left">
                  Backed by 100,000+ successful <br className="hidden sm:block" /> companies worldwide
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4 md:block px-4 sm:px-0">
              <div className="flex flex-col md:flex-row justify-between w-full md:mb-16 md:px-8 gap-4">
                {services[0] && (
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-blue-900 transition shadow-xl md:-ml-10">
                    {services[0].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
                {services[1] && (
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-blue-900 transition shadow-xl md:-mr-10">
                    {services[1].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between w-full md:mb-16 md:px-20 gap-4">
                {services[2] && (
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-blue-900 transition shadow-xl">
                    {services[2].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
                {services[3] && (
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-blue-900 transition shadow-xl">
                    {services[3].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
              <div className="flex justify-center w-full mt-4 md:mt-0">
                {services[4] && (
                  <button className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-900 transition shadow-xl">
                    {services[4].title} <span className="bg-gray-700 p-1 rounded text-[10px]">📚</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HansiTrans;