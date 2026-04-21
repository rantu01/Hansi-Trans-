"use client";
import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { API } from "@/app/config/api";
import { motion, AnimatePresence } from "framer-motion";
import ServiceMegaMenu from "../home/ServiceMegaMenu";

const Hero = ({
  title = "About HS+",
  breadcrumb = "Home  ›  About Us",
  description = "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.",
  children,
  hideContent = false,
}) => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [siteConfig, setSiteConfig] = useState({
    logo: null,
    brandText: "Hansi",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [showOthersDropdown, setShowOthersDropdown] = useState(false);

  // hover tracking for service mega menu
  const closeTimerRef = useRef(null);
  const isHoveringButtonRef = useRef(false);
  const isHoveringMenuRef = useRef(false);

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
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

  const handleServiceHover = (service) => {
    isHoveringButtonRef.current = true;
    cancelClose();
    setSelectedService(service);
    setIsModalOpen(true);
    if (!service?.slug) setSubServices([]);
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

  // Service Nav Click Handler
  const handleServiceNavClick = () => {
    setSelectedService(null);
    setSubServices([]);
    setIsModalOpen(true);
  };

  const handleOthersClick = () => {
    setShowOthersDropdown(!showOthersDropdown);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSubServices([]);
  };

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
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden text-white flex flex-col bg-secondary">
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
      <div className="absolute inset-0 bg-secondary/40 z-0"></div>

      <div className="container mx-auto relative z-10 pt-2 flex-grow flex flex-col">
        {/* ================= NAVBAR ================= */}
        <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 relative z-50">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center justify-center flex-1">
              <img
                src={siteConfig.logo || "/logoWithText.png"}
                onError={(e) => {
                  e.currentTarget.src = "/logoWithText.png";
                }}
                alt="hansi TRANS+"
                className="w-[183px] h-[72px] object-contain"
                style={{ width: "183px", height: "72px" }}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-5 flex-[2]">
              {navLinks.map((item) => (
                item.isService ? (
                  <Link
                    key={item.name}
                    href="/services"
                    onMouseEnter={() => handleServiceHover(null)}
                    onMouseLeave={handleServiceMouseLeave}
                    className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "150%",
                      fontStyle: "normal",
                      color: "#FFF",
                    }}
                  >
                    {item.name}
                  </Link>
                ) : item.isOthers ? (
                  <div key={item.name} className="relative">
                    <button
                      onClick={handleOthersClick}
                      className="hover:bg-gradient-base text-white bg-accent/20 rounded-3xl transition-colors whitespace-nowrap px-4 py-2 font-['Poppins'] font-normal"
                      style={{
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "150%",
                        fontStyle: "normal",
                        color: "#FFF",
                      }}
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
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
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
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "150%",
                      fontStyle: "normal",
                      color: "#FFF",
                    }}
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
                <ChevronDown
                  size={22}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none"
                />
              </div>

              <Link
                href="/contact"
                className="group flex items-center justify-center transition-all duration-300 whitespace-nowrap bg-white border border-[#E0E4FF] rounded-full"
                style={{
                  height: "52px",
                  padding: "4px 4px 4px 12px",
                  gap: "8px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "160%",
                  letterSpacing: "0.16px",
                  color: "#0168B4",
                  fontStyle: "normal",
                }}
              >
                Let's connect
                <span className="bg-[#0168B4] rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={2} />
                </span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 z-50"
              onClick={() => setMenuOpen(!menuOpen)}
            >
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
                              onClick={() => {
                                setMenuOpen(false);
                                setShowOthersDropdown(false);
                              }}
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
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary text-center w-full max-w-xs py-3 rounded-full font-semibold text-white"
                >
                  Let's connect
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Service Mega Menu */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
                onClick={handleClose}
              />
              <div
                className="fixed z-[100]"
                style={{ pointerEvents: "auto" }}
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

        {/* ================= HERO CONTENT ================= */}
        {!hideContent && (
          <div className="relative mt-auto mb-20 md:mb-60 mx-25">
            <div className="flex flex-col md:flex-row justify-between items-end pb-4">
              <div className="w-full md:w-1/2 mb-10 md:-mb-30">
                <p className="mb-4 text-cta-text opacity-90 text-start text-sm md:text-base">
                  {breadcrumb}
                </p>
                <h1
                  className="text-white text-3xl md:text-[60px]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fontStyle: "normal",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                  }}
                >
                  {title}
                </h1>
              </div>

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
        )}

        {/* ================= CHILDREN SLOT ================= */}
        {children && (
          <div className={`relative z-10 ${!hideContent ? "mt-[-150px]" : "mt-0"}`}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;