"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";

const ServiceMegaMenu = ({ isOpen, onClose }) => {
    const servicesData = {
        "Digital Marketing": [
            "Call Tracking",
            "Phone Number",
            "Call Attribution",
            "Call Attribution",
            "Call Tracking",
            "Phone Number",
            "Call Attribution",
            "Call Attribution",
        ],
        Localization: ["Translation", "Website Localization", "App Localization"],
        "Content Distribution": ["SEO Writing", "Social Media", "Email Marketing"],
        "Voice-Over": ["Studio Recording", "AI Voice", "Dubbing"],
        "LQA / Testing": ["Quality Assurance", "UI Testing", "UX Review"],
    };

    const [activeTab, setActiveTab] = useState("Digital Marketing");

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-x-0 top-[12%] mx-auto z-[100] bg-white overflow-y-auto no-scrollbar md:overflow-hidden"
            style={{
                width: 'min(95vw, 1195px)',           // Responsive width
                height: 'auto',                      // Auto height for mobile
                maxHeight: '85vh',                   // Prevents overflowing screen height
                minHeight: 'min-content',
                padding: 'min(24px, 6vw)',           // Responsive padding for small screens
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px',
                background: '#FFFFFF',
                boxShadow: '0 39px 91.3px 0 rgba(0, 0, 0, 0.40)',
            }}
        >
            {/* Wrapper for Desktop alignment consistency */}
            <div className="flex flex-col w-full h-full md:min-h-[424px]">
                
                {/* Header Tabs */}
                <div className="flex items-center justify-between w-full pb-4 shrink-0">
                    <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {Object.keys(servicesData).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 md:px-6 py-2 md:py-3 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === tab
                                    ? "bg-[#EBF5FF] text-[#0A0A0A]"
                                    : "bg-transparent text-[#0A0A0A] hover:bg-gray-50"
                                    }`}
                                style={{
                                    fontFamily: 'var(--font-poppins), sans-serif',
                                    fontSize: 'clamp(14px, 4vw, 18px)', // Fluid font size
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: '150%',
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full ml-2">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full overflow-visible">
                    
                    {/* Left Column: Sub Services Grid */}
                    <div className="md:col-span-8 order-2 md:order-1">
                        <p
                            className="mb-4 px-2 text-left"
                            style={{
                                color: '#002C4C',
                                fontFamily: 'var(--font-poppins), sans-serif',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                lineHeight: '150%',
                            }}
                        >
                            Sub Service
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            {servicesData[activeTab].map((sub, index) => (
                                <button
                                    key={index}
                                    className="flex items-start justify-between w-full transition-all duration-300 group active:scale-[0.98] 
                                     bg-[#F5F5F5] hover:bg-[#0168B4] hover:shadow-lg hover:shadow-blue-100"
                                    style={{
                                        display: 'flex',
                                        padding: '16px',
                                        alignItems: 'flex-start',
                                        gap: '8px',
                                        alignSelf: 'stretch',
                                        borderRadius: '12px',
                                        fontWeight: '500',
                                    }}
                                >
                                    <span
                                        className="transition-colors duration-300 text-[#404040] group-hover:text-white"
                                        style={{
                                            fontFamily: 'var(--font-poppins), sans-serif',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {sub}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Explore/Promo Card */}
                    <div className="md:col-span-4 md:pl-4 order-1 md:order-2">
                        <p
                            className="mb-4 tracking-tight text-left"
                            style={{
                                color: '#015FA4',
                                fontFamily: 'var(--font-poppins), sans-serif',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                lineHeight: '150%',
                                textAlign: 'left'
                            }}
                        >
                            Explore
                        </p>
                        <div
                            className="relative overflow-hidden group cursor-pointer w-full md:w-[300px]"
                            style={{
                                aspectRatio: '300 / 200', // Keeps desktop aspect ratio
                                height: 'auto',
                                borderRadius: '32px',
                            }}
                        >
                            <img
                                src="image.png"
                                alt="Platform Overview"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{
                                    background: 'lightgray 50% / cover no-repeat'
                                }}
                            />
                        </div>
                        <div className="mt-4">
                            <h4
                                style={{
                                    color: '#2F2F2F',
                                    fontFamily: 'var(--font-poppins), sans-serif',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: '160%',
                                    letterSpacing: '0.16px',
                                    textAlign: 'left'
                                }}
                            >
                                Platform Overview
                            </h4>
                            <p
                                className="mt-1"
                                style={{
                                    color: '#4F4F4F',
                                    fontFamily: 'var(--font-poppins), sans-serif',
                                    fontSize: '12px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: '140%',
                                    letterSpacing: '0.228px',
                                    textAlign: 'left'
                                }}
                            >
                                Take a free tour of our platform features
                            </p>
                            <Link
                                href="/services"
                                className="flex items-center gap-1 mt-2 hover:gap-2 transition-all duration-300 group"
                                style={{
                                    color: '#0168B4',
                                    fontFamily: 'var(--font-poppins), sans-serif',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: '150%',
                                    textDecoration: 'none'
                                }}
                            >
                                <span className="group-hover:underline">Service Page</span>
                                <ChevronRight
                                    size={22}
                                    className="transition-transform group-hover:translate-x-1"
                                    style={{ color: '#0168B4' }}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceMegaMenu;