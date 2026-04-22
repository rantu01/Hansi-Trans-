
import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. Information We Collect",
      content:
        "We collect information to provide better services to all our users. This includes information you provide to us directly, such as when you create an account, and information we collect automatically through your use of our platform.",
    },
    {
      id: 2,
      title: "2. How We Use Information",
      content: "We use the information we collect for the following purposes:",
      points: [
        "To provide, maintain, and improve our services.",
        "To process transactions and send related information.",
        "To send technical notices, updates, and security alerts.",
        "To respond to your comments, questions, and requests.",
        "To monitor and analyze trends and usage of our platform.",
      ],
    },
    {
      id: 3,
      title: "3. Information Sharing and Disclosure",
      content: "We do not share your personal information with companies, organizations, or individuals outside of our company except in the following cases:",
      subSections: [
        {
          label: "a. With Your Consent",
          points: [
            "We will share personal information when we have your explicit consent to do so.",
          ],
        },
        {
          label: "b. For Legal Reasons",
          points: [
            "To meet any applicable law, regulation, or legal process.",
            "To detect, prevent, or otherwise address fraud or security issues.",
            "To protect against harm to the rights or safety of our users.",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "4. Data Security",
      content:
        "We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.",
      subText: "Our security measures include:",
      points: [
        "Encryption of data using SSL technology.",
        "Regular reviews of our information collection and storage practices.",
        "Restricted access to personal information by employees and contractors.",
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

  // কন্টেন্ট এবং পয়েন্টের জন্য কমন স্টাইল (Poppins)
  const bodyStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "160%",
    letterSpacing: "0%",
    color: "#262626",
  };

  return (
    <div className="w-full container mx-auto px-4 py-12 mb-20 mt-40 md:mt-0">
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm"
            style={{ borderRadius: "32px" }}
          >
            {/* Title Section (Inter) */}
            <h3 style={titleStyle} className="mb-6">
              {section.title}
            </h3>
            
            {/* Main Content (Poppins) */}
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

            {/* SubText (Poppins) */}
            {section.subText && (
              <p style={{...bodyStyle, fontWeight: "600"}} className="mt-6 mb-3">
                {section.subText}
              </p>
            )}

            {/* Final Points Rendering (Poppins) */}
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

export default PrivacyPolicy;