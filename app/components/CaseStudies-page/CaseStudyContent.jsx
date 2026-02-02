"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/app/config/api";
import CountUp from "react-countup";

const CaseStudyContent = () => {
  const { slug } = useParams();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await fetch(API.featuredCaseStudies);
        const data = await res.json();
        const found = data.data.find((c) => c.slug === slug);
        if (found) {
          setStats(found.stats || []);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchCase();
  }, [slug]);

  return (
    <section className="bg-background font-sans">
      <div className="container mx-auto px-12">

        {/* Stats Section (DYNAMIC) - Branded Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {stats.slice(0, 2).map((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, "")) || 0;
            const suffix = stat.value.replace(/[0-9]/g, "");

            return (
              <div
                key={index}
                className="bg-white rounded-[32px] py-10 text-center shadow-sm shadow-primary/5 hover:border-primary/30 transition-all"
              >
                <h2
                  className="mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "500",
                    fontStyle: "normal",
                    fontSize: "48px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    textTransform: "capitalize",
                    color: "#0168B4",
                  }}
                >
                  <CountUp
                    start={0}
                    end={numericValue}
                    duration={2.5}
                    suffix={suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  >
                    {({ countUpRef }) => (
                      <span ref={countUpRef} /> // এই স্প্যানটি টার্গেট নাল হওয়ার এরর বন্ধ করবে
                    )}
                  </CountUp>
                </h2>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "400",
                    fontStyle: "normal",
                    fontSize: "18px",
                    lineHeight: "160%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    color: "#616161",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Introduction */}
        <div className="mb-20">
          <h3
            className="text-secondary mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              fontStyle: 'normal', // 'Medium' মূলত weight 500 কে বোঝায়
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F' // আপনার দেওয়া ব্যাকগ্রাউন্ড কালারটি এখানে টেক্সট কালার হিসেবে দেওয়া হয়েছে
            }}
          >
            Introduction
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontStyle: 'normal', // 'Regular' মানে font-style: normal
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#616161',
              textRendering: 'optimizeLegibility'
            }}
          >
            Expanding your game into Asian markets is an exciting opportunity—but without proper localization, even the best game can fail to connect. This guide walks you through cultural adaptation, language challenges, voice-over best practices, and marketing strategies to make your game a success in China, Japan, Korea, and Southeast Asia.
          </p>
        </div>

        {/* Market Analysis – Text Left */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1 space-y-6">
            <h3
              className="text-secondary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Understanding The Asian Gaming Market
            </h3>
            <p
              className=""
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal', // Regular style
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#6B6B6B' // background: #6B6B6B কে টেক্সট কালার হিসেবে ব্যবহার করা হয়েছে
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
            </p>
            <ol
              className="space-y-4 list-decimal pl-5 "
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F' // background: #0F0F0F কে টেক্সট কালার হিসেবে ব্যবহার করা হয়েছে
              }}
            >
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <div className=" w-fit">
              <p
                className=""
                style={{
                  fontFamily: "'Poppins', sans-serif", // 'Family/Paragraph' সাধারণত Poppins বা একই ধরণের ফন্টকে বোঝায়
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#015FA4',
                }}
              >
                👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.
              </p>
            </div>
          </div>

          <div
            className="flex-1 relative"
            style={{
              width: '632px',
              height: '444px',
              opacity: 1,
              transform: 'rotate(0deg)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full h-full object-cover shadow-xl shadow-primary/5"
              style={{
                borderRadius: '32px',
              }}
              alt="Studio Mic"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div
            className="flex-1 relative"
            style={{
              width: '632px',
              height: '444px',
              opacity: 1,
              transform: 'rotate(0deg)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full h-full object-cover shadow-xl shadow-primary/5"
              style={{
                borderRadius: '32px',
              }}
              alt="Studio Mic"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3
              className="text-secondary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: '32px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Understanding The Asian Gaming Market
            </h3>
            <p
              className=""
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal', // Regular style
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#6B6B6B' // background: #6B6B6B কে টেক্সট কালার হিসেবে ব্যবহার করা হয়েছে
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
            </p>
            <ol
              className="space-y-4 list-decimal pl-5 "
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F' // background: #0F0F0F কে টেক্সট কালার হিসেবে ব্যবহার করা হয়েছে
              }}
            >
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <div className=" w-fit">
              <p
                className=""
                style={{
                  fontFamily: "'Poppins', sans-serif", // 'Family/Paragraph' সাধারণত Poppins বা একই ধরণের ফন্টকে বোঝায়
                  fontWeight: '500',
                  fontStyle: 'normal',
                  fontSize: '18px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#015FA4',
                }}
              >
                👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.
              </p>
            </div>
          </div>


        </div>

        <div className="container mx-auto py-6 px-6 space-y-6 mb-12">

          {/* Section 1: Multilingual Voice-Over */}
          <section className="space-y-6">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // 'Medium' weight 500 কে নির্দেশ করে
                fontSize: '40px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Multilingual Voice-Over: Bringing Characters To Life
            </h2>

            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal', // 'Regular' মানে normal স্টাইল
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#6B6B6B' // background কোডটি টেক্সট কালার হিসেবে সেট করা হয়েছে
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
            </p>

            <ol
              className="list-decimal pl-5 space-y-3"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal', // 'Regular' স্টাইলের জন্য
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F' // background কালার কোডটি এখানে টেক্সট কালার হিসেবে ব্যবহৃত
              }}
            >
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC café gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
          </section>

          {/* Section 2: Influencer & KOL Marketing */}
          <section className="space-y-8">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // 'Medium' weight 500 কে নির্দেশ করে
                fontSize: '40px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Influencer & KOL Marketing For Games
            </h2>

            <div className="space-y-6">
              {[
                { title: "Brand Identity (Visuals)", desc: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "Tone of Voice", desc: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "Brand Story", desc: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "User Experience (UX)", desc: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Family/Paragraph নির্দেশিকা অনুযায়ী
                      fontWeight: '500',
                      fontStyle: 'normal', // Medium style
                      fontSize: '18px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      color: '#0F0F0F' // background: #0F0F0F কে টেক্সট কালার হিসেবে ব্যবহার করা হয়েছে
                    }}
                  >
                    {index + 1}. {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Family/Body গাইডলাইন অনুযায়ী
                      fontWeight: '500',
                      fontStyle: 'normal', // Medium স্টাইল
                      fontSize: '16px',
                      lineHeight: '160%',
                      letterSpacing: '1%',
                      color: '#616161' // background কালার কোডটি টেক্সট কালার হিসেবে ব্যবহৃত
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
        <div
          className="container px-6 relative w-full"
          style={{
            height: '480px',
            opacity: 1,
            transform: 'rotate(0deg)',
            margin: '0 auto' // কন্টেইনারকে মাঝখানে রাখার জন্য
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{
              borderRadius: '24px', // আপনার রিকোয়ারমেন্ট অনুযায়ী ৩২px থেকে কমিয়ে ২৪px করা হয়েছে
            }}
            alt="Studio Mic"
          />
        </div>

        {/* Quote Section - Branded */}
        <div className="border-2 border-dashed border-primary rounded-[40px] p-16  my-24 relative overflow-hidden">

          <h4
            className="relative z-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontStyle: 'normal', // 'Medium' weight 500 কে নির্দেশ করে
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              verticalAlign: 'middle',
              color: '#0168B4', // background কোডটি টেক্সট কালার হিসেবে ব্যবহৃত
            }}
          >
            "People will forget what you said, but they'll remember how your brand made them feel."
          </h4>
        </div>

        {/* Conclusion */}
        <div className="mb-20 py-12 ">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontStyle: 'normal', // 'Medium' weight 500 কে নির্দেশ করে
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F' // background কোডটি টেক্সট কালার হিসেবে ব্যবহৃত
            }}
          >
            Conclusion
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontStyle: 'normal', // 'Regular' স্টাইল
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#6B6B6B' // background কোডটি টেক্সট কালার হিসেবে ব্যবহৃত
            }}
          >
            Expanding into Asian markets is more than just translation—it’s about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyContent;