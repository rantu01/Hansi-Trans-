import Hero from "@/app/components/common/Hero";
import PublicLayout from "@/app/components/layout/PublicLayout";

export default function ContactPage() {
  return (
    <PublicLayout>
      <Hero
        title="Contact"
        breadcrumb="Home › Contact"
        description="this is the contact page description."
      ></Hero>
      
    </PublicLayout>
  );
}
