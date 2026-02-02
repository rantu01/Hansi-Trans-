"use client";
import React from "react";

const SubServiceContent = ({ subService }) => {
  // Extract features from database and format them
  // Extract features from database and format them
  const dynamicFeatures = subService?.features?.map((feature, index) => {
    // যদি ডাটাতে ":" না থাকে, তবে পুরো টেক্সট ডেসক্রিপশন হিসেবে থাকবে এবং টাইটেল ডিফল্ট হবে
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
    <div className="bg-background container mx-auto p-6 font-sans">
      <div className="container mx-auto">

        {/* Why Matters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "48px",
              fontWeight: "500", // Medium
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
          <p className="text-gray-500 text-xs md:text-sm flex-1 leading-relaxed max-w-md">
            {subService?.description || "In today’s global market, your voice is more than sound: it’s how you build brand trust, convey emotion, and connect with users in their native language. Poor translations or non-native voice talent can undermine credibility. With our service, you ensure every listener feels like you’re speaking to them."}
          </p>
        </div>

        {/* Features Grid - Branded styling */}



        <div className="container mx-auto px-6 mb-32">
          <div className="flex flex-wrap justify-center gap-8">
            {featuresData.map((item, index) => (
              <div
                key={index}
                className={`
          flex flex-col bg-white p-10 rounded-[40px]
           items-center text-center 
          transition-all duration-300 hover:shadow-xl
          /* Row 1 (3 items): Desktop e 30% width */
          /* Row 2 (2 items): flex-grow hoye baki jayga nebe */
          flex-grow flex-shrink-0 
          w-full sm:w-[45%] lg:w-[30%]
        `}
                style={{ minHeight: "320px" }}
              >
                {/* 01 - Feature Number */}
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fontSize: "48px",
                    color: "#E6E6E6",
                    lineHeight: "120%",
                    marginBottom: "16px",
                  }}
                >
                  {item.id}
                </span>

                {/* Title */}
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fontSize: "28px",
                    color: "#0168B4",
                    lineHeight: "120%",
                    marginBottom: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {item.title}
                </h4>

                {/* Description */}
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
        <div className="space-y-32 mb-20">

          {/* Section 1 - Strategic Growth */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative group flex justify-center items-center">
              <div
                className="relative overflow-hidden shadow-lg"
                style={{
                  width: "568px",  // Exact spec width
                  height: "500px", // Exact spec height
                  borderRadius: "36px", // Exact spec border-radius
                  opacity: "1",    // Exact spec opacity
                }}
              >
                {/* Background Decorative Layer */}
                <div className="absolute inset-0 bg-primary/5 -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>

                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                  alt="Working"
                  style={{
                    borderRadius: "36px", // Image radius matching container
                  }}
                />
              </div>
            </div>
            <div className="flex-1 space-y-20">
              <h3 className=""
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "48px",
                  fontWeight: "500", // Medium
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
                  fontFamily: "Poppins, sans-serif", // Family/Body spec onujayi
                  fontSize: "16px",
                  fontWeight: "500", // Medium spec onujayi
                  color: "#616161",  // Background spec color
                  lineHeight: "160%",
                  letterSpacing: "1%",
                  margin: "0",
                  fontStyle: "normal",
                }}
              >
                In today's global market, your product must feel local. We help
                you build trust and connect with users in their native language through professional {subService?.title}.
              </p>

              <ul className="space-y-0 ">
                {[
                  "Enhance engagement",
                  "Improve comprehension",
                  "Boost brand personality",
                  "Reduce time & cost",
                ].map((list, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2" // Number circle er sathe gap barhano hoyeche visual clarity-r jonno
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px", // Font size 24px er jonno container arektu boro kora hoyeche
                        height: "48px",
                        borderRadius: "50%", // Spec Background Color
                        color: "#B0D0E8", // Brand primary color for the number
                        fontFamily: "Inter, sans-serif",
                        fontSize: "24px", // Spec Font Size
                        fontWeight: "500", // Medium
                        lineHeight: "120%",
                        letterSpacing: "0%",
                        textTransform: "capitalize",
                      }}
                    >
                      0{i + 1}
                    </span>

                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif", // Poppins spec onujayi
                        fontWeight: "400", // Regular spec onujayi
                        fontSize: "18px", // 18px spec onujayi
                        color: "#0168B4", // Background spec onujayi
                        lineHeight: "160%", // 160% spec onujayi
                        letterSpacing: "0%", // 0% spec onujayi
                        textTransform: "none", // List text-er natural flow rakhar jonno
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
                fontSize: "48px",
                fontWeight: "500", // Medium
                color: "#0A0A0A",  //
                lineHeight: "120%",
                letterSpacing: "0%",
                textTransform: "capitalize",
                margin: "0",
              }}
            >
              Ready for 40+ Languages
            </h3>

            {/* Paragraph Specs Applied */}
            <p
              style={{
                fontFamily: "Poppins, sans-serif", // Family/Body
                fontSize: "16px",
                fontWeight: "500", // Medium
                color: "#616161",  //
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
              className="mx-auto overflow-hidden relative group"
              style={{
                width: "1296px",      // Exact spec width
                height: "500px",     // Exact spec height
                borderRadius: "36px", // Exact spec border-radius
                opacity: "1",         // Exact spec opacity
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 mt-6"
                alt="Professional Setup"
                style={{
                  borderRadius: "36px",
                }}
              />


            </div>
          </div>

          {/* Section 3 - Language Ready */}
          <div
            className="flex flex-col md:flex-row-reverse items-center mx-auto"
            style={{
              width: "1296px",      // Full div width
              height: "500px",     // Full div height
              gap: "56px",         // Full div gap
              opacity: "1",        // Full div opacity
            }}
          >
            {/* Image Section - Inheriting height from parent */}
            <div className="flex-1 h-full relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800"
                className="rounded-[40px] w-full h-full object-cover relative z-10 shadow-lg"
                alt="Localization"
              />
            </div>

            {/* Text Content Section */}
            <div className="flex-1 space-y-6 text-start">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "48px",        // H3 font size
                  fontWeight: "500",       // Medium
                  color: "#0A0A0A",        // H3 background color
                  lineHeight: "120%",      // H3 line height
                  letterSpacing: "0%",     // H3 letter spacing
                  textTransform: "capitalize", // H3 text transform
                  margin: "0",
                }}
              >
                Ready for 40+ Languages
              </h3>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif", // Family/Body
                  fontSize: "16px",        // P font size
                  fontWeight: "500",       // Medium
                  color: "#616161",        // P background color
                  lineHeight: "160%",      // P line height
                  letterSpacing: "1%",     // P letter spacing
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
          {/* Section 4 - Language Ready */}
          <div
            className="flex flex-col md:flex-row items-center mx-auto"
            style={{
              width: "1296px",      // Spec width
              height: "500px",     // Spec height
              gap: "56px",         // Spec gap
              opacity: "1",
            }}

          >

            {/* Image Section - Right Side */}
            <div className="flex-1 h-full relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                className="rounded-[40px] w-full h-full object-cover relative z-10 shadow-lg shadow-primary/5"
                alt="Localization"
                style={{
                  borderRadius: "36px", // Spec border-radius
                }}
              />
            </div>
            {/* Text Content - Left Side */}
            <div className="flex-1 space-y-6">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "48px",        // Spec size
                  fontWeight: "500",       // Medium
                  color: "#0A0A0A",        // Spec color
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
                  fontSize: "16px",        // Spec size
                  fontWeight: "500",       // Medium
                  color: "#616161",        // Spec color
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

        {/* Final Footer Branded Section */}
        <div className="text-center mt-32 max-w-7xl mx-auto py-16 px-8 ">
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "48px",        // Spec size
              fontWeight: "500",       // Medium
              color: "#0A0A0A",        // Spec color
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
              fontSize: "16px",        // Spec size
              fontWeight: "500",       // Medium
              color: "#616161",        // Spec color
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