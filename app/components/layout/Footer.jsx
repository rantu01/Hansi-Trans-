"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  MapPin,
  Globe,
  Phone,
  ArrowRight
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
        if (!res.ok) return;
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

  const socialLinks = [
    { Icon: Twitter, url: siteConfig.socialTwitter },
    { Icon: Linkedin, url: siteConfig.socialLinkedin },
    { Icon: Youtube, url: siteConfig.socialYoutube },
    { Icon: Globe, url: siteConfig.socialGlobe },
    { Icon: Facebook, url: siteConfig.socialFacebook },
  ];

  return (
    <footer className="relative bg-gradient-to-bl from-gradient-base via-white to-gradient-base pt-20">
      <div className="container mx-auto px-4">

        {/* CTA Banner Section (Unchanged as requested) */}
        <div className="relative overflow-hidden bg-[#003B5C] rounded-[60px] mb-20 min-h-[450px] flex items-center">
          <div className="absolute inset-y-0 left-0 w-full md:w-[40%] z-0">
            <img
              src={siteConfig.ctaImage || "https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#003B5C]/20 to-[#003B5C]"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-[50%]"></div>
            <div className="w-full md:w-[50%] p-10 md:p-16 text-left">
              <h2 className="text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '56px', fontWeight: '500', lineHeight: '120%' }}>
                {siteConfig.ctaTitle || "Ready To Go Global?"}
              </h2>
              <p className="text-white/80 mb-10 max-w-md" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '400', lineHeight: '150%' }}>
                {siteConfig.ctaDescription || "Expanding your game into Asian markets is an exciting opportunity but without proper localization, even the best game can fail to connect."}
              </p>
              <button className="inline-flex items-center gap-3 bg-white text-[#0168B4] pl-6 pr-2 py-2 rounded-full font-semibold transition-all group shadow-xl hover:scale-105">
                Let's connect
                <span className="bg-[#0168B4] text-white rounded-full p-2 transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Updated Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-16">

          {/* Brand and Contacts (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {/* IMAGE — always center */}
              <img
                src={siteConfig.logo || "/Hansi-Logo1.png"}
                alt="HANSI Logo"
                className="w-20 h-20 object-contain ml-0 md:ml-23"
              />

              {/* TEXT — always left */}
              <h3
                className="w-full text-left uppercase font-medium text-[#0A0A0A]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "40.779px",
                }}
              >
                {siteConfig.brandText || "HANSI Trans+"}
              </h3>
            </div>



            <div className="max-w-xs text-center md:text-left">
              <p
                style={{
                  color: '#0A0A0A',
                  fontFamily: '"Sequel Sans", sans-serif',
                  fontSize: '18px',
                  fontWeight: '315',
                  lineHeight: '150%'
                }}
                className="mb-1"
              >
                Save time. Get Started Now.
              </p>
              <p
                style={{
                  color: '#616161',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                Unleash the most advanced Agency and boost your productivity
              </p>
            </div>

            {/* Phone numbers grid with updated styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 mt-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '160%',
                    letterSpacing: '0.16px'
                  }}
                >
                  <div className="bg-[#0168B4] p-1.5 rounded-full text-white"><Phone size={14} fill="currentColor" /></div>
                  +1 800 778 884
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links with updated styling */}
          <div className="md:col-span-2">
            <h4
              style={{
                color: '#0A0A0A',
                fontFamily: '"Sequel Sans", sans-serif',
                fontSize: '16px',
                fontWeight: '310',
                lineHeight: '160%',
                letterSpacing: '0.128px'
              }}
              className="mb-8"
            >
              Company
            </h4>
            <ul className="space-y-5 text-[#262626] text-[15px] font-medium">
              <li className="hover:text-[#0168B4]"><Link href="/">Home</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/about">About us</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/case-studies">Work</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/blog">Blog</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/shop">Shop</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4
              style={{
                color: '#0A0A0A',
                fontFamily: '"Sequel Sans", sans-serif',
                fontSize: '16px',
                fontWeight: '310',
                lineHeight: '160%',
                letterSpacing: '0.128px'
              }}
              className="mb-8"
            >
              Utilities
            </h4>
            <ul className="space-y-5 text-[#262626] text-[15px] font-medium">
              <li className="hover:text-[#0168B4]"><Link href="/privacy">Privacy & policy</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/style-guide">Style guide</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/changelog">Changelog</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/license">License</Link></li>
              <li className="hover:text-[#0168B4]"><Link href="/404">404 page</Link></li>
            </ul>
          </div>

          {/* Social and Location with updated styling */}
          <div className="md:col-span-3">
            <h4
              style={{
                color: '#0A0A0A',
                fontFamily: '"Sequel Sans", sans-serif',
                fontSize: '16px',
                fontWeight: '310',
                lineHeight: '160%',
                letterSpacing: '0.128px'
              }}
              className="mb-6"
            >
              Stay in the know
            </h4>
            <div className="flex gap-2 mb-12">
              {socialLinks.map((item, i) => (
                <a key={i} href={item.url || "#"} className="w-9 h-9 bg-[#0168B4] rounded-full flex items-center justify-center text-white hover:opacity-80 transition">
                  <item.Icon size={18} fill="currentColor" strokeWidth={0} />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 bg-[#E6F0F7] rounded-full flex items-center justify-center text-[#0168B4]">
                <MapPin size={24} fill="currentColor" strokeWidth={1} />
              </div>
              <div>
                <p className="text-[#616161] text-sm mb-2">Drop in us</p>
                <Link
                  href="#"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: '500',
                    lineHeight: '120%',
                    textTransform: 'capitalize'
                  }}
                  className="flex items-center gap-2 hover:text-[#0168B4] group"
                >
                  Get Directions
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8  flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div
              className="flex flex-col gap-1 text-center md:text-left"
              style={{
                color: '#0A0A0A',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              <p>All Rights Reserved.</p>
              <p>
                Designed by <span className="font-medium">HANSI TRANS+</span> | Powered by
              </p>
            </div>
          </div>

          <div className="flex gap-8 text-[14px] text-[#262626] font-medium">
            <Link href="/privacy" className="hover:text-[#0168B4] transition-colors">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-[#0168B4] transition-colors">
              Terms of service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;