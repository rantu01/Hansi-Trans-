"use client";

import { useEffect, useState } from "react";
import { API } from "@/app/config/api";

const EMPTY_STEP = {
  key: "",
  title: "",
  description: "",
  icon: "",
  iconPosition: "bottom",
};

const EMPTY_STUDIO = {
  code: "",
  name: "",
  language: "",
};

export default function WorkProcessAdmin() {
  const [steps, setSteps] = useState([]);
  const [studios, setStudios] = useState([]);

  const [stepForm, setStepForm] = useState(EMPTY_STEP);
  const [studioForm, setStudioForm] = useState(EMPTY_STUDIO);

  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [editingStudioIndex, setEditingStudioIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  /* ================= FETCH ================= */
  const fetchData = async () => {
    const res = await fetch(API.WorkProcess, {
      cache: "no-store",
    });
    const data = await res.json();

    setSteps(Array.isArray(data.steps) ? data.steps : []);
    setStudios(Array.isArray(data.studios) ? data.studios : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SAVE ================= */
  const saveAll = async (newSteps, newStudios) => {
    setLoading(true);

    const res = await fetch(API.WorkProcess, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        steps: newSteps,
        studios: newStudios,
      }),
    });

    if (!res.ok) {
      alert("Update failed");
    }

    await fetchData();
    setLoading(false);
  };

  /* ================= STEP SUBMIT ================= */
  const handleStepSubmit = async (e) => {
    e.preventDefault();

    const updated = [...steps];
    const cleanStep = { ...stepForm };

    if (editingStepIndex !== null) {
      updated[editingStepIndex] = cleanStep;
    } else {
      updated.push(cleanStep);
    }

    await saveAll(updated, studios);
    setStepForm(EMPTY_STEP);
    setEditingStepIndex(null);
  };

  /* ================= STUDIO SUBMIT ================= */
  const handleStudioSubmit = async (e) => {
    e.preventDefault();

    const updated = [...studios];
    const cleanStudio = { ...studioForm };

    if (editingStudioIndex !== null) {
      updated[editingStudioIndex] = cleanStudio;
    } else {
      updated.push(cleanStudio);
    }

    await saveAll(steps, updated);
    setStudioForm(EMPTY_STUDIO);
    setEditingStudioIndex(null);
  };

  /* ================= DELETE ================= */
  const deleteStep = async (index) => {
    if (!confirm("Delete this step?")) return;
    const updated = steps.filter((_, i) => i !== index);
    await saveAll(updated, studios);
  };

  const deleteStudio = async (index) => {
    if (!confirm("Delete this studio?")) return;
    const updated = studios.filter((_, i) => i !== index);
    await saveAll(steps, updated);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-14">
      <h1 className="text-3xl font-bold">Work Process – Admin Panel</h1>

      {/* ================= STEPS ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">Process Steps</h2>

        <form
          onSubmit={handleStepSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-6"
        >
          <input
            placeholder="Key (step1, step2...)"
            className="border p-2 rounded"
            value={stepForm.key}
            onChange={(e) =>
              setStepForm({ ...stepForm, key: e.target.value })
            }
            required
          />

          <input
            placeholder="Icon (Search, Users, Rocket...)"
            className="border p-2 rounded"
            value={stepForm.icon}
            onChange={(e) =>
              setStepForm({ ...stepForm, icon: e.target.value })
            }
          />

          <input
            placeholder="Title"
            className="border p-2 rounded col-span-2"
            value={stepForm.title}
            onChange={(e) =>
              setStepForm({ ...stepForm, title: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            className="border p-2 rounded col-span-2"
            rows={3}
            value={stepForm.description}
            onChange={(e) =>
              setStepForm({ ...stepForm, description: e.target.value })
            }
            required
          />

          <select
            className="border p-2 rounded col-span-2"
            value={stepForm.iconPosition}
            onChange={(e) =>
              setStepForm({ ...stepForm, iconPosition: e.target.value })
            }
          >
            <option value="top">Icon Top</option>
            <option value="bottom">Icon Bottom</option>
          </select>

          <button
            disabled={loading}
            className="bg-black text-white py-2 rounded col-span-2"
          >
            {editingStepIndex !== null ? "Update Step" : "Add Step"}
          </button>
        </form>

        {steps.map((s, i) => (
          <div
            key={i}
            className="border rounded p-4 mb-2 flex justify-between bg-white"
          >
            <div>
              <p className="text-xs text-gray-400">{s.key}</p>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.description}</p>
              <p className="text-xs text-gray-400">
                Icon: {s.icon} ({s.iconPosition})
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingStepIndex(i);
                  setStepForm({
                    key: s.key,
                    title: s.title,
                    description: s.description,
                    icon: s.icon || "",
                    iconPosition: s.iconPosition || "bottom",
                  });
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStep(i)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= STUDIOS ================= */}
      <div>
        <h2 className="text-xl font-bold mb-4">Partner Studios</h2>

        <form
          onSubmit={handleStudioSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded shadow mb-6"
        >
          <input
            placeholder="Code (CN, JP)"
            className="border p-2 rounded"
            value={studioForm.code}
            onChange={(e) =>
              setStudioForm({ ...studioForm, code: e.target.value })
            }
            required
          />
          <input
            placeholder="Studio Name"
            className="border p-2 rounded"
            value={studioForm.name}
            onChange={(e) =>
              setStudioForm({ ...studioForm, name: e.target.value })
            }
            required
          />
          <input
            placeholder="Language"
            className="border p-2 rounded"
            value={studioForm.language}
            onChange={(e) =>
              setStudioForm({ ...studioForm, language: e.target.value })
            }
            required
          />

          <button
            disabled={loading}
            className="bg-black text-white py-2 rounded col-span-3"
          >
            {editingStudioIndex !== null ? "Update Studio" : "Add Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
