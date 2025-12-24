import React from "react";

const SubServiceDetails = ({ subService }) => {
  const whyMattersFeatures = [
    {
      id: "01",
      title: "Native Voice Talent",
      desc: "Choose from professional native speakers in 40+ languages.",
    },
    {
      id: "03",
      title: "Media Synchronisation",
      desc: "We integrate voice-overs into your videos, apps, or e-learning modules.",
    },
    {
      id: "04",
      title: "Studio-Grade Recording",
      desc: "Recordings done in professional studios, noise-free, and delivered in your format.",
    },
    {
      id: "05",
      title: "Cultural Consulting & QA",
      desc: "Every language goes through a QA process to ensure cultural appropriateness.",
    },
    {
      id: "02",
      title: "Script Translation & Adaptation",
      desc: "Not just translation — we adapt the script for timing and cultural context.",
    },
  ];

  return (
    <section className=" py-16 px-6 md:px-12 font-sans overflow-hidden">
      <div className="mx-auto">
        {/* Main Hero Image */}
        {subService.image && (
          <div className="w-full h-[300px] md:h-[500px] mb-16 overflow-hidden rounded-[40px]">
            <img
              src={subService.image}
              className="w-full h-full object-cover"
              alt={subService.title}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceDetails;
