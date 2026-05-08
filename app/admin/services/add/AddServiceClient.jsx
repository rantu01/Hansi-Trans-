"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API } from "@/app/config/api";
import ServiceEditorForm from "@/app/components/admin/services/ServiceEditorForm";

export default function AddServiceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentServiceId = searchParams.get("parentService");
  const [mainServices, setMainServices] = useState([]);
  const [preSelectedParent, setPreSelectedParent] = useState(parentServiceId || "");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (response.data.success) {
          setMainServices(response.data.data.filter((service) => !service.parentService));
        }
      } catch (error) {
        toast.error("Failed to load services list.");
      }
    };

    fetchServices();
  }, []);

  const handleSave = async (payload) => {
    const loadingToast = toast.loading("Creating service...");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/add`, payload);
      toast.success("Service created successfully.", { id: loadingToast });
      router.push("/admin/services");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create service.";
      toast.error(message, { id: loadingToast });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">
          <ArrowLeft size={16} /> Back to Services
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Add Service</h1>
          <p className="text-slate-500">Create a main service or a nested sub-service with fully editable page content.</p>
        </div>
        <ServiceEditorForm mode="create" mainServices={mainServices} submitLabel="Create Service" onSave={handleSave} preSelectedParent={preSelectedParent} />
      </div>
    </div>
  );
}
