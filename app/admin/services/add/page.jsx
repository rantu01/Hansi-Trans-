"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

export default function AddServicePage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const [mainServices, setMainServices] = useState([]);
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
    // Professional Support এর জন্য নতুন ফিল্ড
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
      });
  }, []);

  // মেইন ইমেজ এবং সাপোর্ট ইমেজের জন্য কমন আপলোড লজিক
  const handleImageUpload = async (file, index = null) => {
    if (!file) return;
    setUploading(true);

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
          // সাপোর্ট কার্ডের ইমেজ আপডেট
          const updatedSupports = [...formData.professionalSupports];
          updatedSupports[index].image = result.url;
          setFormData({ ...formData, professionalSupports: updatedSupports });
        } else {
          // মেইন ইমেজ আপডেট
          setFormData({ ...formData, image: result.url });
          setPreview(URL.createObjectURL(file));
        }
      }
    } catch (err) {
      alert("Image upload failed!");
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
    if (!formData.image) return alert("Please upload a main image first");

    const dataToSend = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      parentService: formData.parentService || null,
      // খালি সাপোর্ট কার্ডগুলো ফিল্টার করে বাদ দেওয়া (যদি প্রয়োজন হয়)
      professionalSupports: formData.professionalSupports.filter(s => s.title !== "")
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/add`, dataToSend);
      alert("Service Published!");
      router.push("/admin/services");
    } catch (err) {
      alert("Error adding service");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition text-sm">
          <ArrowLeft size={16} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Service Title</label>
                <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Slug</label>
                <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  placeholder="voice-over" onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Parent Service</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" 
                  onChange={e => setFormData({...formData, parentService: e.target.value})}>
                  <option value="">Main Service (None)</option>
                  {mainServices.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Features (Comma separated)</label>
                <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none" 
                  placeholder="Native, 24h Delivery, Pro Studio" onChange={e => setFormData({...formData, features: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Description</label>
              <textarea required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-24 outline-none" 
                onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            {/* Main Image Upload */}
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-dashed border-blue-200">
              <label className="block text-blue-600 text-[10px] uppercase tracking-widest font-bold mb-4">Main Service Banner</label>
              <div className="flex items-center gap-6">
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0])} />
                {preview && <img src={preview} className="w-20 h-20 object-cover rounded-xl border" />}
              </div>
            </div>
          </div>

          {/* Professional Support Cards Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
              Professional Support Cards (Max 3)
            </h2>
            <p className="text-xs text-gray-400">These will appear in the Professional Support Services section on the service page.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {formData.professionalSupports.map((support, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400">CARD 0{index + 1}</span>
                  </div>
                  <input 
                    placeholder="Card Title" 
                    className="w-full p-2 bg-white text-sm border rounded-lg outline-none"
                    value={support.title}
                    onChange={(e) => handleSupportChange(index, "title", e.target.value)}
                  />
                  <textarea 
                    placeholder="Description..." 
                    className="w-full p-2 bg-white text-xs border rounded-lg h-16 outline-none"
                    value={support.description}
                    onChange={(e) => handleSupportChange(index, "description", e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 block uppercase">Card Image</label>
                    <input 
                      type="file" 
                      className="text-[10px]" 
                      onChange={(e) => handleImageUpload(e.target.files[0], index)} 
                    />
                    {support.image && <img src={support.image} className="w-full h-20 object-cover rounded-lg mt-2" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={uploading} 
            className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all shadow-xl active:scale-95 ${uploading ? "bg-gray-400" : "bg-[#0066b2] hover:bg-blue-700 text-white"}`}
          >
            {uploading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            {uploading ? "Wait, Image Uploading..." : "Publish Everything"}
          </button>
        </form>
      </div>
    </div>
  );
}