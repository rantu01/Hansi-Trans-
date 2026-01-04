"use client";

import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import { 
  Plus, Edit3, Trash2, Rocket, Briefcase, 
  Layers, Globe, CheckCircle2, X, Loader2, ArrowRightCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_STEP = {
  key: "",
  title: "",
  description: "",
  icon: "",
  iconPosition: "bottom",
};

const EMPTY_STUDIO = {
  code: "",
  name: "",
  language: "",
};

export default function WorkProcessAdmin() {
  const [steps, setSteps] = useState([]);
  const [studios, setStudios] = useState([]);

  const [stepForm, setStepForm] = useState(EMPTY_STEP);
  const [studioForm, setStudioForm] = useState(EMPTY_STUDIO);

  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingStudioIndex, setEditingStudioIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const res = await fetch(API.WorkProcess, { cache: "no-store" });
      const data = await res.json();
      setSteps(Array.isArray(data.steps) ? data.steps : []);
      setStudios(Array.isArray(data.studios) ? data.studios : []);
    } catch (err) {
      toast.error("Failed to load data from server");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SAVE LOGIC ================= */
  const saveAll = async (newSteps, newStudios) => {
    setLoading(true);
    const loadingToast = toast.loading("Syncing with server...");

    try {
      const res = await fetch(API.WorkProcess, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ steps: newSteps, studios: newStudios }),
      });

      if (res.ok) {
        toast.success("Changes saved successfully!", { id: loadingToast });
        await fetchData();
      } else {
        toast.error("Update failed. Check permissions.", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Network error occurred.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */
  const handleStepSubmit = async (e) => {
    e.preventDefault();
    const updated = [...steps];
    if (editingStepIndex !== null) {
      updated[editingStepIndex] = stepForm;
    } else {
      updated.push(stepForm);
    }
    await saveAll(updated, studios);
    setStepForm(EMPTY_STEP);
    setEditingStepIndex(null);
  };

  const handleStudioSubmit = async (e) => {
    e.preventDefault();
    const updated = [...studios];
    if (editingStudioIndex !== null) {
      updated[editingStudioIndex] = studioForm;
    } else {
      updated.push(studioForm);
    }
    await saveAll(steps, updated);
    setStudioForm(EMPTY_STUDIO);
    setEditingStudioIndex(null);
  };

  const confirmDelete = (type, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      borderRadius: '15px'
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'step') {
          const updated = steps.filter((_, i) => i !== index);
          saveAll(updated, studios);
        } else {
          const updated = studios.filter((_, i) => i !== index);
          saveAll(steps, updated);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black text-white rounded-2xl shadow-lg">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Work Process</h1>
              <p className="text-gray-500 font-medium text-sm">Design and manage your agency's workflow</p>
            </div>
          </div>
        </header>

        {/* ================= STEPS SECTION ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Rocket className="text-blue-500" size={20} /> Process Architecture
            </h2>
            {editingStepIndex !== null && (
              <button 
                onClick={() => {setEditingStepIndex(null); setStepForm(EMPTY_STEP);}}
                className="text-sm font-bold text-red-500 flex items-center gap-1 hover:underline"
              >
                <X size={14} /> Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleStepSubmit}
            className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-8 rounded-[2rem] border transition-all duration-300 ${
              editingStepIndex !== null ? "bg-blue-50 border-blue-200 shadow-xl shadow-blue-100" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Process Key</label>
              <input
                placeholder="e.g. strategy-01"
                className="w-full border-none bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={stepForm.key}
                onChange={(e) => setStepForm({ ...stepForm, key: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Icon Reference</label>
              <input
                placeholder="Lucide Icon name (e.g. Code)"
                className="w-full border-none bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={stepForm.icon}
                onChange={(e) => setStepForm({ ...stepForm, icon: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Display Title</label>
              <input
                placeholder="What is this step called?"
                className="w-full border-none bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg"
                value={stepForm.title}
                onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Workflow Description</label>
              <textarea
                placeholder="Explain the internal mechanics of this process..."
                className="w-full border-none bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium min-h-[100px]"
                value={stepForm.description}
                onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Visual Alignment</label>
              <select
                className="w-full border-none bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                value={stepForm.iconPosition}
                onChange={(e) => setStepForm({ ...stepForm, iconPosition: e.target.value })}
              >
                <option value="top">Floating Top</option>
                <option value="bottom">Anchor Bottom</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                  loading ? "bg-gray-300" : (editingStepIndex !== null ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200" : "bg-black hover:bg-gray-800 shadow-gray-200")
                }`}
              >
                {loading ? <Loader2 className="animate-spin" /> : (editingStepIndex !== null ? <CheckCircle2 size={18}/> : <Plus size={18}/>)}
                {editingStepIndex !== null ? "Update Process Step" : "Integrate New Step"}
              </button>
            </div>
          </form>

          {/* List Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {steps.map((s, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className="bg-white border border-gray-100 p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-600 px-3 py-1 rounded-full tracking-tighter border border-blue-100">
                        {s.key}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingStepIndex(i); setStepForm(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => confirmDelete('step', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{s.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <ArrowRightCircle size={14} className="text-gray-300" />
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{s.icon}</span>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 italic">Pos: {s.iconPosition}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ================= STUDIOS SECTION ================= */}
        <section className="pb-20 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Globe className="text-emerald-500" size={20} /> Global Studios
            </h2>
          </div>

          <form
            onSubmit={handleStudioSubmit}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[1.5rem] border transition-all ${
               editingStudioIndex !== null ? "bg-emerald-50 border-emerald-200" : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <input
              placeholder="Code (e.g. JP)"
              className="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              value={studioForm.code}
              onChange={(e) => setStudioForm({ ...studioForm, code: e.target.value })}
              required
            />
            <input
              placeholder="Studio Name"
              className="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              value={studioForm.name}
              onChange={(e) => setStudioForm({ ...studioForm, name: e.target.value })}
              required
            />
            <input
              placeholder="Language"
              className="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              value={studioForm.language}
              onChange={(e) => setStudioForm({ ...studioForm, language: e.target.value })}
              required
            />

            <button
              disabled={loading}
              className={`py-3 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                loading ? "bg-gray-300" : (editingStudioIndex !== null ? "bg-emerald-600 shadow-emerald-100" : "bg-black shadow-gray-200")
              } shadow-lg`}
            >
              {editingStudioIndex !== null ? "Update" : "Add Studio"}
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studios.map((st, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-black text-xs">
                    {st.code}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none">{st.name}</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">{st.language}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => { setEditingStudioIndex(i); setStudioForm(st); }}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => confirmDelete('studio', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}