"use client";
import { API } from "@/app/config/api";
import { useEffect, useState } from "react";

export default function InfluencerForm({
  refresh,
  editing,
  setEditing,
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
  };

  return (
    <form
      onSubmit={submitHandler}
      className="border p-6 rounded-xl bg-gray-50"
    >
      <h2 className="text-xl font-bold mb-4">
        {editing ? "Edit Influencer" : "Add Influencer"}
      </h2>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Role"
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Update" : "Add"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
