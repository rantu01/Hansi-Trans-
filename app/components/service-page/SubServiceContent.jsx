"use client";
import React from "react";

const SubServiceContent = ({ subService }) => {
  // ডাটাবেজের features অ্যারে থেকে গ্রিড ডাটা নেওয়া হচ্ছে
  // যদি ডাটাবেজে ফিচার না থাকে তবে একটি ডিফল্ট ফলব্যাক রাখা হয়েছে
  const dynamicFeatures = subService?.features?.map((feature, index) => ({
    id: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
    title: feature.split(":")[0] || "Feature", // যদি "Title: Description" ফরম্যাটে থাকে
    desc: feature.split(":")[1] || feature,
  })) || [];

  return (
    <div className="bg-white max-w-7xl mx-auto p-6">
      <div className="container mx-auto">
        {/* Why Matters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex-1">
            Why {subService?.title || "This Service"} Matters
          </h2>
          <p className="text-gray-500 text-xs md:text-sm flex-1 leading-relaxed">
            {subService?.description || "In today's global market, connecting with users in their native language is essential for success."}
          </p>
        </div>

        {/* Features Grid - Dynamic from Database */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {dynamicFeatures.length > 0 ? (
            dynamicFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-50 p-8 rounded-[30px] shadow-sm flex flex-col items-center text-center"
              >
                <span className="text-3xl font-bold text-blue-100 mb-4">
                  {item.id}
                </span>
                <h4 className="text-lg font-bold text-blue-600 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-[10px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No specific features listed.</p>
          )}
        </div>

        {/* Alternating Content Sections - Design preserved 100% */}
        <div className="space-y-32 mb-20">
          {/* Section 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                className="rounded-[40px] w-full"
                alt="Working"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">
                Strategic Growth & Localization
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                In today's global market, your product must feel local. We help
                you build trust and connect with users in their native language through professional {subService?.title}.
              </p>
              <ul className="space-y-2">
                {[
                  "Enhance engagement",
                  "Improve comprehension",
                  "Boost brand personality",
                  "Reduce time & cost",
                ].map((list, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-blue-600 font-medium text-xs"
                  >
                    <span className="w-5 h-5 flex items-center justify-center border border-blue-200 rounded-full text-[10px]">
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
            <h3 className="text-4xl font-bold text-gray-800">
              Global Standards, Local Feel
            </h3>
            <p className="text-gray-400 text-xs max-w-3xl mx-auto">
              We support a broad range of solutions tailored to your specific market needs, ensuring cultural precision at every step.
            </p>
            <div className="w-full h-[400px] rounded-[40px] overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200"
                className="w-full h-full object-cover opacity-80"
                alt="Professional Setup"
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">
                Ready for 40+ Languages
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Our network of native experts ensures that your content is not just translated, but truly localized for over 40 markets worldwide.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800"
                className="rounded-[40px] w-full"
                alt="Localization"
              />
            </div>
          </div>
        </div>

        {/* Final Footer Text */}
        <div className="text-center mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Connect Globally with {subService?.title}
          </h2>
          <p className="text-gray-400 text-[10px] leading-relaxed">
            Successful brands don't just sell products; they sell trust and identity. 
            By localizing your {subService?.title}, you are opening doors to new cultures and communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubServiceContent;