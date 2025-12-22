import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      date: "12 Sep 2025",
      category: "ACG Localization Tips",
      title: "HS+ Delivered Flawless JP/EN VO On A Tough Timeline.",
      image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      date: "12 Sep 2025",
      category: "VO Casting Guide",
      title: "HS+ Delivered Flawless JP/EN VO On A Tough Timeline.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      date: "12 Sep 2025",
      category: "Cross-Border KOL Trends",
      title: "HS+ Delivered Flawless JP/EN VO On A Tough Timeline.",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 text-sm font-medium text-gray-500 mb-6 bg-gray-50/50 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-400" />
              Blogs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Insights And <br /> Resources
            </h2>
          </div>
          <div className="md:max-w-xs pt-4 md:pt-14 text-left md:text-right">
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore tips, guides, and industry trends shaping global launches today.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 container mx-auto">
          {blogPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative rounded-[30px] overflow-hidden mb-6 aspect-[4/3]">
                <img 
                  src={post.image} 
                  alt={post.category} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Meta Data */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  {post.date}
                </span>
                <span className="text-[#0070c0] text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#0070c0] transition-colors">
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-3 border border-blue-400 text-[#0070c0] pl-8 pr-2 py-2 rounded-full font-bold hover:bg-blue-50 transition-all group shadow-sm">
            See All Blog
            <span className="bg-[#0070c0] text-white rounded-full p-2 transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Blogs;