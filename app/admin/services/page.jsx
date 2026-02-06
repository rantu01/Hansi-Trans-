"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Plus, Trash2, Pencil, Loader2, Layers, Globe, Filter, X, Save, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { API } from "@/app/config/api";

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  // Modal এর জন্য State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchAllServices = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
      if (res.data.success) {
        setServices(res.data.data);
        setFilteredServices(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch services!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllServices(); }, []);

  useEffect(() => {
    let result = [...services];
    if (filterType === "main") {
      result = services.filter(s => !s.parentService);
    } else if (filterType === "sub") {
      result = services.filter(s => s.parentService);
    }
    setFilteredServices(result);
  }, [filterType, services]);

  // স্ল্যাগ জেনারেটর
  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  // ইমেজ আপলোড হ্যান্ডলার (মেইন ইমেজ এবং সাপোর্ট কার্ড ইমেজ উভয়ের জন্য)
  const handleImageUpload = async (file, index = null) => {
    if (!file) return;
    const token = localStorage.getItem("adminToken");
    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await res.json();

      if (result.url) {
        if (index !== null) {
          const updatedSupports = [...editingService.professionalSupports];
          updatedSupports[index].image = result.url;
          setEditingService({ ...editingService, professionalSupports: updatedSupports });
        } else {
          setEditingService({ ...editingService, image: result.url });
        }
        toast.success("Uploaded!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed!", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleSupportChange = (index, field, value) => {
    const updatedSupports = [...editingService.professionalSupports];
    updatedSupports[index][field] = value;
    setEditingService({ ...editingService, professionalSupports: updatedSupports });
  };

  const openEditModal = (service) => {
    // ডাটা ফরম্যাট ঠিক করা (যেমন: features অ্যারে কে স্ট্রিং এ রূপান্তর)
    setEditingService({ 
      ...service, 
      features: Array.isArray(service.features) ? service.features.join(", ") : service.features,
      // নিশ্চিত করা যে professionalSupports এ অন্তত ৩টি অবজেক্ট আছে
      professionalSupports: service.professionalSupports || [
        { title: "", description: "", image: "" },
        { title: "", description: "", image: "" },
        { title: "", description: "" , image: "" }
      ]
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const loadingToast = toast.loading("Updating service...");

    const dataToSend = {
      ...editingService,
      slug: generateSlug(editingService.slug),
      features: editingService.features ? editingService.features.split(",").map(f => f.trim()).filter(f => f !== "") : [],
      parentService: editingService.parentService || null,
      professionalSupports: editingService.professionalSupports.filter(s => s.title.trim() !== "")
    };

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${editingService._id}`, dataToSend);
      toast.success("Service updated successfully!", { id: loadingToast });
      setIsEditModalOpen(false);
      fetchAllServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!", { id: loadingToast });
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteService = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: 'rounded-[2rem] font-sans' }
    });

    if (result.isConfirmed) {
      const loadingToast = toast.loading("Deleting...");
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/delete/${id}`);
        toast.success("Service deleted!", { id: loadingToast });
        fetchAllServices(); 
      } catch (err) {
        toast.error("Delete failed.", { id: loadingToast });
      }
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Service Directory</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage main offerings and sub-services</p>
          </div>
          <Link href="/admin/services/add" className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl active:scale-95 font-bold">
            <Plus size={20} /> Add New Service
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 rounded-[1.8rem] shadow-sm border border-slate-50 gap-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-full sm:w-auto overflow-x-auto">
            {["all", "main", "sub"].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize whitespace-nowrap ${filterType === type ? "bg-white text-blue-600 shadow-md" : "text-slate-500 hover:text-slate-800"}`}
              >
                {type === 'all' ? `All Items (${services.length})` : type === 'main' ? 'Main' : 'Sub'}
              </button>
            ))}
          </div>
          <div className="text-slate-400 hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
            <Filter size={14} /> {filteredServices.length} Records
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-blue-500" size={48} />
              <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Syncing Database...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-[2px] font-black border-b border-slate-100">
                  <th className="py-6 px-8">Service Info</th>
                  <th className="py-6 px-8">Category Type</th>
                  <th className="py-6 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredServices.map((s) => (
                  <tr key={s._id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <img src={s.image || "https://via.placeholder.com/150"} alt={s.title} className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm" />
                        <div>
                          <span className="block font-bold text-slate-800 text-lg group-hover:text-blue-700">{s.title}</span>
                          <span className="text-xs font-medium text-slate-400 block">{s.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      {s.parentService ? (
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-blue-600 bg-blue-100/50 px-3 py-1.5 rounded-full uppercase">
                          <Layers size={12} /> Sub Service
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-100/50 px-3 py-1.5 rounded-full uppercase">
                          <Globe size={12} /> Global Main
                        </div>
                      )}
                    </td>
                    <td className="py-5 px-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openEditModal(s)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => deleteService(s._id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm transition-all border border-transparent hover:border-slate-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* --- QUICK EDIT MODAL (Expanded for Full Data) --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl my-8">
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Full Edit: {editingService?.title}</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Service Title</label>
                    <input required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold"
                      value={editingService?.title || ""} onChange={(e) => setEditingService({...editingService, title: e.target.value, slug: generateSlug(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Slug</label>
                    <input required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 outline-none"
                      value={editingService?.slug || ""} onChange={(e) => setEditingService({...editingService, slug: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Category Type</label>
                    <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      value={editingService?.parentService || ""} onChange={(e) => setEditingService({...editingService, parentService: e.target.value || null})}>
                      <option value="">Global Main Service</option>
                      {services.filter(s => !s.parentService && s._id !== editingService._id).map(s => (
                        <option key={s._id} value={s._id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Features (Comma Separated)</label>
                    <input className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none"
                      value={editingService?.features || ""} onChange={(e) => setEditingService({...editingService, features: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Main Banner Image</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-dashed">
                    <img src={editingService?.image} className="w-16 h-16 rounded-lg object-cover" />
                    <input type="file" onChange={(e) => handleImageUpload(e.target.files[0])} className="text-xs" />
                  </div>
                </div>

                {/* Support Cards Section */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Support Cards</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {editingService?.professionalSupports?.map((support, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <input placeholder="Title" className="w-full p-2 text-sm border rounded-lg" value={support.title} onChange={(e) => handleSupportChange(idx, "title", e.target.value)} />
                        <textarea placeholder="Desc" className="w-full p-2 text-xs border rounded-lg h-16" value={support.description} onChange={(e) => handleSupportChange(idx, "description", e.target.value)} />
                        <div className="flex items-center gap-2">
                           {support.image && <img src={support.image} className="w-10 h-10 rounded object-cover" />}
                           <label className="cursor-pointer p-2 bg-white border rounded-lg hover:bg-blue-50">
                              <Upload size={14} />
                              <input type="hidden" />
                              <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], idx)} />
                           </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={updateLoading || uploading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                    {updateLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    Update Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}