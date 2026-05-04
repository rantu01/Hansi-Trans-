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
  const [currentYear, setCurrentYear] = useState("");
  const [isMounted, setIsMounted] = useState(false);

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
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear().toString());

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

  if (!isMounted) return null;

  return (
    <footer className="relative w-full overflow-hidden pt-20" style={{ minHeight: '1313px' }}>
      {/* --- Background: mobile gradient, desktop image --- */}
      {/* Mobile: gradient from #adcfe7 down to white */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden" style={{ background: 'linear-gradient(to bottom, #adcfe7 0%, #ffffff 100%)' }} />

      {/* Desktop & up: background image */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <img
          src="/footerBg.png"
          alt="footer background"
          className="w-full h-[1313px] object-cover object-top"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">

        {/* CTA Banner Section */}
        {/* CTA Banner Section */}
        <div
          className="relative overflow-hidden mb-20 flex items-center"
          style={{
            height: '550px', // Exact height from spec
            alignSelf: 'stretch',
            borderRadius: '60px', // Exact radius
            background: '#013963', // Primary-blue-800
          }}
        >
          {/* Background Image/Overlay Section */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[45%] z-0">
            <img
              src={siteConfig.ctaImage || "https://i.ibb.co.com/0jtd7Mtr/lets-contact.png"}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay for smooth blending with #013963 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#013963]/40 to-[#013963]"></div>
          </div>

          {/* Content Section */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center">
            <div className="hidden md:block md:w-[45%]"></div>
            <div className="w-full md:w-[55%] p-10 md:p-16 text-left">
              <h2
                className="text-white mb-6"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '56px',
                  fontWeight: '500',
                  lineHeight: '120%'
                }}
              >
                {siteConfig.ctaTitle || "Ready To Go Global?"}
              </h2>
              <p
                className="text-white/80 mb-10 max-w-md"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '150%'
                }}
              >
                {siteConfig.ctaDescription || "Expanding your game into Asian markets is an exciting opportunity but without proper localization, even the best game can fail to connect."}
              </p>

              <Link
                href="/contact"
                className="inline-flex transition-all group hover:scale-105 active:scale-95 shadow-xl"
                style={{
                  display: 'flex',
                  height: '52px',
                  width: '175px',           // Fixed width as per your previous requirement
                  padding: '4px 4px 4px 12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '100px',
                  background: '#FFFFFF',

                  // --- Updated Typography Specs ---
                  color: '#0168B4',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',         // Exact spec
                  fontStyle: 'normal',
                  fontWeight: '500',         // Medium weight
                  lineHeight: '160%',       // 25.6px
                  letterSpacing: '0.16px',   // Added letter spacing
                }}
              >
                Let's connect
                <span
                  className="bg-[#0168B4] text-white rounded-full transition-transform duration-300 group-hover:rotate-45"
                  style={{
                    display: 'flex',
                    width: '44px',
                    height: '44px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0            // Prevents circle from shrinking
                  }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-16">

          {/* Brand and Contacts (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-4 ">
              <img
                src={siteConfig.logo || "/Hansi-Logo1.png"}
                alt="hansi TRANS+"
                className="w-30 h-30 object-contain ml-20"
              />

              {/* <h3
                className="w-full text-left uppercase font-medium text-[#0A0A0A]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "40.779px",
                }}
              >
                {siteConfig.brandText || "HANSI Trans+"}
              </h3> */}
            </div>

            <div className="max-w-xs text-left">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 mt-4">
              {[
                { icon: "/Frame (4).png", text: "+1 800 778 884" },   // 1st Icon
                { icon: "/Frame (5).png ", text: "+1 800 778 884" }, // 2nd Icon
                { icon: "/active-call.png", text: "+1 800 778 884" },   // 3rd Icon
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                  style={{
                    color: '#0F0F0F',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '160%',
                    letterSpacing: '0.16px'
                  }}
                >
                  {/* Container for Custom Icon Image - Updated to 32px */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden"
                    style={{
                      width: '38px',  // Exact width spec
                      height: '38px', // Exact height spec
                      padding: '6px'  // Icon scaling balance
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={`contact-icon-${i}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block md:col-span-2">
            <h4
              className="mb-8"
              style={{
                color: '#0A0A0A',
                fontFamily: 'var(--font-poppins), sans-serif', // Updated to Poppins
                fontSize: '18px',                             // Updated to 18px
                fontStyle: 'normal',
                fontWeight: '500',                             // Updated to 500 (Medium)
                lineHeight: '150%',                           // 27px
              }}
            >
              Company
            </h4>
            <ul className="space-y-5">
              {[
                { name: "Home", href: "/" },
                { name: "About us", href: "/about" },
                { name: "Work", href: "/case-studies" },
                { name: "Blog", href: "/blog" },
                { name: "Shop", href: "/shop" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#0168B4]"
                    style={{
                      color: '#0A0A0A',                         // Exact spec color
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',                        // Exact spec size
                      fontStyle: 'normal',
                      fontWeight: '400',                        // Regular weight
                      lineHeight: '160%',                      // 25.6px
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block md:col-span-2">
            <h4
              className="mb-8"
              style={{
                color: '#0A0A0A',
                fontFamily: 'var(--font-poppins), sans-serif', // Updated to Poppins
                fontSize: '18px',                             // Updated to 18px
                fontStyle: 'normal',
                fontWeight: '500',                             // Medium weight
                lineHeight: '150%',                           // 27px
              }}
            >
              Utilities
            </h4>
            <ul className="space-y-5">
              {[
                { name: "Privacy & policy", href: "/privacy-policy" },
                { name: "Terms Condition", href: "/terms-condition" },
                { name: "Coming Soon", href: "/coming-soon" },
                { name: "Coming-Soon 2", href: "/coming-soon2" },
                { name: "License", href: "/license" },
                { name: "404 page", href: "/404" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[#0168B4]"
                    style={{
                      color: '#0A0A0A',                         // Exact spec color
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',                        // Exact spec size
                      fontStyle: 'normal',
                      fontWeight: '400',                        // Regular weight
                      lineHeight: '160%',                      // 25.6px
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Company and Utilities side-by-side on mobile: use flex on small screens */}
          <div className="md:hidden col-span-1 sm:col-span-2 w-full">
            <div className="flex flex-col flex-row gap-8">
              <div className="w-1/2">
                <h4
                  className="mb-8"
                  style={{
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '150%',
                  }}
                >
                  Company
                </h4>
                <ul className="space-y-5">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About us", href: "/about" },
                    { name: "Work", href: "/case-studies" },
                    { name: "Blog", href: "/blog" },
                    { name: "Shop", href: "/shop" },
                    { name: "Contact Us", href: "/contact" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-[#0168B4]"
                        style={{
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '160%',
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-1/2">
                <h4
                  className="mb-8"
                  style={{
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '150%',
                  }}
                >
                  Utilities
                </h4>
                <ul className="space-y-5">
                  {[
                    { name: "Privacy & policy", href: "/privacy-policy" },
                    { name: "Terms Condition", href: "/terms-condition" },
                    { name: "Coming Soon", href: "/coming-soon" },
                    { name: "Coming-Soon 2", href: "/coming-soon2" },
                    { name: "License", href: "/license" },
                    { name: "404 page", href: "/404" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-[#0168B4]"
                        style={{
                          color: '#0A0A0A',
                          fontFamily: 'var(--font-poppins), sans-serif',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '160%',
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social and Location */}
          <div className="md:col-span-3">
            <h4
              style={{
                color: '#0A0A0A',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '150%',
              }}
              className="mb-6"
            >
              Stay in the know
            </h4>
            <div className="flex gap-2 mb-12">
              {[
                { img: "/Link.png", url: siteConfig.socialTwitter },    // 1st Icon
                { img: "/Link (1).png", url: siteConfig.socialLinkedin }, // 2nd Icon
                { img: "/Link (2).png", url: siteConfig.socialYoutube },  // 3rd Icon
                { img: "/Link (3).png", url: siteConfig.socialGlobe },    // 4th Icon (WhatsApp/Globe)
                { img: "/Link (4).png", url: siteConfig.socialFacebook }, // 5th Icon
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-110 active:scale-95 flex-shrink-0"
                  style={{
                    width: '34px',  // Exact width spec
                    height: '34px', // Exact height spec
                  }}
                >
                  <img
                    src={item.img}
                    alt={`social-icon-${i}`}
                    className="w-full h-full object-contain"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Desktop: ellipse + marker above text */}
                <div
                  className="relative hidden md:flex items-center justify-center overflow-visible"
                  style={{
                    width: '76px',   // Background image width
                    height: '76px',  // Background image height
                  }}
                >
                  <img
                    src="/Ellipse (1).png"
                    alt="bg-circle"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <img
                    src="/marker-1.png"
                    alt="location-marker"
                    className="relative z-10"
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Mobile: marker left of text */}
                <div className="md:hidden flex items-start gap-4">
                  <div style={{ width: '48px', height: '48px' }}>
                    <img src="/marker-1.png" alt="marker" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p
                      className="mb-1"
                      style={{
                        color: '#6B6B6B',
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '150%',
                      }}
                    >
                      Drop in us
                    </p>
                    <Link
                      href="#"
                      className="flex items-center gap-2 hover:text-[#0168B4] group transition-colors mt-2"
                      style={{
                        color: '#0F0F0F',
                        fontFamily: 'var(--font-inter), sans-serif',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: '120%',
                        textTransform: 'capitalize'
                      }}
                    >
                      Get Directions
                      <ArrowRight
                        className="transition-transform group-hover:translate-x-1"
                        style={{
                          width: '20px',
                          height: '20px',
                          color: '#6B6B6B',
                        }}
                      />
                    </Link>
                  </div>
                </div>

                <div className="hidden md:block">
                  <p
                    className="mb-2"
                    style={{
                      color: '#6B6B6B',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: '150%',
                    }}
                  >
                    Drop in us
                  </p>
                  <Link
                    href="#"
                    className="flex items-center gap-2 hover:text-[#0168B4] group transition-colors mt-6"
                    style={{
                      color: '#0F0F0F',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '24px',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      lineHeight: '120%',
                      textTransform: 'capitalize'
                    }}
                  >
                    Get Directions
                    <ArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      style={{
                        width: '25px',
                        height: '25px',
                        aspectRatio: '19/20',
                        color: '#6B6B6B',
                      }}
                    />
                  </Link>
                </div>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left"
            style={{
              color: '#0A0A0A',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '150%'
            }}
          >
            <p className="text-start">All Rights Reserved.</p>
            <p>
              Designed by <span className="font-medium">HANSI TRANS+</span> | Powered by
            </p>
          </div>

          <div className="flex w-full md:w-auto">
            <div className="w-full">
              <div className="hidden md:flex gap-8">
                {[
                  { name: "Privacy policy", href: "/privacy" },
                  { name: "Terms of service", href: "/terms" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#0168B4] transition-colors"
                    style={{
                      color: '#0A0A0A',
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      lineHeight: '150%',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile: justify-between */}
              <div className="md:hidden flex justify-between w-full">
                <Link
                  href="/privacy"
                  className="hover:text-[#0168B4] transition-colors"
                  style={{
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '150%',
                  }}
                >
                  Privacy policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-[#0168B4] transition-colors"
                  style={{
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '150%',
                  }}
                >
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;