"use client";
import React, { useState, useEffect } from "react";
import { API } from "@/app/config/api";
import { 
  FileText, Activity, Clock, ArrowUpRight, 
  TrendingUp, ShieldCheck, Newspaper, Briefcase, 
  Users, MessageSquare, Loader2 
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend, colorClass, loading }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
      {trend && !loading && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
          {trend} <TrendingUp size={12} />
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      {loading ? (
        <Loader2 className="animate-spin text-slate-300 mt-2" size={20} />
      ) : (
        <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
      )}
    </div>
    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium">Real-time data</span>
      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    caseStudies: 0,
    testimonials: 0,
    services: 0,
    influencers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // আপনার API এন্ডপয়েন্ট থেকে ডেটা ফেচ করা
        const [blogRes, caseRes, testRes, serviceRes, infRes] = await Promise.all([
          fetch(API.Blogs.getAll),
          fetch(API.CaseStudies.getAll),
          fetch(API.Testimonials.getTestimonials),
          fetch(API.services.main),
          fetch(API.OurInfluencer.getInfluencers)
        ]);

        const [blogs, cases, tests, services, influencers] = await Promise.all([
          blogRes.json(), caseRes.json(), testRes.json(), serviceRes.json(), infRes.json()
        ]);

        setStats({
          blogs: blogs.length || 0,
          caseStudies: cases.length || 0,
          testimonials: tests.length || 0,
          services: services.length || 0,
          influencers: influencers.length || 0
        });
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 p-2">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, <span className="text-blue-600">Admin!</span> 👋
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Here's the current snapshot of your Hansi Trans CMS.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
           <div className="px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-xl">
              Server Online
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Blogs" 
          value={stats.blogs} 
          icon={Newspaper} 
          trend="Active"
          colorClass="bg-blue-600"
          loading={loading}
        />
        <StatCard 
          title="Case Studies" 
          value={stats.caseStudies} 
          icon={Briefcase} 
          colorClass="bg-purple-600"
          loading={loading}
        />
        <StatCard 
          title="Testimonials" 
          value={stats.testimonials} 
          icon={MessageSquare} 
          colorClass="bg-emerald-500"
          loading={loading}
        />
        <StatCard 
          title="Services" 
          value={stats.services} 
          icon={ShieldCheck} 
          colorClass="bg-amber-500"
          loading={loading}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Section */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Content Strategy</h3>
            <p className="text-slate-400 mb-8 max-w-md">Your blog engagement is up. Consider adding more "Tech Innovation" articles this week to maintain growth.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Influencers</p>
                  <p className="text-xl font-bold">{stats.influencers}</p>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Uptime</p>
                  <p className="text-xl font-bold">99.9%</p>
               </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              Manage Content
            </button>
          </div>
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700" />
        </div>

        {/* Recent Activity List */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Site Overview</h3>
            <Activity size={20} className="text-blue-600" />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                <Users size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">Database Status</p>
                <p className="text-xs text-green-500 font-bold">Connected & Healthy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all">
                <Clock size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">Last Blog Post</p>
                <p className="text-xs text-slate-400 font-medium">Managed via Admin</p>
              </div>
            </div>

            <div className="pt-4 mt-2">
               <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">System Notice</p>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">All API routes are protected with JWT. Ensure your token is valid before making changes.</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}