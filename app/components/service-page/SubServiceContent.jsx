"use client";
import React from "react";
import { getSubServicePageContent } from "./serviceContentUtils";

const getLayoutClass = (layout, index) => {
  if (layout === "full-width") {
    return "flex-col";
  }

  if (layout === "image-right") {
    return "flex-col md:flex-row-reverse";
  }

  if (layout === "image-left") {
    return "flex-col md:flex-row";
  }

  return index % 2 === 0 ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse";
};

const SectionImage = ({ src, alt }) => (
  <div className="flex-1 w-full relative group" style={{ minHeight: "300px" }}>
    <div className="absolute inset-0 rounded-[40px] bg-primary/5 rotate-2 transition-transform duration-500 group-hover:rotate-0"></div>
    <img
      src={src}
      alt={alt}
      className="relative z-10 h-full w-full rounded-[40px] object-cover shadow-lg"
      style={{ minHeight: "300px", maxHeight: "520px" }}
    />
  </div>
);

const SubServiceContent = ({ subService }) => {
  const content = getSubServicePageContent(subService || {});

  return (
    <div className="bg-background container mx-auto p-4 md:p-6 font-sans">
      <div className="container mx-auto">
        {/* Flexible intro block */}
        <div className="mb-12 grid gap-6 rounded-[32px] bg-white px-6 py-8 shadow-sm md:mb-20 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-12">
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: "500",
              color: "#0A0A0A",
              lineHeight: "120%",
              margin: "0",
            }}
          >
            {content.introTitle}
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              fontSize: "18px",
              color: "#6B6B6B",
              lineHeight: "150%",
              marginBottom: "16px",
            }}
          >
            {content.introDescription}
          </p>
        </div>

        {/* Features Grid - Already matching */}
        {content.featureCards.length > 0 ? (
          <div className="mb-16 w-full px-0 md:mb-32 md:px-6">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {content.featureCards.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex min-h-[260px] w-full flex-col items-center rounded-[24px] bg-white p-6 text-center transition-all duration-300 hover:shadow-xl sm:w-[calc(50%-16px)] md:rounded-[40px] md:p-10 lg:w-[calc(33%-22px)]"
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      fontSize: "clamp(32px, 4vw, 48px)",
                      color: "#E6E6E6",
                      lineHeight: "120%",
                      marginBottom: "16px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      fontSize: "clamp(18px, 2.5vw, 28px)",
                      color: "#0168B4",
                      lineHeight: "120%",
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "400",
                      fontSize: "16px",
                      color: "#616161",
                      lineHeight: "150%",
                      margin: "0",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Detail Sections - UPDATED to match static */}
        <div className="mb-12 space-y-16 md:mb-20 md:space-y-32">
          {content.detailSections.map((section, index) => {
            const layoutClass = getLayoutClass(section.layout, index);

            if (section.layout === "full-width") {
              return (
                <div key={`${section.title}-${index}`} className="space-y-6 text-start">
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(26px, 4vw, 48px)",
                      fontWeight: "500",
                      color: "#0A0A0A",
                      lineHeight: "120%",
                      margin: "0",
                    }}
                  >
                    {section.title}
                  </h3>
                  {/* CHANGED: Tailwind → inline styles to match static */}
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#616161",
                      lineHeight: "160%",
                      letterSpacing: "1%",
                      marginTop: "20px",
                    }}
                  >
                    {section.description}
                  </p>
                  {section.image ? <SectionImage src={section.image} alt={section.title} /> : null}
                </div>
              );
            }

            return (
              <div key={`${section.title}-${index}`} className={`flex items-center gap-8 md:gap-14 ${layoutClass}`}>
                {section.image ? <SectionImage src={section.image} alt={section.title} /> : null}
                {/* CHANGED: space-y-6 → space-y-8 md:space-y-20 to match static Section 1 */}
                <div className="flex-1 space-y-8 md:space-y-20 w-full">
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(26px, 4vw, 48px)",
                      fontWeight: "500",
                      color: "#0A0A0A",
                      lineHeight: "120%",
                      margin: "0",
                    }}
                  >
                    {section.title}
                  </h3>
                  {/* CHANGED: Tailwind → inline styles to match static */}
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#616161",
                      lineHeight: "160%",
                      letterSpacing: "1%",
                      margin: "0",
                      fontStyle: "normal",
                    }}
                  >
                    {section.description}
                  </p>
                  {section.items?.length > 0 ? (
                    /* CHANGED: space-y-3 → space-y-0 to match static */
                    <ul className="space-y-0">
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item}-${itemIndex}`} className="flex items-center gap-2">
                          {/* CHANGED: Complete redesign to match static styling */}
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "48px",
                              height: "48px",
                              borderRadius: "50%",
                              color: "#B0D0E8",
                              fontFamily: "Inter, sans-serif",
                              fontSize: "24px",
                              fontWeight: "500",
                              lineHeight: "120%",
                              letterSpacing: "0%",
                              textTransform: "capitalize",
                            }}
                          >
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                          {/* CHANGED: text-base → 18px Poppins to match static */}
                          <span
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "400",
                              fontSize: "18px",
                              color: "#0168B4",
                              lineHeight: "160%",
                              letterSpacing: "0%",
                              textTransform: "none",
                            }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {content.flowImage ? (
          <div className="flex items-center justify-center">
            <img
              src={content.flowImage}
              alt={`${subService?.title || "Service"} flow`}
              className="max-w-full h-80 rounded-md"
            />
          </div>
        ) : null}

        {/* Footer Section - UPDATED to match static */}
        <div className="mx-auto mt-16 max-w-7xl px-4 py-10 text-center md:mt-32 md:px-8 md:py-16">
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(26px, 4vw, 48px)",
              fontWeight: "500",
              color: "#0A0A0A",
              lineHeight: "120%",
              margin: "0",
            }}
          >
            {content.footerTitle}
          </h3>
          {/* CHANGED: Tailwind → inline styles to match static */}
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              color: "#616161",
              lineHeight: "160%",
              letterSpacing: "1%",
              marginTop: "20px",
            }}
          >
            {content.footerDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubServiceContent;