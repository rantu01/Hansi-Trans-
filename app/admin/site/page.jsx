"use client";
import React, { useEffect, useState } from "react";
import { requireAdminAuth } from "@/utils/adminAuth";
import { API } from "@/app/config/api";
import toast, { Toaster } from "react-hot-toast"; // Toast ইমপোর্ট করা হয়েছে
import { 
  Globe, 
  Upload, 
  Save, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  MapPin, 
  Type, 
  Layout,
  Info,
  CheckCircle2,
  Loader2
} from "lucide-react";

const LEGAL_SECTION_TYPES = [
  { value: "section", label: "Sections" },
  { value: "heading", label: "Heading" },
  { value: "paragraph", label: "Paragraph" },
  { value: "list", label: "List" },
  { value: "quote", label: "Quote" },
  { value: "highlight", label: "Highlight" },
];

const createLegalBlock = (type = "section") => ({
  type,
  title: type === "heading" ? "New heading" : type === "section" ? "Section title" : "",
  content: type === "paragraph" || type === "quote" || type === "highlight" ? "Write content here" : "",
  items: type === "list" ? ["List item 1"] : [],
});

const createLegalBox = () => ({
  title: "Section box",
  blocks: [],
});

const safeParseJson = (value, fallback) => {
  if (!value) return fallback;
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const legacyTextToBoxes = (text = "") => {
  const cleaned = String(text || "").replace(/\r/g, "").trim();
  if (!cleaned) return [];

  const lines = cleaned.split("\n");
  const blocks = [];
  let current = null;

  const pushCurrent = () => {
    if (current) blocks.push(current);
    current = null;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const headingMatch = trimmed.match(/^(\d+\.|\d+\)|[A-Za-z]\.)\s*(.+)$/);
    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);

    if (headingMatch) {
      pushCurrent();
      current = {
        type: "section",
        title: headingMatch[2],
        content: "",
        items: [],
      };
      return;
    }

    if (!current) {
      current = { type: "paragraph", title: "", content: trimmed, items: [] };
      return;
    }

    if (bulletMatch) {
      current.type = current.type === "paragraph" ? "list" : current.type;
      current.items = current.items || [];
      current.items.push(bulletMatch[1]);
      return;
    }

    current.content = current.content ? `${current.content}\n${trimmed}` : trimmed;
  });

  pushCurrent();
  return blocks.length ? [{ title: "Section box", blocks }] : [];
};

const normalizeLegalBoxes = (value = []) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (item && Array.isArray(item.blocks)) {
      return {
        title: item.title || "Section box",
        blocks: item.blocks,
      };
    }

    return {
      title: item?.title || "Section box",
      blocks: [item].filter(Boolean),
    };
  });
};

const sectionsToPlainText = (sections = []) =>
  sections
    .map((box, index) => {
      const blocks = Array.isArray(box.blocks) ? box.blocks : [box];
      const boxTitle = box.title || `Section ${index + 1}`;
      const blockText = blocks
        .map((section, blockIndex) => {
          const title = section.title || `${blockIndex + 1}. ${section.type}`;
          const content = section.content ? `\n${section.content}` : "";
          const items = Array.isArray(section.items) && section.items.length
            ? `\n${section.items.map((item) => `- ${item}`).join("\n")}`
            : "";
          return `${title}${content}${items}`.trim();
        })
        .join("\n");
      return `${boxTitle}\n${blockText}`.trim();
    })
    .join("\n\n");

