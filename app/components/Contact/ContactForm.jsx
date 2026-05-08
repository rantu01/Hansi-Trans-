"use client";
import React, { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Upload, ArrowUpRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { API } from '@/app/config/api';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [country, setCountry] = useState('US');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [nda, setNda] = useState(false);
  const fileRef = useRef(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 my-20">
      <div className="bg-background rounded-[40px]  flex flex-col md:flex-row container w-full overflow-hidden min-h-[800px]  relative">

        {/* Left Sidebar */}
        <div className="md:w-1/3 bg-background p-12 flex flex-col gap-12 border-r border-gray-100 relative">

          {/* Background Image Integration */}
          <div
            className="absolute bottom-0 left-0 pointer-events-none bg-no-repeat bg-left-bottom"
            style={{
              backgroundImage: `url('/photo/About US/schedule-bg.png')`,
              width: '800.82px', // আপনার দেওয়া সুনির্দিষ্ট বড় সাইজ
              height: '800.82px',
              backgroundSize: 'contain',
              opacity: 0.9,
              zIndex: 0,
              maxWidth: '80vw', // যাতে স্ক্রিনের বাইরে গিয়ে আনুভূমিক স্ক্রলবার না আসে
              maxHeight: '100%',
            }}
          />

          <div className="relative z-10 flex flex-col gap-12">
            {/* Email Section */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Email Us</p>
                <p className="font-semibold text-lg text-secondary">Example@Website.Com</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Drop in us</p>
                <button className="font-semibold text-lg text-secondary flex items-center gap-2 hover:text-primary transition-colors">
                  Get Directions <ArrowUpRight size={20} />
                </button>
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Call Us</p>
                <p className="font-semibold text-lg text-secondary">+1 800 778 884</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-2/3 p-12 bg-background relative z-10">
          <h1 className="text-4xl font-bold text-primary mb-2 leading-tight">Tell Us What You're Planning.</h1>
          <p className="text-gray-500 mb-6">we'll reply within 1 business day with next steps.</p>

          {/* Stats Bar */}
          <div className="bg-cta-text/30 py-2 px-6 rounded-full inline-block mb-8 border border-cta-text/50">
            <p className="text-xs font-semibold text-secondary/80">
              10,000+ projects delivered · 40+ languages · CN/JP/KR/US partner studios
            </p>
          </div>

          <form className="space-y-5" onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData();
            fd.append('firstName', firstName);
            fd.append('lastName', lastName);
            fd.append('email', email);
            fd.append('company', company);
            fd.append('service', service);
            fd.append('country', country);
            fd.append('phone', phone);
            fd.append('message', message);
            fd.append('agree', agree);
            fd.append('nda', nda);
            if (fileRef.current && fileRef.current.files[0]) fd.append('attachment', fileRef.current.files[0]);

            const loading = toast.loading('Sending...');
            try {
              const res = await fetch(API.contact.schedule, {
                method: 'POST',
                body: fd,
              });
              if (res.ok) {
                toast.success('Message sent!', { id: loading });
                // reset
                setFirstName(''); setLastName(''); setEmail(''); setCompany(''); setService(''); setCountry('US'); setPhone(''); setMessage(''); setAgree(false); setNda(false);
                if (fileRef.current) fileRef.current.value = '';
              } else {
                const err = await res.text();
                toast.error('Send failed: ' + err, { id: loading });
              }
            } catch (err) {
              toast.error('Network error', { id: loading });
            }
          }}>
            <Toaster />
            
            
            
            
            
            
            
            
            
            
            
            
          
          
          
          
          
          
          
          
          
          
          
          
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First name" className="w-full p-3 bg-cta-text/20 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-400 text-black" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last name" className="w-full p-3 bg-cta-text/20 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-400 text-black" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@company.com" className="w-full p-3 bg-cta-text/20 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-400 text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Company or studio Name</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Your Company" className="w-full p-3 bg-cta-text/20 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-400 text-black" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Service Needed</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full p-3 bg-cta-text/20 border-none rounded-xl focus:ring-2 focus:ring-accent outline-none appearance-none text-gray-500 cursor-pointer">
                <option value="">Select Services</option>
                <option value="Localization">Localization</option>
                <option value="Voice-Over">Voice-Over</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Phone number</label>
              <div className="flex gap-2">
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-cta-text/30 p-3 rounded-xl border-none outline-none text-sm font-medium text-secondary">
                  <option value="US">US</option>
                  <option value="IN">IN</option>
                  <option value="BD">BD</option>
                </select>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="+1 (555) 000-0000" className="w-full p-3 bg-cta-text/20 text-black border-none rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" placeholder="How can we help?" className="w-full p-3 bg-cta-text/20 border-none rounded-xl outline-none focus:ring-2 focus:ring-accent transition-all resize-none placeholder:text-gray-400 text-black"></textarea>
            </div>

            {/* Upload Area */}
            <div onClick={() => fileRef.current && fileRef.current.click()} className="border-2 border-dashed border-accent/30 rounded-2xl p-8 flex flex-col items-center justify-center bg-cta-text/10 hover:bg-cta-text/30 transition-all cursor-pointer group relative">
              <input ref={fileRef} type="file" className="hidden" />
              <Upload className="text-accent mb-2 group-hover:scale-110 transition-transform" size={28} />
              <p className="font-bold text-secondary">Attachment (optional)</p>
              <p className="text-xs text-gray-400 mt-1">Upload brief/script/assets (max 50 MB)</p>
              <div className="text-xs text-gray-500 mt-2">{fileRef.current && fileRef.current.files[0] ? fileRef.current.files[0].name : ''}</div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group">
                <input checked={agree} onChange={(e) => setAgree(e.target.checked)} type="checkbox" className="rounded-md border-gray-300 text-primary focus:ring-primary h-4 w-4 transition-all" />
                <span className="group-hover:text-secondary transition-colors">You agree to our friendly privacy policy.</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer group">
                <input checked={nda} onChange={(e) => setNda(e.target.checked)} type="checkbox" className="rounded-md border-gray-300 text-primary focus:ring-primary h-4 w-4 mt-0.5 transition-all" />
                <span className="group-hover:text-secondary transition-colors leading-tight">
                  NDA (Non Discloser agreement) • "I'd like to sign an NDA before sharing files."
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-primary text-white px-10 py-4 rounded-full flex items-center gap-2 font-bold hover:bg-accent shadow-lg shadow-primary/20 transition-all transform active:scale-95 mt-4">
              Send message <ArrowUpRight size={20} className="rotate-45" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;