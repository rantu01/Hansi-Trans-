import BlogPage from "@/app/components/blog/Blog";
import Hero from "@/app/components/common/Hero";
import Hero3 from "@/app/components/common/Hero3";
import PublicLayout from "@/app/components/layout/PublicLayout";

export const metadata = {
  title: "Blog | Hansi Trans - Localization & Gaming Insights",
  description: "Explore our blog for insights on game localization, multilingual voice-over, anime localization, and cross-border marketing strategies.",
  keywords: ["blog", "localization", "game development", "voice-over", "marketing"],
  openGraph: {
    title: "Blog | Hansi Trans",
    description: "Latest insights on game localization, voice-over, and cross-border marketing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Hansi Trans",
    description: "Latest insights on game localization and voice-over services",
  },
};

export default function Blog() {
  return (
    <PublicLayout>
      <Hero3
        title="Blog"
        breadcrumb="Home › Blog"
        description="Exploring ideas with the Hansi Trans"
      >

        
      </Hero3>
      <BlogPage></BlogPage>
      
    </PublicLayout>
  );
}
