"use client";
import React from "react";
import CountUp from "react-countup";

const fallbackDetailsContent = {
  publisher: {
    name: "",
    logo: "",
  },
  introduction: {
    title: "Introduction",
    text: "Expanding your game into Asian markets is an exciting opportunity—but without proper localization, even the best game can fail to connect. This guide walks you through cultural adaptation, language challenges, voice-over best practices, and marketing strategies to make your game a success in China, Japan, Korea, and Southeast Asia.",
  },
  sectionOne: {
    title: "The Challenge",
    text: "DragonHeir presented two major challenges at the same time. The first was scale. On the voice side, the project involved 38,000+ lines, around 350 actors, 12 fully produced songs, and cross-language scheduling over a tight two-month production window. On the localization side, the game required large-scale story, dialogue, and system-text support across launch languages, with the need to preserve fantasy tone while keeping the writing readable and natural for different audiences. The second was consistency. High-fantasy content can easily lose strength when terminology, character voice, and emotional tone drift between languages. For DragonHeir, the work had to feel epic without becoming unnatural, and multilingual assets had to remain aligned across both production and post-production.",
    image: "/photo/challenge-image.png", // Replace with your actual image path
    highlight: "Coordinated multilingual production and tone consistency across launch languages.",
  },
  sectionTwo: {
    title: "What HS+ Delivered",
    text: "HS+ supported DragonHeir through a coordinated multilingual production model that covered:",
    points: [
      "multilingual voice-over production in English, Japanese, Korean, and Chinese",
      "cross-language project management for casting, scheduling, and delivery",
      "remote live-directed sessions for faster creative alignment and retakes",
      "edit, cleanup, mix, and master-to-spec post-production with version control",
      "localization and editorial services from Simplified Chinese into English, Japanese, and Korean across large volumes of story, dialogue, and system text",
      "terminology and tone handling to maintain a readable but still epic fantasy voice in English and aligned character treatment across all launch languages",
    ],
    image: "/photo/dragonheir-logo-image.png", // Replace with your actual image path
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
      
    ],
  },
  sections: [],
  bannerImage: "/Contra Return 2.avif",
  quoteText: "\"People will forget what you said, but they'll remember how your brand made them feel.\"",
  conclusion: {
    title: "Conclusion",
    text: "Expanding into Asian markets is more than just translation—it's about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.",
  },
};

const mergeDetailsContent = (input = {}) => ({
  ...fallbackDetailsContent,
  ...input,
  publisher: {
    ...fallbackDetailsContent.publisher,
    ...(input.publisher || {}),
  },
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
  sections: Array.isArray(input.sections)
    ? input.sections
    : fallbackDetailsContent.sections,
  conclusion: {
    ...fallbackDetailsContent.conclusion,
    ...(input.conclusion || {}),
  },
});

