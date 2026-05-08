import Hero from "@/app/components/common/Hero";
import Hero3 from "@/app/components/common/Hero3";
import PublicLayout from "@/app/components/layout/PublicLayout";
import PrivacyPolicyContent from "@/app/components/PrivacyPolicy/PrivacyPolicy";
import { API } from "@/app/config/api";

export default async function PrivacyPolicyPage() {
  let privacyContent = null;
  let privacySections = null;
  try {
    const res = await fetch(API.site.getConfig);
    const data = await res.json();
    if (data?.success && data.data) {
      privacyContent = data.data.privacyContent || null;
      privacySections = data.data.privacySections || null;
    }
  } catch (err) {
    // ignore
  }

  return (
    <PublicLayout>
      <Hero3
        title="Privacy Policy"
        breadcrumb="Home › Privacy Policy"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        <PrivacyPolicyContent initialContent={privacyContent} initialSections={privacySections} />
      </Hero3>
    </PublicLayout>
  );
}