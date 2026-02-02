import CaseStudies from "@/app/components/CaseStudies-page/CaseStudies";
import FeaturedCaseStudies from "@/app/components/common/FeaturedCaseStudies";
import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";

export default function ContactPage() {
  return (
    <PublicLayout>
      <Hero
        title="Case Studies"
        breadcrumb="Home › Case Studies"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        
      </Hero>
      <CaseStudies></CaseStudies>
      <FeaturedCaseStudies></FeaturedCaseStudies>
      
    </PublicLayout>
  );
}
