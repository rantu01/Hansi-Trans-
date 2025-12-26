import PublicLayout from "@/app/components/layout/PublicLayout";
import BlogDetails from "@/app/components/blog/BlogDetails";
import { blogPosts } from "@/app/components/blog/blogPosts";
import Hero from "@/app/components/common/Hero";

export default async function BlogPostPage({ params }) {
  // Next.js 15+ এ params একটি Promise, তাই await করতে হবে
  const { slug } = await params;

  // স্লাগ দিয়ে ব্লগ পোস্টটি খুঁজে বের করা
  const blogPost = blogPosts.find((post) => post.slug === slug);

  if (!blogPost) {
    return (
      <PublicLayout>
        <div className="p-20 text-center text-xl font-semibold">
          Blog Post Not Found: {slug}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero
        title={blogPost.title}
        breadcrumb={`Home › ${blogPost.title}`}
        description={blogPost.description}
      >
        <BlogDetails blogPost={blogPost} />
      </Hero>
    </PublicLayout>
  );
}
