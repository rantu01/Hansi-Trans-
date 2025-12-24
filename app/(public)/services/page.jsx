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
      <Testimonials></Testimonials>
      
    </PublicLayout>
  );
}
