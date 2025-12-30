"use client";

import { useEffect, useState } from "react";
import CaseForm from "./CaseForm";
import { API } from "@/app/config/api";

export default function FeaturedCaseStudiesAdmin() {
  const [cases, setCases] = useState([]);
  const [editing, setEditing] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const fetchCases = async () => {
    try {
      const res = await fetch(API.featuredCaseStudies);
      const data = await res.json();
      setCases(data.data || []);
    } catch (error) { console.error("Error fetching cases"); }
  };

  useEffect(() => { fetchCases(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    await fetch(`${API.featuredCaseStudies}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCases();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">🚀 Case Studies Admin</h1>

        {/* Form Section */}
        <CaseForm refresh={fetchCases} editing={editing} clearEdit={() => setEditing(null)} />

        {/* List Section */}
        <div className="space-y-5">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-gray-700">Existing Case Studies ({cases.length})</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {cases.length === 0 && <p className="text-center py-10 text-gray-400 bg-white rounded-xl border border-dashed">No case studies found. Create one above!</p>}
            
            {cases.map((item) => (
              <div key={item._id} className="bg-white border p-3 md:p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-14 md:w-28 md:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 truncate text-base md:text-lg">{item.title}</h3>
                    <p className="text-xs font-bold text-blue-600 bg-blue-50 w-fit px-2 py-0.5 rounded mt-1 uppercase">{item.tag}</p>
                    <p className="text-xs text-gray-400 mt-1">Slug: {item.slug}</p>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                  <button onClick={() => { setEditing(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-gray-100 hover:bg-black hover:text-white text-gray-700 text-sm font-bold rounded-lg transition-all"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-sm font-bold rounded-lg transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}