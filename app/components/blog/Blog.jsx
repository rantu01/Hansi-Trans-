"use client";
import React, { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Games", "Voice", "Tech Innovations"];

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
    <section className="py-16 px-6 md:px-12 font-sans bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-background px-4 py-1.5 rounded-full shadow-sm w-fit border border-primary/10">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Our Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Exploring Ideas With <br /> 
              <span className="text-secondary font-black">The Hansi Trans</span>
            </h2>
          </div>

          {/* Filter Bar - Using Secondary (Dark Blue) as base */}
          <div className="flex items-center bg-secondary rounded-full p-2 overflow-x-auto shadow-lg shadow-secondary/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-background text-secondary shadow-sm"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mb-20">
            {filteredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-[32px] mb-6 shadow-sm shadow-primary/5 bg-primary/5 border border-primary/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em]">
                    {post.date}
                  </span>
                  <span className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-secondary leading-snug group-hover:text-primary transition-colors duration-300 px-1">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-primary/10 rounded-[40px] bg-primary/5">
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