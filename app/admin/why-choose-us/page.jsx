"use client";

import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import { 
  Plus, Edit3, Trash2, ShieldCheck, 
  Settings, Zap, Layers, Info, 
  Save, X, Loader2, Sparkles, LayoutGrid
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

export default function WhyChooseUsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    key: "",
    title: "",
    description: "",
    icon: "",
    badge: "",
  });
  const [editingKey, setEditingKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  /* ---------------- FETCH DATA ---------------- */
  const fetchItems = async () => {
    try {
      const res = await fetch(API.WhyChooseUs, { cache: "no-store" });
      const data = await res.json();
      setItems(data?.cards || []);
    } catch (err) {
      toast.error("Failed to load cards.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadToast = toast.loading(editingKey ? "Updating card..." : "Adding new card...");

    const updatedCards = editingKey
      ? items.map((card) => (card.key === editingKey ? form : card))
      : [...items, form];

    try {
      const res = await fetch(API.WhyChooseUs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cards: updatedCards }),
      });

      if (res.ok) {
        toast.success(editingKey ? "Card Updated!" : "Card Added!", { id: loadToast });
        setForm({ key: "", title: "", description: "", icon: "", badge: "" });
        setEditingKey(null);
        fetchItems();
      } else {
        toast.error("Operation failed", { id: loadToast });
      }
    } catch (err) {
      toast.error("Network error", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (key) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This card will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete!",
      borderRadius: "1rem",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`${API.WhyChooseUs}/${key}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Card removed successfully");
        fetchItems();
      } catch (err) {
        toast.error("Could not delete.");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingKey(item.key);
    setForm({ ...item, badge: item.badge || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Editing mode active", { icon: "✍️" });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] p-4 md:p-10 font-sans text-slate-900">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800">Why Choose Us</h1>
              <p className="text-slate-500 font-medium italic">Manage your unique value propositions</p>
            </div>
          </div>
          
          {editingKey && (
            <button 
              onClick={() => { setEditingKey(null); setForm({ key: "", title: "", description: "", icon: "", badge: "" }); }}
              className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold flex items-center gap-2 hover:bg-rose-100 transition-all border border-rose-100"
            >
              <X size={18} /> Cancel Edit
            </button>
          )}
        </header>

        {/* FORM SECTION */}
        <motion.div 
          layout
          className={`p-8 rounded-[2.5rem] border-2 transition-all ${
            editingKey ? "bg-white border-indigo-200 shadow-2xl shadow-indigo-50" : "bg-white border-slate-50 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2 mb-8">
             <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
             <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
               {editingKey ? "Modify Value Proposition" : "Add New Strategy Card"}
             </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Position Key</label>
              <input
                placeholder="e.g. left, middle, right"
                className="modern-input"
                value={form.key}
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                required
                disabled={!!editingKey}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Icon Reference</label>
              <div className="relative">
                <input
                  placeholder="Lucide Icon (e.g. Zap)"
                  className="modern-input"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  required
                />
                <Sparkles className="absolute right-4 top-4 text-slate-300" size={18} />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Main Heading</label>
              <input
                placeholder="Enter a compelling title..."
                className="modern-input !text-lg !font-bold"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Core Description</label>
              <textarea
                placeholder="Write a short but effective description..."
                className="modern-input min-h-[120px] resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-1 space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Optional Badge</label>
              <input
                placeholder="e.g. High Performance"
                className="modern-input"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-white flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
                  loading ? "bg-slate-300" : (editingKey ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100" : "bg-slate-900 hover:bg-black shadow-slate-200")
                }`}
              >
                {loading ? <Loader2 className="animate-spin" /> : (editingKey ? <Save size={20}/> : <Plus size={20}/>)}
                {editingKey ? "Update Proposition" : "Deploy Strategy Card"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* LIST SECTION */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Active Propositions ({items.length})</h3>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-slate-100 p-6 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center gap-6 group hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
                >
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl flex items-center justify-center transition-all duration-500">
                    <LayoutGrid size={28} />
                  </div>

                  <div className="flex-grow space-y-1">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                        Key: {item.key}
                      </span>
                      {item.badge && (
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-indigo-100">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {item.title.replace('<br />', ' ')}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-3xl font-medium">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 pt-2 uppercase tracking-tighter">
                      <Zap size={12}/> Icon: {item.icon}
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 p-3 bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.key)}
                      className="flex-1 p-3 bg-slate-50 text-slate-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {items.length === 0 && (
              <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-[3rem]">
                <Info className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active propositions found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-input {
          width: 100%;
          padding: 14px 18px;
          background: #f8fafc;
          border: 2px solid transparent;
          border-radius: 16px;
          outline: none;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }
        .modern-input:focus {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.1);
        }
        .modern-input::placeholder {
          color: #cbd5e1;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}