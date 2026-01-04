"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/app/config/api";
import { Trash2, Edit, Plus, Image as ImageIcon, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

const CaseStudiesAdmin = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState("");

  // Fetch Data
  const fetchSlides = async () => {
    try {
      const res = await fetch(API.CaseStudies.getAll);
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Image Upload Logic (আপনার CaseForm এর মত)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImage(data.url);
        toast.success("Image uploaded successfully");
      }
    } catch (err) {
      toast.error("Upload failed");
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image first");

    const payload = { image, alt };
    const url = editId ? API.CaseStudies.update(editId) : API.CaseStudies.add;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editId ? "Slide updated" : "Slide added");
        clearForm();
        fetchSlides();
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const clearForm = () => {
    setImage("");
    setAlt("");
    setPreview("");
    setEditId(null);
  };

  const handleEdit = (slide) => {
    setEditId(slide._id);
    setImage(slide.image);
    setAlt(slide.alt);
    setPreview(slide.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(API.CaseStudies.delete(id), { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success("Deleted");
        fetchSlides();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ImageIcon className="text-black" /> Slider Images (Case Studies)
        </h2>
      </div>

      {/* --- Add/Edit Form (Styled like your CaseForm) --- */}
      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-xl shadow-sm space-y-5 mb-10">
        <h3 className="font-bold text-lg text-gray-800 border-b pb-3">
          {editId ? "📝 Edit Slide" : "✨ Add New Slide"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Slider Image</label>
            <div className="flex flex-col gap-4">
              <input 
                type="file" 
                accept="image/*" 
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                onChange={handleImageUpload}
              />
              {preview && (
                <div className="relative w-40 h-24">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg border shadow-sm" />
                  <button 
                    type="button" 
                    onClick={() => {setPreview(""); setImage("");}}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alt Text Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Alt Text (SEO)</label>
            <input 
              className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none" 
              placeholder="e.g. Recording Session" 
              value={alt} 
              onChange={(e) => setAlt(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            disabled={uploading} 
            className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${uploading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}
          >
            {uploading ? "⌛ Uploading..." : editId ? "Update Slide" : "Add Slide"}
          </button>
          {editId && (
            <button type="button" onClick={clearForm} className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-100 transition-all">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* --- Display List --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide._id} className="bg-white rounded-xl overflow-hidden shadow-sm border group relative">
            <div className="relative h-48">
                <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => handleEdit(slide)} className="p-2 bg-white text-black rounded-full hover:scale-110 transition">
                        <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(slide._id)} className="p-2 bg-white text-red-600 rounded-full hover:scale-110 transition">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="p-3 bg-white">
              <p className="text-xs font-bold text-gray-400 uppercase">Alt Text</p>
              <p className="text-sm font-medium truncate">{slide.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudiesAdmin;