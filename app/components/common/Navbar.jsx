"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "About Us", "Service", "Case Studies", "Blog", "Others"];

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold italic">H</div>
          <span className="text-2xl font-bold tracking-tight text-white">HS+</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Language & Action */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer text-sm text-gray-300">
            EN <ChevronDown size={14} />
          </div>
          <button className="border border-white/30 rounded-full px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-all">
            Let's connect
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-2xl text-white" onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;