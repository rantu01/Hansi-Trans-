"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";
import { 
  Trash2, Plus, Save, User, Briefcase, 
  Image as ImageIcon, Quote, Video, 
  Navigation, Loader2, X, Upload, Link as LinkIcon 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// নতুন স্ট্রাকচার অনুযায়ী videoUrl এবং type যোগ করা হয়েছে
const emptyTestimonial = { 
  type: "text", // default type
  quote: "", 
  thumbnail: "", 
  videoUrl: "",
  name: "", 
  role: "", 
  avatar: "" 
};

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
            Save All
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Reviews</p>
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
                className="group relative border border-slate-100 rounded-3xl p-4 md:p-8 bg-white transition-all hover:shadow-2xl border-l-4 border-l-blue-500"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Testimonial #{index + 1}
                    </span>
                    
                    {/* Type Selector (Text or Video) */}
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button 
                        onClick={() => {
                          const copy = [...testimonials];
                          copy[index].type = "text";
                          setTestimonials(copy);
                        }}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${item.type === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                      >TEXT</button>
                      <button 
                         onClick={() => {
                          const copy = [...testimonials];
                          copy[index].type = "video";
                          setTestimonials(copy);
                        }}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${item.type === 'video' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500'}`}
                      >VIDEO</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeTestimonial(item._id, index)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. Quote/Message Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2">
                        <Quote size={14} className="text-blue-500"/> Message / Quote
                      </label>
                      <textarea
                        placeholder="Enter the client's testimonial message here..."
                        className="modern-input min-h-[100px]"
                        value={item.quote}
                        onChange={(e) => {
                          const copy = [...testimonials];
                          copy[index].quote = e.target.value;
                          setTestimonials(copy);
                        }}
                      />
                    </div>

                    {/* 2. YouTube Video Link (Show only if type is video) */}
                    {item.type === "video" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                        <label className="text-[11px] font-bold text-red-500 uppercase ml-1 flex items-center gap-2">
                          <Video size={14} /> YouTube Video Link
                        </label>
                        <div className="relative">
                           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                             <LinkIcon size={16} />
                           </div>
                           <input
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="modern-input pl-11"
                            value={item.videoUrl || ""}
                            onChange={(e) => {
                              const copy = [...testimonials];
                              copy[index].videoUrl = e.target.value;
                              setTestimonials(copy);
                            }}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* 3. Thumbnail Image Input */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-2">
                        <ImageIcon size={14} className="text-purple-500"/> 
                        {item.type === "video" ? "Video Thumbnail (Hover State)" : "Hover Image"}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          placeholder="Image URL"
                          className="modern-input flex-1"
                          value={item.thumbnail}
                          onChange={(e) => {
                            const copy = [...testimonials];
                            copy[index].thumbnail = e.target.value;
                            setTestimonials(copy);
                          }}
                        />
                        <label className="flex items-center justify-center px-6 bg-slate-100 text-slate-600 rounded-xl cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0], index, "thumbnail")} />
                          {uploadingIndex === `${index}-thumbnail` ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
                          <span className="ml-2 font-bold text-xs">Upload</span>
                        </label>
                      </div>
                    </div>

                    {/* 4. Name & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><User size={12}/> Client Name</label>
                            <input placeholder="e.g. John Doe" className="modern-input" value={item.name} onChange={(e) => {
                                const copy = [...testimonials];
                                copy[index].name = e.target.value;
                                setTestimonials(copy);
                            }} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><Briefcase size={12}/> Role / Company</label>
                            <input placeholder="e.g. CEO of Tech" className="modern-input" value={item.role} onChange={(e) => {
                                const copy = [...testimonials];
                                copy[index].role = e.target.value;
                                setTestimonials(copy);
                            }} />
                        </div>
                    </div>
                  </div>

                  {/* Right: Avatar Display */}
                  <div className="lg:col-span-4 flex flex-col justify-center items-center bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                    <div className="w-24 h-24 rounded-full bg-white mb-4 overflow-hidden border-4 border-white shadow-xl relative group">
                        {item.avatar ? <img src={item.avatar} className="w-full h-full object-cover" alt="avatar" /> : <User className="w-full h-full p-6 text-slate-200" />}
                        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <input type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0], index, "avatar")} />
                           {uploadingIndex === `${index}-avatar` ? <Loader2 className="animate-spin text-white" /> : <Upload className="text-white" size={24}/>}
                        </label>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Client Avatar</p>
                    <input
                      placeholder="Avatar URL"
                      className="modern-input text-xs text-center bg-white"
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

        {/* Action Button */}
        <div className="my-12">
          <button
            onClick={() => setTestimonials([...testimonials, emptyTestimonial])}
            className="w-full flex items-center justify-center gap-3 bg-white text-blue-600 border-2 border-dashed border-blue-200 hover:border-blue-600 hover:bg-blue-50 transition-all py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-sm"
          >
            <Plus size={24} /> Add New Testimonial
          </button>
        </div>

        {/* Bottom Nav Section */}
        <div className="mt-20 p-8 md:p-12 bg-slate-900 rounded-[3rem] shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/30"><Navigation size={24} /></div>
            <div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Quick Navigation</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">The list shown at the bottom of the slider</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {bottomNav.map((nav, i) => (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={i} className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <div className="flex-1 w-full space-y-1">
                      <p className="text-[9px] font-black text-blue-400 uppercase ml-1">Name</p>
                      <input placeholder="Client Name" className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-slate-600 font-bold" value={nav.name} onChange={(e) => {
                        const copy = [...bottomNav];
                        copy[i].name = e.target.value;
                        setBottomNav(copy);
                      }} />
                  </div>
                  <div className="hidden sm:block h-10 w-px bg-slate-700"></div>
                  <div className="flex-1 w-full space-y-1">
                      <p className="text-[9px] font-black text-slate-500 uppercase ml-1">Company</p>
                      <input placeholder="Company Name" className="w-full bg-transparent border-none text-slate-300 focus:ring-0 placeholder:text-slate-600 text-sm" value={nav.company} onChange={(e) => {
                        const copy = [...bottomNav];
                        copy[i].company = e.target.value;
                        setBottomNav(copy);
                      }} />
                  </div>
                  <button onClick={() => setBottomNav(bottomNav.filter((_, idx) => idx !== i))} className="p-2 text-slate-500 hover:text-rose-400 transition-colors"><X size={20} /></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button onClick={() => setBottomNav([...bottomNav, { name: "", company: "" }])} className="mt-8 w-full flex items-center justify-center gap-2 py-5 bg-slate-800 text-slate-300 rounded-2xl hover:bg-slate-700 hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em] border border-slate-700">
            <Plus size={18} /> Add Nav Item
          </button>
        </div>
      </div>

      {/* Floating Save for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 px-4 sm:hidden z-30">
        <button disabled={loading} onClick={saveAll} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3 active:scale-95">
          {loading ? <Loader2 className="animate-spin" /> : <Save />}
          {loading ? "SAVING..." : "SAVE ALL CHANGES"}
        </button>
      </div>

      <style jsx>{`
        .modern-input {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 14px 16px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          color: #1E293B;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modern-input:focus {
          outline: none;
          background: white;
          border-color: #3B82F6;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
        }
        .modern-input::placeholder {
          color: #94A3B8;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}