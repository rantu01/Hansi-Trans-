"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Settings, ChevronDown, ChevronUp } from "lucide-react";

const CommonComponentDropdown = ({ closeSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 p-3 rounded hover:bg-white/10"
      >
        <div className="flex items-center gap-3">
          <Settings size={20} />
          <span>Common</span>
        </div>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="ml-6 mt-2 space-y-2">
          <Link href="/admin/featured-case-studies" className="block p-2 rounded hover:bg-white/10 text-sm" onClick={closeSidebar}>Featured Case Studies</Link>
          <Link href="/admin/influencers" className="block p-2 rounded hover:bg-white/10 text-sm" onClick={closeSidebar}>Our Influencers</Link>
          <Link href="/admin/testimonials" className="block p-2 rounded hover:bg-white/10 text-sm" onClick={closeSidebar}>Testimonials</Link>
          <Link href="/admin/why-choose-us" className="block p-2 rounded hover:bg-white/10 text-sm" onClick={closeSidebar}>Why Choose Us</Link>
          <Link href="/admin/work-process" className="block p-2 rounded hover:bg-white/10 text-sm" onClick={closeSidebar}>Work Process</Link>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ closeSidebar }) => {
  return (
    <aside className="w-64 bg-[#003d66] text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <nav className="space-y-4">
        <Link href="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-white/10" onClick={closeSidebar}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link href="/admin/site" className="flex items-center gap-3 p-3 rounded hover:bg-white/10" onClick={closeSidebar}>
          <Settings size={20} /> Site Settings
        </Link>

        <CommonComponentDropdown closeSidebar={closeSidebar} />
      </nav>
    </aside>
  );
};

export default Sidebar;
