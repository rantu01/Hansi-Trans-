"use client";

import React, { useEffect, useMemo, useState } from "react";
import { API } from "@/app/config/api";

const legacyTextToSections = (text = "") => {
  const cleaned = String(text || "").replace(/\r/g, "").trim();
  if (!cleaned) return [];

  const parts = cleaned.split(/\n\n+/);
  return parts.map((part, index) => {
    const lines = part.split("\n").map((line) => line.trim()).filter(Boolean);
    const firstLine = lines[0] || "";
    const bulletItems = lines.filter((line) => /^[-*•]/.test(line)).map((line) => line.replace(/^[-*•]\s*/, ""));
    const hasNumberedHeading = /^\d+[\.).]\s+/.test(firstLine);
    return {
      type: bulletItems.length ? "list" : "paragraph",
      title: hasNumberedHeading ? firstLine.replace(/^\d+[\.).]\s+/, "") : (index === 0 ? "" : firstLine),
      content: bulletItems.length ? lines.filter((line) => !/^[-*•]/.test(line)).join("\n") : lines.join("\n"),
      items: bulletItems,
    };
  });
};

const TermsAndConditions = ({ initialContent = null, initialSections = null }) => {
  const [remoteContent, setRemoteContent] = useState(initialContent);
  const [remoteSections, setRemoteSections] = useState(initialSections || []);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (initialContent || (initialSections && initialSections.length)) return; // already have server-passed content
    const fetchConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success && data.data) {
          const cfg = data.data;
          if (cfg.termsSections) setRemoteSections(Array.isArray(cfg.termsSections) ? cfg.termsSections : []);
          if (cfg.termsContent) setRemoteContent(cfg.termsContent);
          if (cfg.termsPayload) setPayload(cfg.termsPayload);
        }
      } catch (err) {
        // ignore
      }
    };
    fetchConfig();
  }, [initialContent, initialSections]);
  const fallbackSections = [
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

  const sections = useMemo(() => {
    if (remoteSections && remoteSections.length) return remoteSections;
    if (remoteContent) return legacyTextToSections(remoteContent);
    if (initialContent) return legacyTextToSections(initialContent);
    return fallbackSections;
  }, [remoteSections, remoteContent, initialContent]);

  const titleStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    fontSize: "28px",
    lineHeight: "120%",
    letterSpacing: "0%",
    textTransform: "capitalize",
    color: "#0A0A0A",
  };

  const bodyStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "160%",
    letterSpacing: "0%",
    color: "#262626",
  };

  const renderBlock = (section, index) => {
    const type = section.type || (section.items && section.items.length ? "list" : "paragraph");
    const title = section.title || "";
    const content = section.content || "";
    const items = Array.isArray(section.items) ? section.items : [];

    if (type === "heading") {
      return <h3 key={index} style={titleStyle} className="mb-6">{title || content}</h3>;
    }

    if (type === "paragraph") {
      return (
        <div key={index} className="space-y-4">
          {title ? <h3 style={titleStyle}>{title}</h3> : null}
          <p style={bodyStyle}>{content}</p>
        </div>
      );
    }

    if (type === "quote") {
      return (
        <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
          {title ? <p style={{ ...bodyStyle, fontWeight: 600 }} className="mb-2">{title}</p> : null}
          <p style={bodyStyle} className="italic">{content}</p>
        </div>
      );
    }

    if (type === "highlight") {
      return (
        <div key={index} className="rounded-3xl bg-blue-50 border border-blue-100 px-5 py-4">
          {title ? <p style={{ ...bodyStyle, fontWeight: 600 }} className="mb-2">{title}</p> : null}
          <p style={bodyStyle}>{content}</p>
        </div>
      );
    }

    if (type === "list") {
      return (
        <div key={index} className="space-y-4">
          {title ? <h3 style={titleStyle}>{title}</h3> : null}
          {content ? <p style={bodyStyle}>{content}</p> : null}
          <ul className="list-disc pl-6 space-y-3" style={bodyStyle}>
            {items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
          </ul>
        </div>
      );
    }

    return (
      <div key={index} className="space-y-4">
        {title ? <h3 style={titleStyle}>{title}</h3> : null}
        {content ? <p style={bodyStyle}>{content}</p> : null}
        {items.length ? (
          <ul className="list-disc pl-6 space-y-3" style={bodyStyle}>
            {items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
          </ul>
        ) : null}
      </div>
    );
  };

  const renderSection = (section, index) => {
    if (Array.isArray(section.blocks) && section.blocks.length) {
      return (
        <div
          key={`box-${index}`}
          className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm text-slate-800"
          style={{ borderRadius: "32px" }}
        >
          {section.title ? <h3 style={titleStyle} className="mb-6">{section.title}</h3> : null}
          <div className="space-y-4">
            {section.blocks.map((block, blockIndex) => (
              <div key={`${block.type || "block"}-${blockIndex}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                {renderBlock(block, blockIndex)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={`block-${index}`}
        className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm text-slate-800"
        style={{ borderRadius: "32px" }}
      >
        {renderBlock(section, index)}
      </div>
    );
  };

  return (
    <div className="w-full container mx-auto px-4 py-12 mb-20">
      <div className="flex flex-col gap-8">
        {sections.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  );
};

export default TermsAndConditions;