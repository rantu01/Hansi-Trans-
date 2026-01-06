"use client"
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { API } from '@/app/config/api';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

  // এপিআই থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API.Blogs.getAll);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 'See All' বাটনের ফাংশন
  const handleSeeAll = () => {
    setVisibleCount(blogs.length);
  };

  if (loading) {
    return <div className="py-20 text-center">Loading Blogs...</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Blogs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Insights And <br /> Resources
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore tips, guides, and industry trends shaping global launches today.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 container mx-auto">
          {blogs.slice(0, visibleCount).map((post) => (
            <div key={post._id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative rounded-[30px] overflow-hidden mb-6 aspect-[4/3]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  {post.date}
                </span>
                <span className="text-[#0070c0] text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#0070c0] transition-colors line-clamp-2">
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Button - শুধুমাত্র তখনই দেখাবে যখন আরও ব্লগ বাকি থাকবে */}
        {visibleCount < blogs.length && (
          <div className="flex justify-center">
            <button 
              onClick={handleSeeAll}
              className="inline-flex items-center gap-3 border border-blue-400 text-[#0070c0] pl-8 pr-2 py-2 rounded-full font-bold hover:bg-blue-50 transition-all group shadow-sm"
            >
              See All Blog
              <span className="bg-[#0070c0] text-white rounded-full p-2 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Blogs;