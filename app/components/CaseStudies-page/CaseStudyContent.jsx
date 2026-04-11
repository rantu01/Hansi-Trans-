"use client";
import React from "react";
import CountUp from "react-countup";

const fallbackDetailsContent = {
  introduction: {
    title: "Introduction",
    text: "Expanding your game into Asian markets is an exciting opportunity—but without proper localization, even the best game can fail to connect. This guide walks you through cultural adaptation, language challenges, voice-over best practices, and marketing strategies to make your game a success in China, Japan, Korea, and Southeast Asia.",
  },
  sectionOne: {
    title: "Understanding The Asian Gaming Market",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC cafe gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
    highlight: "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  },
  sectionTwo: {
    title: "Understanding The Asian Gaming Market",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC cafe gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
    highlight: "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  },
  richSectionOne: {
    title: "Multilingual Voice-Over: Bringing Characters To Life",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC café gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
  },
  richSectionTwo: {
    title: "Influencer & KOL Marketing For Games",
    cards: [
      { title: "Brand Identity (Visuals)", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "Tone of Voice", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "Brand Story", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "User Experience (UX)", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
    ],
  },
  bannerImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  quoteText: "\"People will forget what you said, but they'll remember how your brand made them feel.\"",
  conclusion: {
    title: "Conclusion",
    text: "Expanding into Asian markets is more than just translation—it's about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.",
  },
};

const mergeDetailsContent = (input = {}) => ({
  ...fallbackDetailsContent,
  ...input,
  introduction: {
    ...fallbackDetailsContent.introduction,
    ...(input.introduction || {}),
  },
  sectionOne: {
    ...fallbackDetailsContent.sectionOne,
    ...(input.sectionOne || {}),
    points: Array.isArray(input.sectionOne?.points)
      ? input.sectionOne.points
      : fallbackDetailsContent.sectionOne.points,
  },
  sectionTwo: {
    ...fallbackDetailsContent.sectionTwo,
    ...(input.sectionTwo || {}),
    points: Array.isArray(input.sectionTwo?.points)
      ? input.sectionTwo.points
      : fallbackDetailsContent.sectionTwo.points,
  },
  richSectionOne: {
    ...fallbackDetailsContent.richSectionOne,
    ...(input.richSectionOne || {}),
    points: Array.isArray(input.richSectionOne?.points)
      ? input.richSectionOne.points
      : fallbackDetailsContent.richSectionOne.points,
  },
  richSectionTwo: {
    ...fallbackDetailsContent.richSectionTwo,
    ...(input.richSectionTwo || {}),
    cards: Array.isArray(input.richSectionTwo?.cards)
      ? input.richSectionTwo.cards
      : fallbackDetailsContent.richSectionTwo.cards,
  },
  conclusion: {
    ...fallbackDetailsContent.conclusion,
    ...(input.conclusion || {}),
  },
});

const CaseStudyContent = ({ caseStudy }) => {
  const stats = caseStudy?.stats || [];
  const content = mergeDetailsContent(caseStudy?.detailsContent || {});

  const renderImageTextSection = (section, imageFirst = false) => (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24">
      {imageFirst && (
        <div className="flex-1 w-full" style={{ aspectRatio: "632 / 444" }}>
          <img
            src={section.image}
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: "32px" }}
            alt="Case Study"
          />
        </div>
      )}

      <div className="flex-1 space-y-6 w-full">
        <h3
          className="text-secondary"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: "500",
            fontStyle: "normal",
            fontSize: "clamp(22px, 3vw, 32px)",
            lineHeight: "120%",
            letterSpacing: "0%",
            textTransform: "capitalize",
            color: "#0F0F0F",
          }}
        >
          {section.title}
        </h3>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "400",
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "0%",
            color: "#6B6B6B",
          }}
        >
          {section.text}
        </p>
        <ol
          className="space-y-4 list-decimal pl-5"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "400",
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "160%",
            letterSpacing: "0%",
            color: "#0F0F0F",
          }}
        >
          {(section.points || []).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
        <div className="w-fit">
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "500",
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#015FA4",
            }}
          >
            {section.highlight}
          </p>
        </div>
      </div>

      {!imageFirst && (
        <div className="flex-1 w-full" style={{ aspectRatio: "632 / 444" }}>
          <img
            src={section.image}
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: "32px" }}
            alt="Case Study"
          />
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-background font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Publisher Info Section */}
        <div className="flex items-center justify-between mb-10 p-6 bg-white rounded-[32px]">
          {/* Left Side: Icon + Label */}
          <div className="flex items-center gap-2">
            <img src="/Frame.svg" alt="icon" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span
              style={{
                color: '#015FA4', // টেক্সট কালার সাদা (যেহেতু ব্যাকগ্রাউন্ড গাঢ় নীল)
                fontFamily: 'Inter, sans-serif',
                fontSize: '32px',
                fontWeight: '500', // Medium
                fontStyle: 'normal',
                lineHeight: '120%',
                letterSpacing: '0%',
                textTransform: 'capitalize',
              }}
            >
              publisher
            </span>
          </div>

          {/* Right Side: Tencent Logo */}
          <div className="flex items-center">
            {/* আপনি চাইলে লোগো ইমেজ ব্যবহার করতে পারেন অথবা এই স্টাইলড টেক্সটটি রাখতে পারেন */}
            <img
              src="/photo/images.png" // যদি লোগো ইমেজ থাকে
              alt="Tencent"
              className="h-12 object-contain italic font-bold"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* ব্যাকআপ টেক্সট লোগো (যদি ইমেজ লোড না হয়) */}

          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
          {stats.slice(0, 2).map((stat, index) => {
            const numericValue = parseInt(String(stat.value || "").replace(/[^0-9]/g, "")) || 0;
            const suffix = String(stat.value || "").replace(/[0-9]/g, "");

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
                    {({ countUpRef }) => <span ref={countUpRef} />}
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

        <div className="mb-12 md:mb-20">
          <h3
            className="text-secondary mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              fontStyle: "normal",
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: "120%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#0F0F0F",
            }}
          >
            {content.introduction.title}
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              color: "#616161",
              textRendering: "optimizeLegibility",
            }}
          >
            {content.introduction.text}
          </p>
        </div>

        {renderImageTextSection(content.sectionOne, false)}
        {renderImageTextSection(content.sectionTwo, true)}

        <div className="container mx-auto py-6 px-2 sm:px-6 space-y-6 mb-8 md:mb-12">
          <section className="space-y-6">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "clamp(24px, 4vw, 40px)",
                lineHeight: "120%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#0F0F0F",
              }}
            >
              {content.richSectionOne.title}
            </h2>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "18px",
                lineHeight: "160%",
                letterSpacing: "0%",
                color: "#6B6B6B",
              }}
            >
              {content.richSectionOne.text}
            </p>
            <ol
              className="list-decimal pl-5 space-y-3"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "400",
                fontStyle: "normal",
                fontSize: "18px",
                lineHeight: "160%",
                letterSpacing: "0%",
                color: "#0F0F0F",
              }}
            >
              {(content.richSectionOne.points || []).map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ol>
          </section>

          <section className="space-y-8">
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "clamp(24px, 4vw, 40px)",
                lineHeight: "120%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                color: "#0F0F0F",
              }}
            >
              {content.richSectionTwo.title}
            </h2>
            <div className="space-y-6">
              {(content.richSectionTwo.cards || []).map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "500",
                      fontStyle: "normal",
                      fontSize: "18px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: "#0F0F0F",
                    }}
                  >
                    {index + 1}. {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "500",
                      fontStyle: "normal",
                      fontSize: "16px",
                      lineHeight: "160%",
                      letterSpacing: "1%",
                      color: "#616161",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className=" px-6 py-12 font-sans text-[#333]">

          {/* --- Execution Approach Section --- */}
          <section className="mb-12">
            <h2 className="text-4xl font-semibold mb-6">Execution Approach</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                The project was delivered on schedule ahead of launch on the voice-production side, with continued support for ongoing character updates and UA / advertising voice-over after release.
              </p>
              <p>
                On the localization side, HS+ treated the project as a fantasy-tone challenge rather than a simple translation task. For English, the team developed a "neutral fantasy tone" inspired by classic fantasy but without overly archaic language, so the writing stayed epic while remaining readable. Character roles and personalities were differentiated more clearly, while terminology across skills, systems, and lore was kept stable across the three launch languages.
              </p>
            </div>
          </section>

          {/* --- Results Section --- */}
          <section className="mb-16">
            <h2 className="text-4xl font-semibold mb-6">Results</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                On the voice-over side, HS+ used a parallel production workflow. Daily cross-language PM coordination kept casting, session timing, and asset handoff aligned, while remote live-directed sessions enabled real-time direction and faster retakes. Post-production then processed more than 80,000 dialogue takes, applying cleanup, mix, master, standardized naming, and strict version control before delivery.
              </p>
              <p>
                On the localization side, HS+ helped preserve a consistent fantasy tone, stronger readability, and clearer terminology across high-priority launch languages. The outcome was a multilingual experience that kept the emotional and narrative weight of the original while making the game more accessible to players in both Western and Asian markets.
              </p>
            </div>
          </section>

          {/* --- Outcome Highlights Section --- */}
          <section>
            <h2 className="text-4xl font-semibold mb-10">Outcome Highlights</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="bg-gradient-to-b from-[#0B253B] to-[#010101] p-10 rounded-[40px] text-white min-h-[350px] flex flex-col justify-between shadow-xl">
                <h3 className="text-3xl font-medium leading-tight mb-6">Delivered Ahead Of Launch</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Multilingual VO completed on schedule with structured post-production and delivery.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-b from-[#0B253B] to-[#010101] p-10 rounded-[40px] text-white min-h-[350px] flex flex-col justify-between shadow-xl">
                <h3 className="text-3xl font-medium leading-tight mb-6">Cross-language consistency</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Fantasy tone, character voice, and terminology stayed aligned across launch languages.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-b from-[#0B253B] to-[#010101] p-10 rounded-[40px] text-white min-h-[350px] flex flex-col justify-between shadow-xl">
                <h3 className="text-3xl font-medium leading-tight mb-6">Ongoing support</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  HS+ continued supporting updates and UA / advertising voice-over after the main production cycle.
                </p>
              </div>

            </div>
          </section>
        </div>
        <div
          className="w-full relative mb-8 md:mb-12"
          style={{
            aspectRatio: "16 / 5",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
        >
          <img
            src={content.bannerImage}
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: "24px" }}
            alt="Case Study Banner"
          />
        </div>

        <div className="border-2 border-dashed border-primary rounded-[40px] p-8 md:p-16 my-12 md:my-24 relative overflow-hidden">
          <h4
            className="relative z-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "500",
              fontStyle: "normal",
              fontSize: "clamp(22px, 3.5vw, 40px)",
              lineHeight: "120%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              verticalAlign: "middle",
              color: "#0168B4",
            }}
          >
            {content.quoteText}
          </h4>
        </div>

        <div className="mb-12 md:mb-20 py-8 md:py-12">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "500",
              fontStyle: "normal",
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: "120%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              color: "#0F0F0F",
            }}
          >
            {content.conclusion.title}
          </h3>
          <p
            className="container"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              color: "#6B6B6B",
            }}
          >
            {content.conclusion.text}
          </p>
        </div>

        <div className=" mx-auto px-4 py-12 ">
          {/* Heading */}
          <h2
            className="text-[#111111] mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "40px",
              fontWeight: "600",
              lineHeight: "120%",
              letterSpacing: "-0.02em"
            }}
          >
            Why This Case Matters
          </h2>

          {/* Description Paragraph */}
          <p
            className="text-[#555555] mb-10 "
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: "400",
              lineHeight: "160%",
            }}
          >
            DragonHeir is a strong example of what HS+ does best: handling global content as a connected production system rather than splitting localization, performance, and post into disconnected vendors. The project combined large-scale voice-over, editorial localization, cross-language PM, fantasy-tone control, and delivery discipline in one workflow. That made it possible to move fast without losing clarity, tone, or production control. This is exactly the kind of coordinated global-launch support the HS+ website content is built around.
          </p>

          {/* Image Container with Rounded Corners */}
          <div className="w-full overflow-hidden rounded-[24px] shadow-sm">
            <img
              src="/Contra Return 2.avif"
              alt="DragonHeir Gameplay"
              className="w-full h-auto object-cover display-block"
            />
          </div>
        </div>

        <div className="inline-flex items-center justify-center mb-6 px-4 py-5 bg-white rounded-full shadow-sm gap-2 w-full ">
          <img src="/Frame.svg" alt="icon" className="w-10 h-10" />
          <span style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '32px', fontWeight: '500' }}>Testimonials</span>
        </div>


        <div className="flex space-x-4 bg-gray-50 p-6 rounded-xl overflow-x-auto mx-auto ">
          {/* Localization Card */}
          <div className="flex h-[148px] w-[315px] items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "28px",
                lineHeight: "120%",
                letterSpacing: "0%",
                textAlign: "center",
                textTransform: "capitalize",
                color: "#015FA4", // আপনার দেওয়া কালার কোড
              }}
            >
              Localization
            </h3>
          </div>

          {/* Multilingual Voice-Over Card */}
          <div className="flex h-[148px] w-[315px] items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "28px",
                lineHeight: "120%",
                letterSpacing: "0%",
                textAlign: "center",
                textTransform: "capitalize",
                color: "#015FA4",
              }}
            >
              Multilingual Voice-Over
            </h3>
          </div>

          {/* Cross-Language PM Card */}
          <div className="flex h-[148px] w-[315px] items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "28px",
                lineHeight: "120%",
                letterSpacing: "0%",
                textAlign: "center",
                textTransform: "capitalize",
                color: "#015FA4",
              }}
            >
              Cross-Language PM
            </h3>
          </div>

          {/* Post-Production Card */}
          <div className="flex h-[148px] w-[315px] items-center justify-center rounded-xl bg-white p-6 shadow-sm">
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontStyle: "normal",
                fontSize: "28px",
                lineHeight: "120%",
                letterSpacing: "0%",
                textAlign: "center",
                textTransform: "capitalize",
                color: "#015FA4",
              }}
            >
              Post-Production
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyContent;
