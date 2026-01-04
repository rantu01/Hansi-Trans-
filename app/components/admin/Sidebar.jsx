"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const CommonComponentDropdown = ({ closeSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center gap-3 font-medium">
          <Settings size={18} />
          Common Content
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="ml-6 mt-1 space-y-1 border-l border-white/20 pl-3">
          {[
            ["Featured Case Studies", "/admin/featured-case-studies"],
            ["Our Influencers", "/admin/influencers"],
            ["Testimonials", "/admin/testimonials"],
            ["Why Choose Us", "/admin/why-choose-us"],
            ["Work Process", "/admin/work-process"],
            ["Domains", "/admin/domainsAdmin"],
            ["Stats", "/admin/admin-stats"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeSidebar}
              className="block p-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen w-64
        bg-[#002a4d] text-white p-5 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="font-black tracking-widest uppercase text-blue-400">
          Admin Panel
        </h2>

        <button
          onClick={closeSidebar}
          className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation - custom scrollbar added */}
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        <Link
          href="/admin"
          onClick={closeSidebar}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link
          href="/admin/site"
          onClick={closeSidebar}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium"
        >
          <Settings size={18} /> Site Settings
        </Link>
        <Link
          href="/admin/about-us"
          onClick={closeSidebar}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium"
        >
          <Settings size={18} /> AboutUS Settings
        </Link>
        <Link
          href="/admin/services"
          onClick={closeSidebar}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium"
        >
          <Settings size={18} /> services Settings
        </Link>
        <Link
          href="/admin/CaseStudiesAdmin"
          onClick={closeSidebar}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium"
        >
          <Settings size={18} /> CaseStudies Settings
        </Link>

        <div className="pt-4">
          <p className="text-[10px] text-gray-400 uppercase mb-2 px-3 font-bold tracking-widest">
            Components
          </p>
          <CommonComponentDropdown closeSidebar={closeSidebar} />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;