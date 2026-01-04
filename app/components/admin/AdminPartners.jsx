"use client";
import { API } from "@/app/config/api";
import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  Plus, 
  Edit3, 
  X, 
  UploadCloud, 
  Loader2, 
  Building2, 
  ExternalLink 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const AdminPartners = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [partners, setPartners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(""); 
  const [preview, setPreview] = useState("");

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.Partners);
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const loadingToast = toast.loading("Uploading logo...");

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
        setLogo(data.url);
        toast.success("Logo uploaded successfully!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed", { id: loadingToast });
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (partner) => {
    setIsEditing(true);
    setEditId(partner._id);
    setName(partner.name || "");
    setLogo(partner.logo);
    setPreview(partner.logo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setName("");
    setLogo("");
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logo) return toast.error("Please upload a logo first");

    const payload = { name, logo };
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API.Partners}/${editId}` : API.Partners;

    const actionToast = toast.loading(isEditing ? "Updating..." : "Adding...");

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? "Partner updated!" : "Partner added!", { id: actionToast });
        resetForm();
        fetchPartners();
      }
    } catch (err) {
      toast.error("Operation failed", { id: actionToast });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Partner?",
      text: "This will remove the partner from your website.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "15px"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API.Partners}/${id}`, { 
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          toast.success("Partner removed");
          fetchPartners();
        }
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#F9FAFB] min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Building2 className="text-indigo-600" size={32} />
            Trusted Partners
          </h2>
          <p className="text-slate-500 font-medium">Manage company logos shown on the homepage</p>
        </div>
        {isEditing && (
          <button 
            onClick={resetForm}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95"
          >
            <X size={18} /> Cancel Edit
          </button>
        )}
      </div>

      {/* Form Card */}
      <motion.div 
        layout
        className="max-w-6xl mx-auto mb-12"
      >
        <form 
          onSubmit={handleSubmit} 
          className={`p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border transition-all duration-500 bg-white ${isEditing ? 'border-indigo-400 ring-4 ring-indigo-50' : 'border-transparent'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Partner Brand Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium" 
                placeholder="e.g. Google Cloud, Meta" 
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Company Logo</label>
              <div className="flex items-center gap-5 bg-slate-50 p-2 rounded-2xl pr-4">
                <label className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:bg-indigo-50 transition-colors">
                  <UploadCloud size={18} className="text-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">Choose File</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                </label>
                
                {preview && (
                  <motion.div initial={{scale:0}} animate={{scale:1}} className="relative group">
                    <img src={preview} alt="Preview" className="w-16 h-12 object-contain bg-white rounded-lg border shadow-sm" />
                    <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-default">
                        <ExternalLink size={14} className="text-white" />
                    </div>
                  </motion.div>
                )}
                {!preview && <span className="text-xs text-slate-400 font-medium">No logo selected</span>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={uploading}
              className={`w-full md:w-auto px-10 py-4 rounded-2xl text-white font-black shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${uploading ? "bg-slate-300" : (isEditing ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-800')}`}
            >
              {uploading ? <Loader2 className="animate-spin" size={20} /> : (isEditing ? <Edit3 size={20} /> : <Plus size={20} />)}
              {uploading ? "Processing..." : isEditing ? "Save Changes" : "Create Partner"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Partners Display Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          Live Partners <div className="h-px flex-1 bg-slate-200"></div>
        </h3>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {partners.map((partner, index) => (
                <motion.div 
                  key={partner._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-24 flex items-center justify-center mb-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-center text-xs font-black text-slate-300 uppercase tracking-tighter">Partner Account</p>
                    <p className="text-center text-sm font-bold text-slate-700 truncate">{partner.name || "Unnamed"}</p>
                  </div>
                  
                  {/* Action Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleEdit(partner)} 
                      className="bg-white p-2 rounded-xl shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
                      title="Edit Partner"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(partner._id)} 
                      className="bg-white p-2 rounded-xl shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all border border-slate-100"
                      title="Delete Partner"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && partners.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <Building2 className="mx-auto text-slate-200 mb-4" size={48} />
            <h4 className="text-lg font-bold text-slate-800">No Partners Found</h4>
            <p className="text-slate-400">Add your first trusted partner logo to display them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPartners;