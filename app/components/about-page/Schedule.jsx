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
        firstName: "", lastName: "", email: "", company: "",
        service: "", phone: "", message: "", agree: false, nda: false,
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
    <section className="bg-background py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side */}
        <div className="flex flex-col">
          {/* Replaced text-[#0066b2] with primary */}
          <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-8 uppercase">
            Let's Talk And <br /> Create Schedule
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
            Our services help you create digital products and solve your
            problems objectively, strategy, technology and analysis.
          </p>

          <div className="mt-12 hidden lg:block opacity-30">
            {/* Replaced blue-100 with gradient-base */}
            <div className="w-64 h-64 bg-gradient-to-tr from-gradient-base to-transparent rounded-full blur-3xl"></div>
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
              className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none transition-colors"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none transition-colors"
            />
          </div>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none w-full transition-colors"
          />

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company or studio name"
            className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none w-full transition-colors"
          />

          <div className="relative">
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm w-full appearance-none outline-none transition-colors"
            >
              <option value="">Select Services</option>
              <option value="Localization">Localization</option>
              <option value="Voice-Over">Voice-Over</option>
              <option value="Marketing">Marketing</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          </div>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none w-full transition-colors"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your project"
            className="bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-lg px-4 py-4 text-sm outline-none w-full resize-none transition-colors"
          />

          {/* File Upload - Adjusted border color to primary/20 */}
          <label className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors">
            <Upload className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-gray-700">
              {file ? file.name : "Attachment (optional)"}
            </span>
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Checkbox color handling */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs text-gray-500">
                You agree to our friendly privacy policy.
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="nda"
                checked={form.nda}
                onChange={handleChange}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs text-gray-500 italic">
                NDA (Non Disclosure Agreement)
              </span>
            </label>
          </div>

          {/* Button - Standardized with previous sections */}
          <button
            disabled={loading}
            className="flex items-center gap-3 bg-primary hover:bg-accent text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 group disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send message"}
            <span className="bg-white rounded-full p-1.5 group-hover:rotate-45 transition-transform">
              <ArrowUpRight size={18} className="text-primary" />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Schedule;