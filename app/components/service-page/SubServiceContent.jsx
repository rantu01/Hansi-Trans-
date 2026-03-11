"use client";
import React from "react";

const SubServiceContent = ({ subService }) => {
  const dynamicFeatures = subService?.features?.map((feature, index) => {
    const hasSeparator = feature.includes(":");
    return {
      id: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
      title: hasSeparator ? feature.split(":")[0] : "Service Feature",
      desc: hasSeparator ? feature.split(":")[1] : feature,
    };
  }) || [];

  const featuresData = [
    {
      "id": "01",
      "title": "Native Voice Talent",
      "desc": "Choose from professional native speakers and voice actors across 40+ languages."
    },
    {
      "id": "02",
      "title": "Media Synchronisation",
      "desc": "We integrate voice-overs into your videos, apps, IVR systems or animations."
    },
    {
      "id": "03",
      "title": "Studio-Grade Recording",
      "desc": "Recordings done in professional studios, noise-free, mastered and delivered in your format."
    },
    {
      "id": "04",
      "title": "Cultural Consulting",
      "desc": "Every language version passes through a QA process to ensure correct tone, pronunciation, and cultural appropriateness."
    },
    {
      "id": "05",
      "title": "Script Translation",
      "desc": "Not just literal translation — we adapt the script to suit the phrasing, rhythm and cultural context of each language."
    }
  ];

  return (
    <div className="bg-background container mx-auto p-4 md:p-6 font-sans">
      <div className="container mx-auto">

        {/* Why Matters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12 mb-12 md:mb-20">
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: "500",
              color: "#0A0A0A",
              lineHeight: "120%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              margin: "0",
              flex: "1",
            }}
          >
            Why {subService?.title || "This Service"} <br /> Matters
          </h2>
          <p className="text-gray-500 text-xs md:text-sm flex-1 leading-relaxed md:max-w-md">
            {subService?.description || "In today's global market, your voice is more than sound: it's how you build brand trust, convey emotion, and connect with users in their native language. Poor translations or non-native voice talent can undermine credibility. With our service, you ensure every listener feels like you're speaking to them."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-full mb-16 md:mb-32 px-0 md:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {featuresData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white p-6 md:p-10 rounded-[24px] md:rounded-[40px] items-center text-center transition-all duration-300 hover:shadow-xl w-full sm:w-[calc(50%-16px)] lg:w-[calc(33%-22px)]"
                style={{ minHeight: "260px" }}
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
                  {item.id}
                </span>

                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fontSize: "clamp(18px, 2.5vw, 28px)",
                    color: "#0168B4",
                    lineHeight: "120%",
                    marginBottom: "12px",
                    textTransform: "capitalize",
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
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alternating Content Sections */}
        <div className="space-y-16 md:space-y-32 mb-12 md:mb-20">

          {/* Section 1 - Strategic Growth */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 relative group flex justify-center items-center w-full">
              <div
                className="relative overflow-hidden shadow-lg w-full"
                style={{
                  maxWidth: "568px",
                  aspectRatio: "568 / 500",
                  borderRadius: "clamp(20px, 3vw, 36px)",
                  opacity: "1",
                }}
              >
                <div className="absolute inset-0 bg-primary/5 -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                  alt="Working"
                  style={{ borderRadius: "clamp(20px, 3vw, 36px)" }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-8 md:space-y-20 w-full">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(26px, 4vw, 48px)",
                  fontWeight: "500",
                  color: "#0A0A0A",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  margin: "0",
                }}
              >
                Why This Service <br /> Matters
              </h3>
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
                In today's global market, your product must feel local. We help
                you build trust and connect with users in their native language through professional {subService?.title}.
              </p>

              <ul className="space-y-0">
                {[
                  "Enhance engagement",
                  "Improve comprehension",
                  "Boost brand personality",
                  "Reduce time & cost",
                ].map((list, i) => (
                  <li key={i} className="flex items-center gap-2">
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
                      0{i + 1}
                    </span>
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
                      {list}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2 - Visual Banner */}
          <div className="text-center text-start">
            <h3
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(26px, 4vw, 48px)",
                fontWeight: "500",
                color: "#0A0A0A",
                lineHeight: "120%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                margin: "0",
              }}
            >
              Ready for 40+ Languages
            </h3>

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
              We currently support a broad range of languages — from widely spoken international
              ones to regional variants. Each voice-talent is a native speaker with local accent
              and cultural fluency. Example list (not exhaustive): English, Spanish, French,
              German, Italian, Arabic, Mandarin (Simplified & Traditional), Japanese, Korean,
              Portuguese, Hindi, Bengali, Turkish, Thai, Russian Microcopy: Need a specific
              dialect (e.g., Latin American Spanish, Brazilian Portuguese, Indian English)?
              Just ask — we can accommodate.
            </p>
            <div
              className="w-full mx-auto overflow-hidden relative group mt-6"
              style={{
                maxWidth: "1296px",
                aspectRatio: "1296 / 500",
                borderRadius: "clamp(16px, 3vw, 36px)",
                opacity: "1",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="Professional Setup"
                style={{ borderRadius: "clamp(16px, 3vw, 36px)" }}
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-14 w-full mx-auto">
            <div className="flex-1 w-full relative group" style={{ minHeight: "300px" }}>
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800"
                className="rounded-[40px] w-full h-full object-cover relative z-10 shadow-lg"
                alt="Localization"
                style={{ minHeight: "300px", maxHeight: "500px" }}
              />
            </div>

            <div className="flex-1 space-y-6 text-start w-full">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(26px, 4vw, 48px)",
                  fontWeight: "500",
                  color: "#0A0A0A",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  margin: "0",
                }}
              >
                Ready for 40+ Languages
              </h3>

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
                We currently support a broad range of languages — from widely spoken international
                ones to regional variants. Each voice-talent is a native speaker with local accent
                and cultural fluency. Example list (not exhaustive): English, Spanish, French,
                German, Italian, Arabic, Mandarin (Simplified & Traditional), Japanese, Korean,
                Portuguese, Hindi, Bengali, Turkish, Thai, Russian Microcopy: Need a specific
                dialect (e.g., Latin American Spanish, Brazilian Portuguese, Indian English)?
                Just ask — we can accommodate.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 w-full mx-auto">
            <div className="flex-1 w-full relative group" style={{ minHeight: "300px" }}>
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                className="rounded-[40px] w-full h-full object-cover relative z-10 shadow-lg shadow-primary/5"
                alt="Localization"
                style={{ borderRadius: "36px", minHeight: "300px", maxHeight: "500px" }}
              />
            </div>

            <div className="flex-1 space-y-6 w-full">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(26px, 4vw, 48px)",
                  fontWeight: "500",
                  color: "#0A0A0A",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  textTransform: "capitalize",
                  margin: "0",
                }}
              >
                Ready for 40+ Languages
              </h3>

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
                We currently support a broad range of languages — from widely spoken international
                ones to regional variants. Each voice-talent is a native speaker with local accent
                and cultural fluency. Example list (not exhaustive): English, Spanish, French,
                German, Italian, Arabic, Mandarin (Simplified & Traditional), Japanese, Korean,
                Portuguese, Hindi, Bengali, Turkish, Thai, Russian Microcopy: Need a specific
                dialect (e.g., Latin American Spanish, Brazilian Portuguese, Indian English)?
                Just ask — we can accommodate.
              </p>
            </div>
          </div>
        </div>

        {/* Final Footer Section */}
        <div className="text-center mt-16 md:mt-32 max-w-7xl mx-auto py-10 md:py-16 px-4 md:px-8">
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(26px, 4vw, 48px)",
              fontWeight: "500",
              color: "#0A0A0A",
              lineHeight: "120%",
              letterSpacing: "0%",
              textTransform: "capitalize",
              margin: "0",
            }}
          >
            Ready for 40+ Languages
          </h3>
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
            We currently support a broad range of languages — from widely spoken international
            ones to regional variants. Each voice-talent is a native speaker with local accent
            and cultural fluency. Example list (not exhaustive): English, Spanish, French,
            German, Italian, Arabic, Mandarin (Simplified & Traditional), Japanese, Korean,
            Portuguese, Hindi, Bengali, Turkish, Thai, Russian Microcopy: Need a specific
            dialect (e.g., Latin American Spanish, Brazilian Portuguese, Indian English)?
            Just ask — we can accommodate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubServiceContent;