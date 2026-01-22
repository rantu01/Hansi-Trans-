// D:\Code\Project\Hansi-Trans-Prod\frontend\app\components\theme\ThemeApplier.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "@/app/config/api";

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
    <div className="relative flex items-center justify-center">
      <div className="w-24 h-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
      <img src="/Hansi-Logo1.png" alt="Logo" className="absolute w-12 h-12 animate-pulse" />
    </div>
    <h2 className="mt-4 text-xl font-bold tracking-[0.2em] text-gray-800 animate-bounce">
      HANSI TRANS
    </h2>
  </div>
);

export default function ThemeApplier() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // হাইড্রেশন এরর ঠিক করার জন্য

  useEffect(() => {
    setMounted(true); // কম্পোনেন্ট ব্রাউজারে লোড হয়েছে কিনা নিশ্চিত করা
    
    const fetchAndApplyTheme = async () => {
      try {
        const { data } = await axios.get(API.ThemeSettings.get);
        if (data) {
          const root = document.documentElement;
          root.style.setProperty('--primary', data.primary);
          root.style.setProperty('--secondary', data.secondary);
          root.style.setProperty('--accent', data.accent);
          root.style.setProperty('--gradient', data.gradient);
        }
      } catch (err) {
        console.error("Theme load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndApplyTheme();
  }, []);

  // যতক্ষণ ব্রাউজারে কম্পোনেন্টটি মাউন্ট না হয়, ততক্ষণ কিছুই রেন্ডার করবেন না
  if (!mounted) return null;

  // লোডিং অবস্থায় লোডার দেখাবে
  if (loading) {
    return <FullPageLoader />;
  }

  return null; 
}