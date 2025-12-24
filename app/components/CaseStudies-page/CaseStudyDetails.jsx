"use client";
import React from "react";

const CaseStudiesDetails = () => {
  return (
    <section className="py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Banner Image */}
        <div className="w-full h-[300px] md:h-[450px] mb-8 overflow-hidden rounded-[30px]">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200" 
            className="w-full h-full object-cover" 
            alt="Podcast Session" 
          />
        </div>


      </div>
    </section>
  );
};

export default CaseStudiesDetails;