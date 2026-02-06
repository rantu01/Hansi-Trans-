"use client";

import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      id: 1,
      title: "1. Your Privacy Matters",
      content:
        "At Roamio, your privacy is our priority. We collect only the data necessary to provide a seamless travel experience — from eSIM activation to hotel bookings — and we never sell your personal information.",
    },
    {
      id: 2,
      title: "2. What Information We Collect",
      content: "We collect information in two ways:",
      subSections: [
        {
          label: "a. Information You Provide",
          points: [
            "Name, email, and phone number",
            "Travel preferences",
            "Payment details (via secure third-party processors)",
            "Support messages or feedback",
          ],
        },
        {
          label: "b. Information We Collect Automatically",
          points: [
            "App usage data (pages visited, features used)",
            "Device information (model, OS, language)",
            "Location (with your permission, for services like local VPN or recommendations)",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "3. How We Use Your Information",
      content: "We use your information to:",
      points: [
        "Help you book flights, hotels, cars, and eSIMs",
        "Provide real-time support and updates",
        "Personalize your experience (e.g., language, destination tips)",
        "Improve app performance and fix bugs",
        "Ensure your data is secure during travel (e.g., with our VPN)",
      ],
    },
    {
      id: 4,
      title: "4. Third-Party Services",
      content:
        "We may share limited data with trusted providers (e.g., payment gateways, booking engines) solely to complete your bookings and transactions. We never sell or rent your data.",
      subText: "Examples include:",
      points: [
        "Google (for login and analytics)",
        "Stripe or other payment processors",
        "Hotel and airline partners",
      ],
    },
  ];

  // টাইটেলের জন্য কমন স্টাইল (Inter)
  const titleStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    fontSize: "28px",
    lineHeight: "120%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "#0A0A0A",
  };

  // কন্টেন্ট এবং পয়েন্টের জন্য কমন স্টাইল (Poppins)
  const bodyStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "160%",
    letterSpacing: "0%",
    color: "#262626",
  };

  return (
    <div className="w-full container mx-auto px-4 py-12 mb-20">
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm"
            style={{ borderRadius: "32px" }}
          >
            {/* 1. Title Section (Inter) */}
            <h3 style={titleStyle} className="mb-6">
              {section.title}
            </h3>
            
            {/* 2. Main Content (Poppins) */}
            <p style={bodyStyle} className="mb-4">
              {section.content}
            </p>

            {/* Render direct points if available */}
            {section.points && !section.subSections && (
              <ul className="list-disc pl-6 space-y-3" style={bodyStyle}>
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}

            {/* Render subsections (a, b format) */}
            {section.subSections && (
              <div className="mt-4 space-y-6">
                {section.subSections.map((sub, idx) => (
                  <div key={idx}>
                    <p style={{...bodyStyle, fontWeight: "600"}} className="mb-3">
                      {sub.label}
                    </p>
                    <ul className="list-disc pl-8 space-y-2" style={bodyStyle}>
                      {sub.points.map((p, pIdx) => (
                        <li key={pIdx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Section 4 subText (Poppins) */}
            {section.subText && (
              <p style={{...bodyStyle, fontWeight: "600"}} className="mt-6 mb-3">
                {section.subText}
              </p>
            )}

            {/* Section 4 points (Poppins) */}
            {section.id === 4 && section.points && (
              <ul className="list-disc pl-6 space-y-2" style={bodyStyle}>
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;