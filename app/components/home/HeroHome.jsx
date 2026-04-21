"use client";
import React, { useEffect, useState, useRef } from "react";
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
  const [showOthersDropdown, setShowOthersDropdown] = useState(false);

  // hover tracking
  const closeTimerRef = useRef(null);
  const isHoveringButtonRef = useRef(false);
  const isHoveringMenuRef = useRef(false);

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
    { name: "Others", path: "#", isOthers: true },
  ];

  const othersLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-condition" }
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

  // close করার আগে check করে — button বা menu কোনোটায় hover আছে কিনা
  const scheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      if (!isHoveringButtonRef.current && !isHoveringMenuRef.current) {
        setIsModalOpen(false);
        setSelectedService(null);
        setSubServices([]);
      }
    }, 1000);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleServiceHover = async (service) => {
    isHoveringButtonRef.current = true;
    cancelClose();
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
        setSubServices([]);
      }
    } else {
      setSubServices([]);
    }
  };

  const handleServiceMouseLeave = () => {
    isHoveringButtonRef.current = false;
    scheduleClose();
  };

  const handleMegaMenuMouseEnter = () => {
    isHoveringMenuRef.current = true;
    cancelClose();
  };

  const handleMegaMenuMouseLeave = () => {
    isHoveringMenuRef.current = false;
    scheduleClose();
  };

  const handleClose = () => {
    isHoveringButtonRef.current = false;
    isHoveringMenuRef.current = false;
    cancelClose();
    setIsModalOpen(false);
    setSelectedService(null);
    setSubServices([]);
  };

  const handleOthersClick = () => {
    setShowOthersDropdown(!showOthersDropdown);
  };

  // Navbar Service Click Handler
  const handleServiceNavClick = () => {
    setSelectedService(null);
    setSubServices([]);
    setIsModalOpen(true);
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

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
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
        <img src="/hero-gradient.png" alt="gradient overlay" className="w-full h-auto object-cover block" />
      </div>

      {/* Navigation */}
      <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 relative z-50">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center justify-center flex-1">
            <img
              src={siteConfig.logo || "/logoWithText.png"}
              onError={(e) => { e.currentTarget.src = "/logoWithText.png"; }}
              alt="hansi TRANS+"
              className="w-[183px] h-[72px] object-contain"
              style={{ width: '183px', height: '72px' }}
            />
          </Link>

          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-5 flex-[2]">
            {navLinks.map((item) => (
              item.isService ? (
                <Link
                  key={item.name}
                  href="/services"
                  onMouseEnter={() => handleServiceHover(null)}
                  onMouseLeave={handleServiceMouseLeave}
                  className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                  style={{ fontSize: '16px', fontWeight: '400', lineHeight: '150%', fontStyle: 'normal', color: '#FFF' }}
                >
                  {item.name}
                </Link>
              ) : item.isOthers ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={handleOthersClick}
                    className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                    style={{ fontSize: '16px', fontWeight: '400', lineHeight: '150%', fontStyle: 'normal', color: '#FFF' }}
                  >
                    {item.name}
                  </button>
                  
                  {/* Others Dropdown */}
                  <AnimatePresence>
                    {showOthersDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 bg-white rounded-2xl shadow-xl overflow-hidden min-w-[200px] z-50"
                      >
                        {othersLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setShowOthersDropdown(false)}
                            className="block px-6 py-3 text-gray-800 hover:bg-blue-50 transition-colors"
                            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '500' }}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                  style={{ fontSize: '16px', fontWeight: '400', lineHeight: '150%', fontStyle: 'normal', color: '#FFF' }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
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
              style={{ height: '52px', padding: '4px 4px 4px 12px', gap: '8px', fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '160%', letterSpacing: '0.16px', color: '#0168B4', fontStyle: 'normal' }}
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
                item.isService ? (
                    <Link
                      key={item.name}
                      href="/services"
                      onClick={() => setMenuOpen(false)}
                      className="text-xl hover:text-primary transition-colors text-white"
                    >
                      {item.name}
                    </Link>
                  ) : item.isOthers ? (
                  <div key={item.name} className="flex flex-col items-center space-y-3">
                    <button
                      className="text-xl hover:text-primary transition-colors text-white"
                      onClick={() => setShowOthersDropdown(!showOthersDropdown)}
                    >
                      {item.name}
                    </button>
                    {showOthersDropdown && (
                      <div className="flex flex-col space-y-2">
                        {othersLinks.map((link) => (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => { setMenuOpen(false); setShowOthersDropdown(false); }}
                            className="text-base text-gray-300 hover:text-white transition-colors"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl hover:text-primary transition-colors text-white"
                  >
                    {item.name}
                  </Link>
                )
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
            style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(32px, 8vw, 80px)', fontWeight: '500', lineHeight: '110%', letterSpacing: '-2.4px', textTransform: 'capitalize' }}
          >
            Global Localization, Voice-Over & Cross-Border Marketing
          </h1>

          <p
            className="mx-auto mb-8 max-w-4xl px-2 capitalize"
            style={{ color: '#ffff', textAlign: 'center', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '18px', fontWeight: '500', lineHeight: '150%', fontStyle: 'normal' }}
          >
            Make it once, bring it to life, and take it worldwide—with one team.
          </p>

          <div className="relative w-full min-h-[450px] md:min-h-[600px] flex items-center justify-center mt-4">
            {/* CTA + Avatars */}
            <div className="absolute top-0 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 z-30">
              <Link
                href="/contact"
                className="group flex items-center justify-center transition-all duration-300 whitespace-nowrap rounded-[100px]"
                style={{ height: '52px', padding: '4px 4px 4px 12px', gap: '8px', background: '#0168B4', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '160%', letterSpacing: '0.16px', color: '#FFF', fontStyle: 'normal' }}
              >
                Let's Work Together?
                <span className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-12" style={{ display: 'flex', width: '42px', height: '42px', padding: '8px', justifyContent: 'center', alignItems: 'center', gap: '10px', aspectRatio: '1/1', borderRadius: '24px', background: '#FFF' }}>
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
                  <p className="font-bold text-white">1000+</p>
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

            {/* Desktop Service Buttons - Only Hover, No Click */}
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
                    <div
                      className="flex transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{ width: 'auto', height: '61px', padding: '12px 16px', justifyContent: 'center', alignItems: 'center', gap: '8px', borderRadius: '38px', background: '#0A0A0A', backdropFilter: 'blur(186.9px)', color: '#FFFFFF' }}
                    >
                      <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '160%', letterSpacing: '0.16px', color: '#FFF' }}>
                        {service.title}
                      </span>
                      <span className="bg-gray-800 p-1.5 rounded-full flex items-center justify-center flex-shrink-0">
                        {serviceIcons[index]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Service Buttons - Only Hover Effect */}
            <div className="md:hidden absolute bottom-[50px] left-0 right-0 flex flex-wrap justify-center gap-3 px-4 pointer-events-none">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  custom={index} 
                  initial="hidden" 
                  animate="visible" 
                  variants={dropIn}
                  className="bg-black/70 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg"
                >
                  {service.title} <span className="scale-75">{serviceIcons[index]}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mega Menu — backdrop click বা X এ close হবে, hover chain দিয়ে open থাকবে */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop — click করলে close */}
              <div
                className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
                onClick={handleClose}
              />

              {/* Mega Menu wrapper — hover এলে open, চলে গেলে close */}
              <div
                className="fixed z-[100]"
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={handleMegaMenuMouseEnter}
                onMouseLeave={handleMegaMenuMouseLeave}
              >
                <ServiceMegaMenu
                  isOpen={isModalOpen}
                  onClose={handleClose}
                  mainService={selectedService}
                  subServices={subServices}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default HansiTrans;