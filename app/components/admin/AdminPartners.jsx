"use client";
import { API } from "@/app/config/api";
import React, { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

const AdminPartners = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [partners, setPartners] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(""); // Final Image URL
  const [preview, setPreview] = useState(""); // Local Preview URL

  // --- Fetch All Partners ---
  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch(API.Partners);
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error("Error fetching partners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // --- Image Upload Logic (Followed your CaseForm) ---
  const handleImageUpload = async (file) => {
    if (!file) return;
    
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setLogo(data.url); // Backend theke asa URL set hobe
    } catch (err) {
      alert("Upload failed");
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (partner) => {
    setIsEditing(true);
    setEditId(partner._id);
    setName(partner.name || "");
    setLogo(partner.logo);
    setPreview(partner.logo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setName("");
    setLogo("");
    setPreview("");
  };

  // --- Create or Update ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logo) return alert("Please upload a logo first");

    const payload = { name, logo };
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API.Partners}/${editId}` : API.Partners;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(isEditing ? "Partner updated!" : "Partner added!");
        resetForm();
        fetchPartners();
      }
    } catch (err) {
      alert("Action failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner logo?")) return;
    try {
      const res = await fetch(`${API.Partners}/${id}`, { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchPartners();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Trusted Partners</h2>
        {isEditing && (
          <button onClick={resetForm} className="text-red-500 flex items-center gap-1 font-medium">
            <FaTimes /> Cancel Edit
          </button>
        )}
      </div>

      {/* --- Form Section --- */}
      <form onSubmit={handleSubmit} className={`p-6 rounded-xl shadow-sm mb-10 transition-all ${isEditing ? 'bg-indigo-50 border border-indigo-200' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-1">Partner Name</label>
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black" 
              placeholder="e.g. Google, Amazon" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-1">Partner Logo</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
              />
              {preview && (
                <img src={preview} alt="Preview" className="w-16 h-12 object-contain border bg-white rounded shadow-sm" />
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className={`mt-6 w-full md:w-auto md:px-12 py-3 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 ${uploading ? "bg-gray-400" : (isEditing ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-black hover:bg-gray-800')}`}
        >
          {uploading ? "⌛ Uploading..." : isEditing ? "Update Partner" : "Add Partner"}
        </button>
      </form>

      {/* --- Display Grid --- */}
      {loading ? (
        <p>Loading logos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div key={partner._id} className="group relative bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="h-20 flex items-center justify-center mb-3">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition" 
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-600 truncate">{partner.name || "Unnamed Partner"}</p>
              
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => handleEdit(partner)} className="bg-white p-1.5 rounded-full shadow-md text-indigo-600 hover:bg-indigo-50">
                  <FaEdit size={14} />
                </button>
                <button onClick={() => handleDelete(partner._id)} className="bg-white p-1.5 rounded-full shadow-md text-red-500 hover:bg-red-50">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPartners;