"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  const fetchAllServices = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services`);
      if (res.data.success) {
        setServices(res.data.data);
        setFilteredServices(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllServices(); }, []);

  // ফিল্টার লজিক (এটি খুবই গুরুত্বপূর্ণ অংশ)
  useEffect(() => {
    let result = [...services];

    if (filterType === "main") {
      // যাদের parentService নেই বা null বা undefined
      result = services.filter(s => {
        return !s.parentService || s.parentService === null;
      });
    } 
    else if (filterType === "sub") {
      // যাদের parentService আছে (সেটি অবজেক্ট বা স্ট্রিং যাই হোক)
      result = services.filter(s => {
        if (!s.parentService) return false;
        
        // যদি parentService একটি অবজেক্ট হয় (যেমন $oid সহ) অথবা স্ট্রিং হয়
        const hasId = typeof s.parentService === 'object' ? Object.keys(s.parentService).length > 0 : !!s.parentService;
        return hasId;
      });
    }

    setFilteredServices(result);
  }, [filterType, services]);

  const deleteService = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/delete/${id}`);
      fetchAllServices(); 
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Service Management</h1>
          <Link href="/admin/services/add" className="bg-[#0066b2] text-white px-6 py-3 rounded-xl flex items-center gap-2">
            <Plus size={18} /> Add New
          </Link>
        </div>

        {/* ফিল্টার ট্যাব */}
        <div className="flex items-center gap-2 mb-6 bg-gray-100 p-1.5 rounded-xl w-fit">
          {["all", "main", "sub"].map((type) => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition capitalize ${filterType === type ? "bg-white text-[#0066b2] shadow-sm" : "text-gray-500"}`}
            >
              {type === 'all' ? `All (${services.length})` : type === 'main' ? 'Main Services' : 'Sub Services'}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase font-bold border-b">
                  <th className="pb-4 px-4">Service</th>
                  <th className="pb-4 px-4">Type</th>
                  <th className="pb-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((s) => (
                  <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={s.image} className="w-10 h-10 rounded bg-gray-100 object-cover" />
                        <span className="font-semibold text-gray-700">{s.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {s.parentService ? (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">SUB SERVICE</span>
                      ) : (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">MAIN SERVICE</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <Link href={`/admin/services/edit/${s._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => deleteService(s._id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filteredServices.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-medium">
              No services found for "{filterType}" filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}