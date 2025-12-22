// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-indigo-600">Hansi-Trans</div>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><a href="home" className="hover:text-indigo-600">Home</a></li>
        <li><a href="about" className="hover:text-indigo-600">Service</a></li>
        <li><a href="contact" className="hover:text-indigo-600">Case Studies</a></li>
        <li><a href="#others" className="hover:text-indigo-600">Others</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
