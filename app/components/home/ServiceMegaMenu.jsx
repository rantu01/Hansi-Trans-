"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Link from "next/link";

const ServiceMegaMenu = ({ isOpen, onClose }) => {
    // হার্ডকোডেড ডেটা
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
            className="fixed inset-x-0 top-[12%] mx-auto z-[100] bg-white overflow-hidden"
            style={{
                width: '1195px',                // Exact width spec
                height: '488px',               // Exact height spec
                padding: '32px',               // Exact padding
                borderRadius: '32px',          // Exact border-radius
                display: 'flex',               // Flex container
                flexDirection: 'column',       // Vertical layout
                alignItems: 'flex-start',      // Align content to start
                gap: '24px',                   // Gap between elements
                background: '#FFFFFF',         // White-Shade-900
                boxShadow: '0 39px 91.3px 0 rgba(0, 0, 0, 0.40)', // Exact shadow spec
            }}
        >
            {/* Header Tabs */}
            <div className="flex items-center justify-between w-full  pb-4">
                <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                    {Object.keys(servicesData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap ${activeTab === tab
                                ? "bg-[#EBF5FF] text-[#0A0A0A]"
                                : "bg-transparent text-[#0A0A0A] hover:bg-gray-50"
                                }`}
                            style={{
                                fontFamily: 'var(--font-poppins), sans-serif', // Updated to Poppins
                                fontSize: '18px',                             // Updated to 18px
                                fontStyle: 'normal',                          // Normal style
                                fontWeight: '500',                             // Medium weight
                                lineHeight: '150%',                           // 27px
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} className="text-gray-400" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full overflow-hidden">
                {/* Left Column: Sub Services Grid */}
                <div className="md:col-span-8">
                    <p
                        className="mb-4 px-2 text-left"
                        style={{
                            color: '#002C4C',                         // Updated to Primary-blue-900
                            fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                            fontSize: '14px',                        // 14px size
                            fontStyle: 'normal',                     // Normal style
                            fontWeight: '500',                        // Medium weight
                            lineHeight: '150%',                      // 21px line-height
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
                                    display: 'flex',                      // Flex container
                                    padding: '16px',                     // Exact padding
                                    alignItems: 'flex-start',            // Align items start
                                    gap: '8px',                          // Gap spec
                                    alignSelf: 'stretch',                // Stretch to container
                                    borderRadius: '12px',  
                                    fontWeight: '500',              // Exact border radius
                                }}
                            >
                                <span
                                    className="transition-colors duration-300 text-[#404040] group-hover:text-white"
                                    style={{
                                        fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                                        fontSize: '16px',                          // 16px size
                                        fontStyle: 'normal',                       // Normal style
                                        fontWeight: '400',                          // Regular weight
                                        lineHeight: '150%',                        // 24px line height
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
                <div className="md:col-span-4 pl-4">
                    <p
                        className="mb-4 tracking-tight text-left"
                        style={{
                            color: '#015FA4',                         // Updated to Primary-blue-600
                            fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                            fontSize: '14px',                        // 14px size
                            fontStyle: 'normal',                     // Normal style
                            fontWeight: '500',                        // Medium weight
                            lineHeight: '150%',                      // 21px line-height
                            textAlign: 'left'                        // Left aligned
                        }}
                    >
                        Explore
                    </p>
                    <div
                        className="relative overflow-hidden group cursor-pointer"
                        style={{
                            width: '300px',          // Exact width spec
                            height: '200px',         // Exact height spec
                            borderRadius: '32px',    // Updated to 32px
                        }}
                    >
                        <img
                            src="image.png"
                            alt="Platform Overview"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{
                                background: 'lightgray 50% / cover no-repeat' // Fallback style
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <h4
                            className="mt-4"
                            style={{
                                color: '#2F2F2F',                         // Exact spec color
                                fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                                fontSize: '16px',                        // Updated to 16px
                                fontStyle: 'normal',                     // Normal style
                                fontWeight: '500',                        // Medium weight
                                lineHeight: '160%',                      // 25.6px line-height
                                letterSpacing: '0.16px',                 // Added letter spacing
                                textAlign: 'left'
                            }}
                        >
                            Platform Overview
                        </h4>
                        <p
                            className="mt-1"
                            style={{
                                color: '#4F4F4F',                         // Exact spec color
                                fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                                fontSize: '12px',                        // Updated to 12px
                                fontStyle: 'normal',                     // Normal style
                                fontWeight: '400',                        // Regular weight
                                lineHeight: '140%',                      // 16.8px line-height
                                letterSpacing: '0.228px',                // Exact letter spacing
                                textAlign: 'left'
                            }}
                        >
                            Take a free tour of our platform features
                        </p>
                        <Link
                            href="/services" // Click korle /services-e niye jabe
                            className="flex items-center gap-1 mt-2  hover:gap-2 transition-all duration-300 group"
                            style={{
                                color: '#0168B4',                         // Exact spec color
                                fontFamily: 'var(--font-poppins), sans-serif', // Poppins font
                                fontSize: '18px',                        // Updated to 18px
                                fontStyle: 'normal',
                                fontWeight: '500',                        // Medium weight
                                lineHeight: '150%',                      // 27px line-height
                                textDecoration: 'none'
                            }}
                        >
                            <span className="group-hover:underline">Book a Demo</span>
                            <ChevronRight
                                size={22}
                                className="transition-transform group-hover:translate-x-1"
                                style={{ color: '#0168B4' }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceMegaMenu;