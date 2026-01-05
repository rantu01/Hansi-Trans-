"use client";

import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import { 
  Plus, Edit3, Trash2, Rocket, 
  Layers, Globe, CheckCircle2, X, Loader2, ArrowRightCircle, Settings, Wrench, Upload
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_STEP = {
  title: "",
  desc: "",
  icon: "",
  topIcon: "",
};

const EMPTY_STUDIO = {
  code: "",
  name: "",
  lang: "",
};

const EMPTY_TOOL = {
  name: "",
  image: "",
};

export default function WorkProcessAdmin() {
  const [steps, setSteps] = useState([]);
  const [studios, setStudios] = useState([]);
  const [tools, setTools] = useState([]);

  const [stepForm, setStepForm] = useState(EMPTY_STEP);
  const [studioForm, setStudioForm] = useState(EMPTY_STUDIO);
  const [toolForm, setToolForm] = useState(EMPTY_TOOL);

  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingStudioIndex, setEditingStudioIndex] = useState(null);
  const [editingToolIndex, setEditingToolIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ইমেজ আপলোড স্টেট

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const res = await fetch(API.WorkProcess, { cache: "no-store" });
      const data = await res.json();
      setSteps(Array.isArray(data.steps) ? data.steps : []);
      setStudios(Array.isArray(data.studios) ? data.studios : []);
      setTools(Array.isArray(data.tools) ? data.tools : []);
    } catch (err) {
      toast.error("Failed to load data from server");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= IMAGE UPLOAD LOGIC ================= */
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading("Uploading image...");
    
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      const data = await res.json();
      if (data.url) {
        setToolForm({ ...toolForm, image: data.url });
        toast.success("Image uploaded!", { id: toastId });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      toast.error("Upload failed. Try again.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  /* ================= SAVE LOGIC ================= */
  const saveAll = async (newSteps, newStudios, newTools) => {
    setLoading(true);
    const loadingToast = toast.loading("Syncing with server...");

    try {
      const res = await fetch(API.WorkProcess, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          steps: newSteps, 
          studios: newStudios, 
          tools: newTools 
        }),
      });

      if (res.ok) {
        toast.success("Changes saved successfully!", { id: loadingToast });
        await fetchData();
      } else {
        toast.error("Update failed.", { id: loadingToast });
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
    if (editingStepIndex !== null) updated[editingStepIndex] = stepForm;
    else updated.push(stepForm);
    await saveAll(updated, studios, tools);
    setStepForm(EMPTY_STEP);
    setEditingStepIndex(null);
  };

  const handleStudioSubmit = async (e) => {
    e.preventDefault();
    const updated = [...studios];
    if (editingStudioIndex !== null) updated[editingStudioIndex] = studioForm;
    else updated.push(studioForm);
    await saveAll(steps, updated, tools);
    setStudioForm(EMPTY_STUDIO);
    setEditingStudioIndex(null);
  };

  const handleToolSubmit = async (e) => {
    e.preventDefault();
    const updated = [...tools];
    if (editingToolIndex !== null) updated[editingToolIndex] = toolForm;
    else updated.push(toolForm);
    await saveAll(steps, studios, updated);
    setToolForm(EMPTY_TOOL);
    setEditingToolIndex(null);
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
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === 'step') saveAll(steps.filter((_, i) => i !== index), studios, tools);
        else if (type === 'studio') saveAll(steps, studios.filter((_, i) => i !== index), tools);
        else if (type === 'tool') saveAll(steps, studios, tools.filter((_, i) => i !== index));
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-gray-900">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black text-white rounded-2xl shadow-lg">
              <Layers size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Work Process</h1>
              <p className="text-gray-500 font-medium text-sm">Design and manage your agency's workflow</p>
            </div>
          </div>
        </header>

        {/* ================= STEPS SECTION ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Rocket className="text-blue-500" size={20} /> Process Architecture
            </h2>
          </div>

          <form onSubmit={handleStepSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-8 rounded-[2rem] border bg-white ${editingStepIndex !== null ? "bg-blue-50 border-blue-200" : "border-gray-100 shadow-sm"}`}>
            <input placeholder="Title" className="bg-gray-50 p-3.5 rounded-xl outline-none font-bold text-lg md:col-span-2" value={stepForm.title} onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })} required />
            <textarea placeholder="Description" className="bg-gray-50 p-3.5 rounded-xl outline-none font-medium md:col-span-2 min-h-[80px]" value={stepForm.desc} onChange={(e) => setStepForm({ ...stepForm, desc: e.target.value })} required />
            <input placeholder="Main Icon (Search, Users, Layers, Rocket)" className="bg-gray-50 p-3.5 rounded-xl outline-none font-medium" value={stepForm.icon} onChange={(e) => setStepForm({ ...stepForm, icon: e.target.value })} />
            <input placeholder="Top Icon (Sparkles, Rocket, etc)" className="bg-gray-50 p-3.5 rounded-xl outline-none font-medium" value={stepForm.topIcon} onChange={(e) => setStepForm({ ...stepForm, topIcon: e.target.value })} />
            
            <button disabled={loading} className="md:col-span-2 py-4 rounded-xl font-black text-white bg-black hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <Plus size={18}/>}
              {editingStepIndex !== null ? "Update Step" : "Add New Step"}
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 rounded-[1.5rem] shadow-sm group">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold">{s.title}</h3>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => { setEditingStepIndex(i); setStepForm(s); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={16} /></button>
                    <button onClick={() => confirmDelete('step', i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TOOLS SECTION (IMAGE UPLOAD ADDED) ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Wrench className="text-purple-500" size={20} /> Tools & Technology
            </h2>
          </div>

          <form onSubmit={handleToolSubmit} className={`p-6 rounded-[1.5rem] border bg-white shadow-sm space-y-4 ${editingToolIndex !== null ? "bg-purple-50 border-purple-200" : "border-gray-100"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Tool Name</label>
                <input placeholder="e.g. Adobe Audition" className="w-full bg-gray-50 p-3 rounded-xl outline-none font-medium" value={toolForm.name} onChange={(e) => setToolForm({ ...toolForm, name: e.target.value })} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Upload Icon</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-50 p-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-all">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">{uploading ? "Uploading..." : "Select Image"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0])} disabled={uploading} />
                  </label>
                  {toolForm.image && (
                    <div className="relative w-12 h-12 rounded-xl border overflow-hidden bg-white">
                      <img src={toolForm.image} alt="Preview" className="w-full h-full object-contain" />
                      <button type="button" onClick={() => setToolForm({...toolForm, image: ""})} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5"><X size={10}/></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button disabled={loading || uploading} className="w-full py-3 rounded-xl font-black text-white bg-black hover:bg-gray-800 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95">
              {editingToolIndex !== null ? "Update Tool" : "Integrate Tool"}
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {tools.map((tool, i) => (
              <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-center group relative hover:border-purple-300 transition-all">
                <div className="aspect-square bg-gray-50 rounded-xl mb-2 flex items-center justify-center overflow-hidden">
                  {tool.image ? <img src={tool.image} className="w-full h-full object-contain p-2" /> : <Settings className="text-gray-300" />}
                </div>
                <h4 className="text-[11px] font-bold text-gray-800 uppercase truncate">{tool.name}</h4>
                <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all bg-white/90 p-1 rounded-lg shadow-sm border">
                  <button onClick={() => {setEditingToolIndex(i); setToolForm(tool);}} className="text-blue-500 p-1 hover:bg-blue-50 rounded"><Edit3 size={12}/></button>
                  <button onClick={() => confirmDelete('tool', i)} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STUDIOS SECTION ================= */}
        <section className="pb-20 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Globe className="text-emerald-500" size={20} /> Global Studios
            </h2>
          </div>

          <form onSubmit={handleStudioSubmit} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[1.5rem] border bg-white ${editingStudioIndex !== null ? "bg-emerald-50 border-emerald-200" : "border-gray-100 shadow-sm"}`}>
            <input placeholder="Code (e.g. JP)" className="bg-gray-50 p-3 rounded-xl outline-none font-bold" value={studioForm.code} onChange={(e) => setStudioForm({ ...studioForm, code: e.target.value })} required />
            <input placeholder="Studio Name" className="bg-gray-50 p-3 rounded-xl outline-none font-medium" value={studioForm.name} onChange={(e) => setStudioForm({ ...studioForm, name: e.target.value })} required />
            <input placeholder="Language" className="bg-gray-50 p-3 rounded-xl outline-none font-medium" value={studioForm.lang} onChange={(e) => setStudioForm({ ...studioForm, lang: e.target.value })} required />
            <button disabled={loading} className="py-3 rounded-xl font-black text-white bg-black hover:bg-gray-800 shadow-lg flex items-center justify-center gap-2">
              {editingStudioIndex !== null ? "Update" : "Add Studio"}
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studios.map((st, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-black text-xs">{st.code}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-none">{st.name}</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">{st.lang}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <button onClick={() => { setEditingStudioIndex(i); setStudioForm(st); }} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit3 size={14} /></button>
                  <button onClick={() => confirmDelete('studio', i)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}