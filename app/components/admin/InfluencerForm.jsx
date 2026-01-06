"use client";
import { API } from "@/app/config/api";
import { useEffect, useState } from "react";

export default function InfluencerForm({
  refresh,
  editing,
  setEditing,
  isUploading,
  setIsUploading,
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setRole(editing.role);
      setImage(null);
    }
  }, [editing]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      if (image) formData.append("image", image);

      const url = editing
        ? `${API.OurInfluencer.getInfluencers}/${editing._id}`
        : API.OurInfluencer.getInfluencers;

      const method = editing ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setName("");
      setRole("");
      setImage(null);
      setEditing(null);
      refresh();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <h2 className="text-2xl font-black mb-6">
        {editing ? "Update Influencer" : "Add Influencer"}
      </h2>

      <div className="grid gap-5">
        {/* Name */}
        <input
          type="text"
          placeholder="Influencer Name"
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isUploading}
        />

        {/* Role */}
        <input
          type="text"
          placeholder="Role / Position"
          className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={isUploading}
        />

        {/* Image */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-gray-900 file:text-white
              hover:file:bg-blue-600
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isUploading}
            className={`flex-1 py-3 rounded-xl font-bold transition ${
              isUploading
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isUploading
              ? "Uploading..."
              : editing
              ? "Update Influencer"
              : "Add Influencer"}
          </button>

          {editing && (
            <button
              type="button"
              disabled={isUploading}
              onClick={() => setEditing(null)}
              className={`px-6 py-3 rounded-xl font-bold transition ${
                isUploading
                  ? "bg-gray-200 cursor-not-allowed text-gray-400"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
