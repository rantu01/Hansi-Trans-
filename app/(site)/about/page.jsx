"use client";

import { useEffect, useState } from "react";
import CEO from "@/app/components/about-page/CSO";
import OurCompany from "@/app/components/about-page/OurCompany";
import OurFullStories from "@/app/components/about-page/OurFullStories";
import Schedule from "@/app/components/about-page/Schedule";
import WorkWithUs from "@/app/components/about-page/WorkWithUs";
import Domains from "@/app/components/common/Domains";
import Hero from "@/app/components/common/Hero";
import OurInfluencer from "@/app/components/common/OurInfluencer";
import Stats from "@/app/components/common/stats";
import Testimonials from "@/app/components/common/Testimonials";
import WhyChooseUs from "@/app/components/common/WhyChooseUs";
import PublicLayout from "@/app/components/layout/PublicLayout";

import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";
import { API } from "@/app/config/api";

const statsData = [
  { icon: <FaUser />, value: "120K+", label: "Users" },
  { icon: <FaStar />, value: "4.9", label: "Rating" },
  { icon: <FaGlobe />, value: "50+", label: "Countries" },
  { icon: <FaBriefcase />, value: "300+", label: "Projects" },
];

export default function AboutPage() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setHeroData(data?.hero);
      } catch (err) {
        console.error("Failed to load About Us hero");
      }
    };

    fetchAbout();
  }, []);

  return (
    <PublicLayout>
      <Hero
        title={heroData?.title || "About HS+"}
        breadcrumb="Home › About Us"
        description={
          heroData?.description ||
          "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
        }
      >
        <WorkWithUs />
        <Stats stats={statsData} />
      </Hero>

      <OurCompany />
      <OurFullStories />
      <WhyChooseUs />
      <Domains />
      <OurInfluencer />
      <CEO />
      <Testimonials />
      <Schedule />
    </PublicLayout>
  );
}
