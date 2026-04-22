import BlogPage from "@/app/components/blog/Blog";
import Hero from "@/app/components/common/Hero";
import Hero3 from "@/app/components/common/Hero3";
import PublicLayout from "@/app/components/layout/PublicLayout";

export default function Blog() {
  return (
    <PublicLayout>
      <Hero3
        title="Blog"
        breadcrumb="Home › Blog"
        description="this is the blog page description."
      >

        
      </Hero3>
      <BlogPage></BlogPage>
      
    </PublicLayout>
  );
}
