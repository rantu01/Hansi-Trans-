"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API } from "@/app/config/api";
import ServiceEditorForm from "@/app/components/admin/services/ServiceEditorForm";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [mainServices, setMainServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API.services.main);
        if (!response.data.success) {
          throw new Error("Failed to fetch services.");
        }

        const allServices = response.data.data || [];
        const currentService = allServices.find((item) => item._id === params.id);

        if (!currentService) {
          toast.error("Service not found.");
          router.push("/admin/services");
          return;
        }

        setService(currentService);
        setMainServices(allServices.filter((item) => !item.parentService));
      } catch (error) {
        toast.error(error.message || "Failed to load service.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleSave = async (payload) => {
    const loadingToast = toast.loading("Updating service...");

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${params.id}`, payload);
      toast.success("Service updated successfully.", { id: loadingToast });
      router.push("/admin/services");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update service.";
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

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Edit Service</h1>
              <p className="text-slate-500">Update the service structure and all page-level content from one place.</p>
            </div>
            <ServiceEditorForm mode="edit" initialData={service} mainServices={mainServices} submitLabel="Update Service" onSave={handleSave} />
          </>
        )}
      </div>
    </div>
  );
}