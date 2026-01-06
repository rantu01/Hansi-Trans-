"use client";
import React from "react";

const SubServiceContent = ({ subService }) => {
  // Extract features from database and format them
  const dynamicFeatures = subService?.features?.map((feature, index) => ({
    id: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
    title: feature.split(":")[0] || "Feature",
    desc: feature.split(":")[1] || feature,
  })) || [];

  return (
    <div className="bg-background max-w-7xl mx-auto p-6 font-sans">
      <div className="container mx-auto">
        
        {/* Why Matters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary flex-1 leading-tight">
            Why {subService?.title || "This Service"} Matters
          </h2>
          <p className="text-gray-500 text-xs md:text-sm flex-1 leading-relaxed">
            {subService?.description || "In today's global market, connecting with users in their native language is essential for success."}
          </p>
        </div>

        {/* Features Grid - Branded styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {dynamicFeatures.length > 0 ? (
            dynamicFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-background border border-primary/10 p-8 rounded-[30px] shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                {/* ID using lightened primary */}
                <span className="text-3xl font-black text-primary/10 mb-4">
                  {item.id}
                </span>
                <h4 className="text-lg font-bold text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No specific features listed.</p>
          )}
        </div>

        {/* Alternating Content Sections */}
        <div className="space-y-32 mb-20">
          
          {/* Section 1 - Strategic Growth */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[40px] -rotate-2 group-hover:rotate-0 transition-transform"></div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                className="rounded-[40px] w-full relative z-10 shadow-lg shadow-primary/5"
                alt="Working"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-secondary">
                Strategic Growth & Localization
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                In today's global market, your product must feel local. We help
                you build trust and connect with users in their native language through professional {subService?.title}.
              </p>
              <ul className="space-y-3">
                {[
                  "Enhance engagement",
                  "Improve comprehension",
                  "Boost brand personality",
                  "Reduce time & cost",
                ].map((list, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-primary font-semibold text-xs uppercase tracking-wide"
                  >
                    <span className="w-6 h-6 flex items-center justify-center border border-primary/20 rounded-full text-[10px] bg-primary/5 text-primary">
                      {i + 1}
                    </span>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2 - Visual Banner */}
          <div className="text-center space-y-8">
            <h3 className="text-4xl font-bold text-secondary">
              Global Standards, Local Feel
            </h3>
            <p className="text-gray-500 text-xs md:text-sm max-w-3xl mx-auto">
              We support a broad range of solutions tailored to your specific market needs, ensuring cultural precision at every step.
            </p>
            <div className="w-full h-[450px] rounded-[40px] overflow-hidden bg-secondary relative">
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Professional Setup"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Section 3 - Language Ready */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-base/10 rounded-[40px] rotate-2 group-hover:rotate-0 transition-transform"></div>
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800"
                className="rounded-[40px] w-full relative z-10 shadow-lg shadow-primary/5"
                alt="Localization"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-secondary">
                Ready for 40+ Languages
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                Our network of native experts ensures that your content is not just translated, but truly localized for over 40 markets worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Final Footer Branded Section */}
        <div className="text-center mt-32 max-w-4xl mx-auto py-16 px-8 rounded-[40px] bg-primary/5 border border-primary/10">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Connect Globally with {subService?.title}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
            Successful brands don't just sell products; they sell <span className="text-secondary font-bold">trust and identity</span>. 
            By localizing your {subService?.title}, you are opening doors to new cultures and communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubServiceContent;