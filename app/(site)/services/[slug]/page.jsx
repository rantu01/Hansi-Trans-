import Hero from "@/app/components/common/Hero";
import Testimonials from "@/app/components/common/Testimonials";
import WorkProcess from "@/app/components/common/WorkProcess";
import PublicLayout from "@/app/components/layout/PublicLayout";
import CoreVoiceOver from "@/app/components/service-page/CoreVoiceOver";
import OurServices from "@/app/components/service-page/OurServices";
import ProfessionalSupport from "@/app/components/service-page/Professional Support";
import ServiceCard from "@/app/components/service-page/ServiceCard";

const serviceData = {
  "voice-over": {
    title: "Multilingual Voice-Over",
    description: "Professional voice-over services for global brands.",
    features: [
      "End-to-end game & product localization (UI, lore, marketing content)",
      "Creation of termbase & style guides for consistency",
      "LQA (Linguistic Quality Assurance) included",
      "Coverage across 40+ languages",
    ],
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800",
    bgColor: "bg-[#cce9ff]",
  },
  localization: {
    title: "Localization",
    description: "Culturally adapted localization for worldwide audiences.",
    features: [
      "End-to-end game & product localization (UI, lore, marketing content)",
      "Creation of termbase & style guides for consistency",
      "LQA (Linguistic Quality Assurance) included",
      "Coverage across 40+ languages",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    bgColor: "bg-[#e0f2fe]",
  },
  "content-distribution": {
    title: "Content Distribution & UA",
    description: "Global reach through strategic content distribution.",
    features: [
      "End-to-end game & product localization (UI, lore, marketing content)",
      "Creation of termbase & style guides for consistency",
      "LQA (Linguistic Quality Assurance) included",
      "Coverage across 40+ languages",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    bgColor: "bg-[#f0f9ff]",
  },
  "lqa-testing": {
    title: "LQA / Testing",
    description: "Ensure linguistic and functional quality across markets.",
    features: [
      "End-to-end game & product localization (UI, lore, marketing content)",
      "Creation of termbase & style guides for consistency",
      "LQA (Linguistic Quality Assurance) included",
      "Coverage across 40+ languages",
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    bgColor: "bg-[#e0f2fe]",
  },
};


export default async function ServiceDetailsPage({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];

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
        {/* ServiceCard-এ value pass করা হলো */}
        <ServiceCard service={service} />
      </Hero>
      <CoreVoiceOver></CoreVoiceOver>
      <ProfessionalSupport></ProfessionalSupport>
      <OurServices></OurServices>
      <WorkProcess></WorkProcess>
      <Testimonials></Testimonials>
    </PublicLayout>
  );
}
