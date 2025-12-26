"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/app/config/api";

const CaseStudiesDetails = () => {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      const res = await fetch(
        API.featuredCaseStudies
      );
      const data = await res.json();
      const found = data.data.find((c) => c.slug === slug);
      setCaseStudy(found);
    };

    fetchCase();
  }, [slug]);

  if (!caseStudy) return null;

  return (
    <section className="py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-[300px] md:h-[450px] mb-8 overflow-hidden rounded-[30px]">
          <img
            src={caseStudy.image}
            className="w-full h-full object-cover"
            alt={caseStudy.title}
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesDetails;
