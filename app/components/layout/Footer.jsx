"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [siteConfig, setSiteConfig] = useState({
    logo: "",
    brandText: "",
    footerText: "",
    footerAddress: "",
    copyrightText: "",
  });

  // 🔹 Fetch site config from backend
  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/site");
        const data = await res.json();

        if (data?.success && data?.data) {
          setSiteConfig(data.data);
        }
      } catch (error) {
        console.error("Site config fetch failed", error);
      }
    };

    fetchSiteConfig();
  }, []);

  return (
    <footer
      className="relative 
      bg-gradient-to-bl 
      from-[#a3c9e5] 
      via-white 
      to-[#a3c9e5] pt-20"
    >
      <div className="container mx-auto px-4">
        {/* CTA Banner Section */}
        <div className="relative overflow-hidden bg-[#003d66] rounded-[40px] md:rounded-[60px] mb-20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full md:w-1/2">
            <div className="relative rounded-[35px] overflow-hidden border-4 border-white/10 shadow-2xl h-[300px]">
              <img
                src="https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"
                alt="Recording"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#003d66] to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-1/2 text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready To Go Global?
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-md">
              Expanding your game into Asian markets is an exciting opportunity
              but without proper localization, even the best game can fail to
              connect.
            </p>
            <button className="inline-flex items-center gap-3 bg-white text-[#0070c0] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all group shadow-xl">
              Let's connect
              <span className="bg-[#0070c0] text-white rounded-full p-1.5 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={siteConfig.logo || "/Hansi-Logo1.png"}
                  onError={(e) => {
                    e.currentTarget.src = "/Hansi-Logo1.png";
                  }}
                  alt="HANSI Logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {siteConfig.brandText || "HANSI Trans+"}
              </span>
            </div>

            <p className="text-gray-500 font-bold text-sm">
              {siteConfig.footerText || "Save time. Get Started Now."}
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">
                  {siteConfig.footerAddress || "Dhaka, Bangladesh"}
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About us</li>
              <li className="hover:text-blue-600 cursor-pointer">Work</li>
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Shop</li>
              <li className="hover:text-blue-600 cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Utilities</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">
                Privacy & policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Style guide
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Changelog
              </li>
              <li className="hover:text-blue-600 cursor-pointer">License</li>
              <li className="hover:text-blue-600 cursor-pointer">404 page</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay in the know</h4>
            <div className="flex gap-3 mb-10">
              {[Twitter, Linkedin, Youtube, Globe, Facebook].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#0070c0] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition shadow-md"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <p>
            © {currentYear} {siteConfig.brandText || "HANSI Trans"} —{" "}
            {siteConfig.copyrightText ||
              "All Rights Reserved."}
          </p>

          <div className="flex gap-8">
            <span className="hover:text-blue-600 cursor-pointer">
              Privacy policy
            </span>
            <span className="hover:text-blue-600 cursor-pointer">
              Terms of service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
