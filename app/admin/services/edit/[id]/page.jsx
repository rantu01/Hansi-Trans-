"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

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
    // Professional Support এর জন্য ডাটা
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
            // যদি ডাটাবেজে professionalSupports থাকে তবে সেটি সেট হবে, নাহলে ৩টি খালি অবজেক্ট
            professionalSupports: currentData.professionalSupports && currentData.professionalSupports.length > 0 
              ? currentData.professionalSupports 
              : [{ title: "", description: "", image: "" }, { title: "", description: "", image: "" }, { title: "", description: "", image: "" }],
          });
          setPreview(currentData.image || "");
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ইমেজ আপলোড ফাংশন (মেইন এবং সাপোর্ট কার্ড উভয়ের জন্য)
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
          setPreview(result.url);
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
    if (!formData.image) return alert("Image is required");
    
    setSaveLoading(true);
    const dataToSend = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      parentService: formData.parentService || null,
      // শুধু সেগুলোই পাঠানো হবে যেগুলোতে অন্তত টাইটেল আছে
      professionalSupports: formData.professionalSupports.filter(s => s.title.trim() !== "")
    };

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${id}`, dataToSend);
      alert("Service Updated Successfully!");
      router.push("/admin/services");
    } catch (err) {
      alert("Error updating service");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-gray-500 font-medium">Fetching Service Data...</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition w-fit text-sm">
          <ArrowLeft size={18} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Service Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Edit Service</h2>
              <p className="text-gray-400 text-sm">Update core details and main banner</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title</label>
                <input required value={formData.title} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Slug</label>
                <input required value={formData.slug} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  onChange={e => setFormData({...formData, slug: e.target.value})} />
              </div>
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
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Features</label>
                <input value={formData.features} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="Feature 1, Feature 2" onChange={e => setFormData({...formData, features: e.target.value})} />
              </div>
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
                  <input type="file" accept="image/*" className="text-xs" onChange={(e) => handleImageUpload(e.target.files[0])} />
                  <p className="text-[10px] text-blue-400 uppercase font-bold">Change Main Image</p>
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
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                  <span className="text-[10px] font-bold text-gray-400">SUPPORT CARD 0{index + 1}</span>
                  <input 
                    placeholder="Title" 
                    className="w-full p-2 text-sm bg-white border rounded-lg outline-none focus:ring-1 focus:ring-blue-400"
                    value={support.title}
                    onChange={(e) => handleSupportChange(index, "title", e.target.value)}
                  />
                  <textarea 
                    placeholder="Description" 
                    className="w-full p-2 text-xs bg-white border rounded-lg h-16 outline-none resize-none"
                    value={support.description}
                    onChange={(e) => handleSupportChange(index, "description", e.target.value)}
                  />
                  <div className="space-y-2">
                    {support.image && <img src={support.image} className="w-full h-20 object-cover rounded-lg border shadow-sm" />}
                    <input 
                      type="file" 
                      className="text-[10px] w-full" 
                      onChange={(e) => handleImageUpload(e.target.files[0], index)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={saveLoading || uploading} 
            className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-[0.98] ${saveLoading || uploading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0066b2] hover:bg-blue-700 text-white"}`}
          >
            {saveLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {saveLoading ? "Saving Changes..." : "Update Everything"}
          </button>
        </form>
      </div>
    </div>
  );
}