"use client";
import React from "react";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon } from "lucide-react";

const BlogDetails = ({ blogPost }) => {
  if (!blogPost) return null;

  const { title, author, date, image, content } = blogPost;

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Blog Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight flex-1">
            {title}
          </h1>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{author}</p>
                <p className="text-[10px] text-gray-400">Published • {date}</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" 
                alt="Author" 
                className="w-10 h-10 rounded-full object-cover" 
              />
            </div>
            <div className="flex gap-2">
              <div className="p-1.5 bg-[#002b4d] text-white rounded-full cursor-pointer hover:bg-blue-600 transition">
                <FbIcon size={12} />
              </div>
              <div className="p-1.5 bg-[#002b4d] text-white rounded-full cursor-pointer hover:bg-blue-600 transition">
                <TwIcon size={12} />
              </div>
              <div className="p-1.5 bg-[#002b4d] text-white rounded-full cursor-pointer hover:bg-blue-600 transition">
                <LiIcon size={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full aspect-video mb-12 rounded-[40px] overflow-hidden shadow-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default BlogDetails;