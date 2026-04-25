import CaseStudies from "@/app/components/CaseStudies-page/CaseStudies";
import FeaturedCaseStudies from "@/app/components/common/FeaturedCaseStudies";
import FeaturedCaseStudies2 from "@/app/components/common/FeaturedCaseStudies2";
import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";

export const metadata = {
  title: "Case Studies | Hansi Trans - Success Stories & Project Portfolio",
  description: "Explore our case studies showcasing successful game localization, multilingual voice-over, and cross-border marketing projects from leading game studios worldwide.",
  keywords: ["case studies", "game localization", "success stories", "voice-over", "game studios"],
  openGraph: {
    title: "Case Studies | Hansi Trans",
    description: "Discover how we've helped leading game studios expand into new markets",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Hansi Trans",
    description: "Success stories from global game studios",
  },
};

export default function CaseStudiesPage() {
  return (
    <PublicLayout>
      <Hero
        title="Case Studies"
        breadcrumb="Home › Case Studies"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        
      </Hero>
      <CaseStudies></CaseStudies>
      <FeaturedCaseStudies2></FeaturedCaseStudies2>
      
    </PublicLayout>
  );
}
