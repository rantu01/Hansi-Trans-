
import React from "react";
import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";
import SubServiceDetails from "@/app/components/service-page/SubServiceDetails";
import SubServiceContent from "@/app/components/service-page/SubServiceContent";

// Sub-service data according to your new cards structure
const subServiceData = {
  "voice-over": {
    "commercial-vo": {
      title: "Commercial & Promotional VO",
      description:
        "We go beyond translation. Our linguists and cultural consultants keep your message both accurate and relatable.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    "narration-vo": {
      title: "Narration & Storytelling VO",
      description:
        "Professional narration and storytelling voice services for all media.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    "character-vo": {
      title: "Character & Animation VO",
      description:
        "Bring your characters to life with professional voice acting.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
    "e-learning-vo": {
      title: "E-Learning VO",
      description: "Engaging and clear voiceovers for educational content.",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    },
  },
  localization: {
    "game-localization": {
      title: "Game Localization",
      description: "Localization for games in multiple languages.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    },
    "app-localization": {
      title: "App Localization",
      description: "App localization with cultural adaptation.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    },
  },
};

export default async function SubServiceDetailsPage({ params }) {
  const { slug, subslug } = await params;

  const subService = subServiceData[slug]?.[subslug];

  if (!subService) {
    return (
      <PublicLayout>
        <div className="p-20 text-center text-xl font-semibold">
          Sub-Service not found
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero
        title={subService.title}
        breadcrumb={`Home › Services › ${slug} › ${subService.title}`}
        description={subService.description}
      >
        {/* Pass subService as prop */}
        <SubServiceDetails subService={subService} />
      </Hero>
      <SubServiceContent />
    </PublicLayout>
  );
}
