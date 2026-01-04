"use client";
import React, { useState, useEffect } from "react";
import { 
  Trash2, Plus, Edit2, Save, X, Globe, Gamepad2, 
  Smartphone, Zap, FlaskConical, Megaphone, ShoppingBag, 
  Clapperboard, LayoutGrid, Layers, Hash, Type, AlignLeft,
  Loader2, AlertCircle
} from "lucide-react";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

// আইকন ম্যাপ
const iconOptions = {
  Globe, Gamepad2, Clapperboard, Smartphone, Zap, 
  FlaskConical, Megaphone, ShoppingBag
};

const DomainsAdmin = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Globe",
    tags: "",
    order: 0
  });

  useEffect(() => { fetchDomains(); }, []);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const res = await fetch(API.Domains);
      const data = await res.json();
      setDomains(Array.isArray(data) ? data : data.domains || []);
    } catch (err) {
      toast.error("Could not load domains");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Unauthorized: Please Login");

    const loadingToast = toast.loading(editingId ? "Updating sector..." : "Creating new sector...");
    const payload = {
      ...formData,
      id: editingId,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    try {
      const res = await fetch(API.Domains, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(editingId ? "Domain Updated!" : "Domain Created!", { id: loadingToast });
        resetForm();
        fetchDomains();
      } else {
        toast.error("Failed to save data", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Network Error!", { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This domain will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "1.25rem",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API.Domains}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          toast.success("Sector deleted successfully");
          setDomains(domains.filter(d => d._id !== id));
        }
      } catch (err) {
        toast.error("Delete operation failed");
      }
    }
  };

  const handleEdit = (domain) => {
    setEditingId(domain._id);
    setFormData({
      title: domain.title,
      description: domain.description || "",
      icon: domain.icon,
      tags: Array.isArray(domain.tags) ? domain.tags.join(", ") : "",
      order: domain.order || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast("Editing mode enabled", { icon: "📝" });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", icon: "Globe", tags: "", order: 0 });
  };

  const PreviewIcon = iconOptions[formData.icon] || Globe;

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6 md:p-12 font-sans text-slate-900">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200">
                <LayoutGrid size={28} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Vertical Domains</h1>
            </div>
            <p className="text-slate-500 font-medium ml-1">Structure and organize your business sectors</p>
          </div>
          
          {editingId && (
            <motion.button 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              onClick={resetForm}
              className="bg-white text-red-500 px-6 py-3 rounded-2xl font-bold shadow-sm border border-red-100 flex items-center gap-2 hover:bg-red-50 transition-all"
            >
              <X size={18} /> Cancel Editing
            </motion.button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form & Preview Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              layout
              className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white p-8"
            >
              <h2 className="text-xl font-black mb-8 flex items-center gap-2 text-slate-800">
                {editingId ? <Edit2 className="text-blue-500" /> : <Plus className="text-blue-500" />}
                {editingId ? "Modify Sector" : "Initialize New Sector"}
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <Type size={14}/> Sector Title
                  </label>
                  <input
                    className="modern-input"
                    placeholder="e.g. Mobile Gaming"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <Layers size={14}/> Visual Icon
                  </label>
                  <select
                    className="modern-input cursor-pointer appearance-none"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  >
                    {Object.keys(iconOptions).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <AlignLeft size={14}/> Core Description
                  </label>
                  <textarea
                    className="modern-input h-28 resize-none"
                    placeholder="Describe the impact of this domain..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <Hash size={14}/> Metadata Tags
                  </label>
                  <input
                    className="modern-input"
                    placeholder="Music, Tech, AI"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <Layers size={14}/> Display Priority
                  </label>
                  <input
                    type="number"
                    className="modern-input"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
                  >
                    {editingId ? <Save size={20}/> : <Plus size={20}/>}
                    {editingId ? "Update Sector Data" : "Deploy New Sector"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-6">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Live Preview</h3>
              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <PreviewIcon size={40} />
                </div>
                <h4 className="text-2xl font-black text-slate-800 mb-3">{formData.title || "Sector Title"}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {formData.description || "The description you type in the form will appear here in real-time."}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {formData.tags ? formData.tags.split(',').map((t, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                      {t.trim()}
                    </span>
                  )) : (
                    <span className="text-slate-300 text-xs italic font-medium">No tags assigned</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Domain List Grid */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-slate-800">Operational Sectors</h3>
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="bg-white px-4 py-1 rounded-full text-xs font-bold text-slate-400 border border-slate-100">{domains.length} Total</span>
          </div>

          {loading ? (
             <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Registry...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {domains.map((domain, index) => {
                  const IconTag = iconOptions[domain.icon] || Globe;
                  return (
                    <motion.div 
                      key={domain._id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all group relative"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-500">
                          <IconTag size={28} />
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleEdit(domain)}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(domain._id)}
                            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-black text-xl text-slate-800 mb-2">{domain.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-medium leading-relaxed">
                        {domain.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {domain.tags?.map((tag, i) => (
                          <span key={i} className="text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="absolute bottom-6 right-6 text-[40px] font-black text-slate-50 pointer-events-none group-hover:text-blue-50/50 transition-colors">
                        0{domain.order || index + 1}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!loading && domains.length === 0 && (
            <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
               <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active domains found</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modern-input {
          width: 100%;
          padding: 18px;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 20px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }
        .modern-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
        }
        .modern-input::placeholder {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default DomainsAdmin;