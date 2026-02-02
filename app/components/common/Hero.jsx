"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react"; // Added ChevronDown
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { API } from "@/app/config/api";
import axios from "axios"; // Added axios
import { motion, AnimatePresence } from "framer-motion"; // Added framer-motion
import ServiceMegaMenu from "../home/ServiceMegaMenu";

const Hero = ({
  title = "About HS+",
  breadcrumb = "Home  ›  About Us",
  description = "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.",
  children,
}) => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi",
  });

  // Modal States from first code
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [subServices, setSubServices] = useState([]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Others", path: "#", isOthers: true }, // Updated path and flag
  ];

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success && data?.data) {
          setSiteConfig({
            logo: data.data.logo || null,
            brandText: data.data.brandText || "Hansi",
          });
        }
      } catch (error) {
        console.error("Hero site data fetch failed", error);
      }
    };
    fetchSiteData();
  }, []);

  return (
    <section className="relative min-h-[100svh] md:min-h-screen w-full overflow-hidden text-white flex flex-col bg-secondary">

      {/* 🔹 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/upper-cloud.webm" type="video/webm" />
      </video>
      <div className="absolute inset-x-0 bottom-0 w-full z-[1] pointer-events-none">
        <img
          src="/hero-gradient.png"
          alt="gradient overlay"
          className="w-full h-auto object-cover block"
        />
      </div>
      {/* overlay - Using secondary color with opacity for depth */}
      <div className="absolute inset-0 bg-secondary/40 z-0"></div>

      <div className="container mx-auto relative z-10 pt-2 flex-grow flex flex-col">
        {/* ================= NAVBAR ================= */}
        <nav className="relative z-50 mb-16">
          <div className="flex justify-between items-center">
            {/* Logo & Brand Text */}
            <Link href="/" className="flex items-center justify-center flex-1">
              <img
                src={siteConfig.logo || "/logoWithText.png"}
                onError={(e) => {
                  e.currentTarget.src = "/logoWithText.png";
                }}
                alt="hansi logo"
                className="w-[183px] h-[72px] object-contain"
                style={{
                  width: '183px',
                  height: '72px'
                }}
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="container mx-auto px-4 md:px-6 py-4 md:py-4 relative z-50">
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
                      className="appearance-none flex h-[52px] w-full px-[20px] pr-[48px] py-[4px] justify-center items-center gap-3 rounded-full bg-transparent border border-white text-white text-sm outline-none cursor-pointer"
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
                          if (item.isOthers) setIsModalOpen(true);
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

            {/* Right Action */}
            {/* <div className="hidden md:flex items-center justify-end space-x-4 flex-1 ">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none rounded-3xl bg-black border border-white/20 pl-4 pr-10 py-3 text-white outline-none cursor-pointer text-sm"
                >
                  <option value="EN">EN</option>
                  <option value="ES">ES</option>
                  <option value="FR">FR</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <Link
                href="/contact"
                className="group flex items-center gap-3 bg-transparent border border-[#E0E4FF] pl-5 pr-1.5 py-1.5 rounded-full font-semibold text-white hover:bg-white hover:text-primary transition-all duration-300 whitespace-nowrap text-sm lg:text-base"
              >
                Let's connect
                <span className="bg-white rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ArrowUpRight className="w-7 h-7 text-primary" strokeWidth={2} />
                </span>
              </Link>
            </div> */}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 z-[60]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="md:hidden fixed inset-0 bg-secondary/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-50 p-6 overflow-y-auto"
              >
                {navLinks.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/" && pathname.startsWith(item.path));

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.isOthers) setIsModalOpen(true);
                      }}
                      className={`text-2xl font-medium transition-colors
                        ${isActive ? "text-primary" : "text-white hover:text-primary"}`}
                    >
                      {item.isOthers ? item.name : <Link href={item.path}>{item.name}</Link>}
                    </button>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="bg-accent text-white text-center w-full max-w-xs py-4 rounded-full font-semibold text-lg shadow-xl shadow-accent/20"
                >
                  Let's connect
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Modal/Mega Menu - Added the logic from first file */}
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

        {/* ================= HERO CONTENT ================= */}
        <div className="relative mt-auto mb-40 md:mb-60">
          <div className="flex flex-col md:flex-row justify-between items-end pb-4">
            {/* Left */}
            <div className="w-full md:w-1/2 mb-10 md:-mb-30">
              <p
                className="mb-4 text-cta-text opacity-90 text-start"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontStyle: 'normal', // Regular style
                  fontSize: '16px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                }}
              >
                {breadcrumb}
              </p>
              <h1
                className="text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500', // Medium
                  fontStyle: 'normal',
                  fontSize: '60px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  textTransform: 'capitalize'
                }}
              >
                {title}
              </h1>
            </div>

            {/* Right */}
            <div className="w-full md:w-[40%] mt-12 md:mt-14 md:relative md:top-8">
              <p className="text-sm md:text-lg leading-relaxed text-cta-text opacity-90">
                {description}
              </p>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="w-full h-[160px] md:h-[300px] relative mt-[-150px] opacity-50">
            <Image
              src="/Vector Line.svg"
              alt="decorative line"
              fill
              className="object-fill"
              priority
            />
          </div>
        </div>

        {/* ================= CHILDREN SLOT ================= */}
        {children && (
          <div className="relative z-10 mt-[-60px] md:mt-[-150px]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;