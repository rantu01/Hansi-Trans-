"use client";

import { useEffect, useState } from "react";
import InfluencerForm from "@/app/components/admin/InfluencerForm";
import { API } from "@/app/config/api";

export default function AdminInfluencers() {
  const [influencers, setInfluencers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [token, setToken] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Image upload state

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    setToken(t);
  }, []);

  const fetchInfluencers = async () => {
    if (!token) return;
    try {
      const res = await fetch(API.OurInfluencer.getInfluencers, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      setInfluencers(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [token]);

  const deleteInfluencer = async (id) => {
    if (isUploading) return; // Upload চলাকালীন ডিলিট বন্ধ
    if (!confirm("Delete this influencer?")) return;

    await fetch(`${API.OurInfluencer.getInfluencers}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchInfluencers();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-12">
        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Influencers <span className="text-blue-600 italic">Panel</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage your partner influencers and their profiles.
          </p>
        </header>

        <section className="mb-14">
          <div className="bg-white rounded-2xl shadow-lg border border-blue-50">
            {/* Pass isUploading and setIsUploading to the form */}
            <InfluencerForm
              refresh={fetchInfluencers}
              editing={editing}
              setEditing={setEditing}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Current Team</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              {influencers.length} Total
            </span>
          </div>

          {/* Grid Layout Fixed to avoid Hydration Error */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 sm:gap-6">
            {influencers.map((item) => (
              <article
                key={item._id}
                className="bg-white border rounded-2xl p-4 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold text-lg truncate">{item.name}</h3>
                <p className="text-blue-500 text-sm font-semibold uppercase">
                  {item.role}
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    disabled={isUploading} // Disable while uploading
                    onClick={() => {
                      setEditing(item);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`flex-1 py-2.5 rounded-xl font-semibold transition-colors ${
                      isUploading 
                        ? "bg-gray-300 cursor-not-allowed text-gray-500" 
                        : "bg-gray-900 text-white hover:bg-blue-600"
                    }`}
                  >
                    Edit
                  </button>

                  <button
                    disabled={isUploading} // Disable while uploading
                    onClick={() => deleteInfluencer(item._id)}
                    className={`flex-1 py-2.5 rounded-xl font-semibold transition-colors ${
                      isUploading 
                        ? "bg-gray-100 cursor-not-allowed text-gray-400" 
                        : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          {influencers.length === 0 && (
            <div className="mt-16 text-center text-gray-400">
              No influencers found on the server.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}