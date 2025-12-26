"use client";

import { useEffect, useState } from "react";
import CaseForm from "./CaseForm";
import { API } from "@/app/config/api";

export default function FeaturedCaseStudiesAdmin() {
  const [cases, setCases] = useState([]);
  const [editing, setEditing] = useState(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const fetchCases = async () => {
    const res = await fetch(
      API.featuredCaseStudies
    );
    const data = await res.json();
    setCases(data.data || []);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this case study?")) return;

    await fetch(
      `${API.featuredCaseStudies}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCases();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Featured Case Studies
      </h1>

      <CaseForm
        refresh={fetchCases}
        editing={editing}
        clearEdit={() => setEditing(null)}
      />

      <div className="mt-10 space-y-4">
        {cases.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.tag}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(item)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
