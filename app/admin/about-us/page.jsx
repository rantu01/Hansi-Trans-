"use client";
import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import { Trash2, Upload, Plus, X } from "lucide-react"; // Icon এর জন্য lucide-react ব্যবহার করা হয়েছে

const EMPTY_STATE = {
  hero: { title: "", description: "", videoImage: "" },
  workWithUs: { headline: "", buttonText: "" },
  company: {
    missionTitle: "",
    missionDescription: "",
    visionTitle: "",
    visionDescription: "",
    images: [],
  },
  gallery: { images: [] },
  ceo: {
    name: "",
    designation: "",
    description: "",
    image: "",
    socials: { twitter: "", facebook: "", linkedin: "" },
    stats: [],
  },
  schedule: { title: "", description: "" },
};

export default function AboutUsAdmin() {
  const [data, setData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    fetch(API.AboutUs.get)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData({
            ...EMPTY_STATE,
            ...res,
            hero: { ...EMPTY_STATE.hero, ...res.hero },
            workWithUs: { ...EMPTY_STATE.workWithUs, ...res.workWithUs },
            company: { ...EMPTY_STATE.company, ...res.company, images: res.company?.images || [] },
            gallery: { images: res.gallery?.images || [] },
            ceo: {
              ...EMPTY_STATE.ceo,
              ...res.ceo,
              socials: { ...EMPTY_STATE.ceo.socials, ...res.ceo?.socials },
              stats: res.ceo?.stats || [],
            },
            schedule: { ...EMPTY_STATE.schedule, ...res.schedule },
          });
        }
      })
      .catch(() => setData(EMPTY_STATE));
  }, []);

  const updateField = (path, value) => {
    setData((prev) => {
      const copy = structuredClone(prev);
      let ref = copy;
      const keys = path.split(".");
      keys.slice(0, -1).forEach((k) => {
        ref[k] ??= {};
        ref = ref[k];
      });
      ref[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const uploadImage = async (file, path, type = "single") => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      if (result?.url) {
        if (type === "gallery") {
          updateField("gallery.images", [...data.gallery.images, result.url]);
        } else if (type === "company") {
          updateField("company.images", [...data.company.images, result.url]);
        } else {
          updateField(path, result.url);
        }
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeArrayImage = (path, url) => {
    const keys = path.split(".");
    const currentImages = data[keys[0]][keys[1]];
    updateField(path, currentImages.filter((img) => img !== url));
  };

  const saveData = async () => {
    setLoading(true);
    const res = await fetch(API.AboutUs.upsert, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false);
    res.ok ? alert("Updated successfully! ✅") : alert("Failed to update ❌");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">About Us Management</h1>
            <p className="text-sm text-gray-500">Manage your company story and media</p>
          </div>
          <button
            onClick={saveData}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-indigo-200"
          >
            {loading ? "Saving..." : "Publish Changes"}
          </button>
        </header>

        {/* HERO SECTION */}
        <Section title="Hero Section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Main Title" value={data.hero.title} onChange={(v) => updateField("hero.title", v)} />
              <Textarea label="Sub Description" value={data.hero.description} onChange={(v) => updateField("hero.description", v)} />
            </div>
            <ImageUpload label="Hero Banner/Video Cover" image={data.hero.videoImage} onUpload={(f) => uploadImage(f, "hero.videoImage")} />
          </div>
        </Section>

        {/* COMPANY MISSION & VISION */}
        {/* COMPANY MISSION & VISION */}
        <Section title="Company Mission & Vision">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Part */}
            <div className="space-y-4 border-r pr-4">
              <h3 className="font-bold text-indigo-600 underline">Mission Section</h3>
              <Input label="Mission Title" value={data.company.missionTitle} onChange={(v) => updateField("company.missionTitle", v)} />
              <Textarea label="Mission Statement" value={data.company.missionDescription} onChange={(v) => updateField("company.missionDescription", v)} />

              {/* Mission Images (Index 0, 1, 2) */}
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-600 uppercase">Mission Images (Max 3)</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="relative aspect-square border rounded-lg overflow-hidden bg-gray-50">
                      {data.company.images[idx] ? (
                        <>
                          <img src={data.company.images[idx]} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const newImgs = [...data.company.images];
                              newImgs[idx] = ""; // বা রিমুভ লজিক
                              updateField("company.images", newImgs);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg"
                          >
                            <X size={12} />
                          </button>
                        </>
                      ) : (
                        <label className="flex items-center justify-center h-full cursor-pointer hover:bg-gray-100">
                          <Plus size={16} className="text-gray-400" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append("image", file);
                              const res = await fetch(API.uploadImage, {
                                method: "POST",
                                headers: { Authorization: `Bearer ${token}` },
                                body: formData,
                              });
                              const result = await res.json();
                              if (result.url) {
                                const newImgs = [...data.company.images];
                                newImgs[idx] = result.url;
                                updateField("company.images", newImgs);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision Part */}
            <div className="space-y-4">
              <h3 className="font-bold text-indigo-600 underline">Vision Section</h3>
              <Input label="Vision Title" value={data.company.visionTitle} onChange={(v) => updateField("company.visionTitle", v)} />
              <Textarea label="Vision Statement" value={data.company.visionDescription} onChange={(v) => updateField("company.visionDescription", v)} />

              {/* Vision Images (Index 3, 4, 5) */}
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-600 uppercase">Vision Images (Max 3)</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[3, 4, 5].map((idx) => (
                    <div key={idx} className="relative aspect-square border rounded-lg overflow-hidden bg-gray-50">
                      {data.company.images[idx] ? (
                        <>
                          <img src={data.company.images[idx]} className="w-full h-full object-cover" />
                          <button
                            onClick={() => {
                              const newImgs = [...data.company.images];
                              newImgs[idx] = "";
                              updateField("company.images", newImgs);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg"
                          >
                            <X size={12} />
                          </button>
                        </>
                      ) : (
                        <label className="flex items-center justify-center h-full cursor-pointer hover:bg-gray-100">
                          <Plus size={16} className="text-gray-400" />
                          <input
                            type="file"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              const formData = new FormData();
                              formData.append("image", file);
                              const res = await fetch(API.uploadImage, {
                                method: "POST",
                                headers: { Authorization: `Bearer ${token}` },
                                body: formData,
                              });
                              const result = await res.json();
                              if (result.url) {
                                const newImgs = [...data.company.images];
                                newImgs[idx] = result.url; // নির্দিষ্ট ইনডেক্সে ছবি বসানো হচ্ছে
                                updateField("company.images", newImgs);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CEO SECTION */}
        <Section title="CEO Profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ImageUpload label="Profile Photo" image={data.ceo.image} onUpload={(f) => uploadImage(f, "ceo.image")} />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" value={data.ceo.name} onChange={(v) => updateField("ceo.name", v)} />
                <Input label="Designation" value={data.ceo.designation} onChange={(v) => updateField("ceo.designation", v)} />
              </div>
              <Textarea label="CEO Message" value={data.ceo.description} onChange={(v) => updateField("ceo.description", v)} />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Twitter (X)" value={data.ceo.socials.twitter} onChange={(v) => updateField("ceo.socials.twitter", v)} />
                <Input label="Facebook" value={data.ceo.socials.facebook} onChange={(v) => updateField("ceo.socials.facebook", v)} />
                <Input label="LinkedIn" value={data.ceo.socials.linkedin} onChange={(v) => updateField("ceo.socials.linkedin", v)} />
              </div>
            </div>
          </div>
        </Section>

        {/* GALLERY */}
        <Section title="Our Gallery">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {data.gallery.images.map((img, idx) => (
              <div key={idx} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <button onClick={() => removeArrayImage("gallery.images", img)} className="absolute top-2 right-2 bg-white/90 text-red-600 p-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-xl aspect-square cursor-pointer hover:bg-indigo-50 transition-all">
              <Upload className="text-indigo-400 mb-2" />
              <span className="text-xs font-semibold text-indigo-600">Upload Photo</span>
              <input type="file" className="hidden" onChange={(e) => uploadImage(e.target.files?.[0], null, "gallery")} />
            </label>
          </div>
          {uploading && <p className="text-center text-sm text-indigo-600 animate-pulse mt-2">Uploading to server...</p>}
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Work With Us">
            <Input label="Headline" value={data.workWithUs.headline} onChange={(v) => updateField("workWithUs.headline", v)} />
            <Input label="Button Label" value={data.workWithUs.buttonText} onChange={(v) => updateField("workWithUs.buttonText", v)} />
          </Section>
          <Section title="Call to Action (Schedule)">
            <Input label="Title" value={data.schedule.title} onChange={(v) => updateField("schedule.title", v)} />
            <Textarea label="Description" value={data.schedule.description} onChange={(v) => updateField("schedule.description", v)} />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE UI COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6">
    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
      <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
      {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, value = "", onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-700"
    />
  </div>
);

const Textarea = ({ label, value = "", onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-700 resize-none"
    />
  </div>
);

const ImageUpload = ({ label, image, onUpload }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">{label}</label>
    <div className="relative group w-full aspect-video md:aspect-square lg:aspect-video rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50">
      {image ? (
        <>
          <img src={image} className="w-full h-full object-cover transition-filter group-hover:brightness-50" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-xl">
              Change Photo
              <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files?.[0])} />
            </label>
          </div>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100 transition-colors">
          <Upload className="text-gray-400 mb-2" />
          <span className="text-xs font-medium text-gray-500">Select Image</span>
          <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files?.[0])} />
        </label>
      )}
    </div>
  </div>
);