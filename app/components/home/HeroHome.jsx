"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, Layers, ChevronDown } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";
import { motion, AnimatePresence } from "framer-motion";
import ServiceMegaMenu from "./ServiceMegaMenu";

const HansiTrans = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi Trans",
  });
  const [selectedService, setSelectedService] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    { name: "Others", path: "#", isOthers: true }, // Others trigger korbe
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

  // সার্ভিস বা 'Others' এ ক্লিক করলে এই ফাংশনটি রান হবে
  const handleServiceClick = async (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    if (service?.slug) {
        try {
          const res = await axios.get(API.services.details(service.slug));
          if (res.data.success) {
            setSubServices(res.data.data.childServices || []);
          }
        } catch (error) {
          console.error("Error fetching sub-services", error);
        }
    }
  };

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-[auto] md:min-h-screen text-white overflow-x-hidden relative">
      {/* Background Video */}
      <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/Gif-latest-dev2.webm" type="video/webm" />
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
          <Link href="/" className="flex items-center justify-center flex-1">
            <img
              src={siteConfig.logo || "/logoWithText.png"}
              onError={(e) => {
                e.currentTarget.src = "/logoWithText.png";
              }}
              alt="hansi logo"
              className="w-[183px] h-[72px] object-contain"
              style={{ width: '183px', height: '72px' }}
            />
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-5 flex-[2]">
            {navLinks.map((item) => (
              item.isOthers ? (
                <button
                  key={item.name}
                  onClick={() => setIsModalOpen(true)}
                  className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '150%',
                    fontStyle: 'normal',
                    color: '#FFF'
                  }}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '150%',
                    fontStyle: 'normal',
                    color: '#FFF'
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4 flex-1 ">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none flex h-[56px] w-full px-[20px] pr-[48px] py-[4px] justify-center items-center gap-3 rounded-full bg-[#0A0A0A] border border-white/20 text-white text-sm outline-none cursor-pointer"
              >
                <option value="EN">EN</option>
                <option value="ES">ES</option>
                <option value="FR">FR</option>
              </select>
              <ChevronDown size={22} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" />
            </div>

            <Link
              href="/contact"
              className="group flex items-center justify-center transition-all duration-300 whitespace-nowrap bg-white border border-[#E0E4FF] rounded-full"
              style={{
                height: '52px',
                padding: '4px 4px 4px 12px',
                gap: '8px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.16px',
                color: '#0168B4',
                fontStyle: 'normal'
              }}
            >
              Let's connect
              <span className="bg-[#0168B4] rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
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
                <button 
                  key={item.name} 
                  className="text-xl hover:text-primary transition-colors text-white" 
                  onClick={() => {
                    setMenuOpen(false);
                    if(item.isOthers) setIsModalOpen(true);
                  }}
                >
                  {item.isOthers ? item.name : <Link href={item.path}>{item.name}</Link>}
                </button>
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
            className="mb-4 text-white text-center"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: '500',
              lineHeight: '110%',
              letterSpacing: '-2.4px',
              textTransform: 'capitalize',
            }}
          >
            Global Localization, Voice-Over & Cross-Border Marketing
          </h1>

          <p
            className="mx-auto mb-8 max-w-4xl px-2 capitalize"
            style={{
              color: '#ffff',
              textAlign: 'center',
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '150%',
              fontStyle: 'normal',
            }}
          >
            Make it once, bring it to life, and take it worldwide—with one team.
          </p>

          <div className="relative w-full min-h-[450px] md:min-h-[600px] flex items-center justify-center mt-4">
            <div className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 z-30">
              <Link
                href="/contact"
                className="group flex items-center justify-center transition-all duration-300 whitespace-nowrap rounded-[100px]"
                style={{
                  height: '52px',
                  padding: '4px 4px 4px 12px',
                  gap: '8px',
                  background: '#0168B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                  color: '#FFF',
                  fontStyle: 'normal'
                }}
              >
                Let's Work Together?
                <span
                  className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-12"
                  style={{
                    display: 'flex',
                    width: '42px',
                    height: '42px',
                    padding: '8px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    aspectRatio: '1/1',
                    borderRadius: '24px',
                    background: '#FFF'
                  }}
                >
                  <ArrowUpRight className="w-6 h-6 text-[#0168B4]" strokeWidth={2} />
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
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={dropIn}
                    className={`absolute ${positions[index]} pointer-events-auto`}
                  >
                    <button
                      className="flex transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
                      style={{
                        width: 'auto',
                        height: '61px',
                        padding: '12px 16px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        borderRadius: '38px',
                        background: '#0A0A0A',
                        backdropFilter: 'blur(186.9px)',
                        color: '#FFFFFF'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '16px',
                          fontWeight: '500',
                          lineHeight: '160%',
                          letterSpacing: '0.16px',
                          color: '#FFF'
                        }}
                      >
                        {service.title}
                      </span>
                      <span className="bg-gray-800 p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                        {serviceIcons[index]}
                      </span>
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

        {/* Modal/Mega Menu */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
              />
              <ServiceMegaMenu
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mainService={selectedService}
                subServices={subServices}
              />
            </>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default HansiTrans;