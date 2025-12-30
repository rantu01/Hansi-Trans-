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
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10 md:space-y-14">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Work Process Admin</h1>

      {/* ================= STEPS ================= */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">Process Steps</h2>

        <form
          onSubmit={handleStepSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-8"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Key</label>
            <input
              placeholder="e.g. step1"
              className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
              value={stepForm.key}
              onChange={(e) => setStepForm({ ...stepForm, key: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">Icon Name</label>
            <input
              placeholder="e.g. Rocket"
              className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
              value={stepForm.icon}
              onChange={(e) => setStepForm({ ...stepForm, icon: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 ml-1">Title</label>
            <input
              placeholder="Step Title"
              className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
              value={stepForm.title}
              onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 ml-1">Description</label>
            <textarea
              placeholder="Detailed explanation..."
              className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
              rows={3}
              value={stepForm.description}
              onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-semibold text-gray-500 ml-1">Icon Position</label>
            <select
              className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black bg-white"
              value={stepForm.iconPosition}
              onChange={(e) => setStepForm({ ...stepForm, iconPosition: e.target.value })}
            >
              <option value="top">Icon Top</option>
              <option value="bottom">Icon Bottom</option>
            </select>
          </div>

          <button
            disabled={loading}
            className={`py-3 rounded-lg font-bold text-white md:col-span-2 transition-all active:scale-[0.98] ${
                loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
          >
            {editingStepIndex !== null ? "Update Step" : "Add New Step"}
          </button>
        </form>

        <div className="space-y-3">
          {steps.map((s, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm gap-4"
            >
              <div className="flex-grow">
                <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-1 rounded text-gray-500">{s.key}</span>
                <h3 className="font-bold text-gray-900 mt-1">{s.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{s.description}</p>
                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                  Icon: {s.icon} | Position: {s.iconPosition}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0">
                <button
                  onClick={() => {
                    setEditingStepIndex(i);
                    setStepForm(s);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStep(i)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STUDIOS ================= */}
      <section className="pb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">Partner Studios</h2>

        <form
          onSubmit={handleStudioSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
        >
          <input
            placeholder="Code (CN, JP)"
            className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
            value={studioForm.code}
            onChange={(e) => setStudioForm({ ...studioForm, code: e.target.value })}
            required
          />
          <input
            placeholder="Studio Name"
            className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
            value={studioForm.name}
            onChange={(e) => setStudioForm({ ...studioForm, name: e.target.value })}
            required
          />
          <input
            placeholder="Language"
            className="border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-black"
            value={studioForm.language}
            onChange={(e) => setStudioForm({ ...studioForm, language: e.target.value })}
            required
          />

          <button
            disabled={loading}
            className={`py-3 rounded-lg font-bold text-white sm:col-span-2 md:col-span-3 transition-all active:scale-[0.98] ${
                loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
            }`}
          >
            {editingStudioIndex !== null ? "Update Studio" : "Add Studio"}
          </button>
        </form>
        
        {/* Studio List Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studios.map((st, i) => (
                <div key={i} className="bg-white border p-4 rounded-xl shadow-sm flex justify-between items-center group">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-black">{st.code}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm font-medium text-gray-600">{st.language}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{st.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                setEditingStudioIndex(i);
                                setStudioForm(st);
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deleteStudio(i)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}