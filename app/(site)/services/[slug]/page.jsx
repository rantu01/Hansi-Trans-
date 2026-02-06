import Hero from "@/app/components/common/Hero";
import Testimonials from "@/app/components/common/Testimonials";
import WorkProcess from "@/app/components/common/WorkProcess";
import PublicLayout from "@/app/components/layout/PublicLayout";
import CoreVoiceOver from "@/app/components/service-page/CoreVoiceOver";
import OurServices from "@/app/components/service-page/OurServices";
import ProfessionalSupport from "@/app/components/service-page/Professional Support";
import ServiceCard from "@/app/components/service-page/ServiceCard";
import { API } from "@/app/config/api";

// ডাটা ফেচ করার ফাংশন
async function getServiceDetails(slug) {
  try {
    const res = await fetch(`${API.services.details(slug)}`, {
      cache: 'no-store' 
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching service details:", error);
    return null;
  }
}

export default async function ServiceDetailsPage({ params }) {
  const { slug } = await params;
  const service = await getServiceDetails(slug);

  if (!service) {
    return (
      <PublicLayout>
        <div className="p-20 text-center text-xl font-semibold">
          Service not found
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Hero
        title={service.title}
        breadcrumb={`Home › Services › ${service.title}`}
        description={service.description}
      >
        <ServiceCard service={service} />
      </Hero>

      {/* Core Voice Over সেকশন */}
      <CoreVoiceOver mainSlug={service.slug} />

      {/* Professional Support সেকশন - data ফিল্ডে অপশনাল চেইনিং ব্যবহার করা নিরাপদ */}
      <ProfessionalSupport 
        mainSlug={service.slug} 
        data={service.professionalSupports || []} 
      />

      <OurServices />
      <WorkProcess />
      <Testimonials />
    </PublicLayout>
  );
}