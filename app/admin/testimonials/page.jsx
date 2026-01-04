"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";
import { 
  Trash2, Plus, Save, User, Briefcase, 
  Image as ImageIcon, Quote, Video, 
  Navigation, Loader2, X, Upload 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const emptyText = { type: "text", quote: "", name: "", role: "", avatar: "" };
const emptyVideo = { type: "video", thumbnail: "", name: "", role: "", avatar: "" };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
        const data = await res.json();
        setTestimonials(data.testimonials || []);
        setBottomNav(data.bottomNav || []);
      } catch (err) {
        toast.error("Failed to load data");
      }
    };
    fetchTestimonials();
  }, []);

  const handleFileUpload = async (file, index, field) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploadingIndex(`${index}-${field}`);
    const uploadToast = toast.loading(`Uploading ${field}...`);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const updatedTestimonials = [...testimonials];
        updatedTestimonials[index][field] = data.url;
        setTestimonials(updatedTestimonials);
        toast.success("Uploaded successfully", { id: uploadToast });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Upload failed", { id: uploadToast });
    } finally {
      setUploadingIndex(null);
    }
  };

  const saveAll = async () => {
    if (!token) return toast.error("Unauthorized Access");
    setLoading(true);
    const loadToast = toast.loading("Saving changes...");
    try {
      const res = await fetch(API.Testimonials.getTestimonials, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ testimonials, bottomNav }),
      });
      if (!res.ok) throw new Error();
      toast.success("All data updated successfully!", { id: loadToast });
    } catch (err) {
      toast.error("Save failed. Try again.", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  const removeTestimonial = async (id, index) => {
    if (!id) {
      setTestimonials(testimonials.filter((_, i) => i !== index));
      return;
    }
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API.Testimonials.getTestimonials}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setTestimonials(testimonials.filter((item) => item._id !== id));
        toast.success("Deleted successfully");
      }
    } catch (err) {
      toast.error("Delete operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 font-sans">
      <Toaster position="top-right" />
      
      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 mb-4 md:mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <Quote className="text-blue-600 w-5 h-5 md:w-6 md:h-6" /> Testimonials
            </h1>
            <p className="text-[10px] md:text-sm text-slate-500 font-medium uppercase tracking-wider">Manage social proof</p>
          </div>
          <button
            disabled={loading}
            onClick={saveAll}
            className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviews</p>
                <p className="text-xl md:text-2xl font-black text-slate-800">{testimonials.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nav Items</p>
                <p className="text-xl md:text-2xl font-black text-slate-800">{bottomNav.length}</p>
            </div>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4 md:space-y-6">
          <AnimatePresence>
            {testimonials.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                key={item._id || index}
                className={`group relative border rounded-2xl p-4 md:p-6 bg-white transition-all hover:shadow-xl ${
                  item.type === "video" ? "border-l-4 border-l-purple-500" : "border-l-4 border-l-blue-500"
                }`}
              >
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-tighter ${
                      item.type === "video" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {item.type} Review
                    </span>
                  </div>
                  <button
                    onClick={() => removeTestimonial(item._id, index)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Content */}
                  <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
                    {item.type === "text" ? (
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Quote</label>
                        <textarea
                          placeholder="What did the client say?"
                          className="modern-input min-h-[100px] md:min-h-[120px]"
                          value={item.quote}
                          onChange={(e) => {
                            const copy = [...testimonials];
                            copy[index].quote = e.target.value;
                            setTestimonials(copy);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
                          <ImageIcon size={12}/> Video Thumbnail
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                            placeholder="Thumbnail URL"
                            className="modern-input flex-1"
                            value={item.thumbnail}
                            onChange={(e) => {
                                const copy = [...testimonials];
                                copy[index].thumbnail = e.target.value;
                                setTestimonials(copy);
                            }}
                            />
                            <label className="flex items-center justify-center p-3 bg-purple-100 text-purple-600 rounded-xl cursor-pointer hover:bg-purple-200">
                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0], index, "thumbnail")} />
                                {uploadingIndex === `${index}-thumbnail` ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
                                <span className="ml-2 font-bold text-xs sm:hidden">Upload Thumbnail</span>
                            </label>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><User size={12}/> Name</label>
                            <input placeholder="Full Name" className="modern-input" value={item.name} onChange={(e) => {
                                const copy = [...testimonials];
                                copy[index].name = e.target.value;
                                setTestimonials(copy);
                            }} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><Briefcase size={12}/> Role</label>
                            <input placeholder="Job Title" className="modern-input" value={item.role} onChange={(e) => {
                                const copy = [...testimonials];
                                copy[index].role = e.target.value;
                                setTestimonials(copy);
                            }} />
                        </div>
                    </div>
                  </div>

                  {/* Right Column: Avatar */}
                  <div className="lg:col-span-4 flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-6 border border-dashed border-slate-200 order-1 lg:order-2">
                    <div className="w-20 h-20 rounded-full bg-slate-200 mb-4 overflow-hidden border-4 border-white shadow-md relative group">
                        {item.avatar ? <img src={item.avatar} className="w-full h-full object-cover" alt="avatar" /> : <User className="w-full h-full p-4 text-slate-400" />}
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <input type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0], index, "avatar")} />
                           {uploadingIndex === `${index}-avatar` ? <Loader2 className="animate-spin text-white" /> : <Upload className="text-white" size={20}/>}
                        </label>
                    </div>
                    <input
                      placeholder="Avatar URL"
                      className="modern-input text-xs text-center lg:text-left"
                      value={item.avatar}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[index].avatar = e.target.value;
                        setTestimonials(copy);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 my-8 md:my-12">
          <button
            onClick={() => setTestimonials([...testimonials, emptyText])}
            className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest shadow-sm"
          >
            <Plus size={18} /> Text Review
          </button>
          <button
            onClick={() => setTestimonials([...testimonials, emptyVideo])}
            className="flex items-center justify-center gap-2 bg-purple-50 text-purple-600 border border-purple-100 hover:bg-purple-600 hover:text-white transition-all py-4 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-widest shadow-sm"
          >
            <Plus size={18} /> Video Review
          </button>
        </div>

        {/* Bottom Nav */}
        <div className="mt-12 md:mt-20 p-6 md:p-8 bg-slate-900 rounded-3xl md:rounded-[3rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="p-2 bg-blue-500 rounded-lg text-white"><Navigation size={18} /></div>
            <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">Quick Navigation</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <AnimatePresence>
              {bottomNav.map((nav, i) => (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={i} className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <input placeholder="Name" className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-slate-600 font-bold text-sm md:text-base" value={nav.name} onChange={(e) => {
                    const copy = [...bottomNav];
                    copy[i].name = e.target.value;
                    setBottomNav(copy);
                  }} />
                  <div className="hidden sm:block h-6 w-px bg-slate-700"></div>
                  <input placeholder="Company" className="w-full bg-transparent border-none text-blue-400 focus:ring-0 placeholder:text-slate-600 text-xs md:text-sm" value={nav.company} onChange={(e) => {
                    const copy = [...bottomNav];
                    copy[i].company = e.target.value;
                    setBottomNav(copy);
                  }} />
                  <button onClick={() => setBottomNav(bottomNav.filter((_, idx) => idx !== i))} className="self-end sm:self-auto p-1 text-slate-500 hover:text-rose-400"><X size={18} /></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button onClick={() => setBottomNav([...bottomNav, { name: "", company: "" }])} className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-all font-bold text-xs uppercase tracking-widest">
            <Plus size={16} /> Add Nav Item
          </button>
        </div>
      </div>

      {/* Floating Save for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 px-4 sm:hidden z-30">
        <button disabled={loading} onClick={saveAll} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95">
          {loading ? <Loader2 className="animate-spin" /> : <Save />}
          {loading ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>

      <style jsx>{`
        .modern-input {
          width: 100%;
          background: #F1F5F9;
          border: 1px solid transparent;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1E293B;
          transition: all 0.2s;
        }
        .modern-input:focus {
          outline: none;
          background: white;
          border-color: #3B82F6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}