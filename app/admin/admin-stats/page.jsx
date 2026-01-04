"use client";
import AdminPartners from "@/app/components/admin/AdminPartners";
import { API } from "@/app/config/api";
import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  Plus, 
  Edit3, 
  XCircle, 
  Activity, 
  Trophy, 
  Hash, 
  Layers, 
  ChevronRight,
  Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const AdminStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    icon: "",
    value: "",
    label: "",
    category: "general",
  });

  const fetchAllStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(API.Stats);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllStats(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      icon: item.icon,
      value: item.value,
      label: item.label,
      category: item.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Edit mode activated", { icon: '📝' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ icon: "", value: "", label: "", category: "general" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(isEditing ? "Updating data..." : "Adding data...");
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API.Stats}/${editId}` : API.Stats;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEditing ? "Statistic Updated!" : "New Stat Added!", { id: loadingToast });
        resetForm();
        fetchAllStats();
      }
    } catch (err) {
      toast.error("Operation failed", { id: loadingToast });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This statistic will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "1.25rem",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API.Stats}/${id}`, { method: "DELETE" });
        toast.success("Statistic deleted");
        fetchAllStats();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* --- Page Header --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="text-blue-600" size={32} />
            Stats Analytics
          </h2>
          <p className="text-slate-500 font-medium mt-1">Manage your platform metrics and company achievements</p>
        </div>
        
        {isEditing && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={resetForm} 
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95"
          >
            <XCircle size={18} /> Cancel Edit
          </motion.button>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* --- Form Card --- */}
        <motion.div 
          layout
          className={`p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border transition-all duration-500 ${isEditing ? 'bg-white border-blue-400 ring-4 ring-blue-50' : 'bg-white border-transparent'}`}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-3 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                <Layers size={14} /> Icon Name (Lucide)
              </label>
              <input name="icon" value={formData.icon} onChange={handleChange} placeholder="e.g. Activity" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                <Hash size={14} /> Value
              </label>
              <input name="value" value={formData.value} onChange={handleChange} placeholder="e.g. 500+" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-blue-600" required />
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                <Edit3 size={14} /> Label
              </label>
              <input name="label" value={formData.label} onChange={handleChange} placeholder="e.g. Happy Clients" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" required />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                <Trophy size={14} /> Category
              </label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium cursor-pointer">
                <option value="general">General Stat</option>
                <option value="achievement">Achievement</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className={`w-full py-4 rounded-2xl text-white font-black shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'}`}>
                {isEditing ? <><Edit3 size={18} /> Update</> : <><Plus size={18} /> Create</>}
              </button>
            </div>
          </form>
        </motion.div>

        {/* --- Table / Grid View --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
               <Loader2 className="animate-spin text-blue-600" size={40} />
               <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Database...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Statistic</th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Metric</th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px]">Type</th>
                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-[2px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {stats.map((item) => (
                      <motion.tr 
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-blue-50/40 transition-colors"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm text-blue-600 font-bold group-hover:scale-110 transition-transform">
                              {item.icon.substring(0,2)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{item.label}</p>
                              <p className="text-xs text-slate-400 font-medium">Icon ID: {item.icon}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 font-black text-xl text-blue-700 tracking-tight">
                          {item.value}
                        </td>
                        <td className="p-6">
                          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${item.category === 'achievement' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                            {item.category === 'achievement' ? <Trophy size={12} /> : <Activity size={12} />}
                            {item.category}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(item)} className="p-3 bg-white border border-slate-100 rounded-xl text-amber-500 hover:bg-amber-50 transition-colors shadow-sm">
                              <Edit3 size={18} />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-slate-100 rounded-xl text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                              <Trash2 size={18} />
                            </button>
                            <div className="flex items-center ml-2 text-slate-300">
                              <ChevronRight size={20} />
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {stats.length === 0 && (
                <div className="p-20 text-center">
                   <p className="text-slate-400 font-bold">No statistics found in the database.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- Partners Management Component --- */}
        <div className="mt-20">
           <AdminPartners />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;