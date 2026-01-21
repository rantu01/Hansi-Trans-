"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import { API } from '@/app/config/api';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);

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

  const handleSeeAll = () => {
    setVisibleCount(blogs.length);
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading Blogs...</div>;
  }

  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            {/* Badge with Frame.svg */}
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
                fontSize: '48px',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 container mx-auto">
          {blogs.slice(0, visibleCount).map((post) => (
            <div key={post._id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative rounded-[30px] overflow-hidden mb-6 aspect-[4/3] border border-gray-50">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4">
                <span 
                  style={{
                    color: '#616161',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '150%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {post.date}
                </span>
                <span 
                  style={{
                    color: '#0168B4',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: '150%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 
                className="group-hover:text-[#0168B4] transition-colors line-clamp-2"
                style={{
                  color: '#262626',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  lineHeight: '120%',
                  textTransform: 'capitalize',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {visibleCount < blogs.length && (
          <div className="flex justify-center">
            <button 
              onClick={handleSeeAll}
              className="inline-flex items-center gap-3 border border-[#0168B4]/30 pl-8 pr-2 py-2 rounded-full transition-all group shadow-sm hover:bg-gray-50"
              style={{
                color: '#0168B4',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '160%',
                letterSpacing: '0.16px'
              }}
            >
              See All Blog
              <span className="bg-[#0168B4] text-white rounded-full p-2 transition-transform group-hover:rotate-45">
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