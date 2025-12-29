"use client";

import { API } from "@/app/config/api";
import { useEffect, useState } from "react";

export default function CaseForm({ refresh, editing, clearEdit }) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [isReverse, setIsReverse] = useState(false);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [stats, setStats] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setSlug(editing.slug);
      setDescription(editing.description);
      setTag(editing.tag);
      setIsReverse(editing.isReverse);
      setImage(editing.image);
      setPreview(editing.image);
      setStats(editing.stats || []);
    }
  }, [editing]);

  // Image upload function
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(API.uploadImage, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    


    const data = await res.json();
    return data.url;
  };

  // Stats handlers
  const addStat = () => {
    setStats([...stats, { label: "", value: "", isIcon: false }]);
  };

  const updateStat = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please wait for image upload to finish");
      return;
    }

    const payload = {
      title,
      slug,
      description,
      tag,
      image,
      isReverse,
      stats,
    };

    const url = editing
      ? `${API.featuredCaseStudies}/${editing._id}`
      : API.featuredCaseStudies;

    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    clearForm();
    refresh();
  };

  const clearForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setTag("");
    setImage("");
    setPreview("");
    setIsReverse(false);
    setStats([]);
    clearEdit && clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-4">
      <h2 className="font-semibold">
        {editing ? "Edit Case Study" : "Add New Case Study"}
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="border p-2 w-full"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isReverse}
          onChange={(e) => setIsReverse(e.target.checked)}
        />
        Reverse Layout
      </label>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          setUploading(true);
          setPreview(URL.createObjectURL(file));

          try {
            const url = await uploadImage(file);
            setImage(url);
          } catch (err) {
            alert("Image upload failed");
            setPreview("");
          } finally {
            setUploading(false);
          }
        }}
      />

      {preview && (
        <img
          src={preview}
          className="w-full h-40 object-cover rounded"
        />
      )}

      {/* Stats */}
      <div className="border rounded p-3 space-y-3">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Stats</p>
          <button
            type="button"
            onClick={addStat}
            className="text-sm bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Stat
          </button>
        </div>

        {stats.map((stat, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
          >
            <input
              className="border p-2"
              placeholder="Label"
              value={stat.label}
              onChange={(e) =>
                updateStat(index, "label", e.target.value)
              }
            />

            <input
              className="border p-2"
              placeholder="Value"
              value={stat.value}
              onChange={(e) =>
                updateStat(index, "value", e.target.value)
              }
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={stat.isIcon}
                onChange={(e) =>
                  updateStat(index, "isIcon", e.target.checked)
                }
              />
              Is Icon
            </label>

            <button
              type="button"
              onClick={() => removeStat(index)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        disabled={uploading}
        className={`px-6 py-2 rounded text-white ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black"
        }`}
      >
        {uploading
          ? "Uploading image..."
          : editing
          ? "Update"
          : "Create"}
      </button>
    </form>
  );
}
