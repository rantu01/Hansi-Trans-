"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Game", "Voice", "Tech Innovations"];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.Blogs.getAll);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts =
    activeFilter === "All"
      ? blogs
      : blogs.filter((post) => post.filterTag === activeFilter);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-background">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 md:px-12 font-sans bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 relative z-1 -mt-[80px] sm:-mt-[120px] md:-mt-[200px]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="space-y-4">
            {/* Badge */}
            <div
              className="inline-flex items-center justify-center mb-4 md:mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '120px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#FFF',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040',
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '160%',
                  letterSpacing: '0.16px',
                }}
              >
                Blogs
              </span>
            </div>

            {/* Heading */}
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'clamp(32px, 5vw, 60px)',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0168B4',
              }}
            >
              Exploring ideas with <br className="hidden sm:block" /> the Hansi Trans
            </h2>
          </div>

          {/* Filter Bar */}
          <div
            className="flex items-center w-full md:w-auto overflow-x-auto"
            style={{
              maxWidth: '526px',
              minHeight: '65px',
              borderRadius: '100px',
              justifyContent: 'space-between',
              padding: '0 12px',
              background: '#002C4C',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '500',
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  transition: 'all 0.3s ease',
                  height: '53px',
                  minWidth: cat === 'All' ? '53px' : 'auto',
                  padding: cat === 'All' ? '0 16px' : '0 clamp(12px, 2vw, 28px)',
                  borderRadius: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  backgroundColor: activeFilter === cat ? '#FFFFFF' : 'rgba(255,255,255,0.05)',
                  color: activeFilter === cat ? '#0A0A0A' : '#FFFFFF',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-10 md:gap-y-16 mb-20">
            {filteredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group cursor-pointer">
                {/* Image */}
                <div
                  className="overflow-hidden mb-6 shadow-sm shadow-primary/5 bg-primary/5 border border-primary/5 w-full"
                  style={{
                    aspectRatio: '416 / 350',
                    borderRadius: '12px',
                    opacity: 1,
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Meta */}
                <div className="flex justify-between items-center mb-4 px-1">
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '400',
                      fontSize: '14px',
                      color: '#616161',
                    }}
                  >
                    {post.date}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#0168B4',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      display: 'inline-flex',
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="group-hover:text-primary transition-colors duration-300 px-1 border-t border-[#262626]/10 pt-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '500',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    lineHeight: '120%',
                    color: '#262626',
                    marginTop: '12px'
                  }}
                >
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32 border-2 border-dashed border-primary/10 rounded-[40px] bg-primary/5">
            <p className="text-secondary/50 font-bold uppercase tracking-widest text-sm">
              No blog posts found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;