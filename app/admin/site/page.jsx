"use client";
import React, { useEffect, useState } from "react";
import { requireAdminAuth } from "@/utils/adminAuth";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // Toast ইমপোর্ট করা হয়েছে
import { 
  Globe, 
  Upload, 
  Save, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MapPin, 
  Type, 
  Layout,
  Info,
  CheckCircle2,
  Loader2
} from "lucide-react";

const SiteSettingsPage = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [ctaPreview, setCtaPreview] = useState(null);
  const [ctaFile, setCtaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

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
        toast.error("Failed to load initial configuration");
      } finally {
        setFetching(false);
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
    
    // File size validation (Optional but recommended)
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size should be less than 2MB");
    }

    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      toast.success("Logo preview updated!");
    } else {
      setCtaFile(file);
      setCtaPreview(URL.createObjectURL(file));
      toast.success("CTA image preview updated!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating system settings...");

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      if (logoFile) formData.append("logo", logoFile);
      if (ctaFile) formData.append("ctaImage", ctaFile);
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));

      const res = await fetch(API.site.getConfig, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Settings updated successfully!", { id: loadingToast });
      } else {
        toast.error(data.message || "Something went wrong", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Update failed. Please check connection.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const InputGroup = ({ label, icon: Icon, isDark = false, ...props }) => (
    <div className="space-y-2 group">
      <label className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600 group-focus-within:text-blue-600'}`}>
        {Icon && <Icon size={16} />} {label}
      </label>
      <input 
        {...props}
        className={`w-full rounded-xl p-3 outline-none transition-all ${
          isDark 
          ? 'bg-white/5 border border-white/10 text-white focus:border-blue-500' 
          : 'bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 placeholder:text-slate-400'
        }`}
      />
    </div>
  );

  if (fetching) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-slate-500 font-medium animate-pulse">Loading settings...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Site Configuration</h1>
          <p className="text-slate-500 font-medium">Global identity and user interface control center.</p>
        </div>
        <button 
          form="settings-form"
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? "Saving Changes..." : "Push Updates"}
        </button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 px-2">
              <Layout className="text-blue-500" size={18} /> Brand Identity
            </h3>
            
            <div className="flex flex-col items-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all relative group">
              {logoPreview ? (
                <div className="relative">
                   <img src={logoPreview} alt="Logo" className="w-32 h-32 object-contain mb-4 rounded-xl shadow-sm bg-white p-2" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Upload className="text-white" />
                   </div>
                </div>
              ) : (
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Upload size={32} />
                </div>
              )}
              <label className="mt-2 cursor-pointer bg-white text-slate-700 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                Change Logo
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} className="hidden" />
              </label>
            </div>

            <InputGroup 
              label="Company Name" 
              name="brandText" 
              value={form.brandText} 
              onChange={handleChange} 
              icon={Type}
              placeholder="e.g. Nexus Global"
            />
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Globe className="text-blue-500" size={18} /> Social Media Links
            </h3>
            <div className="space-y-4">
              <InputGroup label="Facebook" name="socialFacebook" value={form.socialFacebook} onChange={handleChange} icon={Facebook} />
              <InputGroup label="LinkedIn" name="socialLinkedin" value={form.socialLinkedin} onChange={handleChange} icon={Linkedin} />
              <InputGroup label="Twitter / X" name="socialTwitter" value={form.socialTwitter} onChange={handleChange} icon={Twitter} />
              <InputGroup label="YouTube" name="socialYoutube" value={form.socialYoutube} onChange={handleChange} icon={Youtube} />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* CTA Banner Section */}
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-800 flex items-center gap-3 text-xl tracking-tight">
                <CheckCircle2 className="text-emerald-500" size={24} /> Homepage CTA Banner
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Banner Background</label>
                 <div className="relative group overflow-hidden rounded-[2rem] h-56 bg-slate-100 border-4 border-white shadow-inner">
                    {ctaPreview ? (
                      <img src={ctaPreview} alt="CTA" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-300"><Upload size={40} /></div>
                    )}
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white font-bold gap-2">
                      <Upload size={24} /> 
                      <span className="text-xs uppercase tracking-tighter">Replace Banner Image</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cta")} className="hidden" />
                    </label>
                 </div>
              </div>
              <div className="space-y-6">
                <InputGroup label="Banner Main Title" name="ctaTitle" value={form.ctaTitle} onChange={handleChange} icon={Info} />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">CTA Description</label>
                  <textarea 
                    name="ctaDescription" 
                    value={form.ctaDescription} 
                    onChange={handleChange} 
                    rows={5}
                    placeholder="Describe the call to action..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer Details */}
          <section className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl space-y-8">
            <h3 className="font-black text-white flex items-center gap-3 text-xl">
              <Layout className="text-blue-400" size={24} /> Global Footer Designer
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Brand Bio / Footer Text</label>
                <textarea 
                  name="footerText" 
                  value={form.footerText} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200 outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={14}/> Physical HQ Address
                </label>
                <textarea 
                  name="footerAddress" 
                  value={form.footerAddress} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200 outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <InputGroup 
                label="Copyright Text" 
                name="copyrightText" 
                value={form.copyrightText} 
                onChange={handleChange} 
                isDark={true}
              />
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsPage;