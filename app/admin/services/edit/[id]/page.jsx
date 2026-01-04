"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইমপোর্ট করা হয়েছে

export default function EditServicePage() {
  const router = useRouter();
  const { id } = useParams();
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [mainServices, setMainServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    bgColor: "bg-[#e0f2fe]",
    features: "",
    parentService: "",
    professionalSupports: [
      { title: "", description: "", image: "" },
      { title: "", description: "", image: "" },
      { title: "", description: "", image: "" }
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
        const mains = servicesRes.data.data.filter(s => !s.parentService && s._id !== id);
        setMainServices(mains);

        const currentData = servicesRes.data.data.find(item => item._id === id);

        if (currentData) {
          setFormData({
            title: currentData.title || "",
            slug: currentData.slug || "",
            description: currentData.description || "",
            image: currentData.image || "",
            bgColor: currentData.bgColor || "bg-[#e0f2fe]",
            features: currentData.features ? currentData.features.join(", ") : "",
            parentService: currentData.parentService || "",
            professionalSupports: currentData.professionalSupports && currentData.professionalSupports.length > 0 
              ? currentData.professionalSupports 
              : [{ title: "", description: "", image: "" }, { title: "", description: "", image: "" }, { title: "", description: "", image: "" }],
          });
          setPreview(currentData.image || "");
        }
      } catch (err) {
        toast.error("Failed to load service data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageUpload = async (file, index = null) => {
    if (!file) return;
    
    // ফাইল সাইজ ভ্যালিডেশন
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be less than 2MB");
    }

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
          const updatedSupports = [...formData.professionalSupports];
          updatedSupports[index].image = result.url;
          setFormData({ ...formData, professionalSupports: updatedSupports });
        } else {
          setFormData({ ...formData, image: result.url });
          setPreview(result.url);
        }
        toast.success("Image uploaded successfully!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Image upload failed!", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleSupportChange = (index, field, value) => {
    const updatedSupports = [...formData.professionalSupports];
    updatedSupports[index][field] = value;
    setFormData({ ...formData, professionalSupports: updatedSupports });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Main image is required");
    
    setSaveLoading(true);
    const loadingToast = toast.loading("Updating service...");

    const dataToSend = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      parentService: formData.parentService || null,
      professionalSupports: formData.professionalSupports.filter(s => s.title.trim() !== "")
    };

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${id}`, dataToSend);
      toast.success("Service Updated Successfully! ✨", { id: loadingToast });
      setTimeout(() => router.push("/admin/services"), 1500);
    } catch (err) {
      toast.error("Error updating service", { id: loadingToast });
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-gray-500 font-medium animate-pulse">Fetching Service Data...</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-[#1a1a1a]">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-4xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition w-fit text-sm">
          <ArrowLeft size={18} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
          {/* Main Service Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Edit Service</h2>
              <p className="text-gray-400 text-sm">Update core details and main banner</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <InputGroup label="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Parent Service</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer" 
                  value={formData.parentService} onChange={e => setFormData({...formData, parentService: e.target.value})}>
                  <option value="">None (Main Service)</option>
                  {mainServices.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                </select>
              </div>
              <InputGroup label="Features (Comma separated)" value={formData.features} placeholder="Cloud, Security, Support" onChange={e => setFormData({...formData, features: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
              <textarea required value={formData.description} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-24 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" 
                onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="bg-blue-50/50 p-5 rounded-2xl border border-dashed border-blue-200 flex items-center gap-6">
               <div className="relative w-32 h-20 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-white shrink-0">
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  {uploading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin text-white" size={18} /></div>}
               </div>
               <div className="space-y-2">
                  <input type="file" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                    onChange={(e) => handleImageUpload(e.target.files[0])} />
                  <p className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Change Main Banner Image</p>
               </div>
            </div>
          </div>

          {/* Professional Support Cards Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              Professional Support Cards
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formData.professionalSupports.map((support, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 hover:border-blue-200 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Support Card 0{index + 1}</span>
                  <input 
                    placeholder="Title" 
                    className="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-400 transition"
                    value={support.title}
                    onChange={(e) => handleSupportChange(index, "title", e.target.value)}
                  />
                  <textarea 
                    placeholder="Brief description..." 
                    className="w-full p-2 text-xs bg-white border border-gray-200 rounded-lg h-16 outline-none resize-none focus:ring-1 focus:ring-blue-400"
                    value={support.description}
                    onChange={(e) => handleSupportChange(index, "description", e.target.value)}
                  />
                  <div className="space-y-3">
                    {support.image && <img src={support.image} className="w-full h-20 object-cover rounded-lg border border-white shadow-sm" />}
                    <label className="flex items-center justify-center w-full py-2 bg-white border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition group">
                        <Upload size={14} className="text-gray-400 group-hover:text-blue-500 mr-2" />
                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600 uppercase">Upload Icon</span>
                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], index)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={saveLoading || uploading} 
            className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-[0.98] ${saveLoading || uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0066b2] hover:bg-blue-700 text-white shadow-blue-200"}`}
          >
            {saveLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saveLoading ? "Saving Changes..." : "Update Everything"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component for cleaner UI
const InputGroup = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</label>
    <input 
      required 
      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-gray-300" 
      {...props} 
    />
  </div>
);