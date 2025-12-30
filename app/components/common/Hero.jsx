"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = ({
  title = "About HS+",
  breadcrumb = "Home  ›  About Us",
  description = "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.",
  children,
}) => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Others", path: "/others" },
  ];

  return (
    <section className="relative min-h-[100svh] md:min-h-screen w-full overflow-hidden text-white flex flex-col bg-black">
      
      {/* 🔹 VIDEO BACKGROUND (design unchanged) */}
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

      {/* overlay (same depth as GIF) */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-6 flex-grow flex flex-col">
        {/* ================= NAVBAR ================= */}
        <nav className="relative z-50 mb-16">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-1">
              <img
                src="/Hansi-Logo1.png"
                alt="hansi logo"
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <span className="text-xl md:text-2xl font-bold tracking-wider">
                Hansi
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8 flex-[2]">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="hover:bg-blue-400 text-sm lg:text-base text-white bg-[#4e728e] bg-opacity-20 rounded-3xl transition-colors px-4 py-2 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Action */}
            <div className="hidden md:flex items-center justify-end space-x-4 flex-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border border-gray-500 rounded px-2 py-1 text-white outline-none cursor-pointer"
              >
                <option className="text-black" value="EN">EN</option>
                <option className="text-black" value="BN">BN</option>
              </select>

              <Link
                href="/contact"
                className="border border-gray-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
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
            <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 z-50 p-6 overflow-y-auto">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium hover:text-blue-400"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-[#347fb9] text-center w-full max-w-xs py-4 rounded-full font-semibold text-lg"
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
              <p className="text-xs md:text-sm tracking-widest opacity-80 mb-4 uppercase">
                {breadcrumb}
              </p>
              <h1 className="text-5xl md:text-5xl font-medium">{title}</h1>
            </div>

            {/* Right */}
            <div className="w-full md:w-[40%] mt-12 md:mt-14 md:relative md:top-8">
              <p className="text-sm md:text-lg leading-relaxed opacity-90">
                {description}
              </p>
            </div>
          </div>

          {/* Decorative Line */}
          <div className="w-full h-[160px] md:h-[300px] relative mt-[-150px]">
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
