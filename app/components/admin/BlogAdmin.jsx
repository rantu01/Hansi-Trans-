"use client";
import React, { useState, useEffect, useRef } from "react";
import { API } from "@/app/config/api";
import { Trash2, Edit, Plus, FileText, Loader2, X, UploadCloud, Search, Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const normalizeSlug = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const defaultSections = [
    {
      type: "heading",
      text: "HS+ is a global partner for localization, multilingual voice-over, and cross-border marketing. Since 2010, we’ve helped leading game studios, anime creators, and tech innovators connect with audiences in over 40 languages.",
      items: [],
      src: null,
      alt: ""
    },
    {
      type: "paragraph",
      text: "When people hear the word “branding,” many immediately think of logos, colors, and fonts. While those are important, branding is much deeper—it’s about perception, emotion, and connection. Branding answers a vital question in every customer’s mind:  “How does this make me feel?” When done right, branding shapes how customers experience your business—and how they remember it.",
      items: [],
      src: null,
      alt: ""
    },
    { type: "heading", text: "Introduction", items: [], src: null, alt: "" },
    {
      type: "paragraph",
      text: "Expanding your game into Asian markets is an exciting opportunity—but without proper localization, even the best game can fail to connect. This guide walks you through cultural adaptation, language challenges, voice-over best practices, and marketing strategies to make your game a success in China, Japan, Korea, and Southeast Asia.",
      items: [],
      src: null,
      alt: ""
    },
    { type: "heading", text: "Understanding the Asian Gaming Market", items: [], src: null, alt: "" },
    { type: "paragraph", text: "Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.", items: [], src: null, alt: "" },
    {
      type: "list",
      text: "Your text here",
      items: [
        "Mobile gaming dominates in China and SEA.",
        "Japan has a strong console and anime-driven game culture.",
        "Korea is a leader in esports and PC café gaming.",
        "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
        "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely."
      ],
      src: null,
      alt: ""
    },
    { type: "heading", text: "The Role of Localization Beyond Translation", items: [], src: null, alt: "" },
    { type: "paragraph", text: "Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.", items: [], src: null, alt: "" },
    {
      type: "list",
      text: "Your text here",
      items: [
        "The Role of Localization Beyond Translation",
        "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
        "Mobile gaming dominates in China and SEA.",
        "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely."
      ],
      src: null,
      alt: ""
    },
    { type: "quote", text: '"People will forget what you said, but they\'ll remember how your brand made them feel."', items: [], src: null, alt: "" },
    { type: "image", text: "", items: [], src: "https://res.cloudinary.com/dyhhdl1hy/image/upload/v1776276984/site/ketxdvxuivnvqkurictm.png", alt: "Section image..." },
    { type: "heading", text: "Multilingual Voice-Over: Bringing Characters to Life", items: [], src: null, alt: "" },
    { type: "paragraph", text: "Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust, identity, and belonging.", items: [], src: null, alt: "" },
    { type: "list", text: "", items: ["Mobile gaming dominates in China and SEA.", "Japan has a strong console and anime-driven game culture.", "Korea is a leader in esports and PC café gaming.", "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast."], src: null, alt: "" },
    { type: "heading", text: "Influencer & KOL Marketing for Games", items: [], src: null, alt: "" },
    { type: "list", text: "", items: ["Brand Identity (Visuals)"], src: null, alt: "" },
    { type: "paragraph", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust.", items: [], src: null, alt: "" },
    { type: "list", text: "", items: ["Tone of Voice"], src: null, alt: "" },
    { type: "paragraph", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust.", items: [], src: null, alt: "" },
    { type: "list", text: "", items: ["Brand Story"], src: null, alt: "" },
    { type: "paragraph", text: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust.", items: [], src: null, alt: "" },
    { type: "image", text: "", items: [], src: "https://res.cloudinary.com/dyhhdl1hy/image/upload/v1776277305/site/klbqzwwofr2luc5rfkzd.png", alt: "Section image" },
    { type: "quote", text: "People will forget what you said, but they'll remember how your brand made them feel.", items: [], src: null, alt: "" },
    { type: "heading", text: "Conclusion", items: [], src: null, alt: "" },
    { type: "paragraph", text: "Expanding into Asian markets is more than just translation—it’s about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.", items: [], src: null, alt: "" }
  ];

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
    sections: defaultSections,
    category: "Games",
    filterTag: "Games",
    image: "",
    author: "Hansi Trans Admin"
  });
  const [preview, setPreview] = useState("");
  const dragSrc = useRef(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API.Blogs.getAll);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = normalizeSlug(title);
    setFormData({ ...formData, title, slug });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("File too large (Max 4MB)");
      return;
    }

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
        setFormData((prev) => ({ ...prev, image: data.url }));
        toast.success("Image uploaded!", { id: loadingToast });
      } else {
        toast.error("Upload failed", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed", { id: loadingToast });
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSectionImageUpload = async (sectionIndex, file) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("File too large (Max 4MB)");
      return;
    }

    setUploading(true);
    const loadingToast = toast.loading("Uploading section image...");

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
        updateSection(sectionIndex, "src", data.url);
        toast.success("Section image uploaded!", { id: loadingToast });
      } else {
        toast.error("Section image upload failed", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Section image upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const addSection = (type) => {
    const newSection = {
      type,
      text: type === "heading" ? "New Heading" : "",
      items: type === "list" ? ["Item 1", "Item 2"] : [],
      src: type === "image" ? "" : null,
      alt: type === "image" ? "Section image" : "",
    };
    setFormData({ 
      ...formData, 
      sections: [...formData.sections, newSection] 
    });
  };

  const updateSection = (index, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeSection = (index) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index)
    });
  };

  const addListItem = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    if (!Array.isArray(updatedSections[sectionIndex].items)) {
      updatedSections[sectionIndex].items = [];
    }
    updatedSections[sectionIndex].items.push('New item');
    setFormData({ ...formData, sections: updatedSections });
  };

  const moveSection = (from, to) => {
    if (from === to) return;
    const sections = Array.from(formData.sections || []);
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    setFormData({ ...formData, sections });
  };

  const onDragStart = (e, index) => {
    dragSrc.current = index;
    setIsDragging(true);
    try { e.dataTransfer.setData("text/plain", String(index)); } catch (err) {}
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const from = dragSrc.current !== null ? dragSrc.current : parseInt(e.dataTransfer.getData("text/plain"), 10);
    const to = index;
    moveSection(from, to);
    setIsDragging(false);
    setDragOverIndex(null);
    dragSrc.current = null;
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setDragOverIndex(null);
    dragSrc.current = null;
  };

  const updateListItem = (sectionIndex, itemIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].items[itemIndex] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeListItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].items = updatedSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload a cover image");
    if (formData.sections.length === 0) return toast.error("Please add at least one section");

    const payload = {
      ...formData,
      slug: normalizeSlug(formData.slug || formData.title),
      sections: formData.sections.map((section) => ({
        ...section,
        items: Array.isArray(section.items) ? section.items : [],
        src: section.type === "image" ? section.src || "" : section.src,
      })),
    };

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
        body: JSON.stringify(payload),
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
      title: "", slug: "", description: "", sections: defaultSections,
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
      sections: (blog.sections || []).map((section) => ({
        ...section,
        alt: section.alt || "",
      })),
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
          <p className="text-gray-400 font-medium">Create blogs easily - No HTML knowledge required</p>
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
              {editId ? "Edit Blog" : "Create New Blog"}
              {editId && <X className="cursor-pointer text-red-500" onClick={clearForm} />}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Cover Image</label>
                <div className="relative group">
                  <input type="file" id="blog-upload" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  <label
                    htmlFor="blog-upload"
                    className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-3xl cursor-pointer transition-all overflow-hidden ${
                      preview ? "border-black bg-white" : "border-gray-200 bg-gray-50/70 hover:border-black hover:bg-white"
                    }`}
                  >
                    {preview ? (
                      <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-black">
                        <UploadCloud size={30} />
                        <span className="text-xs font-bold mt-2">Click to upload</span>
                        <span className="text-[10px] mt-1">PNG, JPG, WEBP up to 4MB</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Title</label>
                <input 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none font-bold text-sm" 
                  placeholder="Blog Title" 
                  value={formData.title} 
                  onChange={handleTitleChange} 
                  required 
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Slug</label>
                <input 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs text-gray-500" 
                  placeholder="Slug (Auto-generated)" 
                  value={formData.slug} 
                  readOnly
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Short Description</label>
                <textarea 
                  className="w-full bg-gray-50 p-4 rounded-xl outline-none text-sm h-20" 
                  placeholder="Short Description (For Hero Section)" 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Category</label>
                  <select 
                    className="w-full bg-gray-50 p-4 rounded-xl outline-none text-sm font-bold"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, filterTag: e.target.value })}
                  >
                    <option value="Games">Games</option>
                    <option value="Voice">Voice</option>
                    <option value="Tech Innovations">Tech Innovations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] ml-2">Author</label>
                  <input 
                    className="w-full bg-gray-50 p-4 rounded-xl outline-none text-sm" 
                    placeholder="Author Name" 
                    value={formData.author} 
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
                  />
                </div>
              </div>

              <input 
                className="w-full bg-gray-50 p-4 rounded-xl outline-none text-sm" 
                placeholder="Filter Tag" 
                value={formData.filterTag}
                onChange={(e) => setFormData({ ...formData, filterTag: e.target.value })}
              />

              <button 
                disabled={uploading} 
                className="w-full py-4 rounded-xl font-black text-white bg-[#0066b2] shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform disabled:bg-gray-300"
              >
                {uploading ? "Uploading..." : editId ? "Update" : "Publish"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* CONTENT SECTIONS EDITOR */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-lg">Content Sections</h3>
              <div className="flex gap-2 flex-wrap">
                <button 
                  type="button"
                  onClick={() => addSection("heading")}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200"
                >
                  + Heading
                </button>
                <button 
                  type="button"
                  onClick={() => addSection("paragraph")}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-bold hover:bg-green-200"
                >
                  + Paragraph
                </button>
                <button 
                  type="button"
                  onClick={() => addSection("list")}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold hover:bg-purple-200"
                >
                  + List
                </button>
                <button 
                  type="button"
                  onClick={() => addSection("quote")}
                  className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold hover:bg-orange-200"
                >
                  + Quote
                </button>
                <button 
                  type="button"
                  onClick={() => addSection("image")}
                  className="px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg text-xs font-bold hover:bg-cyan-200"
                >
                  + Image
                </button>
                <button 
                  type="button"
                  onClick={() => addSection("highlight")}
                  className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-200"
                >
                  + Highlight
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.sections.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Add a section →</p>
              ) : (
                formData.sections.map((section, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold uppercase text-gray-500">
                        {section.type === "heading" && "Heading"}
                        {section.type === "paragraph" && "Paragraph"}
                        {section.type === "list" && "List"}
                        {section.type === "quote" && "Quote"}
                        {section.type === "image" && "Image"}
                        {section.type === "highlight" && "Highlight"}
                      </span>
                      <button 
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-500 hover:bg-red-100 p-1 rounded"
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    {section.type === "heading" && (
                      <input
                        type="text"
                        value={section.text}
                        onChange={(e) => updateSection(index, "text", e.target.value)}
                        className="w-full bg-white p-3 rounded-lg border border-gray-200 outline-none text-sm font-bold"
                        placeholder="Write heading"
                      />
                    )}

                    {section.type === "paragraph" && (
                      <textarea
                        value={section.text}
                        onChange={(e) => updateSection(index, "text", e.target.value)}
                        className="w-full bg-white p-3 rounded-lg border border-gray-200 outline-none text-sm h-20"
                        placeholder="Write paragraph"
                      />
                    )}

                    {section.type === "list" && (
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                              className="flex-1 bg-white p-2 rounded-lg border border-gray-200 outline-none text-sm"
                              placeholder={`Item ${itemIndex + 1}`}
                            />
                            <button 
                              type="button"
                              onClick={() => removeListItem(index, itemIndex)}
                              className="text-red-500 hover:bg-red-100 p-2 rounded"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button"
                          onClick={() => addListItem(index)}
                          className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-gray-500 hover:bg-white"
                        >
                          + Add Item
                        </button>
                      </div>
                    )}

                    {section.type === "quote" && (
                      <textarea
                        value={section.text}
                        onChange={(e) => updateSection(index, "text", e.target.value)}
                        className="w-full bg-white p-3 rounded-lg border border-gray-200 outline-none text-sm h-16"
                        placeholder="Write quote"
                      />
                    )}

                    {section.type === "highlight" && (
                      <textarea
                        value={section.text}
                        onChange={(e) => updateSection(index, "text", e.target.value)}
                        className="w-full bg-white p-3 rounded-lg border border-gray-200 outline-none text-sm h-16"
                        placeholder="Write highlight text"
                      />
                    )}

                    {section.type === "image" && (
                      <div className="space-y-2">
                        <input type="file" id={`section-image-${index}`} className="hidden" accept="image/*" onChange={(e) => handleSectionImageUpload(index, e.target.files?.[0])} />
                        <label
                          htmlFor={`section-image-${index}`}
                          className={`flex items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden ${
                            section.src ? "border-black bg-white" : "border-gray-200 bg-gray-50 hover:border-black hover:bg-white"
                          }`}
                        >
                          {section.src ? (
                            <img src={section.src} alt={section.alt || "Section image"} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center text-gray-400">
                              <UploadCloud size={24} />
                              <span className="text-xs font-bold mt-2">Click to upload section image</span>
                            </div>
                          )}
                        </label>

                        <input
                          type="text"
                          value={section.alt || ""}
                          onChange={(e) => updateSection(index, "alt", e.target.value)}
                          className="w-full bg-white p-3 rounded-lg border border-gray-200 outline-none text-sm"
                          placeholder="Alt text"
                        />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BLOGS LIST */}
      <div className="mt-16">
        <h2 className="text-2xl font-black mb-8">Published Blogs</h2>
        <div className="grid gap-6">
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
                <img src={blog.image} className="w-24 h-24 rounded-2xl object-cover" alt={blog.title} />
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