"use client";
import React from "react";

const CaseStudyContent = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="bg-white border border-gray-100 rounded-2xl py-8 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#0066b2] mb-1">10M</h2>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest">Across Youtube & Tiktok</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl py-8 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-[#0066b2] mb-1">32%</h2>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest">
              CTR increased compared to non-localized markets
            </p>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Introduction</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-4xl">
            Expanding your game into Asian markets is an exciting opportunity—but without proper localization,
            even the best game can fail to connect. This guide walks you through cultural adaptation, language
            challenges, voice-over best practices, and marketing strategies.
          </p>
        </div>

        {/* Market Analysis (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Understanding The Asian Gaming Market</h3>
            <p className="text-gray-400 text-xs italic">
              Think about your favorite brands. Apple, Nike, or Airbnb don’t just sell products. They sell trust,
              identity, and belonging.
            </p>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal pl-5">
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
            <p className="text-[#0066b2] font-bold text-xs mt-4">
              👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800"
              className="w-full rounded-[30px] object-cover h-[300px]"
              alt="Studio Mic"
            />
          </div>
        </div>

        {/* Market Analysis (Image Left, Text Right) */}
        <div className="flex flex-col md:flex-row-reverse items-start gap-12 mb-20">
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Understanding The Asian Gaming Market</h3>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal pl-5">
              <li>Mobile gaming dominates in China and SEA.</li>
              <li>Japan has a strong console and anime-driven game culture.</li>
              <li>Korea is a leader in esports and PC cafe gaming.</li>
              <li>SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.</li>
            </ol>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800"
              className="w-full rounded-[30px] object-cover h-[300px]"
              alt="Voice Over"
            />
          </div>
        </div>

        {/* Quote Box */}
        <div className="border-2 border-dashed border-blue-200 rounded-[30px] p-12 text-center my-20 bg-blue-50/20">
          <h4 className="text-2xl md:text-3xl font-bold text-[#0066b2] italic leading-tight">
            "People Will Forget What You Said, But They'll Remember How Your Brand Made Them Feel."
          </h4>
        </div>

        {/* Conclusion */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Conclusion</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Expanding into Asian markets is more than just translation—it's about building authentic cultural connections.
            By combining localization, high-quality voice-overs, and region-specific marketing, you can scale your game
            successfully.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyContent;
