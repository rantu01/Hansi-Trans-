"use client";

import React, { useEffect, useState } from "react";
import { Upload, ArrowUpRight, ChevronDown } from "lucide-react";
import { API } from "@/app/config/api";

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
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

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const data = await res.json();
        setScheduleData(data?.schedule || null);
      } catch (err) {
        console.error("Failed to fetch schedule content", err);
      }
    };

    fetchSchedule();
  }, []);

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
    <section className="relative bg-background py-12 md:py-20 px-4 md:px-12 font-sans overflow-hidden min-h-[auto] md:min-h-[900px] flex items-center">

      {/* Background Abstract Image - Positioned like the reference */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src="/photo/About US/schedule-bg.png"
          alt="background effect"
          className="hidden md:block absolute left-0 top-[30%] w-[600px] md:w-[800px] opacity-80 object-contain"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">

        {/* Left Side Content */}
        <div className="flex flex-col pt-10">
          <h2 className="leading-[120%] mb-6 text-2xl md:text-[48px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', fontStyle: 'normal', letterSpacing: '0%', textTransform: 'capitalize', color: '#0168B4' }}>
            {scheduleData?.title || "Let’s Talk And Create Schedule"}
          </h2>
          <p
            className="max-w-md mb-8"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400', // Regular
              fontStyle: 'normal',
              fontSize: '16px',
              lineHeight: '150%',
              letterSpacing: '0%',
              color: '#616161'
            }}
          >
            {scheduleData?.description || "Our services help you create digital products and solve your problems objectively, strategy, technology and analysis."}
          </p>


        </div>

        {/* Right Form - Styled exactly like the image */}
        {/* Right Form - Exact Specs Applied */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "160%",
                  letterSpacing: "1%",
                  color: "#7B7B7B", // Updated Color
                }}
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                style={{
                  height: "54px",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  background: "#E6F0F8",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                }}
                className="border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "160%",
                  letterSpacing: "1%",
                  color: "#7B7B7B", // Updated Color
                }}
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                style={{
                  height: "54px",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  background: "#E6F0F8",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "150%",
                }}
                className="border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "1%",
                color: "#7B7B7B", // Updated Color
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              style={{
                height: "54px",
                borderRadius: "12px",
                padding: "12px 16px",
                background: "#E6F0F8",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
              }}
              className="border-none outline-none w-full transition-all"
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "1%",
                color: "#7B7B7B", // Updated Color
              }}
            >
              Company or studio Name
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
              style={{
                height: "54px",
                borderRadius: "12px",
                padding: "12px 16px",
                background: "#E6F0F8",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
              }}
              className="border-none outline-none w-full transition-all"
            />
          </div>

          {/* Service Needed */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "1%",
                color: "#7B7B7B", // Updated Color
              }}
            >
              Service Needed
            </label>
            <div className="relative">
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                style={{
                  height: "54px",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  background: "#E6F0F8",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "400",
                  fontSize: "16px",
                  lineHeight: "150%",
                }}
                className="border-none w-full appearance-none outline-none transition-all text-[#667085]"
              >
                <option value="">Select Services</option>
                <option value="Localization">Localization</option>
                <option value="Voice-Over">Voice-Over</option>
                <option value="Marketing">Marketing</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#667085]" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "1%",
                color: "#7B7B7B", // Updated Color
              }}
            >
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              style={{
                height: "54px",
                borderRadius: "12px",
                padding: "12px 16px",
                background: "#E6F0F8",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
              }}
              className="border-none outline-none w-full transition-all"
            />
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-2">
            <label
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "1%",
                color: "#7B7B7B", // Updated Color
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your message..."
              style={{
                borderRadius: "12px",
                padding: "12px 16px",
                background: "#E6F0F8",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "150%",
              }}
              className="border-none outline-none w-full resize-none transition-all"
            />
          </div>

          {/* File Upload Box */}
          <label className="border-2 border-dashed border-[#D0D5DD] bg-white rounded-xl p-8 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/40 transition-all mt-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Upload className="w-6 h-6 text-[#475467]" />
            </div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif', // Assuming Family/Paragraph corresponds to Inter or your body font
                fontWeight: '500',
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '150%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#0A0A0A'
              }}
            >
              {file ? file.name : "Attachment (optional)"}
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif', // Assuming Family/Caption corresponds to your system/inter font
                fontWeight: '400',
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '140%',
                letterSpacing: '0.019em', // 1.9% letter-spacing
                textAlign: 'center',
                color: '#404040'
              }}
            >
              Upload brief/scripts/assets (max 50 MB)
            </span>
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Checkboxes */}
          <div className="space-y-4 pt-4">
            {/* Privacy Policy Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[#D0D5DD] accent-[#0168B4]"
              />
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#7B7B7B'
                }}
              >
                You agree to our friendly{" "}
                <span className="underline cursor-pointer">privacy policy</span>.
              </span>
            </label>

            {/* NDA Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="nda"
                checked={form.nda}
                onChange={handleChange}
                className="w-5 h-5 rounded border-[#D0D5DD] accent-[#0168B4]"
              />
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '150%',
                  letterSpacing: '0%',
                  color: '#7B7B7B'
                }}
              >
                NDA (Non Discloser agreement) •{" "}
                <span className="opacity-60">
                  "I'd like to sign an NDA before sharing files."
                </span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              disabled={loading}
              style={{
                width: '190px',
                height: '52px',
                borderRadius: '100px',
                padding: '4px 4px 4px 12px',
                gap: '16px',
                backgroundColor: '#0168B4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: loading ? 0.6 : 1,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              className="group hover:bg-[#015696]"
            >
              <span
                style={{
                  fontFamily: 'Inter, sans-serif', // Family/Body
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '160%',
                  letterSpacing: '1%',
                  color: '#FFFFFF'
                }}
              >
                {loading ? "Sending..." : "Send message"}
              </span>
              <div className="bg-white rounded-full p-2 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowUpRight size={28} className="text-primary" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Schedule;