import React from 'react';
import { ArrowUpRight, Sparkles, Youtube, BarChart3, PenLine } from 'lucide-react';

const Featured = () => {
  const cases = [
    {
      title: "Global Game Title — Multilingual Voice-Over Launch",
      description: "A global RPG publisher needed cinematic trailers localized in Japanese, Korean, and English. Their goal was to create emotional resonance with local audiences while keeping production costs efficient.",
      stats: [
        { label: "Across YouTube & TikTok", value: "10M", icon: <Youtube className="w-5 h-5 text-blue-500" /> },
        { label: "CTR increased by compared to non-localized trailers.", value: "32%", icon: <BarChart3 className="w-5 h-5 text-blue-500" /> },
        { label: "Higher pre-registration rates in Japan and Korea.", value: <PenLine className="w-5 h-5 text-blue-500" />, isIcon: true }
      ],
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
      tag: "Localization",
      isReverse: false
    },
    {
      title: "Global Game Title — Multilingual Voice-Over Launch",
      description: "A global RPG publisher needed cinematic trailers localized in Japanese, Korean, and English. Their goal was to create emotional resonance with local audiences while keeping production costs efficient.",
      stats: [
        { label: "Across YouTube & TikTok", value: "10M", icon: <Youtube className="w-5 h-5 text-blue-500" /> },
        { label: "CTR increased by compared to non-localized trailers.", value: "32%", icon: <BarChart3 className="w-5 h-5 text-blue-500" /> },
        { label: "Higher pre-registration rates in Japan and Korea.", value: <PenLine className="w-5 h-5 text-blue-500" />, isIcon: true }
      ],
      image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=1000&auto=format&fit=crop",
      tag: "Voice-Over",
      isReverse: true
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-600 mb-6 bg-white shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Case studies
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0066b2]">
              Featured Case Studies
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-right">
            <p className="text-gray-500 text-sm leading-relaxed">
              See how HS+ helps games, anime, and tech brands go global through localization, voice-over, and creator-led marketing.
            </p>
          </div>
        </div>

        {/* Case Studies List */}
        <div className="space-y-12">
          {cases.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${item.isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[500px]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-14 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight pr-4">
                    {item.title}
                  </h3>
                  <span className="bg-[#0070c0] text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                    <Sparkles className="w-3 h-3 fill-white" /> {item.tag}
                  </span>
                </div>

                <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
                  {item.description}
                </p>

                {/* Stats Section */}
                <div className="space-y-6 mb-10">
                  {item.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                      <div className="text-2xl font-bold text-[#0070c0] min-w-[60px]">
                        {stat.isIcon ? stat.value : stat.value}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="inline-flex items-center gap-3 border border-blue-400 text-[#0070c0] pl-6 pr-2 py-1.5 rounded-full font-semibold hover:bg-blue-50 transition self-start group">
                  View Case Studies
                  <span className="bg-[#0070c0] text-white rounded-full p-2 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <button className="inline-flex items-center gap-3 bg-[#0070c0] text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-xl group">
            View All Case Studies
            <span className="bg-white text-[#0070c0] rounded-full p-2">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Featured;