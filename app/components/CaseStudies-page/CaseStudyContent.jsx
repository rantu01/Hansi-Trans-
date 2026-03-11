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
      <div className="container mx-auto px-4 sm:px-6 md:px-12">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
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
                    fontSize: "clamp(32px, 4vw, 48px)",
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
                      <span ref={countUpRef} />
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
        <div className="mb-12 md:mb-20">
          <h3
            className="text-secondary mb-6"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: 'clamp(26px, 4vw, 40px)',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F'
            }}
          >
            Introduction
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontStyle: 'normal',
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
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24">
          <div className="flex-1 space-y-6 w-full">
            <h3
              className="text-secondary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Understanding The Asian Gaming Market
            </h3>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#6B6B6B'
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.
            </p>
            <ol
              className="space-y-4 list-decimal pl-5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F'
              }}
            >
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <div className="w-fit">
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
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

          <div className="flex-1 w-full" style={{ aspectRatio: '632 / 444' }}>
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full h-full object-cover shadow-xl shadow-primary/5"
              style={{ borderRadius: '32px' }}
              alt="Studio Mic"
            />
          </div>
        </div>

        {/* Market Analysis – Image Left */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24">
          <div className="flex-1 w-full" style={{ aspectRatio: '632 / 444' }}>
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full h-full object-cover shadow-xl shadow-primary/5"
              style={{ borderRadius: '32px' }}
              alt="Studio Mic"
            />
          </div>
          <div className="flex-1 space-y-6 w-full">
            <h3
              className="text-secondary"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F'
              }}
            >
              Understanding The Asian Gaming Market
            </h3>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0%',
                color: '#6B6B6B'
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.
            </p>
            <ol
              className="space-y-4 list-decimal pl-5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F'
              }}
            >
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <div className="w-fit">
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
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

        {/* Text Sections */}
        <div className="container mx-auto py-6 px-2 sm:px-6 space-y-6 mb-8 md:mb-12">

          {/* Section 1: Multilingual Voice-Over */}
          <section className="space-y-6">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: 'clamp(24px, 4vw, 40px)',
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
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#6B6B6B'
              }}
            >
              Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.
            </p>
            <ol
              className="list-decimal pl-5 space-y-3"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#0F0F0F'
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
                fontStyle: 'normal',
                fontSize: 'clamp(24px, 4vw, 40px)',
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
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '500',
                      fontStyle: 'normal',
                      fontSize: '18px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      color: '#0F0F0F'
                    }}
                  >
                    {index + 1}. {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: '500',
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '160%',
                      letterSpacing: '1%',
                      color: '#616161'
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Full Width Image */}
        <div
          className="w-full relative mb-8 md:mb-12"
          style={{
            aspectRatio: '16 / 5',
            opacity: 1,
            transform: 'rotate(0deg)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: '24px' }}
            alt="Studio Mic"
          />
        </div>

        {/* Quote Section */}
        <div className="border-2 border-dashed border-primary rounded-[40px] p-8 md:p-16 my-12 md:my-24 relative overflow-hidden">
          <h4
            className="relative z-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: 'clamp(22px, 3.5vw, 40px)',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              verticalAlign: 'middle',
              color: '#0168B4',
            }}
          >
            "People will forget what you said, but they'll remember how your brand made them feel."
          </h4>
        </div>

        {/* Conclusion */}
        <div className="mb-12 md:mb-20 py-8 md:py-12">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontStyle: 'normal',
              fontSize: 'clamp(26px, 4vw, 40px)',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F'
            }}
          >
            Conclusion
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#6B6B6B'
            }}
          >
            Expanding into Asian markets is more than just translation—it's about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyContent;