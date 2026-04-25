import React from "react";
import PublicLayout from "@/app/components/layout/PublicLayout";
import CaseStudyDetailsPage from "@/app/components/CaseStudies-page/CaseStudyDetails";
import Hero from "@/app/components/common/Hero";
import CaseStudyContent from "@/app/components/CaseStudies-page/CaseStudyContent";
import { API } from "@/app/config/api";
import Hero2 from "@/app/components/common/Hero2";
import FeaturedCaseStudies3 from "@/app/components/common/FeaturedCaseStudies3";

async function getCaseStudyBySlug(slug) {
  try {
    console.log("🔍 Fetching from:", API.featuredCaseStudies);

    const res = await fetch(API.featuredCaseStudies, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("📡 Response Status:", res.status);

    if (!res.ok) {
      console.error("❌ API Error:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("📦 Full API Response:", data);

    // Response structure check - adjust based on your API
    let caseStudies = [];

    if (data.data && Array.isArray(data.data)) {
      caseStudies = data.data;
    } else if (Array.isArray(data)) {
      caseStudies = data;
    }

    console.log("📚 Total Case Studies:", caseStudies.length);

    // Slug match করা
    const found = caseStudies.find((c) => c.slug === slug);

    console.log("🎯 Found Case Study:", found ? found.title : "Not found");

    return found || null;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The case study you're looking for doesn't exist.",
    };
  }

  // Use metaTags from API if available, otherwise generate from content
  const metaTags = caseStudy.metaTags || {};
  const title = metaTags.title || caseStudy.title || "Case Study";
  const description = metaTags.description || caseStudy.description || "Read our latest case study";
  const keywords = metaTags.keywords || [];
  const ogImage = metaTags.ogImage || caseStudy.image || "";

  return {
    title: `${title} | Hansi Trans Case Studies`,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : "case study, gaming, localization",
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  console.log("🔗 Current Slug:", slug);

  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return (
      <PublicLayout>
        <div className="p-20 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Case Study Not Found
          </h2>
          <p className="text-gray-600">Slug: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{slug}</span></p>
          <p className="text-sm text-gray-500 mt-4">
            Check browser console and terminal for API logs
          </p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero2
        title={caseStudy.title || "Case Study Details"}
        breadcrumb={`Home › Case Studies › ${caseStudy.title || slug}`}
        description={caseStudy.description}
        backgroundImage={caseStudy.image} // এখানে ইমেজটি পাস করুন
      >
        {/* এটি এখন হিরো সেকশনের ভেতরে ওভারলে হিসেবে দেখাবে */}
        <CaseStudyDetailsPage caseStudy={caseStudy} />
      </Hero2>

      <CaseStudyContent caseStudy={caseStudy} />
      <FeaturedCaseStudies3 />
    </PublicLayout>
  );
}