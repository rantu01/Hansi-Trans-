"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { API } from '@/app/config/api';
// Link ইমপোর্ট করা হয়েছে
import Link from "next/link";

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
              className="inline-flex items-center justify-center mb-6"
              style={{
                display: 'flex',
                height: '50px',
                width: '120px',
                padding: '8px 16px',
                gap: '8px',
                borderRadius: '49px',
                background: '#FFF',
              }}
            >
              <img
                src="/Frame.svg"
                alt="icon"
                style={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#404040', // var(--dark-5)
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

            <h2
              style={{
                color: '#0A0A0A',
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '120%',
                textTransform: 'capitalize'
              }}
            >
              Insights And <br /> Resources
            </h2>
          </div>

          <div className="md:max-w-lg pt-4 md:pt-14 text-left">
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
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div
                className="relative overflow-hidden mb-6 group"
                style={{
                  height: '350px',
                  alignSelf: 'stretch',
                  borderRadius: '12px',
                  background: '#D9D9D9',
                }}
              >
                <img
                  src={post.image || "/api/placeholder/400/350"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>

              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4 px-1">
                <span
                  style={{
                    color: '#616161',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  {post.date}
                </span>
                <span
                  style={{
                    color: '#0168B4',
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {post.category}
                </span>
              </div>

              {/* --- Soja Dag (Divider Image) --- */}
              <div className="px-1 mb-4">
                <img
                  src="/Rectangle 34625767.png"
                  alt="divider"
                  className="w-full h-auto"
                  style={{ display: 'block' }}
                />
              </div>

              {/* Title */}
              <h3
                className="group-hover:text-[#0168B4] transition-colors line-clamp-2 px-1"
                style={{
                  color: '#262626',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  lineHeight: '130%',
                  textTransform: 'capitalize',
                }}
              >
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Bottom Button */}
        {blogs.length > 3 && visibleCount < blogs.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSeeAll}
              className="inline-flex transition-all group active:scale-95"
              style={{
                display: 'flex',
                height: '52px', // Exact height from spec
                padding: '4px 4px 4px 12px', // Adjusted left padding for balance with 12px spec
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px', // Exact gap spec
                borderRadius: '100px', // Perfect capsule
                border: '1px solid #0168B4', // Primary-blue-500
                backgroundColor: 'transparent',
                color: '#0168B4',
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '160%',
                cursor: 'pointer'
              }}
            >
              See All Blog
              <span
                className="bg-[#0168B4] text-white rounded-full transition-transform duration-300 group-hover:rotate-45"
                style={{
                  display: 'flex',
                  padding: '10px', // Spec-er balance rakhar jonno padding
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
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