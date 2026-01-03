"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API } from "@/app/config/api";
import { Plus, Trash2, ExternalLink } from "lucide-react";

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllServices = async () => {
    try {
      // আমরা মেইন সার্ভিস এবং সাব-সার্ভিস সব দেখার জন্য একটি কাস্টম কল করতে পারি 
      // অথবা সরাসরি মেইন API ব্যবহার করতে পারি
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
      if (res.data.success) setServices(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllServices(); }, []);

  const deleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/delete/${id}`);
      fetchAllServices(); // ডিলিট হওয়ার পর লিস্ট রিফ্রেশ
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Service Management</h1>
          <Link href="/admin/services/add" className="bg-[#0066b2] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
            <Plus size={18} /> Add New Service
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-400 text-sm uppercase">
                <th className="py-4 px-4 font-medium">Title</th>
                <th className="py-4 px-4 font-medium">Type</th>
                <th className="py-4 px-4 font-medium">Slug</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-semibold text-gray-700">{s.title}</td>
                  <td className="py-4 px-4">
                    {s.parentService ? (
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">Sub-Service</span>
                    ) : (
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs">Main Service</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{s.slug}</td>
                  <td className="py-4 px-4">
                    <div className="flex justify-end gap-3">
                      <Link href={`/services/${s.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-500">
                        <ExternalLink size={18} />
                      </Link>
                      <button onClick={() => deleteService(s._id)} className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="text-center py-10 text-gray-400">Loading services...</p>}
        </div>
      </div>
    </div>
  );
}