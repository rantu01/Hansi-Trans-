"use client";
import Link from "next/link";
import { LayoutDashboard, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#003d66] text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <nav className="space-y-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/admin/site"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <Settings size={20} />
          Site Settings
        </Link>
        <Link
          href="/admin/featured-case-studies"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <Settings size={20} />
          Featured Case Studies
        </Link>
        <Link
          href="/admin/influencers"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <Settings size={20} />
          Our Influencers
        </Link>
        <Link
          href="/admin/testimonials"
          className="flex items-center gap-3 p-3 rounded hover:bg-white/10"
        >
          <Settings size={20} />
          Testimonials
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
