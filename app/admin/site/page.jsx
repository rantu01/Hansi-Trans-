"use client";
import React, { useEffect, useState } from "react";
import { requireAdminAuth } from "@/utils/adminAuth";
import { API } from "@/app/config/api";

const SiteSettingsPage = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [form, setForm] = useState({
    brandText: "",
    footerText: "",
    footerAddress: "",
    copyrightText: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Protect route
  useEffect(() => {
    requireAdminAuth();
  }, []);

  // 🔹 Load existing site config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();

        if (data?.success) {
          setForm({
            brandText: data.data.brandText || "",
            footerText: data.data.footerText || "",
            footerAddress: data.data.footerAddress || "",
            copyrightText: data.data.copyrightText || "",
          });

          if (data.data.logo) {
            setLogoPreview(data.data.logo);
          }
        }
      } catch (err) {
        console.error("Failed to load site config");
      }
    };

    fetchConfig();
  }, []);

  // 🔹 Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle image select + preview
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const formData = new FormData();
      if (logoFile) formData.append("logo", logoFile);

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await fetch(API.site.getConfig, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Site settings updated");
      } else {
        alert("❌ Update failed");
      }
    } catch (err) {
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Padding p-4 for mobile, p-8 for desktop
    <div className="p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Site Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* LOGO UPLOAD */}
          <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
            <label className="block font-semibold mb-3 text-gray-700 text-sm md:text-base">Website Logo</label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain bg-white border rounded shadow-sm"
                />
              )}

              <div className="w-full overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-xs md:text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#003d66] file:text-white
                    hover:file:bg-blue-800 transition-all cursor-pointer"
                />
                <p className="mt-2 text-xs text-gray-400">Recommended size: 200x200px (PNG/SVG)</p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid for Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BRAND TEXT */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-2 text-gray-700 text-sm md:text-base">Brand Text</label>
              <input
                type="text"
                name="brandText"
                value={form.brandText}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Enter company name"
              />
            </div>

            {/* FOOTER TEXT */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700 text-sm md:text-base">Footer Text</label>
              <textarea
                name="footerText"
                value={form.footerText}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                rows={4}
                placeholder="About company description..."
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700 text-sm md:text-base">Footer Address</label>
              <textarea
                name="footerAddress"
                value={form.footerAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                rows={4}
                placeholder="Office location address..."
              />
            </div>

            {/* COPYRIGHT */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-2 text-gray-700 text-sm md:text-base">Copyright Text</label>
              <input
                type="text"
                name="copyrightText"
                value={form.copyrightText}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="© 2024 Your Company. All rights reserved."
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto min-w-[200px] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#003d66] hover:bg-blue-800 hover:shadow-xl active:scale-95"}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Settings"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteSettingsPage;