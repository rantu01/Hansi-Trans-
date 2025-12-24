import React from "react";

const SubServiceContent = () => {
  const whyMattersFeatures = [
    {
      id: "01",
      title: "Native Voice Talent",
      desc: "Choose from professional native speakers in 40+ languages.",
    },
    {
      id: "02",
      title: "Script Translation & Adaptation",
      desc: "Not just translation — we adapt the script for timing and cultural context.",
    },
    {
      id: "03",
      title: "Media Synchronisation",
      desc: "We integrate voice-overs into your videos, apps, or e-learning modules.",
    },
    {
      id: "04",
      title: "Studio-Grade Recording",
      desc: "Recordings done in professional studios, noise-free, and delivered in your format.",
    },
    {
      id: "05",
      title: "Cultural Consulting & QA",
      desc: "Every language goes through a QA process to ensure cultural appropriateness.",
    },
  ];

  return (
    <div className="bg-white max-w-7xl mx-auto p-6">
      <div className="container mx-auto">
        {/* Why Multilingual Voice Matters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex-1">
            Why Multilingual Voice Matters
          </h2>
          <p className="text-gray-500 text-xs md:text-sm flex-1 leading-relaxed">
            In today's global market, your voice is more than just sound — it's
            how you connect with users in their native language. Our
            multilingual voice talent ensure your message resonates everywhere.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {whyMattersFeatures.map((item, index) => (
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
          ))}
        </div>

        {/* Alternating Content Sections */}
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
                Why Multilingual Voice Matters
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                In today's global market, your website must feel local. We help
                you build trust and connect with users in their native language.
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

          {/* Section 2 */}
          <div className="text-center space-y-8">
            <h3 className="text-4xl font-bold text-gray-800">
              40+ Languages Available
            </h3>
            <p className="text-gray-400 text-xs max-w-3xl mx-auto">
              We support a broad range of languages from widely spoken
              international ones to regional variants.
            </p>
            <div className="w-full h-[400px] rounded-[40px] overflow-hidden bg-black">
              <img
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200"
                className="w-full h-full object-cover opacity-80"
                alt="Mic"
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">
                40+ Languages Available
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                We support a broad range of languages from widely spoken
                international ones to regional variants.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800"
                className="rounded-[40px] w-full"
                alt="Reading"
              />
            </div>
          </div>
        </div>

        {/* Footer Language Text */}
        <div className="text-center mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            40+ Languages Available
          </h2>
          <p className="text-gray-400 text-[10px] leading-relaxed">
            Think about your favorite brands. Apple, Nike, or Airbnb don't just
            sell products. They sell trust, identity, and belonging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubServiceContent;
