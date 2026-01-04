"use client";

import { useEffect, useState } from "react";
import CaseForm from "./CaseForm";
import { API } from "@/app/config/api";
import { 
  Briefcase, Trash2, Edit3, Plus, 
  ExternalLink, Layers, Search, 
  FileText, Loader2 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedCaseStudiesAdmin() {
  const [cases, setCases] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchCases = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.featuredCaseStudies);
      const data = await res.json();
      setCases(data.data || []);
    } catch (error) {
      toast.error("Error fetching case studies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCases(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    const deleteToast = toast.loading("Deleting project...");
    try {
      await fetch(`${API.featuredCaseStudies}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted!", { id: deleteToast });
      fetchCases();
    } catch (err) {
      toast.error("Failed to delete", { id: deleteToast });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 font-sans">
      <Toaster position="top-right" />
      
      {/* Header section */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="text-indigo-600" /> Case <span className="text-indigo-600">Studies</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Design and showcase your finest success stories</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-black text-slate-600">
              TOTAL: {cases.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-10 space-y-12">
        {/* Form Section */}
        <section>
          <CaseForm refresh={fetchCases} editing={editing} clearEdit={() => setEditing(null)} />
        </section>

        {/* List Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Live Portfolio</h2>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
                <Loader2 className="animate-spin mx-auto text-indigo-600 mb-2" />
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Projects...</p>
              </div>
            ) : cases.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 font-bold tracking-tight text-lg">Empty Showroom</p>
                <p className="text-slate-400 text-sm">Add your first case study to get started.</p>
              </div>
            ) : (
              <AnimatePresence>
                {cases.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item._id} 
                    className="bg-white border border-slate-100 p-4 md:p-5 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-2xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all group"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-24 h-16 md:w-32 md:h-24 bg-slate-100 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-slate-50 relative group-hover:scale-105 transition-transform duration-500">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-black text-slate-800 truncate text-lg group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-1">
                           <ExternalLink size={12} /> {item.slug}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                      <button 
                        onClick={() => { setEditing(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex-1 md:flex-none p-3.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-2xl transition-all"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 md:flex-none p-3.5 bg-slate-50 hover:bg-rose-600 hover:text-white text-slate-600 rounded-2xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}