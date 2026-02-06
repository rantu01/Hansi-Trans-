// app/not-found.jsx
"use client";
import Link from "next/link";
import Hero from "./components/common/Hero";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Hero
        title="404 - Page Not Found"
        breadcrumb="Home › 404"
        description="Coming Soon!"
        hideContent={true}
      >
        {/* কন্টেন্টকে মাঝখানে রাখার জন্য কন্টেইনার */}
        <div className="flex flex-col items-center justify-center w-full text-center px-4 mb-20 md:mb-40">
          
          {/* ইমেজ সেকশন: রেসপনসিভ উইডথ সেট করা হয়েছে */}
          <div className="mb-8 w-full flex justify-center">
            <img
              src="/photo/404.png"
              alt="404"
              // মোবাইলে ফুল উইডথ কিন্তু ডেস্কটপে আপনার দেওয়া ৬৮২ পিক্সেল থাকবে
              className="w-full max-w-[320px] sm:max-w-[450px] md:max-w-[682px] h-auto object-contain mx-auto"
            />
          </div>

          {/* আপনার দেওয়া স্পেসিফিকেশন অনুযায়ী বাটন */}
          <Link
            href="/"
            className="inline-flex transition-all group hover:scale-105 active:scale-95 shadow-xl"
            style={{
              display: 'flex',
              height: '52px',
              width: '190px', // আপনার দেওয়া ফিক্সড উইডথ
              padding: '4px 4px 4px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '100px',
              background: '#FFFFFF',
              color: '#0168B4',
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '160%',
              letterSpacing: '0.16px',
              textDecoration: 'none'
            }}
          >
            Go Back Home
            <span
              className="bg-[#0168B4] text-white rounded-full transition-transform duration-300 group-hover:rotate-45"
              style={{
                display: 'flex',
                width: '44px',
                height: '44px',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </Link>
          
        </div>
      </Hero>
    </div>
  );
}