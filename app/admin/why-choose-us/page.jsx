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
    // Scroll to top for easier editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        Why Choose Us – Admin Panel
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-10"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Position Key</label>
          <input
            placeholder="e.g. left, middleTop, right"
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            value={form.key}
            onChange={(e) => setForm({ ...form, key: e.target.value })}
            required
            disabled={!!editingKey}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Icon Name</label>
          <input
            placeholder="e.g. Gamepad2, Settings"
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600">Card Title</label>
          <input
            placeholder="Enter title..."
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            placeholder="Enter description..."
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-600">Badge (Optional)</label>
          <input
            placeholder="e.g. 24"
            className="border p-2.5 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          className={`py-3 rounded-lg font-bold text-white transition-all md:col-span-2 mt-2 ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-800 active:scale-95"
          }`}
        >
          {loading ? "Processing..." : editingKey ? "Update Card" : "Add New Card"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-lg font-semibold mb-4 text-gray-700 px-1">Active Cards</h2>
      <div className="grid gap-4">
        {items.length === 0 && <p className="text-gray-500 italic p-4">No cards added yet.</p>}
        
        {items.map((item) => (
          <div
            key={item.key}
            className="border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm hover:shadow-md transition-shadow gap-4"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                  {item.key}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-600 rounded">
                    Badge: {item.badge}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900">{item.title.replace('<br />', ' ')}</h3>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs font-medium text-blue-500 mt-2">
                Icon: <span className="text-gray-400 font-normal">{item.icon}</span>
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.key)}
                className="flex-1 sm:flex-none px-4 py-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 hover:border-red-600 rounded-lg text-sm font-medium transition-colors"
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