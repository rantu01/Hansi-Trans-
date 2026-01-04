"use client";
import AdminPartners from "@/app/components/admin/AdminPartners";
import { API } from "@/app/config/api";
import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

const AdminStats = () => {
  const [stats, setStats] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    icon: "",
    value: "",
    label: "",
    category: "general",
  });

  const fetchAllStats = async () => {
    try {
      const res = await fetch(API.Stats);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Edit Mode Active Kora ---
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      icon: item.icon,
      value: item.value,
      label: item.label,
      category: item.category,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Form-e scroll kore niye jabe
  };

  // --- Reset Form ---
  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ icon: "", value: "", label: "", category: "general" });
  };

  // --- Add ba Update Submit Kora ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API.Stats}/${editId}` : API.Stats;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isEditing ? "Updated successfully!" : "Added successfully!");
        resetForm();
        fetchAllStats();
      }
    } catch (err) {
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API.Stats}/${id}`, { method: "DELETE" });
      fetchAllStats();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Manage Stats & Achievements</h2>
        {isEditing && (
          <button onClick={resetForm} className="text-red-500 flex items-center gap-1 font-medium">
            <FaTimes /> Cancel Edit
          </button>
        )}
      </div>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className={`p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-end transition-all ${isEditing ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'}`}>
        <div>
          <label className="block text-sm font-medium mb-1">Icon</label>
          <input name="icon" value={formData.icon} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Value</label>
          <input name="value" value={formData.value} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Label</label>
          <input name="label" value={formData.label} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="general">General Stat</option>
            <option value="achievement">Achievement</option>
          </select>
        </div>
        <button type="submit" className={`p-2 rounded text-white flex items-center justify-center gap-2 ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isEditing ? <><FaEdit /> Update Data</> : <><FaPlus /> Add Data</>}
        </button>
      </form>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Icon</th>
              <th className="p-4 border-b">Value</th>
              <th className="p-4 border-b">Label</th>
              <th className="p-4 border-b">Category</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{item.icon}</td>
                <td className="p-4 border-b font-bold">{item.value}</td>
                <td className="p-4 border-b">{item.label}</td>
                <td className="p-4 border-b">
                  <span className={`px-3 py-1 rounded-full text-xs ${item.category === 'achievement' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="p-4 border-b text-center flex justify-center gap-4">
                  <button onClick={() => handleEdit(item)} className="text-yellow-600 hover:text-yellow-700">
                    <FaEdit title="Edit" />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                    <FaTrash title="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminPartners></AdminPartners>
    </div>
  );
};

export default AdminStats;