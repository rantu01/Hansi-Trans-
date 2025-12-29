"use client";

import { LogOut, Home, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const goHome = () => router.push("/");

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-200"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600"
        >
          <Home size={18} /> Home
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
