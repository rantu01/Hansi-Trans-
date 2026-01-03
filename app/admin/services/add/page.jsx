"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddServicePage() {
  const router = useRouter();
  const [mainServices, setMainServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    bgColor: "bg-[#e0f2fe]",
    features: "",
    parentService: "",
  });

  useEffect(() => {
    // শুধুমাত্র মেইন সার্ভিসগুলো আনা হচ্ছে ড্রপডাউনের জন্য
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`)
      .then(res => {
        const mains = res.data.data.filter(s => !s.parentService);
        setMainServices(mains);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      parentService: formData.parentService || null
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
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition">
          <ArrowLeft size={18} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold mb-4">Create New Service</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
                onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
                placeholder="voice-over" onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Parent Service (Optional)</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              onChange={e => setFormData({...formData, parentService: e.target.value})}>
              <option value="">None (It's a Main Service)</option>
              {mainServices.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              onChange={e => setFormData({...formData, image: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features (Comma separated)</label>
            <input className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              placeholder="High Quality, Native, Pro" onChange={e => setFormData({...formData, features: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea required className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-32" 
              onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <button className="w-full bg-[#0066b2] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2">
            <Save size={18} /> Save Service
          </button>
        </form>
      </div>
    </div>
  );
}