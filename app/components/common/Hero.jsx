// src/components/Hero.js
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gray-100">
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        {/* Text */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Hansi-Trans
          </h1>
          <p className="text-gray-600 mb-6">
            Your trusted partner for innovative CMS solutions. Explore our services and case studies to see how we bring your ideas to life.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Get Started
          </button>
        </div>

        {/* GIF Image */}
        <div className="md:w-1/2">
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" // Replace with your own GIF
            alt="Hero GIF"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
