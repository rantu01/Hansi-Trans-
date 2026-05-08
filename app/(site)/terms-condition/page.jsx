import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";
import TermsAndConditions from "@/app/components/TermsAndConditions/TermsAndConditions";
import { API } from "@/app/config/api";

export default async function TermsCondition() {
  let termsContent = null;
  let termsSections = null;
  try {
    const res = await fetch(API.site.getConfig);
    const data = await res.json();
    if (data?.success && data.data) {
      termsContent = data.data.termsContent || null;
      termsSections = data.data.termsSections || null;
    }
  } catch (err) {
    // ignore
  }

  return (
    <PublicLayout>
      <Hero
        title="Terms condition"
        breadcrumb="Home › Terms condition"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        <TermsAndConditions initialContent={termsContent} initialSections={termsSections} />
      </Hero>
    </PublicLayout>
  );
}