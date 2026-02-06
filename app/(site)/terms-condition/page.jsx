import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";
import TermsAndConditions from "@/app/components/TermsAndConditions/TermsAndConditions";

export default function TermsCondition() {
  return (
    <PublicLayout>
      <Hero
        title="Terms condition"
        breadcrumb="Home › Terms condition"
        description="Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."
      >
        {/* ছবির মতো হুবহু কম্পোনেন্টটি এখানে চাইল্ড হিসেবে যাবে */}
        <TermsAndConditions />
      </Hero>
    </PublicLayout>
  );
}