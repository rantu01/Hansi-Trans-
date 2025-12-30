"use client";

import { useState } from "react";
import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden relative">

      {/* Sidebar - fixed পজিশন থাকবে */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Overlay (sm + md only) - সাইডবার খুললে ব্যাকগ্রাউন্ড কালো হবে */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area: 
          lg:pl-64 যোগ করা হয়েছে যাতে বড় স্ক্রিনে মেইন কন্টেন্ট সাইডবারের জায়গা ছেড়ে দিয়ে শুরু হয়।
      */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">

        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}