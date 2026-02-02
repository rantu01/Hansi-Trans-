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
      {/* এখানে relative এবং z-10 যোগ করা হয়েছে যাতে নেগেটিভ মার্জিন দিলেও 
          কন্টেন্টটি উপরের সেকশনের নিচে না যায়। mt-[-200px] ব্যবহার করা হয়েছে।
      */}
      <div className="container mx-auto px-20 relative z-10 -mt-[200px]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-4">
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
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)' // হালকা শ্যাডো যাতে সাদার ওপর সাদা বোঝা যায়
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
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // 'Medium' weight 500 কে নির্দেশ করে
                fontSize: '60px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0168B4', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি এখানে টেক্সট কালার হিসেবে ব্যবহৃত
              }}
            >
              Exploring ideas with <br /> the Hansi Trans
            </h2>
          </div>

          {/* Filter Bar */}
          <div
            className="flex items-center  shadow-lg shadow-secondary/10"
            style={{
              width: '526px',
              height: '85px',
              borderRadius: '100px',
              justifyContent: 'space-between',
              opacity: 1,
              padding: '24px 16px', // top/bottom 24px, left/right 16px
              background: '#002C4C',
              transform: 'rotate(0deg)',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: "'Poppins', sans-serif", // Family/Body সাধারণত Poppins বা একই ধরণের ফন্ট বোঝায়
                  fontWeight: '500',
                  fontStyle: 'normal', // Medium weight
                  fontSize: '16px',
                  lineHeight: '160%',
                  letterSpacing: '1%',
                  transition: 'all 0.3s ease',
                  padding: '20px 18px', // বাটন শেপ ঠিক রাখার জন্য প্যাডিং
                  borderRadius: '100px',
                  whiteSpace: 'nowrap',
                  // Active এবং ইন-অ্যাক্টিভ কালার লজিক
                  backgroundColor: activeFilter === cat ? '#FFFFFF' : 'transparent',
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mb-20">
            {filteredPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group cursor-pointer">
                <div
                  className="overflow-hidden mb-6 shadow-sm shadow-primary/5 bg-primary/5 border border-primary/5"
                  style={{
                    width: '416px',
                    height: '350px',
                    borderRadius: '12px', // আপনার রিকোয়ারমেন্ট অনুযায়ী ৩২ থেকে কমিয়ে ১২ করা হয়েছে
                    opacity: 1,
                    transform: 'rotate(0deg)',
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex justify-between items-center mb-4 px-1">
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Family/Body এর জন্য Poppins সাধারণত স্ট্যান্ডার্ড
                      fontWeight: '400',
                      fontStyle: 'normal', // Regular style
                      fontSize: '14px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      color: '#616161', // আপনার দেওয়া কালার কোডটি এখানে ব্যবহৃত
                      display: 'block' // মার্জিন এবং এলাইনমেন্ট ঠিক রাখতে ব্লক এলিমেন্ট হিসেবে সেট করা হয়েছে
                    }}
                  >
                    {post.date}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Family/Body এর জন্য স্ট্যান্ডার্ড
                      fontWeight: '500',
                      fontStyle: 'normal', // Medium স্টাইল
                      fontSize: '14px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      color: '#0168B4', // নীল ব্যাকগ্রাউন্ডের ওপর সাদা টেক্সট (ভিজিবিলিটির জন্য)
                      padding: '4px 12px', // ব্যাজ শেপ ঠিক রাখার জন্য প্যাডিং
                      borderRadius: '100px', // রাউন্ডেড শেপ
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textTransform: 'none' // আগের uppercase টা রিমুভ করা হয়েছে আপনার গাইডলাইন অনুযায়ী
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <h3
                  className="group-hover:text-primary transition-colors duration-300 px-1 border-t border-[#262626]/10 pt-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '500',
                    fontStyle: 'normal', // Medium স্টাইল
                    fontSize: '24px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    textTransform: 'capitalize',
                    color: '#262626', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি কালার হিসেবে সেট করা হয়েছে
                    marginTop: '12px' // ইমেজ এবং ক্যাটাগরির সাথে সামঞ্জস্য রাখতে সামান্য মার্জিন
                  }}
                >
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