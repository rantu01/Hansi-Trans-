"use client";
import React, { useState, useEffect } from "react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon, Youtube } from "lucide-react";

const BlogDetails = ({ blogPost }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!blogPost) return null;

  const { title, author, date, image, description, sections } = blogPost;

  // Render section based on type
  const renderSection = (section, index) => {
    switch (section.type) {
      case 'heading':
        return (
          <h2
            key={index}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F',
              marginBottom: '20px',
              marginTop: '24px',
            }}
          >
            {section.text}
          </h2>
        );

      case 'paragraph':
        return (
          <p
            key={index}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#6B6B6B',
              marginBottom: '24px',
              marginTop: '8px',
            }}
          >
            {section.text}
          </p>
        );

      case 'list':
        return (
          <ol
            key={index}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '500',
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#0F0F0F',
              marginBottom: '24px',
              paddingLeft: '20px',
              listStyleType: 'decimal',
            }}
          >
            {section.items && section.items.map((item, i) => (
              <li key={i} style={{ marginBottom: '12px' }}>
                {item}
              </li>
            ))}
          </ol>
        );

      case 'quote':
        return (
          <div
            key={index}
            style={{
              border: '2px dashed #0168B4',
              borderRadius: '24px',
              padding: '32px',
              textAlign: 'center',
              backgroundColor: 'transparent',
              marginBottom: '24px',
              marginTop: '24px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '40px',
                lineHeight: '120%',
                letterSpacing: '0%',
                color: '#0168B4',
                textAlign: 'center',
              }}
            >
              "{section.text}"
            </h3>
          </div>
        );

      case 'image':
        return (
          <div
            key={index}
            style={{
              height: '480px',
              borderRadius: '24px',
              overflow: 'hidden',
              maxWidth: '100%',
              marginInline: 'auto',
              marginBottom: '24px',
              marginTop: '24px',
            }}
          >
            <img
              src={section.src}
              alt="Section"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 font-sans bg-background">
      <div className="container mx-auto px-4 md:px-20 relative z-1 -mt-[200px]">

        {/* Blog Meta Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 pb-12">

          {/* Left Side: Title */}
          <div className="flex-1">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0A0A0A',
                maxWidth: '700px'
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Side: Author & Social Icons Group */}
          <div className="flex flex-col items-start gap-10">

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <img
                src='/photo/avater.jpg'
                alt="Author"
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '500',
                    fontSize: '24px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    textTransform: 'capitalize',
                    color: '#0F0F0F',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  {author || "Chung Hua"}
                </span>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: '400',
                    fontSize: '16px',
                    lineHeight: '150%',
                    letterSpacing: '0%',
                    color: '#0A0A0A',
                    display: 'block'
                  }}
                >
                  Posted on {date || "12 Sep 2025"}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              {[
                { Icon: TwIcon, color: '#002C4C' },
                { Icon: LiIcon, color: '#002C4C' },
                { Icon: Youtube, color: '#002C4C' }
              ].map((social, i) => (
                <button
                  key={i}
                  className="w-[34px] h-[34px] flex items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: '#002C4C', color: 'white' }}
                >
                  <social.Icon size={14} fill="currentColor" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div
          style={{
            height: '620.84px',
            borderRadius: '32px',
            overflow: 'hidden',
            maxWidth: '100%',
            marginInline: 'auto',
            marginBottom: '48px'
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              transition: 'transform 1s ease-out',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>

        {/* Dynamic Sections Rendering */}
        <div style={{ maxWidth: '900px', marginInline: 'auto' }}>
          {mounted && sections && sections.length > 0 ? (
            sections.map((section, index) => renderSection(section, index))
          ) : (
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '400',
              fontSize: '18px',
              lineHeight: '160%',
              color: '#6B6B6B'
            }}>
              কোনো কন্টেন্ট নেই।
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default BlogDetails;
