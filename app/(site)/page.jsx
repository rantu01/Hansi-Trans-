import PublicLayout from "@/components/layout/PublicLayout";

export default function HomePage() {
  return (
    <PublicLayout>
      <h1 className="text-4xl font-bold">
        Home Page
      </h1>
      <p className="mt-4">
        CMS Controlled Home Content
      </p>
    </PublicLayout>
  );
}
