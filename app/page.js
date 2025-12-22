import AboutUs from "./components/home/AboutUs";
import Achievement from "./components/home/Achievement";
import Blogs from "./components/home/Blogs";
import FAQ from "./components/home/FAQ";
import Featured from "./components/home/Featured";
import Hero from "./components/home/HeroHome";
import Service from "./components/home/service";
import WhyChooseUs from "./components/home/WhyChooseUs";
import WorkProcess from "./components/home/WorkProcess";
import Footer from "./components/layout/Footer";
import PublicLayout from "./components/layout/PublicLayout";

export default function Home() {
  return (
    <main className="">
      <Hero></Hero>
      <Achievement></Achievement>
      <Service></Service>
      <Featured></Featured>
      <WorkProcess></WorkProcess>
      <WhyChooseUs></WhyChooseUs>
      <AboutUs></AboutUs>
      <Blogs></Blogs>
      <FAQ></FAQ>
      <Footer></Footer>
    </main>
  );
}
