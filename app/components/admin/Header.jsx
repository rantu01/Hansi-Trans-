"use client";

import { LogOut, Home, Menu, Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      
      {/* Left Section: Menu & Branding */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <Search size={16} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search analytics..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48"
          />
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all group"
          title="Go Home"
        >
          <Home size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium text-sm"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;