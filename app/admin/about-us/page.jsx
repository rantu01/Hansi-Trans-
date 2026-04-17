"use client";
import { useEffect, useState } from "react";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // টোস্ট ইমপোর্ট করা হয়েছে
import { 
  Trash2, Upload, Plus, X, Save, 
  Target, Eye, User, Image as ImageIcon, 
  Briefcase, Calendar, Sparkles, Loader2
} from "lucide-react";

const EMPTY_STATE = {
  hero: { title: "", description: "", videoImage: "" },
  whoWeAre: {
    badge: "",
    description: "",
    story: "",
    statValue: "",
    statLabel: "",
    image: "",
    avatars: [],
  },
  coreMission: {
    badge: "",
    title: "",
    description: "",
    decorativeImage: "",
  },
  whatWeBelieve: {
    badge: "",
    title: "",
    cards: [
      { title: "", description: "", iconName: "" },
      { title: "", description: "", iconName: "" },
      { title: "", description: "", iconName: "" },
    ],
  },
  workWithUs: { headline: "", buttonText: "", videoUrl: "" },
  company: {
    badge: "",
    sectionTitle: "",
    sectionDescription: "",
    missionLabel: "",
    visionLabel: "",
    ctaText: "",
    missionTitle: "", missionDescription: "",
    visionTitle: "", visionDescription: "",
    images: [],
  },
  gallery: { badge: "", title: "", description: "", images: [] },
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
            whoWeAre: { ...EMPTY_STATE.whoWeAre, ...result.whoWeAre, avatars: result.whoWeAre?.avatars || [] },
            coreMission: { ...EMPTY_STATE.coreMission, ...result.coreMission },
            whatWeBelieve: { ...EMPTY_STATE.whatWeBelieve, ...result.whatWeBelieve, cards: result.whatWeBelieve?.cards || EMPTY_STATE.whatWeBelieve.cards },
            workWithUs: { ...EMPTY_STATE.workWithUs, ...result.workWithUs },
            company: { ...EMPTY_STATE.company, ...result.company, images: result.company?.images || [] },
            gallery: { ...EMPTY_STATE.gallery, ...result.gallery, images: result.gallery?.images || [] },
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

  const addCeoStat = () => {
    updateField("ceo.stats", [...(data.ceo.stats || []), { label: "", value: "" }]);
  };

  const updateCeoStat = (index, key, value) => {
    const nextStats = [...(data.ceo.stats || [])];
    nextStats[index] = { ...nextStats[index], [key]: value };
    updateField("ceo.stats", nextStats);
  };

  const removeCeoStat = (index) => {
    const nextStats = (data.ceo.stats || []).filter((_, itemIndex) => itemIndex !== index);
    updateField("ceo.stats", nextStats);
  };

  // Belief cards management
  const addBeliefCard = () => {
    const next = [...(data.whatWeBelieve?.cards || []) , { title: "", description: "", iconName: "" }];
    updateField("whatWeBelieve.cards", next);
  };

  const removeBeliefCard = (index) => {
    const next = (data.whatWeBelieve?.cards || []).filter((_, i) => i !== index);
    updateField("whatWeBelieve.cards", next);
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
      {/* FOOTER ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Work With Us Section" icon={Briefcase}>
           <Input label="Action Headline" value={data.workWithUs.headline} onChange={(v) => updateField("workWithUs.headline", v)} />
           <Input label="Button Display Text" value={data.workWithUs.buttonText} onChange={(v) => updateField("workWithUs.buttonText", v)} />
           <Input label="YouTube Video URL" value={data.workWithUs.videoUrl} onChange={(v) => updateField("workWithUs.videoUrl", v)} placeholder="https://www.youtube.com/watch?v=..." />
        </Section>
        <Section title="Schedule/CTA Area" icon={Calendar}>
           <Input label="CTA Title" value={data.schedule.title} onChange={(v) => updateField("schedule.title", v)} />
           <Textarea label="Short Pitch" value={data.schedule.description} onChange={(v) => updateField("schedule.description", v)} />
        </Section>
      </div>

      <Section title="Who We Are" icon={ImageIcon}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Badge" value={data.whoWeAre.badge} onChange={(v) => updateField("whoWeAre.badge", v)} placeholder="About" />
          <ImageUpload label="Main Image" image={data.whoWeAre.image} onUpload={(f) => uploadImage(f, "whoWeAre.image")} aspect="square" />
          <Textarea label="Short Description" value={data.whoWeAre.description} onChange={(v) => updateField("whoWeAre.description", v)} rows={3} />
          <Textarea label="Story Paragraph" value={data.whoWeAre.story} onChange={(v) => updateField("whoWeAre.story", v)} rows={4} />
          <Input label="Stat Value" value={data.whoWeAre.statValue} onChange={(v) => updateField("whoWeAre.statValue", v)} placeholder="1k+" />
          <Input label="Stat Label" value={data.whoWeAre.statLabel} onChange={(v) => updateField("whoWeAre.statLabel", v)} placeholder="Satisfied clients" />
        </div>
        <div className="pt-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-4 block">Avatar Images (3 Slots)</label>
          <div className="grid grid-cols-3 gap-3 max-w-sm">
            {[0, 1, 2].map((idx) => (
              <ThumbnailUpload
                key={idx}
                image={data.whoWeAre.avatars[idx]}
                onUpload={(file) => uploadImage(file, `whoWeAre.avatars.${idx}`)}
                onRemove={() => {
                  const nextAvatars = [...(data.whoWeAre.avatars || [])];
                  nextAvatars[idx] = "";
                  updateField("whoWeAre.avatars", nextAvatars);
                }}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Core Mission" icon={Target}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Badge" value={data.coreMission.badge} onChange={(v) => updateField("coreMission.badge", v)} placeholder="Core promise" />
          <Input label="Title" value={data.coreMission.title} onChange={(v) => updateField("coreMission.title", v)} placeholder="Our Company Main Mission" />
          <Textarea label="Description" value={data.coreMission.description} onChange={(v) => updateField("coreMission.description", v)} rows={4} />
          <ImageUpload label="Decorative Image" image={data.coreMission.decorativeImage} onUpload={(f) => uploadImage(f, "coreMission.decorativeImage")} aspect="square" />
        </div>
      </Section>

      <Section title="What We Believe" icon={Sparkles}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Input label="Badge" value={data.whatWeBelieve.badge} onChange={(v) => updateField("whatWeBelieve.badge", v)} placeholder="Believe" />
          <Input label="Section Title" value={data.whatWeBelieve.title} onChange={(v) => updateField("whatWeBelieve.title", v)} placeholder="What We Believe" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Belief Cards ({(data.whatWeBelieve?.cards || []).length} Cards)</h3>
            <div className="flex items-center gap-3">
              <button type="button" onClick={addBeliefCard} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold">
                <Plus size={14} /> Add Card
              </button>
            </div>
          </div>
          {(data.whatWeBelieve?.cards || []).map((card, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <button type="button" onClick={() => removeBeliefCard(idx)} className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100">
                  <Trash2 size={16} />
                </button>
              </div>
              <Input label={`Card ${idx + 1} Title`} value={card.title || ""} onChange={(v) => {
                const nextCards = [...(data.whatWeBelieve.cards || [])];
                nextCards[idx] = { ...nextCards[idx], title: v };
                updateField("whatWeBelieve.cards", nextCards);
              }} placeholder="Card title" />
              <Textarea label={`Card ${idx + 1} Description`} value={card.description || ""} onChange={(v) => {
                const nextCards = [...(data.whatWeBelieve.cards || [])];
                nextCards[idx] = { ...nextCards[idx], description: v };
                updateField("whatWeBelieve.cards", nextCards);
              }} rows={3} placeholder="Card description" />
              <Input label={`Card ${idx + 1} Icon Name`} value={card.iconName || ""} onChange={(v) => {
                const nextCards = [...(data.whatWeBelieve.cards || [])];
                nextCards[idx] = { ...nextCards[idx], iconName: v };
                updateField("whatWeBelieve.cards", nextCards);
              }} placeholder="e.g., Search, Files, Rocket" />
            </div>
          ))}
        </div>
      </Section>

      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Our Mission" icon={Target}>
          <div className="space-y-6">
            <Input label="Mission Title" value={data.company.missionTitle} onChange={(v) => updateField("company.missionTitle", v)} />
            <Textarea label="Mission Description" value={data.company.missionDescription} onChange={(v) => updateField("company.missionDescription", v)} />
            <div className="pt-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-4 block">Mission Media (4 Slots)</label>
              <div className="grid grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((idx) => (
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
              <label className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-4 block">Vision Media (4 Slots)</label>
              <div className="grid grid-cols-4 gap-3">
                {[4, 5, 6, 7].map((idx) => (
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

      <Section title="Company Section Labels" icon={Briefcase}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input label="Badge Text" value={data.company.badge} onChange={(v) => updateField("company.badge", v)} placeholder="Mission & Vision" />
          <Input label="Section Title" value={data.company.sectionTitle} onChange={(v) => updateField("company.sectionTitle", v)} placeholder="Our Company Main Mission" />
          <Textarea label="Section Description" value={data.company.sectionDescription} onChange={(v) => updateField("company.sectionDescription", v)} rows={3} />
          <Input label="CTA Button Text" value={data.company.ctaText} onChange={(v) => updateField("company.ctaText", v)} placeholder="Work with us?" />
          <Input label="Mission Label" value={data.company.missionLabel} onChange={(v) => updateField("company.missionLabel", v)} placeholder="Mission Statement:" />
          <Input label="Vision Label" value={data.company.visionLabel} onChange={(v) => updateField("company.visionLabel", v)} placeholder="Vision Statement:" />
        </div>
      </Section>

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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">CEO Stats</h3>
                <button type="button" onClick={addCeoStat} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold">
                  <Plus size={16} /> Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {(data.ceo.stats || []).map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <Input label="Label" value={stat.label || ""} onChange={(v) => updateCeoStat(idx, "label", v)} placeholder="Project complete" />
                    <Input label="Value" value={stat.value || ""} onChange={(v) => updateCeoStat(idx, "value", v)} placeholder="400+" />
                    <button type="button" onClick={() => removeCeoStat(idx)} className="h-12 px-4 rounded-xl border border-red-200 text-red-500 hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section title="Media Gallery" icon={ImageIcon}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Input label="Badge" value={data.gallery.badge} onChange={(v) => updateField("gallery.badge", v)} placeholder="Gallery" />
          <Input label="Title" value={data.gallery.title} onChange={(v) => updateField("gallery.title", v)} placeholder="Our Full Stories" />
          <Textarea label="Description" value={data.gallery.description} onChange={(v) => updateField("gallery.description", v)} rows={2} />
        </div>
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