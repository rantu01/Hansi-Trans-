"use client";
import { useEffect } from "react";
import axios from "axios";
import { API } from "@/app/config/api";

export default function ThemeApplier() {
  useEffect(() => {
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
      }
    };

    fetchAndApplyTheme();
  }, []);

  return null; // এটি কোনো UI রেন্ডার করবে না, শুধু কাজ করবে
}