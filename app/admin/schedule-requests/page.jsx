"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/app/config/api";
import { CheckCircle2, Clock3, Loader2, Mail, ShieldCheck, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const statusStyles = {
  new: "bg-amber-100 text-amber-700",
  "in-progress": "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
};

export default function ScheduleRequestsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.status === activeFilter);
  }, [activeFilter, items]);

  const fetchRequests = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API.contact.schedule, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to load schedule requests");
      }

      setItems(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      toast.error(error.message || "Failed to load schedule requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    const loadingToast = toast.loading("Updating status...");

    try {
      const res = await fetch(API.contact.updateScheduleStatus(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Status update failed");
      }

      setItems((prev) => prev.map((item) => (item._id === id ? { ...item, status: data.data.status } : item)));
      toast.success("Status updated", { id: loadingToast });
    } catch (error) {
      toast.error(error.message || "Status update failed", { id: loadingToast });
    }
  };

  const deleteRequest = async (id) => {
    const shouldDelete = window.confirm("Delete this request permanently?");
    if (!shouldDelete) return;

    const loadingToast = toast.loading("Deleting request...");

    try {
      const res = await fetch(API.contact.deleteSchedule(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Delete failed");
      }

      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Request deleted", { id: loadingToast });
    } catch (error) {
      toast.error(error.message || "Delete failed", { id: loadingToast });
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Schedule Requests</h1>
            <p className="mt-1 text-slate-500">Manage leads submitted from the About page schedule form.</p>
          </div>
          <button
            type="button"
            onClick={fetchRequests}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Clock3 size={16} /> Refresh
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["all", ...STATUS_OPTIONS.map((option) => option.value)].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                activeFilter === filter ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 text-slate-500">
            <Mail size={30} />
            <p className="font-semibold">No schedule requests found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-200 p-4 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900">
                      {item.firstName} {item.lastName}
                    </h2>
                    <p className="text-sm text-slate-600">{item.email}</p>
                    <p className="text-sm text-slate-500">
                      {item.company || "No company"} | {item.service || "No service selected"}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusStyles[item.status] || "bg-slate-100 text-slate-700"}`}>
                      {item.status || "new"}
                    </span>

                    <select
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      value={item.status || "new"}
                      onChange={(event) => updateStatus(item._id, event.target.value)}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => deleteRequest(item._id)}
                      className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  <p>{item.message || "No message provided."}</p>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck size={13} /> Privacy: {item.agree ? "Yes" : "No"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={13} /> NDA: {item.nda ? "Yes" : "No"}
                  </span>
                  {item.attachment?.originalName ? (
                    <span>
                      Attachment: {item.attachment.originalName} ({Math.ceil((item.attachment.size || 0) / 1024)} KB)
                    </span>
                  ) : (
                    <span>No attachment</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
