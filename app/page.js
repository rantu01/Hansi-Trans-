"use client";
import React, { useState, useEffect } from "react";
import FeaturedCaseStudies from "./components/common/FeaturedCaseStudies";
import OurInfluencer from "./components/common/OurInfluencer";
import Testimonials from "./components/common/Testimonials";
import WhyChooseUs from "./components/common/WhyChooseUs";
import WorkProcess from "./components/common/WorkProcess";
import Achievement from "./components/home/Achievement";
import Blogs from "./components/home/Blogs";
import FAQ from "./components/home/FAQ";
import Hero from "./components/home/HeroHome";
import Service from "./components/home/service";
import Footer from "./components/layout/Footer";

// লোডার কম্পোনেন্টটি নিচে আলাদাভাবে ডিফাইন করা হয়েছে
const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
    <div className="relative flex items-center justify-center">
      {/* বাইরের স্পিনিং রিং */}
      <div className="w-24 h-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      {/* মাঝখানে আপনার লোগো */}
      <img 
        src="/Hansi-Logo1.png" 
        alt="Logo" 
        className="absolute w-12 h-12 animate-pulse"
      />
    </div>
    <h2 className="mt-4 text-xl font-bold tracking-[0.2em] text-gray-800 animate-bounce">
      HANSI TRANS
    </h2>
  </div>
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখানে আমরা চেক করছি পেজটি পুরোপুরি লোড হয়েছে কি না
    // সাধারণত ২ সেকেন্ড ডিলে দিলে এনিমেশনটা সুন্দর দেখা যায়
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <main className="animate-in fade-in duration-700">
      <Hero />
      <Achievement />
      <Service />
      <FeaturedCaseStudies />
      <WorkProcess />
      <WhyChooseUs />
      <Testimonials />
      <OurInfluencer />
      <Blogs />
      <FAQ />
      <Footer />
    </main>
  );
}