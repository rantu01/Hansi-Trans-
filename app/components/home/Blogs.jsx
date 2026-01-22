"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { API } from '@/app/config/api';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API.Blogs.getAll);
        // API response array না হলে খালি array সেট করার সেফটি
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSeeAll = () => {
    setVisibleCount(blogs.length);
  };

  // Hydration error এড়াতে মাউন্ট হওয়া নিশ্চিত করা
  if (!isMounted) return null;

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-[#0168B4] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading Blogs...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 mb-6 bg-white shadow-sm"
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.16px'
              }}
            >
              <img src="/Frame.svg" alt="icon" className="w-4 h-4" />
              Blogs
            </div>
            
            <h2 
              style={{
                color: '#0A0A0A',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)', // রেসপনসিভ ফন্ট সাইজ
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%',
                textTransform: 'capitalize'
              }}
            >
              Insights And <br /> Resources
            </h2>
          </div>
          
          <div className="md:max-w-xs pt-4 md:pt-14 text-left">
            <p 
              style={{
                color: '#616161',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%'
              }}
            >
              Explore tips, guides, and industry trends shaping global launches today.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {blogs.slice(0, visibleCount).map((post) => (
            <div key={post._id} className="group cursor-pointer flex flex-col">
              {/* Image Container */}
              <div className="relative rounded-[30px] overflow-hidden mb-6 aspect-[4/3] border border-gray-100 bg-white">
                <img 
                  src={post.image || "/api/placeholder/400/300"} // ইমেজ না থাকলে প্লেসহোল্ডার
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4 px-1">
                <span 
                  style={{
                    color: '#616161',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {post.date}
                </span>
                <span 
                  style={{
                    color: '#0168B4',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 
                className="group-hover:text-[#0168B4] transition-colors line-clamp-2 px-1"
                style={{
                  color: '#262626',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  lineHeight: '130%',
                  textTransform: 'capitalize',
                }}
              >
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {blogs.length > 3 && visibleCount < blogs.length && (
          <div className="flex justify-center">
            <button 
              onClick={handleSeeAll}
              className="inline-flex items-center gap-4 border border-[#0168B4]/30 pl-8 pr-2 py-2 rounded-full transition-all group shadow-sm hover:bg-[#0168B4]/5 active:scale-95"
              style={{
                color: '#0168B4',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '160%',
              }}
            >
              See All Blog
              <span className="bg-[#0168B4] text-white rounded-full p-2.5 transition-transform duration-300 group-hover:rotate-45">
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