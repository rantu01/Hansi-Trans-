import React from "react";
import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";
import SubServiceDetails from "@/app/components/service-page/SubServiceDetails";
import SubServiceContent from "@/app/components/service-page/SubServiceContent";
import { API } from "@/app/config/api";

// সাব-সার্ভিস ডেটা ফেচ করার ফাংশন
async function getSubServiceDetails(subslug) {
  try {
    const res = await fetch(`${API.services.details(subslug)}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching sub-service details:", error);
    return null;
  }
}

export default async function SubServiceDetailsPage({ params }) {
  const { slug, subslug } = await params;

  // ব্যাকএন্ড থেকে সাব-সার্ভিসের ডেটা আনা হচ্ছে
  const subService = await getSubServiceDetails(subslug);

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
        // স্লাগ গুলোকে বড় হাতের করার জন্য একটি সিম্পল লজিক দেওয়া হলো ব্রেডক্রাম্বে
        breadcrumb={`Home › Services › ${slug.replace(/-/g, " ")} › ${subService.title}`}
        description={subService.description}
      >
        {/* Pass fetched subService as prop */}
        <SubServiceDetails subService={subService} />
      </Hero>
      
      {/* সাব-সার্ভিসের কন্টেন্ট যদি আলাদা হয়, তবে subService._id পাস করতে পারেন */}
      <SubServiceContent subServiceId={subService._id} />
    </PublicLayout>
  );
}