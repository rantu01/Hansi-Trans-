import React from "react";

const CaseStudiesDetails = ({ caseStudy }) => {
  if (!caseStudy) return null;

  return (
    <section className="py-16 px-6 md:px-12 font-sans">
      <div className="container mx-auto">
        <div
          className="w-full h-[300px] md:h-[500px] mb-12 overflow-hidden rounded-[40px]
                     bg-primary/5 border border-primary/10 shadow-2xl shadow-primary/5
                     relative group"
        >
          <img
            src={caseStudy.image}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt={caseStudy.title}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesDetails;
