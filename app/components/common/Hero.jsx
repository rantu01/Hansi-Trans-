"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Hero = ({
  title = "About HS+",
  breadcrumb = "Home  ›  About Us",
  description = "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.",
  children,
}) => {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  // Link gulo ke path shoho update kora holo
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Others", path: "/others" },
  ];

  return (
    <section
      className="relative min-h-[550px] md:min-h-[600px] w-full overflow-hidden text-white font-sans flex flex-col"
      style={{
        backgroundImage: "url('/optimized.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-6 flex-grow flex flex-col">
        {/* ================= NAVBAR UPDATED ================= */}
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

            {/* Desktop Menu - Next.js Link bebohar kora hoyeche */}
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
                <option className="text-black" value="BN">BN</option>
              </select>
              <Link href="/contact" className="bg-transparent border border-gray-500 px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all">
                Let's connect
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden p-2 z-[60]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Overlay - Responsive Layout */}
          {menuOpen && (
            <div className="md:hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center space-y-8 z-50 p-6 animate-in fade-in duration-300">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-2xl font-medium hover:text-blue-400 transition-colors"
                  onClick={() => setMenuOpen(false)}
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

        {/* ================= HERO CONTENT (UNCHANGED) ================= */}
        <div className="relative mt-auto mb-60">
          <div className="flex flex-col md:flex-row justify-between items-end pb-4">
            <div className="w-full md:w-1/2 -mb-40">
              <p className="text-xs md:text-sm tracking-widest opacity-80 mb-4 uppercase">
                {breadcrumb}
              </p>
              <h1 className="text-5xl md:text-6xl font-medium">{title}</h1>
            </div>

            <div className="w-full md:w-[40%] relative top-30 mt-12 md:mt-14">
              <p className="text-sm md:text-lg leading-relaxed opacity-90">
                {description}
              </p>
            </div>
          </div>

          {/* SVG Line - Fixed for Hydration */}
          <div className="w-full h-[200px] relative mt-[-20px]">
            <svg
              viewBox="0 0 1200 150"
              fill="none"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 20 H 430 C 470 20, 500 30, 540 72 L 580 105 C 610 130, 650 135, 720 135 H 1200"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* ================= CHILDREN SLOT ================= */}
        {children && (
          <div className="relative z-10 mt-[-150px]">{children}</div>
        )}
      </div>
    </section>
  );
};

export default Hero;