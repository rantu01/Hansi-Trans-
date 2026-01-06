"use client";
import AdminPartners from "@/app/components/admin/AdminPartners";
import { API } from "@/app/config/api";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Edit3,
  XCircle,
  Activity,
  Trophy,
  Hash,
  Layers,
  ChevronRight,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const AdminStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const res = await fetch(API.Stats);
      const data = await res.json();
      setStats(data);
    } catch {
      toast.error("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ icon: "", value: "", label: "", category: "general" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API.Stats}/${editId}` : API.Stats;

    const toastId = toast.loading(isEditing ? "Updating..." : "Creating...");
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("Success!", { id: toastId });
      resetForm();
      fetchAllStats();
    } catch {
      toast.error("Failed", { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await fetch(`${API.Stats}/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      fetchAllStats();
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] min-h-screen">
      <Toaster position="top-right" />

      {/* FORM */}
      <motion.div className="bg-white p-8 rounded-[2rem] shadow mb-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          <input
            className="md:col-span-3 p-4 rounded-xl bg-slate-50"
            name="icon"
            placeholder="Icon"
            value={formData.icon}
            onChange={handleChange}
            required
          />
          <input
            className="md:col-span-2 p-4 rounded-xl bg-slate-50"
            name="value"
            placeholder="Value"
            value={formData.value}
            onChange={handleChange}
            required
          />
          <input
            className="md:col-span-3 p-4 rounded-xl bg-slate-50"
            name="label"
            placeholder="Label"
            value={formData.label}
            onChange={handleChange}
            required
          />
          <select
            className="md:col-span-2 p-4 rounded-xl bg-slate-50"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="general">General</option>
            <option value="achievement">Achievement</option>
          </select>
          <button className="md:col-span-2 bg-slate-900 text-white rounded-xl font-bold">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>
      </motion.div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] shadow overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="w-full">
            <tbody>
              <AnimatePresence>
                {stats.map((item) => (
                  <motion.tr
                    key={item._id}
                    className="group border-b hover:bg-blue-50"
                  >
                    <td className="p-6 font-bold">{item.label}</td>
                    <td className="p-6 font-black text-blue-600">
                      {item.value}
                    </td>
                    <td className="p-6 text-right">
                      <div
                        className="
                          flex justify-end gap-3
                          opacity-100
                          md:opacity-0
                          md:group-hover:opacity-100
                          transition-opacity
                        "
                      >
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-3 bg-white rounded-xl text-amber-500 shadow"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-white rounded-xl text-red-500 shadow"
                        >
                          <Trash2 size={18} />
                        </button>
                        <ChevronRight className="hidden md:block text-slate-300" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-20">
        <AdminPartners />
      </div>
    </div>
  );
};

export default AdminStats;
