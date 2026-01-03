import React from "react";

const SubServiceDetails = ({ subService }) => {
  // যদি ডাটাবেজে ফিচার থাকে তবে সেগুলো ব্যবহার করবে, 
  // আর না থাকলে একটি খালি অ্যারে হিসেবে কাজ করবে।
  const features = subService.features || [];

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden">
      <div className="mx-auto">
        {/* Main Hero Image */}
        {subService.image && (
          <div className="w-full h-[300px] md:h-[500px] mb-16 overflow-hidden rounded-[40px]">
            <img
              src={subService.image}
              className="w-full h-full object-cover"
              alt={subService.title}
            />
          </div>
        )}

        {/* Features Section (Optional: যদি আপনি ফিচারগুলো দেখাতে চান) */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 bg-gray-50 rounded-[30px] border border-gray-100 hover:shadow-lg transition"
              >
                <span className="text-[#0066b2] font-bold text-xl mb-4 block">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubServiceDetails;