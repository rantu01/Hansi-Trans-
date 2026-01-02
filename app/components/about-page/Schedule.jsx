"use client";

import React, { useState } from "react";
import { Upload, ArrowUpRight, ChevronDown } from "lucide-react";
import { API } from "@/app/config/api";

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    phone: "",
    message: "",
    agree: false,
    nda: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("Please agree to the privacy policy.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file) formData.append("file", file);

      const res = await fetch(API.contact.schedule, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      alert("Message sent successfully!");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        service: "",
        phone: "",
        message: "",
        agree: false,
        nda: false,
      });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left */}
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2] leading-tight mb-8">
            Let's Talk And Create <br /> Schedule
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
            Our services help you create digital products and solve your
            problems objectively, strategy, technology and analysis.
          </p>

          <div className="mt-12 hidden lg:block opacity-50">
            <div className="w-64 h-64 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Right Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none"
            />
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none w-full"
          />

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company or studio name"
            className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none w-full"
          />

          <div className="relative">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm w-full appearance-none"
            >
              <option value="">Select Services</option>
              <option value="Localization">Localization</option>
              <option value="Voice-Over">Voice-Over</option>
              <option value="Marketing">Marketing</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none w-full"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your project"
            className="bg-[#f1f7fc] rounded-lg px-4 py-3 text-sm outline-none w-full resize-none"
          />

          {/* File */}
          <label className="border-2 border-dashed border-blue-200 bg-gray-50/50 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">
              {file ? file.name : "Attachment (optional)"}
            </span>
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Checkbox */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span className="text-xs text-gray-500">
              You agree to our friendly privacy policy.
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="nda"
              checked={form.nda}
              onChange={handleChange}
            />
            <span className="text-xs text-gray-500 italic">
              NDA (Non Disclosure Agreement)
            </span>
          </label>

          <button
            disabled={loading}
            className="flex items-center gap-3 bg-[#0066b2] text-white px-8 py-3 rounded-full font-medium group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send massage"}
            <span className="bg-white rounded-full p-1 group-hover:rotate-45 transition">
              <ArrowUpRight size={18} className="text-[#0066b2]" />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Schedule;
