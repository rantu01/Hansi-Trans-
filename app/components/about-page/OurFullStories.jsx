import React from 'react';

const OurFullStories = () => {
  // Demo images placeholder
  const images = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000", // Meeting room
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000", // Handshake
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000", // Empty office
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000", // Team discussion
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000", // Building
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000", // High-five
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-6 w-fit">
              <span className="text-gray-600">✦</span>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Our Full Stories
            </h2>
          </div>
          <div className="max-w-sm md:mt-12">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>

        {/* Gallery Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Row 1: 3 Images */}
          <div className="md:col-span-5 h-[300px] md:h-[350px]">
            <img 
              src={images[0]} 
              alt="Story 1" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>
          <div className="md:col-span-4 h-[300px] md:h-[350px]">
            <img 
              src={images[1]} 
              alt="Story 2" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>
          <div className="md:col-span-3 h-[300px] md:h-[350px]">
            <img 
              src={images[2]} 
              alt="Story 3" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>

          {/* Row 2: 3 Images */}
          <div className="md:col-span-3 h-[300px] md:h-[350px]">
            <img 
              src={images[3]} 
              alt="Story 4" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>
          <div className="md:col-span-4 h-[300px] md:h-[350px]">
            <img 
              src={images[4]} 
              alt="Story 5" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>
          <div className="md:col-span-5 h-[300px] md:h-[350px]">
            <img 
              src={images[5]} 
              alt="Story 6" 
              className="w-full h-full object-cover rounded-[40px]" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurFullStories;