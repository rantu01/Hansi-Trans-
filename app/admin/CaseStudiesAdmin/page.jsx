"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/app/config/api";
import { Trash2, Edit, Plus, Image as ImageIcon, Loader2, X, UploadCloud, Search } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const CaseStudiesAdmin = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState("");

  const fetchSlides = async () => {
    try {
      const res = await fetch(API.CaseStudies.getAll);
      const data = await res.json();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("File too large (Max 2MB)");

    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const loadingToast = toast.loading("Uploading image...");

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
        toast.success("Image secured!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed", { id: loadingToast });
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image");

    const payload = { image, alt };
    const url = editId ? API.CaseStudies.update(editId) : API.CaseStudies.add;
    const method = editId ? "PUT" : "POST";
    const loadingToast = toast.loading(editId ? "Updating..." : "Publishing...");

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
        toast.success(editId ? "Updated!" : "Added!", { id: loadingToast });
        clearForm();
        fetchSlides();
      }
    } catch (error) {
      toast.error("Operation failed", { id: loadingToast });
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This slide will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
      borderRadius: "1.2rem"
    });

    if (result.isConfirmed) {
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
    }
  };

  const filteredSlides = slides.filter(s => s.alt.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-black" size={40} />
        <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Loading Assets...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-gray-50 min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
            <span className="p-2.5 bg-black rounded-2xl text-white shadow-xl shadow-black/10">
              <ImageIcon size={28} />
            </span>
            Gallery Manager
          </h2>
          <p className="text-gray-400 font-medium text-sm md:text-base">Portfolio Showcase Slider Controls</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search slides..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-black/5 outline-none transition-all shadow-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- FORM SECTION (STICKY) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4"
        >
          <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/40 sticky top-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-xl text-gray-800 tracking-tight">
                {editId ? "Update Media" : "Add New Slide"}
              </h3>
              {editId && (
                <button onClick={clearForm} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                  <X size={22} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Slider Media</label>
                <div className="relative group">
                  <input type="file" id="file-upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <label 
                    htmlFor="file-upload"
                    className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300
                      ${preview ? 'border-black bg-white shadow-inner' : 'border-gray-200 hover:border-black bg-gray-50/50 hover:bg-white'}`}
                  >
                    {preview ? (
                      <img src={preview} className="w-full h-full object-cover rounded-[1.85rem] p-1.5" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-black">
                        <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:shadow-md transition-all">
                          <UploadCloud size={32} />
                        </div>
                        <span className="text-xs font-bold">Browse Files</span>
                        <span className="text-[10px] opacity-60 mt-1">PNG, JPG, WEBP up to 2MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Accessibility (Alt Text)</label>
                <input 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl focus:bg-white focus:ring-4 focus:ring-black/5 outline-none transition-all text-sm font-semibold" 
                  placeholder="e.g. Modern Office Workspace" 
                  value={alt} 
                  onChange={(e) => setAlt(e.target.value)} 
                  required 
                />
              </div>

              <button 
                disabled={uploading} 
                className={`w-full py-4.5 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all active:scale-[0.97] flex items-center justify-center gap-3
                  ${uploading ? "bg-gray-300" : "bg-black hover:bg-zinc-800 shadow-black/10 hover:shadow-black/20"}`}
              >
                {uploading ? <Loader2 className="animate-spin" size={20} /> : (editId ? <Edit size={20} /> : <Plus size={20} />)}
                {uploading ? "Uploading..." : editId ? "Save Changes" : "Post to Gallery"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* --- GRID LIST SECTION --- */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredSlides.map((slide, index) => (
                <motion.div 
                  key={slide._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="relative h-64 sm:h-56 lg:h-64 overflow-hidden">
                    <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    
                    {/* Image Overlay Controls */}
                    <div className="absolute inset-0 bg-black/40 md:bg-black/60 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleEdit(slide)} 
                          className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-xl active:scale-90"
                        >
                          <Edit size={22} />
                        </button>
                        <button 
                          onClick={() => handleDelete(slide._id)} 
                          className="w-14 h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl active:scale-90"
                        >
                          <Trash2 size={22} />
                        </button>
                    </div>
                    
                    <div className="absolute top-5 left-5">
                      <div className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-sm">
                         <span className="text-[10px] font-black text-black uppercase tracking-widest">Slide {index + 1}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Asset Description</p>
                        <p className="text-sm font-bold text-gray-700 line-clamp-1 italic">"{slide.alt}"</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-black transition-colors">
                        <ImageIcon size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE */}
          {filteredSlides.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100"
            >
              <div className="inline-flex p-8 bg-gray-50 rounded-[2.5rem] mb-6 text-gray-200">
                <ImageIcon size={60} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">No Gallery Items</h3>
              <p className="text-gray-400 font-medium max-w-xs mx-auto">Upload your first case study slider image to get started.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesAdmin;