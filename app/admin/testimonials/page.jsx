"use client";
import { API } from "@/app/config/api";
import React, { useEffect, useState } from "react";

const emptyText = {
  type: "text",
  quote: "",
  name: "",
  role: "",
  avatar: "",
};

const emptyVideo = {
  type: "video",
  thumbnail: "",
  name: "",
  role: "",
  avatar: "",
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [bottomNav, setBottomNav] = useState([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* Fetch existing data */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API.Testimonials.getTestimonials);
        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        setTestimonials(data.testimonials || []);
        setBottomNav(data.bottomNav || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTestimonials();
  }, []);

  /* Save (Add / Edit) */
  const saveAll = async () => {
    if (!token) {
      alert("You are not authorized");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API.Testimonials.getTestimonials, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ testimonials, bottomNav }),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Saved successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  /* Delete testimonial */
  const removeTestimonial = async (id) => {
    if (!token) {
      alert("You are not authorized");
      return;
    }

    try {
      const res = await fetch(`${API.Testimonials.getTestimonials}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTestimonials(testimonials.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting testimonial");
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Testimonials Admin</h1>

      {/* Testimonials List */}
      <div className="space-y-6">
        {testimonials.map((item, index) => (
          <div
            key={item._id || index}
            className="border p-4 md:p-6 rounded-xl bg-white shadow-sm border-gray-100"
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <span className="bg-gray-100 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-gray-600">
                {item.type}
              </span>
              <button
                onClick={() => removeTestimonial(item._id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
              >
                Delete Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.type === "text" && (
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Testimonial Quote"
                    className="input min-h-[100px]"
                    value={item.quote}
                    onChange={(e) => {
                      const copy = [...testimonials];
                      copy[index].quote = e.target.value;
                      setTestimonials(copy);
                    }}
                  />
                </div>
              )}

              {item.type === "video" && (
                <div className="md:col-span-2">
                  <input
                    placeholder="Thumbnail URL"
                    className="input"
                    value={item.thumbnail}
                    onChange={(e) => {
                      const copy = [...testimonials];
                      copy[index].thumbnail = e.target.value;
                      setTestimonials(copy);
                    }}
                  />
                </div>
              )}

              <input
                placeholder="Person Name"
                className="input"
                value={item.name}
                onChange={(e) => {
                  const copy = [...testimonials];
                  copy[index].name = e.target.value;
                  setTestimonials(copy);
                }}
              />

              <input
                placeholder="Role / Title"
                className="input"
                value={item.role}
                onChange={(e) => {
                  const copy = [...testimonials];
                  copy[index].role = e.target.value;
                  setTestimonials(copy);
                }}
              />

              <div className="md:col-span-2">
                <input
                  placeholder="Avatar Image URL"
                  className="input"
                  value={item.avatar}
                  onChange={(e) => {
                    const copy = [...testimonials];
                    copy[index].avatar = e.target.value;
                    setTestimonials(copy);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Card Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 my-10">
        <button
          onClick={() => setTestimonials([...testimonials, emptyText])}
          className="btn flex-1 bg-white border border-gray-300 hover:bg-gray-50 transition-colors py-4"
        >
          + Add Text Testimonial
        </button>

        <button
          onClick={() => setTestimonials([...testimonials, emptyVideo])}
          className="btn flex-1 bg-white border border-gray-300 hover:bg-gray-50 transition-colors py-4"
        >
          + Add Video Testimonial
        </button>
      </div>

      {/* Bottom Nav Section */}
      <div className="mt-12 p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-700">Bottom Navigation List</h2>

        <div className="space-y-4">
          {bottomNav.map((nav, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-lg shadow-sm">
              <input
                placeholder="Name"
                className="input !mb-0"
                value={nav.name}
                onChange={(e) => {
                  const copy = [...bottomNav];
                  copy[i].name = e.target.value;
                  setBottomNav(copy);
                }}
              />
              <input
                placeholder="Company"
                className="input !mb-0"
                value={nav.company}
                onChange={(e) => {
                  const copy = [...bottomNav];
                  copy[i].company = e.target.value;
                  setBottomNav(copy);
                }}
              />
              <button 
                onClick={() => setBottomNav(bottomNav.filter((_, idx) => idx !== i))}
                className="text-red-400 hover:text-red-600 px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setBottomNav([...bottomNav, { name: "", company: "" }])}
          className="mt-4 text-blue-600 font-semibold text-sm hover:underline"
        >
          + Add New Nav Item
        </button>
      </div>

      {/* Final Save Button */}
      <div className="sticky bottom-4 mt-10">
        <button
          disabled={loading}
          onClick={saveAll}
          className={`w-full md:w-auto min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-2xl transition-all active:scale-95 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : "Save All Changes"}
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e2e8f0;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 0px;
          font-size: 14px;
          background: white;
          transition: border-color 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          ring: 2px solid #3b82f6;
        }
        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}