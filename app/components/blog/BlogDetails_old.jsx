"use client";
import React, { useState, useEffect } from "react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon, Youtube } from "lucide-react";

const BlogDetails = ({ blogPost }) => {
  // Hydration mismatch এড়ানোর জন্য মাউন্ট স্টেট চেক
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!blogPost) return null;

  const { title, author, date, image, content } = blogPost;

  return (
    <section className="py-16 px-6 md:px-12 font-sans bg-background">
      {/* ডিজাইন ঠিক রেখে উপরে তোলার জন্য relative z-10 এবং -mt-[200px] যোগ করা হয়েছে */}
      <div className="container mx-auto px-4 md:px-20 relative z-1 -mt-[200px]">        
        {/* BlogContent Wrapper - Dynamic Styling for HTML Content */}
        <style>{`
          .blog-content h1 {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 40px;
            line-height: 120%;
            letter-spacing: 0%;
            text-transform: capitalize;
            color: #0F0F0F;
            margin-bottom: 20px;
            margin-top: 24px;
          }
          .blog-content h2 {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 40px;
            line-height: 120%;
            letter-spacing: 0%;
            text-transform: capitalize;
            color: #0F0F0F;
            margin-bottom: 20px;
            margin-top: 24px;
          }
          .blog-content h3 {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: 0%;
            text-transform: capitalize;
            color: #0F0F0F;
            margin-bottom: 16px;
            margin-top: 24px;
          }
          .blog-content h4 {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 24px;
            line-height: 120%;
            letter-spacing: 0%;
            color: #0F0F0F;
            margin-bottom: 12px;
            margin-top: 16px;
          }
          .blog-content p {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0%;
            color: #6B6B6B;
            margin-bottom: 24px;
            margin-top: 8px;
          }
          .blog-content ul, .blog-content ol {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 18px;
            line-height: 160%;
            letter-spacing: 0%;
            color: #0F0F0F;
            margin-bottom: 24px;
            padding-left: 20px;
            space: 16px;
          }
          .blog-content li {
            margin-bottom: 12px;
          }
          .blog-content strong {
            font-weight: 600;
            color: #0F0F0F;
          }
          .blog-content em {
            font-style: italic;
            color: #0F0F0F;
          }
          .blog-content blockquote {
            border-left: 4px solid #0168B4;
            padding-left: 20px;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #0168B4;
            font-size: 20px;
            line-height: 160%;
            margin-bottom: 24px;
          }
          .blog-content img {
            max-width: 100%;
            height: auto;
            margin: 24px 0;
            border-radius: 12px;
          }
        `}</style>
        {/* Blog Meta Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-8 pb-12">

          {/* Left Side: Title */}
          <div className="flex-1">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // Medium weight
                fontSize: '48px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0A0A0A', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি কালার হিসেবে সেট করা হয়েছে
                maxWidth: '700px'
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Side: Author & Social Icons Group */}
          <div className="flex flex-col items-start  gap-10">

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
                    fontStyle: 'normal', // Medium স্টাইল
                    fontSize: '24px',
                    lineHeight: '120%',
                    letterSpacing: '0%',
                    textTransform: 'capitalize',
                    color: '#0F0F0F', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি এখানে কালার হিসেবে ব্যবহৃত
                    display: 'block',
                    marginBottom: '4px' // নিচের তারিখের সাথে সামঞ্জস্যপূর্ণ গ্যাপের জন্য
                  }}
                >
                  {author || "Chung Hua"}
                </span>
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: '400',
                    fontStyle: 'normal', // Regular style
                    fontSize: '16px',
                    lineHeight: '150%',
                    letterSpacing: '0%',
                    color: '#0A0A0A', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি কালার হিসেবে ব্যবহৃত
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
          className="mb-12 overflow-hidden container mx-auto"
          style={{
            height: '620.84px', // আপনার দেওয়া সুনির্দিষ্ট ভ্যালু
            borderRadius: '32px',
            transform: 'rotate(0deg)',
            maxWidth: '100%', // রেসপন্সিভনেস বজায় রাখার জন্য
            marginInline: 'auto' // কন্টেইনারের মাঝখানে রাখার জন্য
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Article Body - suppressHydrationWarning যোগ করা হয়েছে mismatch এড়াতে */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontStyle: 'normal', // Medium
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            color: '#0F0F0F',// টেক্সটটি যাতে খুব বেশি ছড়িয়ে না যায়
          }}
        >
          HS+ is a global partner for localization, multilingual voice-over, and cross-border marketing. Since 2010, we’ve helped leading game studios, anime creators, and tech innovators connect with audiences in over 40 languages.
        </h3>
        <p className="mt-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontStyle: 'normal', // Regular
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#6B6B6B',
            marginBottom: '24px', // প্যারাগ্রাফের মাঝে গ্যাপ রাখার জন্য
          }}
        >
          When people hear the word “branding,” many immediately think of logos, colors, and fonts. While those are important, branding is much deeper—it’s about perception, emotion, and connection. Branding answers a vital question in every customer’s mind: “How does this make me feel?” When done right, branding shapes how customers experience your business—and how they remember it.
        </p>

        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontStyle: 'normal', // Medium
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            color: '#0F0F0F',
            marginBottom: '20px', // নিচের প্যারাগ্রাফের সাথে গ্যাপের জন্য
          }}
        >
          Introduction
        </h2>
        <p className="mt-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontStyle: 'normal', // Regular
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#6B6B6B',
            marginBottom: '24px', // প্যারাগ্রাফের মাঝে গ্যাপ রাখার জন্য
          }}
        >
          When people hear the word “branding,” many immediately think of logos, colors, and fonts. While those are important, branding is much deeper—it’s about perception, emotion, and connection. Branding answers a vital question in every customer’s mind: “How does this make me feel?” When done right, branding shapes how customers experience your business—and how they remember it.
        </p>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontStyle: 'normal', // Medium
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            color: '#0F0F0F',
            marginBottom: '20px', // নিচের প্যারাগ্রাফের সাথে গ্যাপের জন্য
          }}
        >
          Understanding the Asian Gaming Market
        </h2>
        <p className="mt-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontStyle: 'normal', // Regular
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#6B6B6B',
            marginBottom: '24px', // প্যারাগ্রাফের মাঝে গ্যাপ রাখার জন্য
          }}
        >
          Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
        </p>
        <ol
          className="space-y-4 list-decimal pl-5 "
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
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

        <h2 className="mt-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontStyle: 'normal', // Medium
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            color: '#0F0F0F',
            marginBottom: '20px', // নিচের প্যারাগ্রাফের সাথে গ্যাপের জন্য
          }}
        >
          The Role of Localization Beyond Translation
        </h2>
        <p className="mt-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontStyle: 'normal', // Regular
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#6B6B6B',
            marginBottom: '24px', // প্যারাগ্রাফের মাঝে গ্যাপ রাখার জন্য
          }}
        >
          Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
        </p>
        <ol
          className="space-y-4 list-decimal pl-5 "
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
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


        {/* ============================================================================================================================================================= */}
        <div
          className="mb-12 mt-12 overflow-hidden container mx-auto"
          style={{
            height: '480px', // আপনার দেওয়া নতুন হাইট
            borderRadius: '24px', // ৩২ থেকে কমিয়ে ২৪ করা হয়েছে
            opacity: 1,
            transform: 'rotate(0deg)',
            maxWidth: '100%',
            marginInline: 'auto'
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
          />
        </div>
        <h2 className="mt-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            fontStyle: 'normal', // Medium
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0%',
            textTransform: 'capitalize',
            color: '#0F0F0F',
            marginBottom: '20px', // নিচের প্যারাগ্রাফের সাথে গ্যাপের জন্য
          }}
        >
          Multilingual Voice-Over: Bringing Characters to Life
        </h2>
        <p className="mt-6"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '400',
            fontStyle: 'normal', // Regular
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#6B6B6B',
            marginBottom: '24px', // প্যারাগ্রাফের মাঝে গ্যাপ রাখার জন্য
          }}
        >
          Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.
        </p>
        <ol
          className="space-y-4 list-decimal pl-5 "
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: '500',
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



        {/* ============================================================================================================================================ */}

        <div className="container mx-auto py-10 font-sans">

          {/* Content Section */}
          <div className="mb-12">
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              fontStyle: 'normal', // Medium
              fontSize: '40px',
              lineHeight: '120%',
              letterSpacing: '0%',
              textTransform: 'capitalize',
              color: '#0F0F0F',
              marginBottom: '20px', // নিচের প্যারাগ্রাফের সাথে গ্যাপের জন্য
            }}>
              Influencer & KOL Marketing For Games
            </h3>

            <div className="space-y-6">
              {[
                { title: "1. Brand Identity (Visuals)", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "2. Tone of Voice", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "3. Brand Story", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
                { title: "4. User Experience (UX)", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." }
              ].map((item, index) => (
                <div key={index}>
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Paragraph font family (Poppins)
                      fontWeight: '500',
                      fontStyle: 'normal', // Medium weight
                      fontSize: '18px',
                      lineHeight: '150%',
                      letterSpacing: '0%',
                      color: '#0F0F0F', // আপনার দেওয়া ব্যাকগ্রাউন্ড কোডটি কালার হিসেবে সেট করা হয়েছে
                      marginBottom: '4px',
                      display: 'block'
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif", // Family/Body font
                      fontWeight: '500',
                      fontStyle: 'normal', // Medium style
                      fontSize: '16px',
                      lineHeight: '160%',
                      letterSpacing: '0.01em', // 1% letter spacing
                      color: '#575757', // আপনার দেওয়া নতুন কালার কোড
                      marginBottom: '16px'
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mb-12 mt-12 overflow-hidden container mx-auto"
            style={{
              height: '480px', // আপনার দেওয়া নতুন হাইট
              borderRadius: '24px', // ৩২ থেকে কমিয়ে ২৪ করা হয়েছে
              opacity: 1,
              transform: 'rotate(0deg)',
              maxWidth: '100%',
              marginInline: 'auto'
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
            />
          </div>

          {/* The Quote Box - Exactly like the image */}
          <div
            className="my-12 p-8 text-center"
            style={{
              border: '2px dashed #0168B4', // ইমেজের মতো নীল ড্যাশড বর্ডার
              borderRadius: '24px',
              backgroundColor: 'transparent'
            }}
          >
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // Medium
                fontSize: '40px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0168B4', // আপনার দেওয়া নীল কালার কোডটি টেক্সট কালার হিসেবে
                textAlign: 'center',
                verticalAlign: 'middle'
              }}
            >
              "People Will Forget What You Said, But They'll Remember How Your Brand Made Them Feel."
            </h2>
          </div>

          {/* Conclusion Section */}
          <div className="mt-12">
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500',
                fontStyle: 'normal', // Medium
                fontSize: '40px',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
                color: '#0F0F0F',
                marginBottom: '16px'
              }}
            >
              Conclusion
            </h3>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '400',
                fontStyle: 'normal', // Regular
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                color: '#6B6B6B', // আপনার দেওয়া কালার কোড
                marginTop: '16px'
              }}
            >
              Expanding into Asian markets is more than just translation—it's about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BlogDetails;