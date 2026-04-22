

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
            className="text-2xl sm:text-3xl md:text-[40px] font-medium mb-5 mt-6 text-[#0F0F0F] capitalize"
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: '120%' }}
          >
            {section.text}
          </h2>
        );

      case 'paragraph':
        return (
          <p
            key={index}
            className="text-sm sm:text-base md:text-[18px] text-[#6B6B6B] mb-6 mt-2 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%' }}
          >
            {section.text}
          </p>
        );

      case 'list':
        return (
          <ol
            key={index}
            className="text-sm sm:text-base md:text-[18px] text-[#0F0F0F] mb-6 pl-5 list-decimal"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, lineHeight: '160%' }}
          >
            {section.items && section.items.map((item, i) => (
              <li key={i} className="mb-3">
                {item}
              </li>
            ))}
          </ol>
        );

      case 'quote':
        return (
          <div
            key={index}
            className="border-2 border-dashed border-[#0168B4] rounded-2xl p-6 sm:p-8 text-center my-6"
          >
            <h3
              className="text-xl sm:text-2xl md:text-[40px] text-[#0168B4]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '120%' }}
            >
              "{section.text}"
            </h3>
          </div>
        );

      case 'highlight':
        return (
          <div
            key={index}
            className="border-l-4 border-[#0168B4] bg-[#F3F8FD] rounded-lg px-4 py-3 my-3"
          >
            <p className="text-sm sm:text-base text-[#0168B4] m-0" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, lineHeight: '160%' }}>
              {section.text}
            </p>
          </div>
        );

      case 'image':
        if (!section.src && !section.image) return null;
        return (
          <div
            key={index}
            className="w-full overflow-hidden rounded-[24px] mb-6 mt-6"
          >
            <div className="h-56 sm:h-72 md:h-[480px] w-full overflow-hidden rounded-[24px]">
              <img
                src={section.src || section.image}
                alt={section.alt || section.text || "Section"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="mt-45 md:mt-0 md:mt-60 md:py-16 px-4 sm:px-6 md:px-12 font-sans bg-background">
      <div className="container mx-auto px-2 relative z-1 -mt-[160px] md:-mt-[200px]">

        {/* Blog Meta Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 pb-12">

          {/* Left Side: Title */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-[48px] font-semibold text-[#0A0A0A] max-w-full md:max-w-[700px]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '120%', textTransform: 'capitalize' }}>
              {title}
            </h2>
          </div>

          {/* Right Side: Author & Social Icons Group */}
          <div className="flex flex-col items-start gap-6 md:gap-10">

            {/* Author Info */}
              <div className="flex items-center gap-3">
              <img
                src='/photo/avater.jpg'
                alt="Author"
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span
                    className="text-base md:text-[24px] font-medium text-[#0F0F0F] mb-1"
                    style={{ fontFamily: "'Inter', sans-serif", display: 'block', textTransform: 'capitalize' }}
                >
                  {author || "Chung Hua"}
                </span>
                <span
                    className="text-sm md:text-[16px] text-[#0A0A0A]"
                    style={{ fontFamily: "'Poppins', sans-serif", display: 'block' }}
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
        <div className="w-full mx-auto mb-12">
          <div className="h-56 sm:h-72 md:h-[620.84px] w-full rounded-[32px] overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ transition: 'transform 1s ease-out' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
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
