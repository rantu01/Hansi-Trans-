import CEO from "@/app/components/about-page/CSO";
import Domains from "@/app/components/about-page/Domains";
import OurCompany from "@/app/components/about-page/OurCompany";
import OurFullStories from "@/app/components/about-page/OurFullStories";
import Schedule from "@/app/components/about-page/Schedule";
import WorkWithUs from "@/app/components/about-page/WorkWithUs";
import Hero from "@/app/components/common/Hero";
import OurInfluencer from "@/app/components/common/OurInfluencer";
import Stats from "@/app/components/common/stats";
import Testimonials from "@/app/components/common/Testimonials";
import WhyChooseUs from "@/app/components/common/WhyChooseUs";
import PublicLayout from "@/app/components/layout/PublicLayout";

import { FaUser, FaStar, FaGlobe, FaBriefcase } from "react-icons/fa";

const statsData = [
  { icon: <FaUser />, value: "120K+", label: "Users" },
  { icon: <FaStar />, value: "4.9", label: "Rating" },
  { icon: <FaGlobe />, value: "50+", label: "Countries" },
  { icon: <FaBriefcase />, value: "300+", label: "Projects" },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <Hero
        title="About"
        breadcrumb="Home › About"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        <WorkWithUs />
        <Stats stats={statsData} />
        
      </Hero>
      <OurCompany></OurCompany>
      <OurFullStories></OurFullStories>
      <WhyChooseUs></WhyChooseUs>
      <Domains></Domains>
      <OurInfluencer></OurInfluencer>
      <CEO></CEO>
      <Testimonials></Testimonials>
      <Schedule></Schedule>

    </PublicLayout>
  );
}
