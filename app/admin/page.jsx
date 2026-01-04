"use client";

import { 
  FileText, 
  Activity, 
  Clock, 
  ArrowUpRight, 
  TrendingUp,
  ShieldCheck
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
          {trend} <TrendingUp size={12} />
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium">Updated recently</span>
      <ArrowUpRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Welcome back, <span className="text-blue-600">Admin!</span> 👋
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Here's what's happening with your site today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200">
            Overview
          </button>
          <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Pages" 
          value="12" 
          icon={FileText} 
          trend="+2 new"
          colorClass="bg-blue-600"
        />
        
        <StatCard 
          title="Site Status" 
          value="Live" 
          icon={ShieldCheck} 
          colorClass="bg-emerald-500"
        />

        <StatCard 
          title="Last Update" 
          value="Just now" 
          icon={Clock} 
          colorClass="bg-amber-500"
        />
      </div>

      {/* Quick Actions / Informational Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">System Performance</h3>
            <p className="text-blue-100 mb-6 text-sm opacity-90">Your website is currently performing 25% faster than last week. Great job!</p>
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              View Detailed Report
            </button>
          </div>
          {/* Abstract background shape */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700" />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Quick Activities</h3>
            <Activity size={20} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">New testimonial added</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}