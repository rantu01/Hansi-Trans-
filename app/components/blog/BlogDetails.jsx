"use client";
import React from "react";
import { Facebook as FbIcon, Twitter as TwIcon, Linkedin as LiIcon } from "lucide-react";

const BlogDetails = ({ blogPost }) => {
  if (!blogPost) return null;

  const { title, author, date, image, content } = blogPost;

  return (
    <section className="py-16 px-6 md:px-12 font-sans overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto">
        
        {/* Blog Meta Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-primary/10 pb-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight mb-6">
              {title}
            </h2>
            <div className="flex items-center gap-4">
              <img 
                src={`https://ui-avatars.com/api/?name=${author || 'Hansi+Trans'}&background=0070c0&color=fff`} 
                alt="Author" 
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 p-0.5" 
              />
              <div>
                <p className="text-lg font-bold text-foreground">{author || "Hansi Trans Admin"}</p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{date}</p>
              </div>
            </div>
          </div>

          {/* Social Share - Using Primary Blue for interaction */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.2em]">Share Insights</span>
            <div className="flex gap-2">
              {[
                { Icon: FbIcon, label: "Facebook" },
                { Icon: TwIcon, label: "Twitter" },
                { Icon: LiIcon, label: "LinkedIn" }
              ].map(({ Icon, label }, i) => (
                <button 
                  key={i}
                  aria-label={label}
                  className="p-3 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="w-full aspect-video mb-12 rounded-[40px] overflow-hidden shadow-2xl shadow-primary/5 ring-1 ring-primary/10 bg-primary/5">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" 
          />
        </div>

        {/* Article Body - Styled with Brand Colors */}
        <div 
          className="prose prose-lg prose-blue max-w-none text-foreground/80 leading-relaxed 
          prose-headings:text-secondary prose-headings:font-black 
          prose-p:mb-8 prose-strong:text-secondary
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
          prose-img:rounded-[32px] prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* Bottom Tag Section */}
        <div className="mt-20 pt-10 border-t border-primary/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <span className="text-xs font-black text-secondary/40 uppercase tracking-widest">Category:</span>
               <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                 {blogPost.category}
               </span>
            </div>
            
            {/* Branding Accent */}
            <div className="text-xs font-medium text-gray-400">
              © {new Date().getFullYear()} <span className="text-secondary font-bold">Hansi Trans</span> Localization.
            </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;