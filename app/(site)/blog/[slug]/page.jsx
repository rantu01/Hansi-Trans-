import PublicLayout from "@/app/components/layout/PublicLayout";
import BlogDetails from "@/app/components/blog/BlogDetails";
import Hero from "@/app/components/common/Hero";
import { API } from "@/app/config/api";
import Hero3 from "@/app/components/common/Hero3";

async function getBlogBySlug(slug) {
  try {
    const res = await fetch(API.Blogs.getSingle(slug), {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const data = await res.json();
      return data?.data || data?.blog || data;
    }
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogPost = await getBlogBySlug(slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  // Use metaTags from API if available, otherwise generate from content
  const metaTags = blogPost.metaTags || {};
  const title = metaTags.title || blogPost.title || "Blog Post";
  const description = metaTags.description || blogPost.description || "Read our latest blog post";
  const keywords = metaTags.keywords || [];
  const ogImage = metaTags.ogImage || blogPost.image || "";

  return {
    title: `${title} | Hansi Trans Blog`,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : "blog, gaming, localization",
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blogPost = await getBlogBySlug(slug);

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
      <Hero3
        title={blogPost.title}
        breadcrumb={`Home › Blog › ${blogPost.title}`}
        description={blogPost.description || "Read our latest insights and updates."}
      >
        {/* আপনি চাইলে Hero-র ভেতরেও কিছু দেখাতে পারেন */}
      </Hero3>
      <BlogDetails blogPost={blogPost} />
    </PublicLayout>
  );
}