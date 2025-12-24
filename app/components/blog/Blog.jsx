"use client";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link"; // <-- import Link
import { blogPosts } from "./blogPosts"; // <-- import blogPosts

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Games", "Voice", "Tech Innovations"];

  const filteredPosts =
    activeFilter === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.filterTag === activeFilter);

  return (
    <section className=" py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-full shadow-sm w-fit border border-gray-100">
              <Sparkles size={14} className="text-gray-400" />
              <span className="text-xs font-medium text-gray-500">Blog</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight">
              Exploring Ideas With <br /> The Hansi Trans
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center bg-[#002b4d] rounded-full p-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-white text-[#002b4d]"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-20">
          {filteredPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-[24px] mb-4 shadow-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{post.date}</span>
                <span className="text-[10px] text-[#0066b2] font-bold uppercase tracking-wider hover:underline">{post.category}</span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-gray-800 leading-snug group-hover:text-[#0066b2] transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
