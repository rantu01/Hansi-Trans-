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

export default function Home() {
  return (
    <main className="">
      <Hero></Hero>
      <Achievement></Achievement>
      <Service></Service>
      <FeaturedCaseStudies></FeaturedCaseStudies>
      <WorkProcess></WorkProcess>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <OurInfluencer></OurInfluencer>
      <Blogs></Blogs>
      <FAQ></FAQ>
      <Footer></Footer>
    </main>
  );
}
