"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Briefcase,
  Layers,
  FileText,
  Info,
  ToyBrick
} from "lucide-react";
import { API } from "@/app/config/api";

const NavLink = ({ href, icon: Icon, label, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
        ${isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          : "text-slate-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const CommonComponentDropdown = ({ closeSidebar }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Case Studies", href: "/admin/featured-case-studies" },
    { label: "Influencers", href: "/admin/influencers" },
    { label: "Testimonials", href: "/admin/testimonials" },
    { label: "Why Choose Us", href: "/admin/why-choose-us" },
    { label: "Work Process", href: "/admin/work-process" },
    { label: "Domains", href: "/admin/domainsAdmin" },
    { label: "Stats", href: "/admin/admin-stats" },
  ];

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all
          ${open ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
      >
        <span className="flex items-center gap-3 font-medium">
          <Layers size={20} />
          Components
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="ml-9 mt-2 space-y-1 border-l border-slate-700 pl-4 animate-in slide-in-from-top-2 duration-300">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`block py-2 text-sm transition-colors ${pathname === item.href ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [siteConfig, setSiteConfig] = useState({
    logo: "",
    brandText: "Loading...",
  });

  // 🔹 সাইডবার খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ করার জন্য
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 🔹 Fetch site config
  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        if (res.ok) {
          const data = await res.json();
          if (data?.success && data?.data) {
            setSiteConfig(data.data);
          }
        }
      } catch (error) {
        console.error("Sidebar config fetch failed", error);
      }
    };
    fetchSiteConfig();
  }, []);

  return (
    <>
      {/* মোবাইল ডিভাইসে সাইডবার খোলা থাকলে বাইরের অংশে ক্লিক করলে বন্ধ হওয়ার জন্য Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-[#0f172a] text-white p-6 flex flex-col
          transition-transform duration-300 ease-in-out border-r border-slate-800
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header (Fixed) */}
        <div className="flex items-center justify-between mb-10 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 flex-shrink-0 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/10">
              {siteConfig.logo ? (
                <img
                  src={siteConfig.logo}
                  alt="Logo"
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="font-bold text-xl text-blue-500">
                  {siteConfig.brandText?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <h2 className="font-bold text-lg tracking-tight truncate">
              {siteConfig.brandText || "Nexus Admin"}
            </h2>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-all flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Area (Scrollable) */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar -mr-2 pr-2">
          <p className="text-[11px] text-slate-500 uppercase font-bold tracking-[2px] mb-4 px-4">Menu</p>

          <NavLink href="/admin" icon={LayoutDashboard} label="Dashboard" onClick={closeSidebar} />
          <NavLink href="/admin/site" icon={Settings} label="Site Settings" onClick={closeSidebar} />
          <NavLink href="/admin/about-us" icon={Info} label="About Us" onClick={closeSidebar} />
          <NavLink href="/admin/services" icon={Briefcase} label="Services" onClick={closeSidebar} />
          <NavLink href="/admin/CaseStudiesAdmin" icon={FileText} label="Case Studies" onClick={closeSidebar} />
          <NavLink href="/admin/blog" icon={ToyBrick} label="Blog" onClick={closeSidebar} />

          <div className="pt-6 pb-4">
            <p className="text-[11px] text-slate-500 uppercase font-bold tracking-[2px] mb-4 px-4">Advanced</p>
            <CommonComponentDropdown closeSidebar={closeSidebar} />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;