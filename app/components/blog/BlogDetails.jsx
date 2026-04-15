

"use client";
import React, { useState, useEffect } from "react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon, Youtube } from "lucide-react";

const defaultBlogContent = {
  title: "How To Localize Games For Asian Markets: A Complete Guide",
  author: "Chung Hsu",
  date: "12 Sep 2025",
  image: "/photo/blog-hero.jpg",
  sections: [
    {
      type: "heading",
      text: "Introduction",
    },
    {
      type: "paragraph",
      text: "Expanding into Asian markets is a major opportunity, but it requires careful localization, cultural adaptation, and production planning.",
    },
    {
      type: "heading",
      text: "Understanding The Asian Gaming Market",
    },
    {
      type: "list",
      items: [
        "Mobile gaming dominates in China and Southeast Asia.",
        "Japan has a strong console and anime-driven audience.",
        "Korea leads in esports and PC-cafe culture.",
        "Southeast Asia is diverse with fast-growing markets like Indonesia and Thailand.",
      ],
    },
    {
      type: "image",
      src: "/photo/blog-hero.jpg",
      alt: "Blog section image",
    },
    {
      type: "heading",
      text: "Multilingual Voice-Over: Bringing Characters To Life",
    },
    {
      type: "paragraph",
      text: "Parallel voice production with coordinated PM and live-directed sessions reduces turnaround and keeps performance consistent across languages.",
    },
    {
      type: "quote",
      text: "People will forget what you said, but they'll remember how your brand made them feel.",
    },
    {
      type: "heading",
      text: "Conclusion",
    },
    {
      type: "paragraph",
      text: "Localization is more than translation. It is a production discipline that brings together localization, voice, QA, and cultural design.",
    },
  ],
};

const mergeBlogContent = (input = {}) => ({
  ...defaultBlogContent,
  ...input,
  sections: Array.isArray(input.sections) && input.sections.length > 0 ? input.sections : defaultBlogContent.sections,
});

const BlogDetails = ({ blogPost }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = mergeBlogContent(blogPost || {});
  const { title, author, date, image, sections } = content;

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

      case 'highlight':
        return (
          <div
            key={index}
            style={{
              borderLeft: '4px solid #0168B4',
              background: '#F3F8FD',
              borderRadius: '18px',
              padding: '20px 24px',
              marginBottom: '24px',
              marginTop: '12px',
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '160%',
                color: '#0168B4',
                margin: 0,
              }}
            >
              {section.text}
            </p>
          </div>
        );

      case 'image':
        if (!section.src && !section.image) return null;
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
              src={section.src || section.image}
              alt={section.alt || section.text || "Section"}
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
      <div className="container mx-auto px-4 md:px-2 relative z-1 -mt-[200px]">

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
                { Icon: FbIcon, color: '#002C4C' },
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
        <div className="container mx-auto" >
          {mounted && sections && sections.length > 0 ? (
            sections.map((section, index) => renderSection(section, index))
          ) : null}
        </div>

      </div>
    </section>
  );
};

export default BlogDetails;
