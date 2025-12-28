"use client";
import { useEffect, useState } from "react";
import InfluencerForm from "@/app/components/admin/InfluencerForm";
import { API } from "@/app/config/api";

export default function AdminInfluencers() {
  const [influencers, setInfluencers] = useState([]);
  const [editing, setEditing] = useState(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const fetchInfluencers = async () => {
    const res = await fetch(API.OurInfluencer.getInfluencers, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();
    setInfluencers(data);
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const deleteInfluencer = async (id) => {
    if (!confirm("Delete this influencer?")) return;

    await fetch(`${API.OurInfluencer.getInfluencers}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchInfluencers();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Our Influencers (Admin)</h1>

      {/* Add / Edit Form */}
      <InfluencerForm
        refresh={fetchInfluencers}
        editing={editing}
        setEditing={setEditing}
      />

      {/* List */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {influencers.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-4 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.role}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditing(item)}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteInfluencer(item._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
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
