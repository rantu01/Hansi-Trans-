"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";
import { motion, AnimatePresence } from "framer-motion";

const HansiTrans = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi Trans",
  });

  // সার্ভিস অনুযায়ী আইকন ম্যাপ
  const serviceIcons = [
    <Layers key="1" className="w-4 h-4 text-white" />,
    <Layers key="2" className="w-4 h-4 text-white" />,
    <Layers key="3" className="w-4 h-4 text-white" />,
    <Layers key="4" className="w-4 h-4 text-white" />,
    <Layers key="5" className="w-4 h-4 text-white" />
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Others", path: "/others" },
  ];

  const dropIn = {
    hidden: { y: -100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    })
  };

  useEffect(() => {
    setMounted(true); // Hydration mismatch রক্ষা করবে
    const fetchData = async () => {
      try {
        // Config fetch
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success && data?.data) {
          setSiteConfig({
            logo: data.data.logo || null,
            brandText: data.data.brandText || "Hansi Trans",
          });
        }
        
        // Services fetch
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

  // সার্ভার সাইড রেন্ডারিং এর সময় খালি রিটার্ন করবে যাতে লেআউট না ভাঙে
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-[auto] md:min-h-screen text-white overflow-x-hidden relative">
      {/* Background Video */}
      <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/Gif-latest-dev.webm" type="video/webm" />
      </video>

      {/* Hero Image Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 w-full z-[1] pointer-events-none">
        <img
          src="/hero-gradient.png"
          alt="gradient overlay"
          className="w-full h-auto object-cover block"
        />
      </div>

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

          <div className="hidden md:flex items-center justify-end space-x-4 flex-1 ">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-3xl bg-black border border-white/20 px-4 py-2 text-white outline-none cursor-pointer text-sm">
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
            </select>
            <Link
              href="/contact"
              className="group flex items-center gap-3 bg-transparent border border-[#E0E4FF] pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-white hover:bg-white hover:text-primary transition-all duration-300 whitespace-nowrap text-sm lg:text-base"
            >
              Let's connect
              <span className="bg-white rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ArrowUpRight className="w-7 h-7 text-primary" strokeWidth={2} />
              </span>
            </Link>
          </div>

          <button className="md:hidden p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-6 z-40 p-6"
            >
              {navLinks.map((item) => (
                <Link key={item.name} href={item.path} className="text-xl hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="bg-primary text-center w-full max-w-xs py-3 rounded-full font-semibold text-white">
                Let's connect
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 md:py-12 flex flex-col items-center text-center relative z-10">
        <div className="max-w-6xl w-full">
          <h1
            className="mb-4 text-white capitalize"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: 'clamp(32px, 5vw, 80px)',
              fontWeight: '500',
              lineHeight: '110%',
              letterSpacing: '-2.4px',
              textAlign: 'center'
            }}
          >
            Global Localization, Voice-Over & Cross-Border Marketing
          </h1>

          <p
            className="mx-auto mb-8 max-w-4xl px-2 capitalize"
            style={{
              color: '#0A0A0A',
              textAlign: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '150%',
            }}
          >
            Make it once, bring it to life, and take it worldwide—with one team.
          </p>

          <div className="relative w-full min-h-[450px] md:min-h-[600px] flex items-center justify-center mt-4">

            {/* CTA & Customer Info Section */}
            <div className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 z-30">
              <Link
                href="/contact"
                className="group bg-primary text-white pl-6 pr-1.5 py-1.5 rounded-full flex items-center gap-3 font-medium hover:bg-secondary transition-all duration-300 shadow-lg text-sm md:text-base w-fit"
              >
                Let's Work Together?
                <span className="bg-white rounded-full p-2 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <ArrowUpRight className="w-4 h-4 text-primary" strokeWidth={2} />
                </span>
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

            {/* Middle Panda Video */}
            <div className="relative z-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
              <div className="absolute bottom-[5%] md:bottom-6 w-[80%] h-[20%] z-[-1] opacity-70">
                <img src="/Ellipse.png" alt="shadow" className="w-full h-full object-contain" />
              </div>
              <video autoPlay loop muted playsInline className="w-full h-full object-contain scale-110 md:scale-125">
                <source src="/convertedPanda.webm" type="video/webm" />
              </video>
            </div>

            {/* Desktop Service Buttons */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {services.map((service, index) => {
                const positions = [
                  "top-[35%] left-0",
                  "top-[55%] left-[10%]",
                  "top-[35%] right-0",
                  "top-[55%] right-[10%]",
                  "bottom-[10%] left-1/2 -translate-x-1/2"
                ];
                return (
                  <motion.div 
                    key={service._id || index}
                    custom={index} initial="hidden" animate="visible" variants={dropIn}
                    className={`absolute ${positions[index]} pointer-events-auto`}
                  >
                    <button className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary transition shadow-2xl">
                      {service.title} <span className="bg-gray-800 p-1.5 rounded-full">{serviceIcons[index]}</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Service Buttons */}
            <div className="md:hidden absolute bottom-[-40px] left-0 right-0 flex flex-wrap justify-center gap-3 px-4">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  custom={index} initial="hidden" animate="visible" variants={dropIn}
                  className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg"
                >
                  {service.title} <span className="scale-75">{serviceIcons[index]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HansiTrans;