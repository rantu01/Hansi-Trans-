"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditServicePage() {
  const router = useRouter();
  const { id } = useParams(); // URL থেকে আইডি নেওয়া হচ্ছে
  const [mainServices, setMainServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

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
    const fetchData = async () => {
      try {
        // ১. সব মেইন সার্ভিস আনা হচ্ছে ড্রপডাউনের জন্য
        const servicesRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
        const mains = servicesRes.data.data.filter(s => !s.parentService && s._id !== id);
        setMainServices(mains);

        // ২. বর্তমান সার্ভিসের ডাটা আনা হচ্ছে
        const currentRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
        const currentData = currentRes.data.data.find(item => item._id === id);

        if (currentData) {
          setFormData({
            title: currentData.title,
            slug: currentData.slug,
            description: currentData.description,
            image: currentData.image,
            bgColor: currentData.bgColor || "bg-[#e0f2fe]",
            features: currentData.features.join(", "),
            parentService: currentData.parentService || "",
          });
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    
    const dataToSend = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      parentService: formData.parentService || null
    };

    try {
      // ব্যাকএন্ডের update রাউট কল করা হচ্ছে
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${id}`, dataToSend);
      alert("Service Updated Successfully!");
      router.push("/admin/services");
    } catch (err) {
      alert("Error updating service");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Data...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/services" className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 transition">
          <ArrowLeft size={18} /> Back to List
        </Link>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold mb-4">Edit Service: {formData.title}</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input required value={formData.title} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
                onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input required value={formData.slug} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
                onChange={e => setFormData({...formData, slug: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Parent Service</label>
            <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              value={formData.parentService} onChange={e => setFormData({...formData, parentService: e.target.value})}>
              <option value="">None (Main Service)</option>
              {mainServices.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input required value={formData.image} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              onChange={e => setFormData({...formData, image: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Features (Comma separated)</label>
            <input value={formData.features} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl" 
              onChange={e => setFormData({...formData, features: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea required value={formData.description} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl h-32" 
              onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <button disabled={saveLoading} className="w-full bg-[#0066b2] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 transition">
            {saveLoading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Service</>}
          </button>
        </form>
      </div>
    </div>
  );
}