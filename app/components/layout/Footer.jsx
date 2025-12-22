import React from 'react';
import { 
  ArrowUpRight, Twitter, Linkedin, Youtube, 
  Facebook, Phone, MapPin, Globe, ArrowRight 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative 
    bg-gradient-to-bl 
    from-[#a3c9e5] 
    via-white 
    to-[#a3c9e5] pt-20">
      <div className="container mx-auto px-4">
        
        {/* CTA Banner Section */}
        <div className="relative overflow-hidden bg-[#003d66] rounded-[40px] md:rounded-[60px] mb-20 p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
          
          {/* Background Image/Overlay */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img 
              src="/photo/home/lets-contact.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left Image with Blend */}
          <div className="relative z-10 w-full md:w-1/2">
            <div className="relative rounded-[35px] overflow-hidden border-4 border-white/10 shadow-2xl h-[300px]">
              
              <img 
                src="photo/home/lets-contact.png" 
                alt="Recording" 
                className="w-full h-full object-cover"
              />

              {/* Right side blend gradient */}
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#003d66] to-transparent"></div>

            </div>
          </div>

          {/* Right Content */}
          <div className="relative z-10 w-full md:w-1/2 text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready To Go Global?
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-md">
              Expanding your game into Asian markets is an exciting opportunity but without proper localization, even the best game can fail to connect.
            </p>
            <button className="inline-flex items-center gap-3 bg-white text-[#0070c0] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all group shadow-xl">
              Let's connect
              <span className="bg-[#0070c0] text-white rounded-full p-1.5 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Globe className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold text-gray-900">HANSI Trans+</span>
            </div>
            <p className="text-gray-500 font-bold text-sm">Save time. Get Started Now.</p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Unleash the most advanced Agency and boost your productivity
            </p>
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">+1 800 778 884</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">+1 800 778 884</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About us</li>
              <li className="hover:text-blue-600 cursor-pointer">Work</li>
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Shop</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Utilities</h4>
            <ul className="space-y-4 text-gray-500 text-sm font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Privacy & policy</li>
              <li className="hover:text-blue-600 cursor-pointer">Style guide</li>
              <li className="hover:text-blue-600 cursor-pointer">Changelog</li>
              <li className="hover:text-blue-600 cursor-pointer">License</li>
              <li className="hover:text-blue-600 cursor-pointer">404 page</li>
            </ul>
          </div>

          {/* Social & Location */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay in the know</h4>
            <div className="flex gap-3 mb-10">
              {[Twitter, Linkedin, Youtube, Globe, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-[#0070c0] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition shadow-md"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <MapPin className="text-[#0070c0] w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-gray-400 text-xs">Drop in us</p>
                <p className="font-bold text-gray-900 flex items-center gap-1 group-hover:text-blue-600">
                  Get Directions <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <p>
            All Rights Reserved. <br className="md:hidden" /> Designed by HANSI TRANS+ | Powered by
          </p>
          <div className="flex gap-8">
            <span className="hover:text-blue-600 cursor-pointer">Privacy policy</span>
            <span className="hover:text-blue-600 cursor-pointer">Terms of service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
