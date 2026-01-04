"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইমপোর্ট

export default function AddServicePage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const [mainServices, setMainServices] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
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
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`)
      .then(res => {
        const mains = res.data.data.filter(s => !s.parentService);
        setMainServices(mains);
      })
      .catch(() => toast.error("Failed to load services list"));
  }, []);

  const handleImageUpload = async (file, index = null) => {
    if (!file) return;

    // ফাইল সাইজ চেক (২ এমবি)
    if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image size too large! Max 2MB allowed.");
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
    if (!formData.image) return toast.error("Main image is required!");

    setLoading(true);
    const loadingToast = toast.loading("Publishing service...");

    const dataToSend = {
      ...formData,
      features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
      parentService: formData.parentService || null,
      professionalSupports: formData.professionalSupports.filter(s => s.title.trim() !== "")
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/add`, dataToSend);
      toast.success("New Service Added! ✨", { id: loadingToast });
      setTimeout(() => router.push("/admin/services"), 1500);
    } catch (err) {
      toast.error("Error adding service", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition text-sm w-fit">
          <ArrowLeft size={16} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
          {/* Basic Information */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Service Title" placeholder="e.g. Translation" onChange={e => setFormData({...formData, title: e.target.value})} />
              <InputGroup label="Slug" placeholder="translation-service" onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Parent Service</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition" 
                  onChange={e => setFormData({...formData, parentService: e.target.value})}>
                  <option value="">Main Service (None)</option>
                  {mainServices.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                </select>
              </div>
              <InputGroup label="Features (Comma separated)" placeholder="Feature 1, Feature 2" onChange={e => setFormData({...formData, features: e.target.value})} />
            </div>

            <div>
              <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Description</label>
              <textarea required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" 
                onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-dashed border-blue-200">
              <label className="block text-blue-600 text-[10px] uppercase tracking-widest font-bold mb-4">Main Service Banner</label>
              <div className="flex items-center gap-6">
                <input type="file" accept="image/*" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" 
                    onChange={(e) => handleImageUpload(e.target.files[0])} />
                {preview && <img src={preview} className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-sm" />}
              </div>
            </div>
          </div>

          {/* Professional Support Cards */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              Professional Support Cards (Max 3)
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {formData.professionalSupports.map((support, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 hover:border-blue-200 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400">CARD 0{index + 1}</span>
                  <input 
                    placeholder="Title" 
                    className="w-full p-2 bg-white text-sm border rounded-lg outline-none focus:ring-1 focus:ring-blue-400 transition"
                    value={support.title}
                    onChange={(e) => handleSupportChange(index, "title", e.target.value)}
                  />
                  <textarea 
                    placeholder="Description..." 
                    className="w-full p-2 bg-white text-xs border rounded-lg h-16 outline-none focus:ring-1 focus:ring-blue-400 transition resize-none"
                    value={support.description}
                    onChange={(e) => handleSupportChange(index, "description", e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 block uppercase">Icon/Image</label>
                    <label className="flex items-center justify-center w-full py-2 bg-white border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition group">
                        <Upload size={14} className="text-gray-400 group-hover:text-blue-500 mr-2" />
                        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600">UPLOAD</span>
                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], index)} />
                    </label>
                    {support.image && <img src={support.image} className="w-full h-20 object-cover rounded-lg mt-2 border border-white shadow-sm" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={uploading || loading} 
            className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all shadow-xl active:scale-95 ${uploading || loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0066b2] hover:bg-blue-700 text-white shadow-blue-200"}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            {loading ? "Publishing..." : uploading ? "Wait, Uploading..." : "Publish Everything"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
const InputGroup = ({ label, ...props }) => (
    <div>
      <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">{label}</label>
      <input 
        required 
        className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:text-gray-300" 
        {...props} 
      />
    </div>
);