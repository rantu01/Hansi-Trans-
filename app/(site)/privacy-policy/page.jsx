import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";
// ইমপোর্ট করার সময় নাম বদলে PrivacyPolicyContent দিন যাতে পেজের নামের সাথে না মিলে যায়
import PrivacyPolicyContent from "@/app/components/PrivacyPolicy/PrivacyPolicy";

export default function PrivacyPolicyPage() { // ফাংশনের নাম পরিবর্তন করে PrivacyPolicyPage দিন
  return (
    <PublicLayout>
      <Hero
        title="Privacy Policy"
        breadcrumb="Home › Privacy Policy"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        {/* এখানে ইমপোর্ট করা নতুন নামের কম্পোনেন্টটি ব্যবহার করুন */}
        <PrivacyPolicyContent />
      </Hero>
    </PublicLayout>
  );
}