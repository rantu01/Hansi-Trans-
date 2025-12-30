"use client";

import { API } from "@/app/config/api";
import { useEffect, useState } from "react";

export default function CaseForm({ refresh, editing, clearEdit }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [isReverse, setIsReverse] = useState(false);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [stats, setStats] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setSlug(editing.slug || "");
      setDescription(editing.description || "");
      setTag(editing.tag || "");
      setIsReverse(editing.isReverse || false);
      setImage(editing.image || "");
      setPreview(editing.image || "");
      setStats(editing.stats || []);
    }
  }, [editing]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(API.uploadImage, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  const addStat = () => setStats([...stats, { label: "", value: "", isIcon: false }]);
  const updateStat = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };
  const removeStat = (index) => setStats(stats.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image first");

    const payload = { title, slug, description, tag, image, isReverse, stats };
    const url = editing ? `${API.featuredCaseStudies}/${editing._id}` : API.featuredCaseStudies;
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    clearForm();
    refresh();
  };

  const clearForm = () => {
    setTitle(""); setSlug(""); setDescription(""); setTag(""); setImage(""); setPreview("");
    setIsReverse(false); setStats([]);
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 md:p-6 rounded-xl shadow-sm space-y-5 w-full max-w-4xl mx-auto">
      <h2 className="font-bold text-xl text-gray-800 border-b pb-3">
        {editing ? "📝 Edit Case Study" : "✨ Add New Case Study"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
          <input className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Slug</label>
          <input className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="project-slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description</label>
        <textarea className="border p-2.5 w-full rounded-lg h-28 focus:ring-2 focus:ring-black outline-none" placeholder="Write about the project..." value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Tag / Category</label>
          <input className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="e.g. Web Development" value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="checkbox" className="w-5 h-5 accent-black" checked={isReverse} onChange={(e) => setIsReverse(e.target.checked)} />
          <span className="text-sm font-medium">Reverse Layout (Desktop)</span>
        </label>
      </div>

      <div className="space-y-2 border-t pt-4">
        <p className="text-xs font-bold text-gray-500 uppercase ml-1">Feature Image</p>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input type="file" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setUploading(true);
              setPreview(URL.createObjectURL(file));
              try {
                const url = await uploadImage(file);
                setImage(url);
              } catch (err) { alert("Upload failed"); setPreview(""); }
              finally { setUploading(false); }
            }}
          />
          {preview && <img src={preview} alt="Preview" className="w-24 h-16 object-cover rounded-lg border shadow-sm" />}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-gray-700">Project Statistics</p>
          <button type="button" onClick={addStat} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">
            + Add Stat
          </button>
        </div>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-lg border shadow-sm relative">
              <input className="border p-2 rounded text-sm flex-1" placeholder="Label (Clients)" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} />
              <input className="border p-2 rounded text-sm flex-1" placeholder="Value (200+)" value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value)} />
              <div className="flex items-center justify-between gap-4 md:w-auto">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input type="checkbox" checked={stat.isIcon} onChange={(e) => updateStat(index, "isIcon", e.target.checked)} /> Icon?
                </label>
                <button type="button" onClick={() => removeStat(index)} className="text-red-500 hover:text-red-700 font-bold text-sm px-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button disabled={uploading} className={`flex-1 md:flex-none md:px-12 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${uploading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}>
          {uploading ? "⌛ Uploading..." : editing ? "Update Project" : "Create Project"}
        </button>
        {editing && <button type="button" onClick={clearForm} className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-100 transition-all">Cancel</button>}
      </div>
    </form>
  );
}