const LegalSectionEditor = ({ label, sections, onChange, payload, onPayloadChange }) => {
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  const updateBox = (boxIndex, field, value) => {
    const next = [...sections];
    next[boxIndex] = { ...next[boxIndex], [field]: value };
    onChange(next);
  };

  const updateBlock = (boxIndex, blockIndex, field, value) => {
    const next = [...sections];
    const box = { ...next[boxIndex] };
    const blocks = [...(box.blocks || [])];
    blocks[blockIndex] = { ...blocks[blockIndex], [field]: value };
    box.blocks = blocks;
    next[boxIndex] = box;
    onChange(next);
  };

  const updateBlockItem = (boxIndex, blockIndex, itemIndex, value) => {
    const next = [...sections];
    const box = { ...next[boxIndex] };
    const blocks = [...(box.blocks || [])];
    const block = { ...blocks[blockIndex] };
    block.items = [...(block.items || [])];
    block.items[itemIndex] = value;
    blocks[blockIndex] = block;
    box.blocks = blocks;
    next[boxIndex] = box;
    onChange(next);
  };

  const addBlockItem = (boxIndex, blockIndex) => {
    const next = [...sections];
    const box = { ...next[boxIndex] };
    const blocks = [...(box.blocks || [])];
    const block = { ...blocks[blockIndex] };
    block.items = [...(block.items || []), "New item"];
    blocks[blockIndex] = block;
    box.blocks = blocks;
    next[boxIndex] = box;
    onChange(next);
  };

  const removeBlockItem = (boxIndex, blockIndex, itemIndex) => {
    const next = [...sections];
    const box = { ...next[boxIndex] };
    const blocks = [...(box.blocks || [])];
    const block = { ...blocks[blockIndex] };
    block.items = (block.items || []).filter((_, index) => index !== itemIndex);
    blocks[blockIndex] = block;
    box.blocks = blocks;
    next[boxIndex] = box;
    onChange(next);
  };

  const addBox = () => {
    const next = [...sections, createLegalBox()];
    onChange(next);
    setActiveBoxIndex(next.length - 1);
  };

  const removeBox = (index) => {
    const next = sections.filter((_, boxIndex) => boxIndex !== index);
    onChange(next);
    if (activeBoxIndex === index) setActiveBoxIndex(null);
  };

  const addBlockToBox = (boxIndex, type) => {
    const next = [...sections];
    const box = { ...next[boxIndex] };
    box.blocks = [...(box.blocks || []), createLegalBlock(type)];
    next[boxIndex] = box;
    onChange(next);
    setActiveBoxIndex(null);
  };

  const renderBlockFields = (boxIndex, block, blockIndex) => {
    const baseClass = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500";

    if (block.type === "heading") {
      return (
        <input
          className={baseClass}
          value={block.title || ""}
          onChange={(e) => updateBlock(boxIndex, blockIndex, "title", e.target.value)}
          placeholder="Heading text"
        />
      );
    }

    if (block.type === "paragraph" || block.type === "quote" || block.type === "highlight") {
      return (
        <textarea
          className={`${baseClass} resize-none`}
          rows={block.type === "paragraph" ? 4 : 3}
          value={block.content || ""}
          onChange={(e) => updateBlock(boxIndex, blockIndex, "content", e.target.value)}
          placeholder={`${label} ${block.type}`}
        />
      );
    }

    if (block.type === "list") {
      return (
        <div className="space-y-3">
          <input
            className={baseClass}
            value={block.title || ""}
            onChange={(e) => updateBlock(boxIndex, blockIndex, "title", e.target.value)}
            placeholder="List heading (optional)"
          />
          {(block.items || []).map((item, itemIndex) => (
            <div key={itemIndex} className="flex gap-2">
              <input
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500"
                value={item}
                onChange={(e) => updateBlockItem(boxIndex, blockIndex, itemIndex, e.target.value)}
                placeholder={`Item ${itemIndex + 1}`}
              />
              <button type="button" onClick={() => removeBlockItem(boxIndex, blockIndex, itemIndex)} className="rounded-2xl border border-slate-200 px-4 py-3 text-rose-600 hover:bg-rose-50">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addBlockItem(boxIndex, blockIndex)} className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            + Add list item
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <input
          className={baseClass}
          value={block.title || ""}
          onChange={(e) => updateBlock(boxIndex, blockIndex, "title", e.target.value)}
          placeholder="Section title"
        />
        <textarea
          className={`${baseClass} resize-none`}
          rows={4}
          value={block.content || ""}
          onChange={(e) => updateBlock(boxIndex, blockIndex, "content", e.target.value)}
          placeholder="Section content"
        />
      </div>
    );
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-bold text-slate-800 text-lg">{label}</h3>
        <span className="text-xs font-semibold text-slate-500">Click the white box to add blocks</span>
      </div>

      <button
        type="button"
        onClick={addBox}
        className="w-full rounded-[2rem] border-2 border-dashed border-slate-200 bg-white px-5 py-8 text-left transition-all hover:border-blue-300 hover:bg-blue-50/40"
      >
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-slate-700">White box to add a new block box</div>
          <div className="text-sm text-slate-500">Click once to create a box, then use Add inside that box to insert List, Quote, Highlight, Sections, Heading, Paragraph.</div>
        </div>
      </button>

      <div className="space-y-4">
        {sections.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-100 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
            No blocks yet. Add a section above.
          </div>
        ) : (
          sections.map((box, boxIndex) => (
            <div key={`box-${boxIndex}`} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 md:p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <input
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none"
                  value={box.title || ""}
                  onChange={(e) => updateBox(boxIndex, "title", e.target.value)}
                  placeholder="Box title"
                />
                <button type="button" onClick={() => removeBox(boxIndex)} className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                  Delete box
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setActiveBoxIndex(activeBoxIndex === boxIndex ? null : boxIndex)} className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                    + Add block
                  </button>
                  <span className="text-xs text-slate-500 self-center">Blocks inside this box: {Array.isArray(box.blocks) ? box.blocks.length : 0}</span>
                </div>

                {activeBoxIndex === boxIndex && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    {LEGAL_SECTION_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => addBlockToBox(boxIndex, type.value)}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-900 hover:text-white"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {(box.blocks || []).length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                    No blocks in this box yet. Use + Add block.
                  </div>
                ) : (
                  (box.blocks || []).map((block, blockIndex) => (
                    <div key={`${block.type}-${blockIndex}`} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <select
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none"
                          value={block.type}
                          onChange={(e) => updateBlock(boxIndex, blockIndex, "type", e.target.value)}
                        >
                          {LEGAL_SECTION_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...sections];
                            const boxCopy = { ...next[boxIndex] };
                            boxCopy.blocks = (boxCopy.blocks || []).filter((_, idx) => idx !== blockIndex);
                            next[boxIndex] = boxCopy;
                            onChange(next);
                          }}
                          className="rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          Delete block
                        </button>
                      </div>
                      {renderBlockFields(boxIndex, block, blockIndex)}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      
    </section>
  );
};

const SiteSettingsPage = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [ctaPreview, setCtaPreview] = useState(null);
  const [ctaFile, setCtaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    brandText: "",
    footerText: "",
    footerAddress: "",
    copyrightText: "",
    ctaTitle: "",
    ctaDescription: "",
    socialTwitter: "",
    socialLinkedin: "",
    socialYoutube: "",
    socialFacebook: "",
    socialGlobe: "",
    termsPayload: "",
    privacyPayload: "",
    termsSections: [],
    privacySections: [],
  });

  useEffect(() => {
    requireAdminAuth();
    const fetchConfig = async () => {
      try {
        const res = await fetch(API.site.getConfig);
        const data = await res.json();
        if (data?.success) {
          const d = data.data;
          setForm({
            brandText: d.brandText || "",
            footerText: d.footerText || "",
            footerAddress: d.footerAddress || "",
            copyrightText: d.copyrightText || "",
            ctaTitle: d.ctaTitle || "",
            ctaDescription: d.ctaDescription || "",
            socialTwitter: d.socialTwitter || "",
            socialLinkedin: d.socialLinkedin || "",
            socialYoutube: d.socialYoutube || "",
            socialFacebook: d.socialFacebook || "",
            socialGlobe: d.socialGlobe || "",
            termsPayload: d.termsPayload || "",
            privacyPayload: d.privacyPayload || "",
            termsSections: normalizeLegalBoxes(safeParseJson(d.termsSections, legacyTextToBoxes(d.termsContent))),
            privacySections: normalizeLegalBoxes(safeParseJson(d.privacySections, legacyTextToBoxes(d.privacyContent))),
          });
          if (d.logo) setLogoPreview(d.logo);
          if (d.ctaImage) setCtaPreview(d.ctaImage);
        }
      } catch (err) {
        toast.error("Failed to load initial configuration");
      } finally {
        setFetching(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // File size validation (Optional but recommended)
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size should be less than 2MB");
    }

    if (type === "logo") {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      toast.success("Logo preview updated!");
    } else {
      setCtaFile(file);
      setCtaPreview(URL.createObjectURL(file));
      toast.success("CTA image preview updated!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating system settings...");

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      if (logoFile) formData.append("logo", logoFile);
      if (ctaFile) formData.append("ctaImage", ctaFile);
      const termsSections = Array.isArray(form.termsSections) ? form.termsSections : [];
      const privacySections = Array.isArray(form.privacySections) ? form.privacySections : [];

      Object.entries(form).forEach(([key, value]) => {
        if (key === "termsSections" || key === "privacySections") return;
        formData.append(key, value);
      });

      formData.set("termsSections", JSON.stringify(termsSections));
      formData.set("privacySections", JSON.stringify(privacySections));
      formData.set("termsContent", sectionsToPlainText(termsSections));
      formData.set("privacyContent", sectionsToPlainText(privacySections));

      const res = await fetch(API.site.getConfig, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Settings updated successfully!", { id: loadingToast });
      } else {
        toast.error(data.message || "Something went wrong", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Update failed. Please check connection.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const InputGroup = ({ label, icon: Icon, isDark = false, ...props }) => (
    <div className="space-y-2 group">
      <label className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600 group-focus-within:text-blue-600'}`}>
        {Icon && <Icon size={16} />} {label}
      </label>
      <input 
        {...props}
        className={`w-full rounded-xl p-3 outline-none transition-all ${
          isDark 
          ? 'bg-white/5 border border-white/10 text-white focus:border-blue-500' 
          : 'bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 placeholder:text-slate-400'
        }`}
      />
    </div>
  );

  if (fetching) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-slate-500 font-medium animate-pulse">Loading settings...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Site Configuration</h1>
          <p className="text-slate-500 font-medium">Global identity and user interface control center.</p>
        </div>
        <button 
          form="settings-form"
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {loading ? "Saving Changes..." : "Push Updates"}
        </button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 px-2">
              <Layout className="text-blue-500" size={18} /> Brand Identity
            </h3>
            
            <div className="flex flex-col items-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 transition-all relative group">
              {logoPreview ? (
                <div className="relative">
                   <img src={logoPreview} alt="Logo" className="w-32 h-32 object-contain mb-4 rounded-xl shadow-sm bg-white p-2" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Upload className="text-white" />
                   </div>
                </div>
              ) : (
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Upload size={32} />
                </div>
              )}
              <label className="mt-2 cursor-pointer bg-white text-slate-700 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                Change Logo
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} className="hidden" />
              </label>
            </div>

            <InputGroup 
              label="Company Name" 
              name="brandText" 
              value={form.brandText} 
              onChange={handleChange} 
              icon={Type}
              placeholder="e.g. Nexus Global"
            />
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Globe className="text-blue-500" size={18} /> Social Media Links
            </h3>
            <div className="space-y-4">
              <InputGroup label="Facebook" name="socialFacebook" value={form.socialFacebook} onChange={handleChange} icon={Facebook} />
              <InputGroup label="LinkedIn" name="socialLinkedin" value={form.socialLinkedin} onChange={handleChange} icon={Linkedin} />
              <InputGroup label="Twitter / X" name="socialTwitter" value={form.socialTwitter} onChange={handleChange} icon={Twitter} />
              <InputGroup label="YouTube" name="socialYoutube" value={form.socialYoutube} onChange={handleChange} icon={Youtube} />
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* CTA Banner Section */}
          <section className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-800 flex items-center gap-3 text-xl tracking-tight">
                <CheckCircle2 className="text-emerald-500" size={24} /> Homepage CTA Banner
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Banner Background</label>
                 <div className="relative group overflow-hidden rounded-[2rem] h-56 bg-slate-100 border-4 border-white shadow-inner">
                    {ctaPreview ? (
                      <img src={ctaPreview} alt="CTA" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-300"><Upload size={40} /></div>
                    )}
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white font-bold gap-2">
                      <Upload size={24} /> 
                      <span className="text-xs uppercase tracking-tighter">Replace Banner Image</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cta")} className="hidden" />
                    </label>
                 </div>
              </div>
              <div className="space-y-6">
                <InputGroup label="Banner Main Title" name="ctaTitle" value={form.ctaTitle} onChange={handleChange} icon={Info} />
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">CTA Description</label>
                  <textarea 
                    name="ctaDescription" 
                    value={form.ctaDescription} 
                    onChange={handleChange} 
                    rows={5}
                    placeholder="Describe the call to action..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer Details */}
          <section className="bg-slate-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl space-y-8">
            <h3 className="font-black text-white flex items-center gap-3 text-xl">
              <Layout className="text-blue-400" size={24} /> Global Footer Designer
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Brand Bio / Footer Text</label>
                <textarea 
                  name="footerText" 
                  value={form.footerText} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200 outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <MapPin size={14}/> Physical HQ Address
                </label>
                <textarea 
                  name="footerAddress" 
                  value={form.footerAddress} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-200 outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <InputGroup 
                label="Copyright Text" 
                name="copyrightText" 
                value={form.copyrightText} 
                onChange={handleChange} 
                isDark={true}
              />
            </div>
          </section>

          <LegalSectionEditor
            label="Terms & Conditions"
            sections={form.termsSections}
            onChange={(sections) => setForm({ ...form, termsSections: sections })}
            payload={form.termsPayload}
            onPayloadChange={(value) => setForm({ ...form, termsPayload: value })}
          />

          <LegalSectionEditor
            label="Privacy Policy"
            sections={form.privacySections}
            onChange={(sections) => setForm({ ...form, privacySections: sections })}
            payload={form.privacyPayload}
            onPayloadChange={(value) => setForm({ ...form, privacyPayload: value })}
          />
        </div>
      </form>
    </div>
  );
};

export default SiteSettingsPage;