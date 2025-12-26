import BlogPage from "@/app/components/blog/Blog";
import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";

export default function Blog() {
  return (
    <PublicLayout>
      <Hero
        title="Blog"
        breadcrumb="Home › Blog"
        description="this is the blog page description."
      >

        
      </Hero>
      <BlogPage></BlogPage>
      
    </PublicLayout>
  );
}
