"use client";

import { useEffect, useState } from "react";
import { API } from "@/app/config/api";

export default function WhyChooseUsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    key: "",
    title: "",
    description: "",
    icon: "",
    badge: "",
  });
  const [editingKey, setEditingKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* ---------------- FETCH ---------------- */
  const fetchItems = async () => {
    const res = await fetch(API.WhyChooseUs, {
      cache: "no-store",
    });
    const data = await res.json();
    setItems(data?.cards || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------- SUBMIT (ADD / UPDATE) ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedCards = editingKey
      ? items.map((card) =>
          card.key === editingKey ? form : card
        )
      : [...items, form];

    await fetch(API.WhyChooseUs, {
      method: "POST", // upsert
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cards: updatedCards }),
    });

    setForm({
      key: "",
      title: "",
      description: "",
      icon: "",
      badge: "",
    });
    setEditingKey(null);
    setLoading(false);
    fetchItems();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setEditingKey(item.key);
    setForm({
      key: item.key,
      title: item.title,
      description: item.description,
      icon: item.icon,
      badge: item.badge || "",
    });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (key) => {
    if (!confirm("Delete this card?")) return;

    await fetch(`${API.WhyChooseUs}/${key}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchItems();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Why Choose Us – Admin Panel
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-10"
      >
        <input
          placeholder="Key (left / middleTop / middleBottom / right)"
          className="border p-2 rounded"
          value={form.key}
          onChange={(e) =>
            setForm({ ...form, key: e.target.value })
          }
          required
          disabled={!!editingKey}
        />

        <input
          placeholder="Icon (Gamepad2, Settings, Globe2, Clock)"
          className="border p-2 rounded"
          value={form.icon}
          onChange={(e) =>
            setForm({ ...form, icon: e.target.value })
          }
          required
        />

        <input
          placeholder="Title (use <br /> if needed)"
          className="border p-2 rounded col-span-2"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded col-span-2"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          placeholder="Badge (optional, e.g. 24)"
          className="border p-2 rounded"
          value={form.badge}
          onChange={(e) =>
            setForm({ ...form, badge: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-black text-white py-2 rounded hover:bg-gray-800 col-span-2"
        >
          {editingKey ? "Update Card" : "Add Card"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="border rounded p-4 flex justify-between items-start bg-white shadow"
          >
            <div>
              <p className="text-sm text-gray-400">{item.key}</p>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Icon: {item.icon}{" "}
                {item.badge && `| Badge: ${item.badge}`}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.key)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
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
