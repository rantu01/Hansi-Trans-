import BlogAdmin from "@/app/components/admin/BlogAdmin";


export const metadata = {
  title: "Blog Management | Hansi Trans Admin",
};

export default function BlogAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BlogAdmin />
    </div>
  );
}