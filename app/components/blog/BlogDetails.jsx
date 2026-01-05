"use client";
import React from "react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon } from "lucide-react";

const BlogDetails = ({ blogPost }) => {
  if (!blogPost) return null;

  const { title, author, date, image, content } = blogPost;

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Blog Meta Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-gray-100 pb-8">
          <div className="flex-1">
             <h2 className="text-3xl md:text-4xl font-bold text-[#002b4d] leading-tight mb-4">
              {title}
            </h2>
            <div className="flex items-center gap-4">
               <img 
                src="https://ui-avatars.com/api/?name=Hansi+Trans&background=0066b2&color=fff" 
                alt="Author" 
                className="w-12 h-12 rounded-full object-cover border-2 border-[#0066b2]/10" 
              />
              <div>
                <p className="text-base font-bold text-gray-800">{author || "Hansi Trans Admin"}</p>
                <p className="text-xs text-gray-500">{date}</p>
              </div>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex flex-col items-start md:items-end gap-3">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share Post</span>
            <div className="flex gap-2">
              <button className="p-2 bg-[#f0f7ff] text-[#0066b2] rounded-full hover:bg-[#0066b2] hover:text-white transition-all duration-300">
                <FbIcon size={16} />
              </button>
              <button className="p-2 bg-[#f0f7ff] text-[#0066b2] rounded-full hover:bg-[#0066b2] hover:text-white transition-all duration-300">
                <TwIcon size={16} />
              </button>
              <button className="p-2 bg-[#f0f7ff] text-[#0066b2] rounded-full hover:bg-[#0066b2] hover:text-white transition-all duration-300">
                <LiIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="w-full aspect-video mb-12 rounded-[32px] overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
          />
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed 
          prose-headings:text-[#002b4d] prose-headings:font-bold 
          prose-p:mb-6 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* Bottom Tag/Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Category: <span className="text-[#0066b2]">{blogPost.category}</span></span>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;