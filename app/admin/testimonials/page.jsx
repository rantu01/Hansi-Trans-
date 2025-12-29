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
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Testimonials Admin</h1>

      {/* Testimonials */}
      <div className="space-y-6">
        {testimonials.map((item, index) => (
          <div
            key={item._id || index}
            className="border p-6 rounded-xl bg-white shadow"
          >
            <div className="flex justify-between mb-4">
              <strong>{item.type.toUpperCase()}</strong>
              <button
                onClick={() => removeTestimonial(item._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>

            {item.type === "text" && (
              <input
                placeholder="Quote"
                className="input"
                value={item.quote}
                onChange={(e) => {
                  const copy = [...testimonials];
                  copy[index].quote = e.target.value;
                  setTestimonials(copy);
                }}
              />
            )}

            {item.type === "video" && (
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
            )}

            <input
              placeholder="Name"
              className="input"
              value={item.name}
              onChange={(e) => {
                const copy = [...testimonials];
                copy[index].name = e.target.value;
                setTestimonials(copy);
              }}
            />

            <input
              placeholder="Role"
              className="input"
              value={item.role}
              onChange={(e) => {
                const copy = [...testimonials];
                copy[index].role = e.target.value;
                setTestimonials(copy);
              }}
            />

            <input
              placeholder="Avatar URL"
              className="input"
              value={item.avatar}
              onChange={(e) => {
                const copy = [...testimonials];
                copy[index].avatar = e.target.value;
                setTestimonials(copy);
              }}
            />
          </div>
        ))}
      </div>

      {/* Add Buttons */}
      <div className="flex gap-4 my-8">
        <button
          onClick={() => setTestimonials([...testimonials, emptyText])}
          className="btn"
        >
          + Add Text Testimonial
        </button>

        <button
          onClick={() => setTestimonials([...testimonials, emptyVideo])}
          className="btn"
        >
          + Add Video Testimonial
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Bottom Navigation</h2>

        {bottomNav.map((nav, i) => (
          <div key={i} className="flex gap-4 mb-3">
            <input
              placeholder="Name"
              className="input"
              value={nav.name}
              onChange={(e) => {
                const copy = [...bottomNav];
                copy[i].name = e.target.value;
                setBottomNav(copy);
              }}
            />
            <input
              placeholder="Company"
              className="input"
              value={nav.company}
              onChange={(e) => {
                const copy = [...bottomNav];
                copy[i].company = e.target.value;
                setBottomNav(copy);
              }}
            />
          </div>
        ))}

        <button
          onClick={() => setBottomNav([...bottomNav, { name: "", company: "" }])}
          className="btn mt-2"
        >
          + Add Bottom Nav
        </button>
      </div>

      {/* Save */}
      <button
        disabled={loading}
        onClick={saveAll}
        className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save All"}
      </button>

      {/* small utility styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .btn {
          background: #f1f5f9;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
