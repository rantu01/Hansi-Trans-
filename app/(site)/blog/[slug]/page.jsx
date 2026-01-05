import PublicLayout from "@/app/components/layout/PublicLayout";
import BlogDetails from "@/app/components/blog/BlogDetails";
import Hero from "@/app/components/common/Hero";
import { API } from "@/app/config/api";

export default async function BlogPostPage({ params }) {
  // Next.js 15+ এ params একটি Promise
  const { slug } = await params;

  let blogPost = null;

  try {
    const res = await fetch(API.Blogs.getSingle(slug), {
      cache: 'no-store' // প্রতিবার নতুন ডেটা দেখানোর জন্য
    });
    
    if (res.ok) {
      blogPost = await res.json();
    }
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }

  if (!blogPost) {
    return (
      <PublicLayout>
        <div className="p-20 text-center text-xl font-semibold min-h-[50vh]">
          Blog Post Not Found: {slug}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero
        title={blogPost.title}
        breadcrumb={`Home › Blog › ${blogPost.title}`}
        description={blogPost.description || "Read our latest insights and updates."}
      >
        {/* আপনি চাইলে Hero-র ভেতরেও কিছু দেখাতে পারেন */}
      </Hero>
      <BlogDetails blogPost={blogPost} />
    </PublicLayout>
  );
}