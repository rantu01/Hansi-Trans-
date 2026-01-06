"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/app/config/api";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { Palette, Save, RefreshCcw, Pipette } from "lucide-react";

export default function ColorSettingPage() {
  const [colors, setColors] = useState({
    primary: "#0070c0",
    secondary: "#003d66",
    accent: "#347fb9",
    gradient: "#51a1da",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // কালার ফেচ করা
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(API.ThemeSettings.get);
        if (res.data) {
          setColors({
            primary: res.data.primary || "#0070c0",
            secondary: res.data.secondary || "#003d66",
            accent: res.data.accent || "#347fb9",
            gradient: res.data.gradient || "#51a1da",
          });
        }
      } catch (err) {
        toast.error("Failed to load current theme.");
      } finally {
        setFetching(false);
      }
    };
    fetchColors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // SweetAlert2 Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will change the website's main theme colors!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      const loadingToast = toast.loading("Updating theme...");
      try {
        await axios.post(API.ThemeSettings.update, colors);
        toast.success("Theme updated successfully! 🚀", { id: loadingToast });
        
        // কালার তাৎক্ষণিক অ্যাপ্লাই করার জন্য রুট ভেরিয়েবল আপডেট
        Object.keys(colors).forEach(key => {
            document.documentElement.style.setProperty(`--${key}`, colors[key]);
        });
        
      } catch (err) {
        toast.error("Failed to update colors.", { id: loadingToast });
      } finally {
        setLoading(false);
      }
    }
  };

  if (fetching) return <div className="flex justify-center items-center h-screen italic text-gray-500">Loading Theme Settings...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-blue-600 p-6 flex items-center gap-3">
          <Palette className="text-white w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold text-white">Theme Customization</h1>
            <p className="text-blue-100 text-sm">Manage your website global color palette</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {Object.keys(colors).map((key) => (
              <div key={key} className="group p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md transition-all">
                <label className="flex items-center gap-2 capitalize font-semibold text-gray-700 mb-3 text-sm">
                  <Pipette className="w-4 h-4 text-blue-500" />
                  {key} Color
                </label>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-inner">
                    <input
                      type="color"
                      value={colors[key]}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                      className="absolute inset-[-10px] w-[200%] h-[200%] cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={colors[key]}
                      onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Preview Section */}
          <div className="mb-10 p-6 rounded-xl border-2 border-dashed border-gray-200">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" /> Live Preview
            </h3>
            <div className="flex flex-wrap gap-4">
              <button type="button" style={{ backgroundColor: colors.primary }} className="px-6 py-2 rounded-full text-white text-sm shadow-lg">Primary Button</button>
              <button type="button" style={{ backgroundColor: colors.secondary }} className="px-6 py-2 rounded-full text-white text-sm shadow-lg">Secondary</button>
              <div style={{ color: colors.accent }} className="font-bold flex items-center underline">Accent Link</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving Changes..." : "Apply Theme Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}