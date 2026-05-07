"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { API } from "@/app/config/api";

const normalizeServiceId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
        return value._id || value.id || value.toString?.() || "";
    }
    return String(value);
};

const normalizeService = (value) => {
    if (!value || typeof value !== "object") return null;

    return {
        _id: normalizeServiceId(value),
        title: value.title || "",
        slug: value.slug || "",
        image: value.image || "",
        description: value.description || "",
    };
};

const RelatedServices = ({ relatedServices, relatedIds }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const providedServices = useMemo(
        () => (Array.isArray(relatedServices) ? relatedServices.map(normalizeService).filter(Boolean) : []),
        [relatedServices]
    );

    const providedIds = useMemo(
        () => (Array.isArray(relatedIds) ? relatedIds.map(normalizeServiceId).filter(Boolean) : []),
        [relatedIds]
    );

    useEffect(() => {
        const fetchRelatedServices = async () => {
            try {
                if (providedServices.length > 0) {
                    setServices(providedServices.slice(0, 4));
                    return;
                }

                // fetch all services then filter by provided relatedIds if given
                const response = await fetch(API.services.main);
                const result = await response.json();
                if (result.success) {
                    const list = Array.isArray(result.data) ? result.data : [];

                    if (providedIds.length > 0) {
                        const lookup = new Map(list.map((service) => [String(service._id), service]));
                        const selected = providedIds
                            .map((id) => lookup.get(String(id)))
                            .filter(Boolean);
                        setServices(selected.slice(0, 4));
                    } else {
                        setServices(list.slice(0, 4));
                    }
                }
            } catch (err) {
                console.error("Failed to fetch related services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRelatedServices();
    }, [providedIds, providedServices]);

    if (loading) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <h2
                    className="mb-12"
                    style={{
                        color: '#0168B4',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 'clamp(32px, 5vw, 56px)',
                        fontWeight: '500',
                        lineHeight: '120%',
                    }}
                >
                    Related More Service
                </h2>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 items-stretch">
                    {services.map((service) => (
                        <div key={service._id} className="flex flex-col group h-full">
                            {/* Service Image */}
                            <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-6">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Service Content */}
                            <div className="flex-1">
                                <h3
                                    className="mb-3"
                                    style={{
                                        color: '#0A0A0A',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '24px',
                                        fontWeight: '600',
                                        lineHeight: '130%',
                                    }}
                                >
                                    {service.title}
                                </h3>

                                <p
                                    className="mb-6 line-clamp-3"
                                    style={{
                                        color: '#616161',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '160%',
                                    }}
                                >
                                    {service.description}
                                </p>
                            </div>

                            {/* Individual Explore Button */}
                            <Link
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0168B4] text-[#0168B4] font-medium transition-all duration-300 hover:bg-[#0168B4] hover:text-white w-fit"
                                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px' }}
                            >
                                Explore Services
                                <div className="w-8 h-8 rounded-full bg-[#0168B4] flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                                    <ArrowUpRight size={18} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom Central Action Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/services"
                        className="group flex items-center justify-between transition-all duration-300 hover:shadow-lg active:scale-95"
                        style={{
                            width: '180px',
                            height: '52px',
                            padding: '4px 4px 4px 12px',
                            gap: '8px',
                            borderRadius: '100px',
                            background: '#0168B4', // আপনার আগের থিম কালার অনুযায়ী
                            opacity: 1,
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'Poppins, sans-serif', // আপনার 'Family/Body' অনুযায়ী
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '160%',
                                letterSpacing: '0.16px', // 1% of 16px
                                textTransform: 'capitalize',
                                color: '#FFFFFF',
                            }}
                        >
                            Service Page
                        </span>

                        <div
                            className="rounded-full bg-white flex items-center justify-center text-[#0168B4] transition-transform group-hover:rotate-45"
                            style={{
                                width: '44px', // ৫২পিএক্স হাইট থেকে ৪পিএক্স করে প্যাডিং বাদ দিলে এটা পারফেক্ট দেখাবে
                                height: '44px',
                            }}
                        >
                            <ArrowUpRight size={20} strokeWidth={2.5} />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;