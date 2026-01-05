"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/app/config/api";
import { Trash2, Edit, Plus, FileText, Loader2, X, UploadCloud, Search, Tag, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const BlogAdmin = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    category: "Games",
    filterTag: "Games",
    image: "",
    author: "Hansi Trans Admin"
  });
  const [preview, setPreview] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API.Blogs.getAll);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // Title থেকে অটো Slug তৈরি
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setPreview(URL.createObjectURL(file));
    const loadingToast = toast.loading("Uploading image...");

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image: data.url });
        toast.success("Image uploaded!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed", { id: loadingToast });
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload a cover image");

    const url = editId ? API.Blogs.update(editId) : API.Blogs.add;
    const method = editId ? "PUT" : "POST";
    const loadingToast = toast.loading(editId ? "Updating..." : "Publishing...");

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editId ? "Blog Updated!" : "Blog Published!", { id: loadingToast });
        clearForm();
        fetchBlogs();
      }
    } catch (error) {
      toast.error("Operation failed", { id: loadingToast });
    }
  };

  const clearForm = () => {
    setFormData({
      title: "", slug: "", description: "", content: "",
      category: "Games", filterTag: "Games", image: "", author: "Hansi Trans Admin"
    });
    setPreview("");
    setEditId(null);
  };

  const handleEdit = (blog) => {
    setEditId(blog._id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      content: blog.content,
      category: blog.category,
      filterTag: blog.filterTag,
      image: blog.image,
      author: blog.author
    });
    setPreview(blog.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete It"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(API.Blogs.delete(id), { 
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          toast.success("Blog Deleted");
          fetchBlogs();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50"><Loader2 className="animate-spin" size={40} /></div>
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
            <span className="p-2.5 bg-[#0066b2] rounded-2xl text-white shadow-xl shadow-blue-200">
              <FileText size={28} />
            </span>
            Blog Manager
          </h2>
          <p className="text-gray-400 font-medium">Manage your thoughts and news</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by title..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* FORM */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-50 sticky top-8">
            <h3 className="font-black text-xl mb-8 flex justify-between items-center">
              {editId ? "Edit Article" : "Write New Article"}
              {editId && <X className="cursor-pointer text-red-500" onClick={clearForm} />}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Cover Image</label>
                <div className="relative group">
                  <input type="file" id="blog-upload" className="hidden" onChange={handleImageUpload} />
                  <label htmlFor="blog-upload" className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-3xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden">
                    {preview ? <img src={preview} className="w-full h-full object-cover" /> : <UploadCloud size={30} className="text-gray-300" />}
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <input 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none font-bold text-sm" 
                  placeholder="Article Title" 
                  value={formData.title} 
                  onChange={handleTitleChange} 
                  required 
                />
                <input 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs text-gray-400" 
                  placeholder="Slug (Auto-generated)" 
                  value={formData.slug} 
                  readOnly
                />
                <div className="flex gap-2">
                  <select 
                    className="w-1/2 bg-gray-50 p-4 rounded-xl outline-none text-sm font-bold"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value, filterTag: e.target.value})}
                  >
                    <option value="Games">Games</option>
                    <option value="Voice">Voice</option>
                    <option value="Tech Innovations">Tech Innovations</option>
                  </select>
                  <input 
                    className="w-1/2 bg-gray-50 p-4 rounded-xl outline-none text-sm" 
                    placeholder="Author" 
                    value={formData.author} 
                    onChange={(e) => setFormData({...formData, author: e.target.value})} 
                  />
                </div>
                <textarea 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none text-sm h-32" 
                  placeholder="Article Content (HTML allowed)" 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                  required 
                />
              </div>

              <button 
                disabled={uploading} 
                className="w-full py-4 rounded-xl font-black text-white bg-[#0066b2] shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform disabled:bg-gray-300"
              >
                {editId ? "Update Blog" : "Publish Blog"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* LIST */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.div 
                key={blog._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm flex gap-4 items-center group"
              >
                <img src={blog.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-blue-50 text-[#0066b2] text-[8px] font-black rounded-md uppercase">{blog.category}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{blog.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 line-clamp-1">{blog.title}</h4>
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => handleEdit(blog)} className="p-2 bg-gray-50 rounded-lg hover:bg-black hover:text-white transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(blog._id)} className="p-2 bg-gray-50 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;