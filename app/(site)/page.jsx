
import Achievement from "../components/home/Achievement";
import Service from "../components/home/service";
import FeaturedCaseStudies from "../components/common/FeaturedCaseStudies";
import Hero from "../components/home/HeroHome";
import WorkProcess from "../components/common/WorkProcess";
import WhyChooseUs from "../components/common/WhyChooseUs";
import OurInfluencer from "../components/common/OurInfluencer";
import Blogs from "../components/home/Blogs";
import FAQ from "../components/home/FAQ";
import Footer from "../components/layout/Footer";
import Testimonials from "../components/common/Testimonials";
import CaseStudies from "../components/CaseStudies-page/CaseStudies";
import CaseStudies3 from "../components/common/CaseStudies3";

export default function Home() {

  return (
    <main className="animate-in fade-in duration-700">
      <Hero />
      <Achievement />
      <Service />
      <CaseStudies3></CaseStudies3>
      <FeaturedCaseStudies />
      <WorkProcess />
      <WhyChooseUs />
      <Testimonials />
      {/* <OurInfluencer /> */}
      <Blogs />
      <FAQ />
      <Footer />
    </main>
  );
}