const CaseStudyContent = ({ caseStudy }) => {
  const stats = caseStudy?.stats || [];
  const content = mergeDetailsContent(caseStudy?.detailsContent || {});
  const hasFlexibleSections = Array.isArray(content.sections) && content.sections.length > 0;

  // Updated render function to handle list points and image positioning
  const renderImageTextSection = (section, imageFirst = false) => (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12 md:mb-24">
      {/* If imageFirst is true, show image on left (Desktop) */}
      {imageFirst && (
        <div className="flex-1 w-full order-1" style={{ aspectRatio: "632 / 444" }}>
          <img
            src={section.image}
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: "32px" }}
            alt={section.title}
          />
        </div>
      )}

      <div className={`flex-1 space-y-6 w-full ${imageFirst ? "order-2" : "order-1"}`}>
        <h3 className="text-xl sm:text-2xl md:text-[32px] font-medium" style={{ fontFamily: "'Inter', sans-serif", lineHeight: '120%', color: '#0F0F0F', textTransform: 'capitalize' }}>
          {section.title}
        </h3>

        <p className="text-sm sm:text-base md:text-[16px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', color: '#6B6B6B' }}>
          {section.text}
        </p>

        {/* Render points if they exist (for the second section) */}
        {section.points && section.points.length > 0 && (
          <ul className="space-y-3">
            {section.points.map((point, idx) => (
              <li key={idx} className="flex gap-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", color: "#6B6B6B" }}>
                <span className="font-medium text-[#0F0F0F]">{idx + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* If imageFirst is false, show image on right (Desktop) */}
      {!imageFirst && (
        <div className="flex-1 w-full order-2" style={{ aspectRatio: "632 / 444" }}>
          <img
            src={section.image}
            className="w-full h-full object-cover shadow-xl shadow-primary/5"
            style={{ borderRadius: "32px" }}
            alt={section.title}
          />
        </div>
      )}
    </div>
  );

  const renderFlexibleSection = (section, index) => {
    const sectionType = section?.type || "text";

    if (sectionType === "quote") {
      return (
        <section key={`${sectionType}-${index}`} className="mx-auto px-4 py-6 md:py-6">
          <div className="rounded-[32px] bg-white p-8 md:p-12 shadow-sm border border-black/5">
            {section.title ? (
              <h3 className="mb-4 text-2xl sm:text-3xl md:text-[40px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', color: '#0F0F0F' }}>
                {section.title}
              </h3>
            ) : null}
            <p className="text-lg sm:text-xl md:text-[24px] leading-relaxed text-[#404040] italic" style={{ fontFamily: 'Inter, sans-serif' }}>
              {section.quote || section.text}
            </p>
            {section.caption ? (
              <p className="mt-4 text-sm sm:text-base text-[#6B6B6B]">{section.caption}</p>
            ) : null}
          </div>
        </section>
      );
    }

    if (sectionType === "cards") {
      // support admin-configured variants: 'grid' (default) or 'strip' (compact horizontal strip)
      const variant = section.variant || "grid";
      if (variant === "strip") {
        return (
          <section key={`${sectionType}-${index}`} className=" py-6 md:py-10">
            {section.title ? (
              <h3 className="mb-4 text-2xl sm:text-3xl md:text-[32px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', color: '#0F0F0F' }}>
                {section.title}
              </h3>
            ) : null}
            {section.text ? (
              <p className="mb-4 text-sm sm:text-base md:text-[16px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', color: '#616161' }}>
                {section.text}
              </p>
            ) : null}

            <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-xl mx-auto justify-center items-center">
              {/* Title Section - Now Full Width */}
              <div className="inline-flex items-center justify-center px-4  md:py-5 bg-white rounded-full  gap-2 w-full">
                <img src="/Frame.svg" alt="icon" className="w-10 h-10" />
                <span className="text-lg md:text-[32px]" style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 500 }}>
                  Service used
                </span>
              </div>

              {/* Cards Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-visible md:flex md:space-x-4 md:overflow-x-auto">
                {(section.cards || []).map((card, idx) => (
                  <div
                    key={`${card.title}-${idx}`}
                    className="flex h-[148px] min-w-full md:min-w-[315px] items-center justify-center rounded-xl bg-white p-4 md:p-6  shrink-0"
                  >
                    <h3
                      className="text-lg md:text-[28px] font-medium text-center text-[#015FA4]"
                      style={{ fontFamily: 'Inter, sans-serif', lineHeight: '120%', textTransform: 'capitalize' }}
                    >
                      {card.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      // default grid rendering
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(section.cards || []).map((card, cardIndex) => {
            // ২য় কার্ডটির জন্য (index === 1) গ্রেডিয়েন্ট উপরে থাকবে
            const isMiddleCard = cardIndex === 1;

            return (
              <div
                key={`${card.title || 'card'}-${cardIndex}`}
                className="rounded-[40px] p-8 md:p-10 text-white shadow-2xl flex flex-col justify-start min-h-[250px]"
                style={{
                  background: isMiddleCard
                    ? 'radial-gradient(circle at 50% 10%, #0168B4 0%, #000000 70%)' // ২য় কার্ড: গ্রেডিয়েন্ট উপরে
                    : 'radial-gradient(circle at 50% 90%, #0168B4 0%, #000000 70%)', // ১ম ও ৩য় কার্ড: গ্রেডিয়েন্ট নিচে
                }}
              >
                {card.title && (
                  <h4
                    className="mb-6 text-2xl sm:text-3xl md:text-[34px] font-medium leading-[1.2]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {card.title}
                  </h4>
                )}
                {card.description && (
                  <p
                    className="text-base sm:text-lg md:text-[19px] opacity-80 leading-relaxed"
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    if (sectionType === "image") {
      return (
        <section key={`${sectionType}-${index}`} className="mx-auto px-4 py-6 md:py-6">
          {section.title ? (
            <h3 className="mb-4 text-2xl sm:text-3xl md:text-[40px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', color: '#0F0F0F' }}>
              {section.title}
            </h3>
          ) : null}
          {section.text ? (
            <p className="mb-6 text-sm sm:text-base md:text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', color: '#616161' }}>
              {section.text}
            </p>
          ) : null}
          {section.image ? (
            <div className="overflow-hidden rounded-[28px] shadow-sm">
              <img src={section.image} alt={section.title || caseStudy?.title || "Case study section"} className="w-full h-[480px] object-cover" />
            </div>
          ) : null}
        </section>
      );
    }

    const sectionData = {
      title: section.title,
      text: section.text,
      image: section.image,
      points: section.points || [],
    };

    if (sectionType === "image-text") {
      return (
        <section key={`${sectionType}-${index}`} className="px-4 py-6 md:py-6">
          {renderImageTextSection(sectionData, section.layout === "image-left")}
        </section>
      );
    }

    return (
      <section key={`${sectionType}-${index}`} className="px-4 py-6 md:py-6">
        {section.title ? (
          <h3 className="mb-4 text-2xl sm:text-3xl md:text-[40px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', color: '#0F0F0F' }}>
            {section.title}
          </h3>
        ) : null}
        {section.text ? (
          <p className="mb-6 text-sm sm:text-base md:text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', color: '#616161' }}>
            {section.text}
          </p>
        ) : null}
        {section.points?.length > 0 ? (
          <ul className="space-y-3">
            {section.points.map((point, pointIndex) => (
              <li key={`${point}-${pointIndex}`} className="flex gap-3 text-sm sm:text-base md:text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", lineHeight: '160%', color: '#616161' }}>
                <span className="font-medium text-[#0F0F0F]">{pointIndex + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    );
  };

  return (
    <section className="bg-background font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Publisher Info Section */}
        <div className="flex items-center justify-between mb-10 p-6 bg-white rounded-[32px]">
          <div className="flex items-center gap-2">
            <img src="/Frame.svg" alt="icon" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span className="text-secondary font-medium text-lg md:text-[32px]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '120%', textTransform: 'capitalize', color: '#015FA4' }}>
              {content.publisher?.name || caseStudy?.tag || "publisher"}
            </span>
          </div>

          <div className="flex items-center">
            <img
              src={caseStudy?.logo || content.publisher?.logo || "/photo/images.png"}
              alt={content.publisher?.name || caseStudy?.title || "Publisher"}
              className="h-12 object-contain italic font-bold"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20">
          {stats.map((stat, index) => {
            const numericValue = parseInt(String(stat.value || "").replace(/[^0-9]/g, "")) || 0;
            const suffix = String(stat.value || "").replace(/[0-9]/g, "");

            return (
              <div
                key={index}
                className="bg-white rounded-[32px] py-10 text-center shadow-sm shadow-primary/5 hover:border-primary/30 transition-all"
              >
                <h2 className="mb-2 text-3xl sm:text-4xl md:text-[48px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, lineHeight: '120%', textTransform: 'capitalize', color: '#0168B4' }}>
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
                <p className="text-sm sm:text-base" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', textAlign: 'center', color: '#616161' }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-12 md:mb-20">
          <h3 className="text-secondary mb-6 text-2xl sm:text-3xl md:text-[40px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', textTransform: 'capitalize', color: '#0F0F0F' }}>
            {content.introduction.title}
          </h3>
          <p className="container text-sm sm:text-base md:text-[18px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, lineHeight: '160%', color: '#616161', textRendering: 'optimizeLegibility' }}>
            {content.introduction.text}
          </p>
        </div>

        {hasFlexibleSections ? (
          <div className="space-y-2">
            {content.sections.map((section, index) => renderFlexibleSection(section, index))}
          </div>
        ) : (
          <>
            {renderImageTextSection(content.sectionOne, false)}
            {renderImageTextSection(content.sectionTwo, true)}

            <div className="px-6 py-12 font-sans text-[#333]">
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">{content.richSectionOne.title}</h2>
                <div className="space-y-4 text-lg leading-relaxed text-gray-600">
                  <p>{content.richSectionOne.text}</p>
                </div>
                {content.richSectionOne.points?.length > 0 ? (
                  <ul className="mt-6 space-y-3 text-gray-600">
                    {content.richSectionOne.points.map((point, idx) => (
                      <li key={`${point}-${idx}`} className="flex gap-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <span className="font-medium text-[#0F0F0F]">{idx + 1}.</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>

              <section className="mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10">{content.richSectionTwo.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(content.richSectionTwo.cards || []).map((card, index) => (
                    <div key={`${card.title}-${index}`} className="bg-gradient-to-b from-[#0B253B] to-[#010101] p-8 md:p-10 rounded-[40px] text-white md:min-h-[350px] flex flex-col justify-between shadow-xl">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight mb-6">{card.title}</h3>
                      <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">{card.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {/* <div className="mx-auto px-4 py-12">
          <h2 className="text-[#111111] mb-6 text-2xl sm:text-3xl md:text-[40px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, lineHeight: '120%', letterSpacing: '-0.02em' }}>
            {content.conclusion.title || "Why This Case Matters"}
          </h2>

          <p className="text-[#555555] mb-10 text-sm sm:text-base md:text-[18px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '160%' }}>
            {content.conclusion.text}
          </p>

          {content.bannerImage ? (
            <div className="w-full h-[600px] overflow-hidden rounded-[24px] shadow-sm">
              <img
                src={content.bannerImage}
                alt={`${caseStudy?.title || "Case study"} banner`}
                className="w-full h-auto object-cover display-block"
              />
            </div>
          ) : null}
        </div> */}


        {/* <div className="mx-auto px-4 py-12">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-3 md:py-5 bg-white rounded-full shadow-sm gap-2 w-full">
            <img src="/Frame.svg" alt="icon" className="w-10 h-10" />
            <span className="text-lg md:text-[32px]" style={{ color: '#404040', fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 500 }}>Service used</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 sm:p-6 rounded-xl overflow-visible md:flex md:space-x-4 md:overflow-x-auto mx-auto">
            {(content.richSectionTwo.cards || []).map((card, index) => (
              <div key={`${card.title}-${index}`} className="flex h-[148px] w-full md:w-[315px] items-center justify-center rounded-xl bg-white p-4 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-[28px] font-medium text-center text-[#015FA4]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '120%', textTransform: 'capitalize' }}>
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default CaseStudyContent;
