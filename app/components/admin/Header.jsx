"use client";

import { LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Remove admin token
    localStorage.removeItem("adminToken");

    // ✅ Redirect to login page
    router.push("/admin/login");
  };

  const goHome = () => {
    // ✅ Go to website home
    router.push("/");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">
        {/* Home Button */}
        <button
          onClick={goHome}
          className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600"
        >
          <Home size={18} />
          Home
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
