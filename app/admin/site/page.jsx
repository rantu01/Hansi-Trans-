"use client";
import React, { useEffect, useState } from "react";
import { requireAdminAuth } from "@/utils/adminAuth";
import { API } from "@/app/config/api";

const SiteSettingsPage = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [ctaPreview, setCtaPreview] = useState(null);
  const [ctaFile, setCtaFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    brandText: "",
    footerText: "",
    footerAddress: "",
    copyrightText: "",
    ctaTitle: "",
    ctaDescription: "",
    socialTwitter: "",
    socialLinkedin: "",
    socialYoutube: "",
    socialFacebook: "",
    socialGlobe: "",
  });

  useEffect(() => {
    requireAdminAuth();
    const fetchConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success) {
          const d = data.data;
          setForm({
            brandText: d.brandText || "",
            footerText: d.footerText || "",
            footerAddress: d.footerAddress || "",
            copyrightText: d.copyrightText || "",
            ctaTitle: d.ctaTitle || "",
            ctaDescription: d.ctaDescription || "",
            socialTwitter: d.socialTwitter || "",
            socialLinkedin: d.socialLinkedin || "",
            socialYoutube: d.socialYoutube || "",
            socialFacebook: d.socialFacebook || "",
            socialGlobe: d.socialGlobe || "",
          });
          if (d.logo) setLogoPreview(d.logo);
          if (d.ctaImage) setCtaPreview(d.ctaImage);
        }
      } catch (err) {
        console.error("Failed to load site config");
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setCtaFile(file);
      setCtaPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      
      if (logoFile) formData.append("logo", logoFile);
      if (ctaFile) formData.append("ctaImage", ctaFile);

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await fetch(API.site.getConfig, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Site settings updated successfully!");
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
    <div className="p-4 md:p-8 flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-5xl bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">General Site Settings</h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* LOGO & BRAND */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Branding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 p-6 rounded-xl border">
              <div className="flex flex-col items-center gap-4">
                <label className="text-sm font-bold text-gray-600 uppercase">Website Logo</label>
                {logoPreview && (
                  <img src={logoPreview} alt="Logo" className="w-24 h-24 object-contain bg-white border rounded p-2" />
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} className="text-sm" />
              </div>
              <div className="w-full">
                <label className="block font-medium mb-2">Brand Name</label>
                <input type="text" name="brandText" value={form.brandText} onChange={handleChange} className="w-full border p-3 rounded-lg" placeholder="HANSI Trans+" />
              </div>
            </div>
          </section>

          {/* CTA SECTION (Ready to Go Global) */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">CTA Banner (Go Global Section)</h3>
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-blue-100 pb-6">
                <div className="flex flex-col items-center gap-3">
                  <label className="text-sm font-bold text-gray-600 uppercase">Banner Image</label>
                  {ctaPreview && <img src={ctaPreview} alt="CTA" className="w-48 h-28 object-cover rounded-lg border shadow-md" />}
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cta")} className="text-sm" />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-medium mb-1 text-sm">CTA Title</label>
                  <input type="text" name="ctaTitle" value={form.ctaTitle} onChange={handleChange} className="w-full border p-3 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm">CTA Description</label>
                <textarea name="ctaDescription" value={form.ctaDescription} onChange={handleChange} className="w-full border p-3 rounded-lg" rows={3} />
              </div>
            </div>
          </section>

          {/* SOCIAL MEDIA LINKS */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Twitter", "Linkedin", "Youtube", "Facebook", "Globe"].map((social) => (
                <div key={social} className="bg-gray-50 p-4 rounded-lg border">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{social} Link</label>
                  <input type="text" name={`social${social}`} value={form[`social${social}`]} onChange={handleChange} className="w-full border p-2 rounded-md" placeholder="https://..." />
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER INFO */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-600 border-l-4 border-blue-600 pl-3">Footer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full">
                <label className="block font-medium mb-2 text-sm">Footer Small Text</label>
                <textarea name="footerText" value={form.footerText} onChange={handleChange} className="w-full border p-3 rounded-lg" rows={3} />
              </div>
              <div className="w-full">
                <label className="block font-medium mb-2 text-sm">Office Address</label>
                <textarea name="footerAddress" value={form.footerAddress} onChange={handleChange} className="w-full border p-3 rounded-lg" rows={3} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-medium mb-2 text-sm">Copyright Text</label>
                <input type="text" name="copyrightText" value={form.copyrightText} onChange={handleChange} className="w-full border p-3 rounded-lg" />
              </div>
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-800 text-white"}`}>
            {loading ? "Please wait, saving..." : "Update Website Settings"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiteSettingsPage;