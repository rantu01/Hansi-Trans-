import CaseStudies from "@/app/components/CaseStudies-page/CaseStudies";
import Achievement2 from "@/app/components/common/Achievement2";
import CaseStudies2 from "@/app/components/common/CaseStudies2";
import Domains from "@/app/components/common/Domains";
import Hero from "@/app/components/common/Hero";
import Testimonials from "@/app/components/common/Testimonials";
import PublicLayout from "@/app/components/layout/PublicLayout";
import OurServices from "@/app/components/service-page/OurServices";
import ServiceHero from "@/app/components/service-page/ServiceHero";

export default function ServicePage() {
  return (
    <PublicLayout>
      <Hero
        title="Service"
        breadcrumb="Home › Service"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        <ServiceHero></ServiceHero>
      </Hero>
      <OurServices></OurServices>
      <Domains></Domains>
      <CaseStudies2></CaseStudies2>
      <Testimonials></Testimonials>
      <Achievement2></Achievement2>
      
    </PublicLayout>
  );
}
