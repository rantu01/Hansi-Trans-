"use client";
import React, { useState, useEffect } from "react";
import { 
  Trash2, Plus, Edit2, Save, X, Globe, Gamepad2, 
  Smartphone, Zap, FlaskConical, Megaphone, ShoppingBag, 
  Clapperboard, LayoutGrid 
} from "lucide-react";
import { API } from "@/app/config/api";

// আইকন লিস্ট
const iconOptions = {
  Gamepad2, Clapperboard, Smartphone, Zap, 
  FlaskConical, Megaphone, Globe, ShoppingBag
};

const DomainsAdmin = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // আপনার working কোড অনুযায়ী টোকেন নেওয়ার পদ্ধতি
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Globe",
    tags: "",
    order: 0
  });

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const res = await fetch(API.Domains);
      const data = await res.json();
      // আপনার backend array বা object format অনুযায়ী সেট করুন
      setDomains(Array.isArray(data) ? data : data.domains || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You are not authorized. Please login as admin.");
      return;
    }

    const payload = {
      ...formData,
      id: editingId,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    try {
      const res = await fetch(API.Domains, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 401 || res.status === 403) {
        alert("Session expired or unauthorized. Please login again.");
        return;
      }

      if (res.ok) {
        resetForm();
        fetchDomains();
        alert(editingId ? "Updated successfully!" : "Created successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed!");
    }
  };

  const handleEdit = (domain) => {
    setEditingId(domain._id);
    setFormData({
      title: domain.title,
      description: domain.description || "",
      icon: domain.icon,
      tags: Array.isArray(domain.tags) ? domain.tags.join(", ") : "",
      order: domain.order || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("You are not authorized");
      return;
    }

    if (!confirm("Are you sure you want to delete this domain?")) return;
    
    try {
      const res = await fetch(`${API.Domains}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setDomains(domains.filter(d => d._id !== id));
        alert("Deleted successfully");
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", icon: "Globe", tags: "", order: 0 });
  };

  if (loading) return <div className="p-10 text-center font-sans">Loading Management...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#0066b2] p-2 rounded-lg text-white">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vertical Domains Admin</h1>
            <p className="text-sm text-gray-500">Manage your company service sectors</p>
          </div>
        </div>

        {/* Create/Edit Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            {editingId ? <Edit2 size={18} className="text-orange-500"/> : <Plus size={18} className="text-green-500"/>}
            {editingId ? "Edit Domain" : "Add New Domain"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Title</label>
              <input
                className="input-field"
                placeholder="e.g. Games"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Icon</label>
              <select
                className="input-field cursor-pointer"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              >
                {Object.keys(iconOptions).map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
              <textarea
                className="input-field h-24 resize-none"
                placeholder="Briefly describe this domain..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tags (Comma separated)</label>
              <input
                className="input-field"
                placeholder="Localization, Digital, Music"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Display Order</label>
              <input
                type="number"
                className="input-field"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              />
            </div>

            <div className="md:col-span-2 pt-4 flex gap-3">
              <button 
                type="submit" 
                className="bg-[#0066b2] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg active:scale-95"
              >
                {editingId ? <Save size={18}/> : <Plus size={18}/>}
                {editingId ? "Update Changes" : "Save Domain"}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-500 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Domain List */}
        <div className="space-y-4">
          <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
            Existing Domains ({domains.length})
          </h3>
          {domains.map((domain) => {
            const IconTag = iconOptions[domain.icon] || Globe;
            return (
              <div 
                key={domain._id} 
                className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-[#0066b2] rounded-2xl flex items-center justify-center">
                    <IconTag size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{domain.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {domain.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(domain)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(domain._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s;
          font-size: 14px;
        }
        .input-field:focus {
          border-color: #0066b2;
          background: white;
          box-shadow: 0 0 0 4px rgba(0, 102, 178, 0.05);
        }
      `}</style>
    </div>
  );
};

export default DomainsAdmin;