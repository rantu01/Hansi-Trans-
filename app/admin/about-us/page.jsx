"use client";
import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইমপোর্ট করা হয়েছে
import { 
  Trash2, Upload, Plus, X, Save, 
  Target, Eye, User, Image as ImageIcon, 
  Briefcase, Calendar, Loader2
} from "lucide-react";

const EMPTY_STATE = {
  hero: { title: "", description: "", videoImage: "" },
  workWithUs: { headline: "", buttonText: "" },
  company: {
    missionTitle: "", missionDescription: "",
    visionTitle: "", visionDescription: "",
    images: [],
  },
  gallery: { images: [] },
  ceo: {
    name: "", designation: "", description: "", image: "",
    socials: { twitter: "", facebook: "", linkedin: "" },
    stats: [],
  },
  schedule: { title: "", description: "" },
};

export default function AboutUsAdmin() {
  const [data, setData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API.AboutUs.get);
        const result = await res.json();
        if (result) {
          setData({
            ...EMPTY_STATE,
            ...result,
            hero: { ...EMPTY_STATE.hero, ...result.hero },
            workWithUs: { ...EMPTY_STATE.workWithUs, ...result.workWithUs },
            company: { ...EMPTY_STATE.company, ...result.company, images: result.company?.images || [] },
            gallery: { images: result.gallery?.images || [] },
            ceo: {
              ...EMPTY_STATE.ceo,
              ...result.ceo,
              socials: { ...EMPTY_STATE.ceo.socials, ...result.ceo?.socials },
              stats: result.ceo?.stats || [],
            },
            schedule: { ...EMPTY_STATE.schedule, ...result.schedule },
          });
        }
      } catch (err) {
        toast.error("Failed to load content from server");
        setData(EMPTY_STATE);
      }
    };
    fetchData();
  }, []);

  const updateField = (path, value) => {
    setData((prev) => {
      const copy = structuredClone(prev);
      let ref = copy;
      const keys = path.split(".");
      keys.slice(0, -1).forEach((k) => {
        ref[k] ??= {};
        ref = ref[k];
      });
      ref[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const uploadImage = async (file, path, type = "single", index = null) => {
    if (!file) return;
    
    // ফাইল সাইজ চেক (২ এমবি এর বেশি হলে টোস্ট দেখাবে)
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image is too large! Max 2MB allowed.");
    }

    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(API.uploadImage, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await res.json();
      
      if (result?.url) {
        if (type === "gallery") {
          updateField("gallery.images", [...data.gallery.images, result.url]);
        } else if (type === "company" && index !== null) {
          const newImgs = [...data.company.images];
          newImgs[index] = result.url;
          updateField("company.images", newImgs);
        } else {
          updateField(path, result.url);
        }
        toast.success("Image uploaded!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const removeArrayImage = (path, url) => {
    const keys = path.split(".");
    const currentImages = data[keys[0]][keys[1]];
    updateField(path, currentImages.filter((img) => img !== url));
    toast.success("Image removed from gallery");
  };

  const saveData = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Publishing changes...");

    try {
      const res = await fetch(API.AboutUs.upsert, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        toast.success("About Us content updated! ✨", { id: loadingToast });
      } else {
        toast.error("Update failed! Please try again.", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Network error. Could not save.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500 px-4 pt-6">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">About Us Content</h1>
          <p className="text-slate-500 font-medium mt-1">Refine your brand story and visual identity</p>
        </div>
        <button
          onClick={saveData}
          disabled={loading}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />}
          {loading ? "Publishing..." : "Save Changes"}
        </button>
      </header>

      {/* HERO SECTION */}
      <Section title="Hero Banner" icon={ImageIcon}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <Input label="Main Headline" value={data.hero.title} onChange={(v) => updateField("hero.title", v)} placeholder="We Build Modern Solutions" />
            <Textarea label="Sub Description" value={data.hero.description} onChange={(v) => updateField("hero.description", v)} rows={5} />
          </div>
          <div className="lg:col-span-5">
            <ImageUpload label="Hero Media Preview" image={data.hero.videoImage} onUpload={(f) => uploadImage(f, "hero.videoImage")} aspect="video" />
          </div>
        </div>
      </Section>

      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Our Mission" icon={Target}>
          <div className="space-y-6">
            <Input label="Mission Title" value={data.company.missionTitle} onChange={(v) => updateField("company.missionTitle", v)} />
            <Textarea label="Mission Description" value={data.company.missionDescription} onChange={(v) => updateField("company.missionDescription", v)} />
            <div className="pt-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-4 block">Mission Media (3 Slots)</label>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((idx) => (
                  <ThumbnailUpload key={idx} image={data.company.images[idx]} onUpload={(f) => uploadImage(f, null, "company", idx)} onRemove={() => {
                    const newImgs = [...data.company.images];
                    newImgs[idx] = "";
                    updateField("company.images", newImgs);
                    toast.success("Image slot cleared");
                  }} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Our Vision" icon={Eye}>
          <div className="space-y-6">
            <Input label="Vision Title" value={data.company.visionTitle} onChange={(v) => updateField("company.visionTitle", v)} />
            <Textarea label="Vision Description" value={data.company.visionDescription} onChange={(v) => updateField("company.visionDescription", v)} />
            <div className="pt-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-4 block">Vision Media (3 Slots)</label>
              <div className="grid grid-cols-3 gap-3">
                {[3, 4, 5].map((idx) => (
                  <ThumbnailUpload key={idx} image={data.company.images[idx]} onUpload={(f) => uploadImage(f, null, "company", idx)} onRemove={() => {
                    const newImgs = [...data.company.images];
                    newImgs[idx] = "";
                    updateField("company.images", newImgs);
                    toast.success("Image slot cleared");
                  }} />
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CEO SECTION */}
      <Section title="Executive Leadership" icon={User}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <ImageUpload label="Official Portrait" image={data.ceo.image} onUpload={(f) => uploadImage(f, "ceo.image")} aspect="square" />
          </div>
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="CEO Name" value={data.ceo.name} onChange={(v) => updateField("ceo.name", v)} />
              <Input label="Designation" value={data.ceo.designation} onChange={(v) => updateField("ceo.designation", v)} />
            </div>
            <Textarea label="CEO's Message" value={data.ceo.description} onChange={(v) => updateField("ceo.description", v)} rows={4} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
               <Input label="LinkedIn Profile" value={data.ceo.socials.linkedin} onChange={(v) => updateField("ceo.socials.linkedin", v)} />
               <Input label="Twitter (X)" value={data.ceo.socials.twitter} onChange={(v) => updateField("ceo.socials.twitter", v)} />
               <Input label="Facebook" value={data.ceo.socials.facebook} onChange={(v) => updateField("ceo.socials.facebook", v)} />
            </div>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section title="Media Gallery" icon={ImageIcon}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.gallery.images.map((img, idx) => (
            <div key={idx} className="group relative aspect-square bg-slate-100 rounded-[1.5rem] overflow-hidden border border-slate-200">
              <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => removeArrayImage("gallery.images", img)} className="bg-red-500 text-white p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 rounded-[1.5rem] aspect-square cursor-pointer hover:bg-white hover:border-blue-500 transition-all group">
            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Plus size={24} />
            </div>
            <span className="text-xs font-bold text-slate-500 mt-3">Add Photo</span>
            <input type="file" className="hidden" onChange={(e) => uploadImage(e.target.files?.[0], null, "gallery")} />
          </label>
        </div>
      </Section>

      {/* FOOTER ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Work With Us Section" icon={Briefcase}>
           <Input label="Action Headline" value={data.workWithUs.headline} onChange={(v) => updateField("workWithUs.headline", v)} />
           <Input label="Button Display Text" value={data.workWithUs.buttonText} onChange={(v) => updateField("workWithUs.buttonText", v)} />
        </Section>
        <Section title="Schedule/CTA Area" icon={Calendar}>
           <Input label="CTA Title" value={data.schedule.title} onChange={(v) => updateField("schedule.title", v)} />
           <Textarea label="Short Pitch" value={data.schedule.description} onChange={(v) => updateField("schedule.description", v)} />
        </Section>
      </div>
    </div>
  );
}

/* ================= REUSABLE STYLED COMPONENTS ================= */

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow duration-500">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
        <Icon size={22} />
      </div>
      <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
      <div className="h-px bg-slate-100 flex-1 ml-2" />
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const Input = ({ label, value = "", onChange, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-[1.5px] ml-1 group-focus-within:text-blue-600 transition-colors">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
      {...props}
    />
  </div>
);

const Textarea = ({ label, value = "", onChange, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-[1.5px] ml-1 group-focus-within:text-blue-600 transition-colors">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-50 border border-slate-100 px-5 py-3.5 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 outline-none transition-all text-slate-700 font-medium resize-none leading-relaxed"
      {...props}
    />
  </div>
);

const ImageUpload = ({ label, image, onUpload, aspect = "video" }) => (
  <div className="flex flex-col gap-3 group">
    <label className="text-xs font-bold text-slate-400 uppercase tracking-[1.5px] ml-1">{label}</label>
    <div className={`relative group w-full ${aspect === "video" ? "aspect-video" : "aspect-square"} rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 p-2`}>
      {image ? (
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden group">
          <img src={image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <label className="cursor-pointer bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold shadow-2xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
              Update Media
              <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files?.[0])} />
            </label>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white transition-all rounded-[1.5rem]">
          <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
            <Upload size={28} />
          </div>
          <span className="text-sm font-bold text-slate-400">Upload Media</span>
          <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files?.[0])} />
        </label>
      )}
    </div>
  </div>
);

const ThumbnailUpload = ({ image, onUpload, onRemove }) => (
  <div className="relative aspect-square border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 group shadow-sm">
    {image ? (
      <>
        <img src={image} className="w-full h-full object-cover" />
        <button onClick={onRemove} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <X size={14} />
        </button>
      </>
    ) : (
      <label className="flex items-center justify-center h-full cursor-pointer hover:bg-blue-50 transition-colors">
        <Plus size={20} className="text-slate-300 group-hover:text-blue-500" />
        <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files?.[0])} />
      </label>
    )}
  </div>
);