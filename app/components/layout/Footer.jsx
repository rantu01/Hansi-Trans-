"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  MapPin,
  Globe,
} from "lucide-react";
import { API } from "@/app/config/api";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [siteConfig, setSiteConfig] = useState({
    logo: "",
    brandText: "",
    footerText: "",
    footerAddress: "",
    copyrightText: "",
    ctaTitle: "",
    ctaDescription: "",
    ctaImage: "",
    socialFacebook: "",
    socialGlobe: "",
    socialLinkedin: "",
    socialTwitter: "",
    socialYoutube: ""
  });

  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        if (!res.ok) {
          console.error(`Error: ${res.status} - ${res.statusText}`);
          return;
        }
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

  // Array for mapping social media links
  const socialLinks = [
    { Icon: Twitter, url: siteConfig.socialTwitter },
    { Icon: Linkedin, url: siteConfig.socialLinkedin },
    { Icon: Youtube, url: siteConfig.socialYoutube },
    { Icon: Globe, url: siteConfig.socialGlobe },
    { Icon: Facebook, url: siteConfig.socialFacebook },
  ];

  return (
    /* Replaced [#a3c9e5] with gradient-base variable */
    <footer className="relative bg-gradient-to-bl from-gradient-base via-white to-gradient-base pt-20">
      <div className="container mx-auto px-4">
        
        {/* CTA Banner Section */}
        {/* Replaced [#003d66] with secondary variable */}
        <div className="relative overflow-hidden bg-secondary rounded-[40px] md:rounded-[60px] mb-20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src={siteConfig.ctaImage || "https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full md:w-1/2">
            <div className="relative rounded-[35px] overflow-hidden border-4 border-white/10 shadow-2xl h-[300px]">
              <img
                src={siteConfig.ctaImage || "https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"}
                alt="CTA Banner"
                className="w-full h-full object-cover"
              />
              {/* Replaced [#003d66] with secondary variable */}
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-1/2 text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {siteConfig.ctaTitle || "Ready To Go Global?"}
            </h2>
            {/* Replaced text-blue-100 with cta-text variable */}
            <p className="text-cta-text text-lg mb-10 leading-relaxed max-w-md">
              {siteConfig.ctaDescription || "Expanding your game into Asian markets..."}
            </p>
            {/* Replaced text-[#0070c0] with primary variable */}
            <button className="inline-flex items-center gap-3 bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all group shadow-xl">
              Let's connect
              <span className="bg-primary text-white rounded-full p-1.5 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={siteConfig.logo || "/Hansi-Logo1.png"}
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
              <div className="flex items-start gap-3 text-gray-600">
                {/* Replaced text-blue-500 with primary variable (closest match) */}
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-sm font-medium whitespace-pre-line">
                  {siteConfig.footerAddress || "Dhaka, Bangladesh"}
                </span>
              </div>
            </div>
          </div>

          {/* Company Links (Static) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-primary cursor-pointer">Home</li>
              <li className="hover:text-primary cursor-pointer">About us</li>
              <li className="hover:text-primary cursor-pointer">Work</li>
              <li className="hover:text-primary cursor-pointer">Blog</li>
              <li className="hover:text-primary cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Utilities (Static) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Utilities</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-primary cursor-pointer">Privacy & policy</li>
              <li className="hover:text-primary cursor-pointer">Terms of service</li>
            </ul>
          </div>

          {/* Social Icons (Dynamic) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay in the know</h4>
            <div className="flex gap-3 mb-10">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  /* Replaced bg-[#0070c0] with primary variable */
                  className={`w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition shadow-md ${!item.url && 'opacity-50 cursor-not-allowed'}`}
                >
                  <item.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <p>
            © {currentYear} {siteConfig.brandText || "HANSI Trans"} — {siteConfig.copyrightText || "All Rights Reserved."}
          </p>
          <div className="flex gap-8">
            <span className="hover:text-primary cursor-pointer">Privacy policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;