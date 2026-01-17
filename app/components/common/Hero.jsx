"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { API } from "@/app/config/api";

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

      {/* overlay - Using secondary color with opacity for depth */}
      <div className="absolute inset-0 bg-secondary/40 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-6 flex-grow flex flex-col">
        {/* ================= NAVBAR ================= */}
        <nav className="relative z-50 mb-16">
          <div className="flex justify-between items-center">
            {/* Logo & Brand Text */}
            <Link href="/" className="flex flex-col items-center justify-center space-y-1 flex-1 text-center">
            <img
              src={siteConfig.logo || "/Hansi-Logo1.png"}
              onError={(e) => { e.currentTarget.src = "/Hansi-Logo1.png"; }}
              alt="hansi logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span className="text-xl md:text-2xl font-bold tracking-wider">{siteConfig.brandText}</span>
          </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8 flex-[2]">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    /* Replaced blue-400 with primary and custom bg with secondary/20 */
                    className={`text-sm lg:text-base rounded-3xl transition-all px-4 py-2 whitespace-nowrap
                      ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-white bg-secondary/20 backdrop-blur-md border border-white/10 hover:bg-primary"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Action */}
            <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-white/30 rounded px-2 py-1 text-white outline-none cursor-pointer text-sm"
              >
                <option className="text-black" value="EN">EN</option>
                <option className="text-black" value="BN">BN</option>
              </select>

              <Link
                href="/contact"
                className="border border-white/40 px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-secondary transition-all"
              >
                Let's connect
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 z-[60]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden fixed inset-0 bg-secondary/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-50 p-6 overflow-y-auto">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-2xl font-medium transition-colors
                      ${
                        isActive
                          ? "text-primary"
                          : "text-white hover:text-primary"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                /* Replaced #347fb9 with accent color */
                className="bg-accent text-white text-center w-full max-w-xs py-4 rounded-full font-semibold text-lg shadow-xl shadow-accent/20"
              >
                Let's connect
              </Link>
            </div>
          )}
        </nav>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative mt-auto mb-40 md:mb-60">
          <div className="flex flex-col md:flex-row justify-between items-end pb-4">
            {/* Left */}
            <div className="w-full md:w-1/2 mb-10 md:-mb-30">
              <p className="text-xs md:text-sm tracking-widest text-cta-text opacity-90 mb-4 uppercase">
                {breadcrumb}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-white">{title}</h1>
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