"use client";
import React, { useEffect, useState } from "react";
import { requireAdminAuth } from "@/utils/adminAuth";

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
        const res = await fetch("http://localhost:5000/api/site");
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

      const res = await fetch("http://localhost:5000/api/site", {
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
    <div className="max-w-4xl bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Site Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* LOGO UPLOAD */}
        <div>
          <label className="block font-semibold mb-2">Website Logo</label>

          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="w-24 h-24 object-contain border rounded mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>

        {/* BRAND TEXT */}
        <div>
          <label className="block font-semibold mb-2">Brand Text</label>
          <input
            type="text"
            name="brandText"
            value={form.brandText}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* FOOTER TEXT */}
        <div>
          <label className="block font-semibold mb-2">Footer Text</label>
          <textarea
            name="footerText"
            value={form.footerText}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows={3}
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block font-semibold mb-2">Footer Address</label>
          <textarea
            name="footerAddress"
            value={form.footerAddress}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            rows={2}
          />
        </div>

        {/* COPYRIGHT */}
        <div>
          <label className="block font-semibold mb-2">Copyright Text</label>
          <input
            type="text"
            name="copyrightText"
            value={form.copyrightText}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#003d66] text-white px-6 py-3 rounded font-semibold hover:bg-blue-800"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default SiteSettingsPage;
