import React from "react";
import PublicLayout from "@/app/components/layout/PublicLayout";
import CaseStudyDetailsPage from "@/app/components/CaseStudies-page/CaseStudyDetails";
import { Youtube, BarChart3, PenLine } from "lucide-react";
import Hero from "@/app/components/common/Hero";
import CaseStudyContent from "@/app/components/CaseStudies-page/CaseStudyContent";

// এক জায়গায় ডেটা রাখা হলো যাতে বানান ভুল না হয়
const cases = [
  {
    slug: "global-game-vo-launch",
    title: "Global Game Title — Multilingual Voice-Over Launch",
    description:
      "A global RPG publisher needed cinematic trailers localized in Japanese, Korean, and English.",
    stats: [
      {
        label: "Across YouTube & TikTok",
        value: "10M",
        icon: <Youtube className="w-5 h-5 text-blue-500" />,
      },
      {
        label: "CTR increased vs non-localized trailers",
        value: "32%",
        icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      },
      {
        label: "Higher pre-registration rates in Japan and Korea",
        value: "✔",
        icon: <PenLine className="w-5 h-5 text-blue-500" />,
        isIcon: true,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
    tag: "Localization",
  },
  {
    slug: "global-vo-launch-reverse",
    title: "Global Game Title — Multilingual Voice-Over Launch (Reverse)",
    description:
      "A global RPG publisher needed cinematic trailers localized in Japanese, Korean, and English.",
    stats: [
      {
        label: "Across YouTube & TikTok",
        value: "10M",
        icon: <Youtube className="w-5 h-5 text-blue-500" />,
      },
      {
        label: "CTR increased vs non-localized trailers",
        value: "32%",
        icon: <BarChart3 className="w-5 h-5 text-blue-500" />,
      },
      {
        label: "Higher pre-registration rates in Japan and Korea",
        value: "✔",
        icon: <PenLine className="w-5 h-5 text-blue-500" />,
        isIcon: true,
      },
    ],
    image:
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1000&auto=format&fit=crop",
    tag: "Voice-Over",
  },
];

export default async function CaseStudyPage({ params }) {
  // Next.js 15+ এ params একটি Promise, তাই await করতে হয়
  const { slug } = await params;

  const caseStudy = cases.find((c) => c.slug === slug);

  if (!caseStudy) {
    return (
      <PublicLayout>
        <div className="p-20 text-center text-xl font-semibold">
          Case Study Not Found: {slug}
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero
        title="Case Study Details"
        breadcrumb="Home › Case Studies"
        description="this is the case study details page description."
      >
        <CaseStudyDetailsPage caseStudy={caseStudy} />
      </Hero>
      <CaseStudyContent></CaseStudyContent>
    </PublicLayout>
  );
}
