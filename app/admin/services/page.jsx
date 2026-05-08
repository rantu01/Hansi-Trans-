"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Filter, Layers, Loader2, Pencil, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { API } from "@/app/config/api";

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  const fetchAllServices = async () => {
    try {
      const response = await axios.get(API.services.main);
      if (response.data.success) {
        setServices(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  const filteredServices = useMemo(() => {
    if (filterType === "main") {
      return services.filter((service) => !service.parentService);
    }

    if (filterType === "sub") {
      return services.filter((service) => service.parentService);
    }

    return services;
  }, [filterType, services]);

  const [expanded, setExpanded] = useState({});

  const mainServicesList = useMemo(() => services.filter((s) => !s.parentService), [services]);

  const getSubServices = (parentId) =>
    services.filter((s) => {
      if (!s.parentService) return false;
      // parentService may be populated object or an id string
      const parent = s.parentService._id || s.parentService;
      return parent === parentId;
    });

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const deleteService = async (id) => {
    const result = await Swal.fire({
      title: "Delete this service?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
      customClass: { popup: "rounded-[2rem] font-sans" },
    });

    if (!result.isConfirmed) {
      return;
    }

    const loadingToast = toast.loading("Deleting service...");
    try {
      await axios.delete(API.services.delete(id));
      toast.success("Service deleted.", { id: loadingToast });
      fetchAllServices();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete service.", { id: loadingToast });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Service Directory</h1>
            <p className="mt-1 text-slate-500">Manage all main services and sub-service page content from the admin panel.</p>
          </div>
          <Link href="/admin/services/add" className="inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition hover:bg-blue-600">
            <Plus size={20} /> Add New Service
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-[1.8rem] border border-slate-200 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 overflow-x-auto rounded-2xl bg-slate-100 p-1 sm:w-auto">
            {["all", "main", "sub"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`whitespace-nowrap rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition ${filterType === type ? "bg-white text-blue-600 shadow" : "text-slate-500 hover:text-slate-800"}`}
              >
                {type === "all" ? `All (${services.length})` : type === "main" ? "Main" : "Sub"}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-400 md:flex">
            <Filter size={14} /> {filteredServices.length} Records
          </div>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-32">
              <Loader2 className="animate-spin text-blue-500" size={48} />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading services...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-black uppercase tracking-[2px] text-slate-400">
                    <th className="px-8 py-6">Service</th>
                    <th className="px-8 py-6">Type</th>
                    <th className="px-8 py-6">Path</th>
                    <th className="px-8 py-6">Parent</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filterType === "sub" ? (
                    filteredServices.map((service) => (
                      <tr key={service._id} className="transition hover:bg-blue-50/40">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <img src={service.image || "https://via.placeholder.com/160x120"} alt={service.title} className="h-12 w-12 rounded-lg object-cover border border-slate-200" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">{service.title}</p>
                              <p className="text-xs text-slate-400">{service.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-black uppercase text-blue-700">
                            <Layers size={12} /> Sub Service
                          </span>
                        </td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{service.slugPath || service.slug}</td>
                        <td className="px-8 py-5 text-sm text-slate-500">{service.parentService?.title || "-"}</td>
                        <td className="px-8 py-5">
                          <div className="flex justify-end gap-3">
                            <Link href={`/admin/services/${service._id}`} className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-blue-200 hover:bg-white hover:text-blue-600">
                              <Pencil size={18} />
                            </Link>
                            <button type="button" onClick={() => deleteService(service._id)} className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-red-200 hover:bg-white hover:text-red-500">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    mainServicesList.map((main) => {
                      const subs = getSubServices(main._id);
                      return (
                        <React.Fragment key={main._id}>
                          <tr className="transition hover:bg-blue-50/10">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <button type="button" onClick={() => toggleExpand(main._id)} className="rounded-full p-1 text-slate-500 hover:bg-slate-100">
                                  {expanded[main._id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </button>
                                <img src={main.image || "https://via.placeholder.com/160x120"} alt={main.title} className="h-14 w-14 rounded-2xl object-cover border border-slate-200" />
                                <div>
                                  <p className="text-lg font-bold text-slate-900">{main.title}</p>
                                  <p className="text-xs text-slate-400">{main.slug}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-black uppercase text-emerald-700">
                                <Layers size={12} /> Main Service
                              </span>
                            </td>
                            <td className="px-8 py-5 text-sm font-medium text-slate-600">{main.slugPath || main.slug}</td>
                            <td className="px-8 py-5 text-sm text-slate-500">-</td>
                            <td className="px-8 py-5">
                              <div className="flex justify-end gap-3">
                                <Link href={`/admin/services/add?parentService=${main._id}`} className="w-auto rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-emerald-200 hover:bg-white hover:text-emerald-600" title="Add Sub-Service">
                                  <h1>Add Core Digital (Sub Service)</h1>
                                  {/* <Plus size={18} /> */}
                                </Link>
                                <Link href={`/admin/services/${main._id}`} className="text-center rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-blue-200 hover:bg-white hover:text-blue-600">
                                  <Pencil size={18} />
                                </Link>
                                <button type="button" onClick={() => deleteService(main._id)} className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-red-200 hover:bg-white hover:text-red-500">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {expanded[main._id] && subs.length > 0 &&
                            subs.map((service) => (
                              <tr key={service._id} className="bg-blue-50/30">
                                <td className="px-8 py-4">
                                  <div className="flex items-center gap-4">
                                    <div className="ml-8 h-12 w-12 rounded-lg bg-white/40" />
                                    <div>
                                      <p className="text-sm font-semibold text-slate-900">{service.title}</p>
                                      <p className="text-xs text-slate-400">{service.slug}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-4">
                                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-black uppercase text-blue-700">
                                    <Layers size={12} /> Sub Service
                                  </span>
                                </td>
                                <td className="px-8 py-4 text-sm font-medium text-slate-600">{service.slugPath || service.slug}</td>
                                <td className="px-8 py-4 text-sm text-slate-500">{service.parentService?.title || "-"}</td>
                                <td className="px-8 py-4">
                                  <div className="flex justify-end gap-3">
                                    <Link href={`/admin/services/${service._id}`} className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-blue-200 hover:bg-white hover:text-blue-600">
                                      <Pencil size={18} />
                                    </Link>
                                    <button type="button" onClick={() => deleteService(service._id)} className="rounded-xl border border-slate-200 p-3 text-slate-500 transition hover:border-red-200 hover:bg-white hover:text-red-500">
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}