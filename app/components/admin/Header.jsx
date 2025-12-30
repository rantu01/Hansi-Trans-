"use client";

import { LogOut, Home, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-30">

      <div className="flex items-center gap-3">
        {/* Sidebar toggle visible till md */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-sm sm:text-base md:text-lg font-bold truncate">
          Admin <span className="hidden sm:inline">Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Home size={20} />
        </button>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-red-500"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
