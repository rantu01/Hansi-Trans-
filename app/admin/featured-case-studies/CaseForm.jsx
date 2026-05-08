"use client";

import { API } from "@/app/config/api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const createFlexibleSectionCard = () => ({
  title: "",
  description: "",
});

const createFlexibleSection = () => ({
  type: "text",
  title: "",
  text: "",
  image: "",
  layout: "image-left",
  variant: "grid",
  points: [""],
  cards: [createFlexibleSectionCard()],
  quote: "",
  caption: "",
});

const defaultDetailsContent = {
  publisher: {
    name: "",
    logo: "",
  },
  introduction: {
    title: "Introduction",
    text: "Expanding your game into Asian markets is an exciting opportunity—but without proper localization, even the best game can fail to connect. This guide walks you through cultural adaptation, language challenges, voice-over best practices, and marketing strategies to make your game a success in China, Japan, Korea, and Southeast Asia.",
  },
  sectionOne: {
    title: "Understanding The Asian Gaming Market",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC cafe gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
    highlight: "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  },
  sectionTwo: {
    title: "Understanding The Asian Gaming Market",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC cafe gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
    highlight: "👉 Key takeaway: One region ≠ one strategy. Treat each country uniquely.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  },
  richSectionOne: {
    title: "Multilingual Voice-Over: Bringing Characters To Life",
    text: "Think about your favorite brands. Apple, Nike, or Airbnb don't just sell products. They sell trust, identity, and belonging.",
    points: [
      "Mobile gaming dominates in China and SEA.",
      "Japan has a strong console and anime-driven game culture.",
      "Korea is a leader in esports and PC café gaming.",
      "SEA is diverse, with markets like Indonesia, Thailand, and Vietnam growing fast.",
    ],
  },
  richSectionTwo: {
    title: "Influencer & KOL Marketing For Games",
    cards: [
      { title: "Brand Identity (Visuals)", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "Tone of Voice", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "Brand Story", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
      { title: "User Experience (UX)", description: "This includes your logo, color palette, typography, and imagery. Consistency here builds recognition and trust." },
    ],
  },
  sections: [createFlexibleSection()],
  bannerImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800",
  quoteText: "\"People will forget what you said, but they'll remember how your brand made them feel.\"",
  conclusion: {
    title: "Conclusion",
    text: "Expanding into Asian markets is more than just translation—it's about building authentic cultural connections. By combining localization, high-quality voice-over, and region-specific marketing, you can scale your game successfully.",
  },
};

const mergeDetailsContent = (input = {}) => ({
  ...defaultDetailsContent,
  ...input,
  publisher: {
    ...defaultDetailsContent.publisher,
    ...(input.publisher || {}),
  },
  introduction: {
    ...defaultDetailsContent.introduction,
    ...(input.introduction || {}),
  },
  sectionOne: {
    ...defaultDetailsContent.sectionOne,
    ...(input.sectionOne || {}),
    points: Array.isArray(input.sectionOne?.points)
      ? input.sectionOne.points
      : defaultDetailsContent.sectionOne.points,
  },
  sectionTwo: {
    ...defaultDetailsContent.sectionTwo,
    ...(input.sectionTwo || {}),
    points: Array.isArray(input.sectionTwo?.points)
      ? input.sectionTwo.points
      : defaultDetailsContent.sectionTwo.points,
  },
  richSectionOne: {
    ...defaultDetailsContent.richSectionOne,
    ...(input.richSectionOne || {}),
    points: Array.isArray(input.richSectionOne?.points)
      ? input.richSectionOne.points
      : defaultDetailsContent.richSectionOne.points,
  },
  richSectionTwo: {
    ...defaultDetailsContent.richSectionTwo,
    ...(input.richSectionTwo || {}),
    cards: Array.isArray(input.richSectionTwo?.cards)
      ? input.richSectionTwo.cards
      : defaultDetailsContent.richSectionTwo.cards,
  },
  sections: Array.isArray(input.sections)
    ? input.sections
    : defaultDetailsContent.sections,
  conclusion: {
    ...defaultDetailsContent.conclusion,
    ...(input.conclusion || {}),
  },
});

export default function CaseForm({ refresh, editing, clearEdit }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [isReverse, setIsReverse] = useState(false);
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [preview, setPreview] = useState("");
  const [stats, setStats] = useState([]);
  const [detailsContent, setDetailsContent] = useState(defaultDetailsContent);
  const [uploading, setUploading] = useState(false);
  const [metaTags, setMetaTags] = useState({
    title: "",
    description: "",
    keywords: [],
    ogImage: ""
  });

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setSlug(editing.slug || "");
      setDescription(editing.description || "");
      setTag(editing.tag || "");
      setIsReverse(editing.isReverse || false);
      setImage(editing.image || "");
      setLogo(editing.logo || editing.detailsContent?.publisher?.logo || "");
      setPreview(editing.image || "");
      setStats(editing.stats || []);
      setDetailsContent(mergeDetailsContent(editing.detailsContent || {}));
      setMetaTags(editing.metaTags || { title: "", description: "", keywords: [], ogImage: "" });
    } else {
      // Reset metaTags when not editing
      setMetaTags({ title: "", description: "", keywords: [], ogImage: "" });
    }
  }, [editing]);

  const normalizeSlug = (value = "") =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(API.uploadImage, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data.url;
  };

  const handleUploadAndSet = async (file, setter) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setter(url || "");
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Upload successful',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Upload failed', text: String(error || "") });
    } finally {
      setUploading(false);
    }
  };

  const addStat = () => setStats([...stats, { label: "", value: "", isIcon: false }]);
  const updateStat = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };
  const removeStat = (index) => setStats(stats.filter((_, i) => i !== index));

  const updateSectionPoints = (sectionKey, index, value) => {
    setDetailsContent((prev) => {
      const points = [...(prev[sectionKey]?.points || [])];
      points[index] = value;
      return {
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          points,
        },
      };
    });
  };

  const addSectionPoint = (sectionKey) => {
    setDetailsContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        points: [...(prev[sectionKey]?.points || []), ""],
      },
    }));
  };

  const removeSectionPoint = (sectionKey, index) => {
    setDetailsContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        points: (prev[sectionKey]?.points || []).filter((_, i) => i !== index),
      },
    }));
  };

  const updateCard = (index, field, value) => {
    setDetailsContent((prev) => {
      const cards = [...(prev.richSectionTwo?.cards || [])];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        richSectionTwo: {
          ...prev.richSectionTwo,
          cards,
        },
      };
    });
  };

  const addCard = () => {
    setDetailsContent((prev) => ({
      ...prev,
      richSectionTwo: {
        ...prev.richSectionTwo,
        cards: [...(prev.richSectionTwo?.cards || []), { title: "", description: "" }],
      },
    }));
  };

  const removeCard = (index) => {
    setDetailsContent((prev) => ({
      ...prev,
      richSectionTwo: {
        ...prev.richSectionTwo,
        cards: (prev.richSectionTwo?.cards || []).filter((_, i) => i !== index),
      },
    }));
  };

  const addFlexibleSection = () => {
    setDetailsContent((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), createFlexibleSection()],
    }));
  };

  const removeFlexibleSection = (index) => {
    setDetailsContent((prev) => ({
      ...prev,
      sections: (prev.sections || []).filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const moveFlexibleSection = (fromIndex, direction) => {
    setDetailsContent((prev) => {
      const sections = [...(prev.sections || [])];
      const toIndex = fromIndex + direction;
      if (toIndex < 0 || toIndex >= sections.length) {
        return prev;
      }

      const [movedSection] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, movedSection);
      return { ...prev, sections };
    });
  };

  const updateFlexibleSection = (index, updater) => {
    setDetailsContent((prev) => {
      const sections = [...(prev.sections || [])];
      sections[index] = updater(sections[index] || createFlexibleSection());
      return { ...prev, sections };
    });
  };

  const updateFlexibleSectionPoint = (sectionIndex, pointIndex, value) => {
    updateFlexibleSection(sectionIndex, (section) => {
      const points = [...(section.points || [])];
      points[pointIndex] = value;
      return { ...section, points };
    });
  };

  const addFlexibleSectionPoint = (sectionIndex) => {
    updateFlexibleSection(sectionIndex, (section) => ({
      ...section,
      points: [...(section.points || []), ""],
    }));
  };

  const removeFlexibleSectionPoint = (sectionIndex, pointIndex) => {
    updateFlexibleSection(sectionIndex, (section) => ({
      ...section,
      points: (section.points || []).filter((_, idx) => idx !== pointIndex),
    }));
  };

  const addFlexibleSectionCard = (sectionIndex) => {
    updateFlexibleSection(sectionIndex, (section) => ({
      ...section,
      cards: [...(section.cards || []), createFlexibleSectionCard()],
    }));
  };

  const updateFlexibleSectionCard = (sectionIndex, cardIndex, field, value) => {
    updateFlexibleSection(sectionIndex, (section) => {
      const cards = [...(section.cards || [])];
      cards[cardIndex] = { ...(cards[cardIndex] || createFlexibleSectionCard()), [field]: value };
      return { ...section, cards };
    });
  };

  const removeFlexibleSectionCard = (sectionIndex, cardIndex) => {
    updateFlexibleSection(sectionIndex, (section) => ({
      ...section,
      cards: (section.cards || []).filter((_, idx) => idx !== cardIndex),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image first");

    const payload = {
      title,
      slug: normalizeSlug(slug || title),
      description,
      tag,
      image,
      logo,
      isReverse,
      stats,
      detailsContent,
      metaTags,
    };

    const url = editing ? `${API.featuredCaseStudies}/${editing._id}` : API.featuredCaseStudies;
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire({ icon: 'success', title: editing ? 'Case study updated' : 'Case study created', showConfirmButton: false, timer: 1800 });
        clearForm();
        refresh();
      } else {
        const err = await res.text();
        Swal.fire({ icon: 'error', title: 'Save failed', text: err || 'Server error' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Save failed', text: String(err || '') });
    }
  };

  const clearForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setTag("");
    setImage("");
    setLogo("");
    setPreview("");
    setIsReverse(false);
    setStats([]);
    setDetailsContent(defaultDetailsContent);
    setMetaTags({ title: "", description: "", keywords: [], ogImage: "" });
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-4 md:p-6 rounded-xl shadow-sm space-y-5 w-full max-w-4xl mx-auto">
      <h2 className="font-bold text-xl text-gray-800 border-b pb-3">
        {editing ? "📝 Edit Case Study" : "✨ Add New Case Study"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Title</label>
          <input
            className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none"
            placeholder="Project Title"
            value={title}
            onChange={(e) => {
              const nextTitle = e.target.value;
              setTitle(nextTitle);
              if (!editing) {
                setSlug(normalizeSlug(nextTitle));
              }
            }}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Slug</label>
          <input
            className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none"
            placeholder="project-slug"
            value={slug}
            onChange={(e) => setSlug(normalizeSlug(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description (Hero)</label>
        <textarea className="border p-2.5 w-full rounded-lg h-28 focus:ring-2 focus:ring-black outline-none" placeholder="Write about the project..." value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Tag / Category</label>
          <input className="border p-2.5 w-full rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="e.g. Web Development" value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="checkbox" className="w-5 h-5 accent-black" checked={isReverse} onChange={(e) => setIsReverse(e.target.checked)} />
          <span className="text-sm font-medium">Reverse Layout (Desktop)</span>
        </label>
      </div>

      <div className="space-y-2 border-t pt-4">
        <p className="text-xs font-bold text-gray-500 uppercase ml-1">Feature Image</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4 transition hover:border-black hover:bg-white sm:min-w-[260px]">
            <div>
              <p className="text-sm font-semibold text-gray-900">Upload feature image</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
            </div>
            {uploading ? (
              <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-bold text-white">Uploading...</span>
            ) : (
              <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white transition group-hover:bg-gray-800">Browse</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                setPreview(URL.createObjectURL(file));
                await handleUploadAndSet(file, setImage);
              }}
            />
          </label>
          {preview && <img src={preview} alt="Preview" className="h-20 w-28 object-cover rounded-2xl border shadow-sm" />}
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <p className="text-xs font-bold text-gray-500 uppercase ml-1">Publisher Logo</p>
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
          <input
            className="border p-2.5 w-full rounded-2xl focus:ring-2 focus:ring-black outline-none bg-white"
            placeholder="Logo image URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
          <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 transition hover:border-black hover:bg-white">
            <span className="text-sm font-semibold text-gray-900">Upload logo</span>
            {uploading ? (
              <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-bold text-white">Uploading...</span>
            ) : (
              <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white transition group-hover:bg-gray-800">Browse</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                await handleUploadAndSet(file, setLogo);
              }}
            />
          </label>
        </div>
        {logo ? <img src={logo} alt="Publisher logo preview" className="h-14 w-auto rounded-lg border bg-white object-contain p-2" /> : null}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-gray-700">Project Statistics</p>
          <button type="button" onClick={addStat} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">
            + Add Stat
          </button>
        </div>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-lg border shadow-sm relative">
              <input className="border p-2 rounded text-sm flex-1" placeholder="Label (Clients)" value={stat.label} onChange={(e) => updateStat(index, "label", e.target.value)} />
              <input className="border p-2 rounded text-sm flex-1" placeholder="Value (200+)" value={stat.value} onChange={(e) => updateStat(index, "value", e.target.value)} />
              <div className="flex items-center justify-between gap-4 md:w-auto">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input type="checkbox" checked={stat.isIcon} onChange={(e) => updateStat(index, "isIcon", e.target.checked)} /> Icon?
                </label>
                <button type="button" onClick={() => removeStat(index)} className="text-red-500 hover:text-red-700 font-bold text-sm px-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <p className="font-bold text-gray-700">Case Study Details Page Content</p>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Publisher Name</label>
          <input
            className="border p-2.5 w-full rounded-lg outline-none"
            value={detailsContent.publisher?.name || ""}
            onChange={(e) => setDetailsContent((prev) => ({
              ...prev,
              publisher: {
                ...(prev.publisher || {}),
                name: e.target.value,
              },
            }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Introduction Title</label>
          <input
            className="border p-2.5 w-full rounded-lg outline-none"
            value={detailsContent.introduction.title}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, introduction: { ...prev.introduction, title: e.target.value } }))}
          />
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">Introduction Text</label>
          <textarea
            className="border p-2.5 w-full rounded-lg h-24 outline-none"
            value={detailsContent.introduction.text}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, introduction: { ...prev.introduction, text: e.target.value } }))}
          />
        </div>

        {/* {["sectionOne", "sectionTwo"].map((sectionKey, idx) => (
          <div key={sectionKey} className="bg-white p-3 rounded-lg border space-y-2">
            <p className="font-semibold text-sm">{idx === 0 ? "Section One (Text Left, Image Right)" : "Section Two (Image Left, Text Right)"}</p>
            <input
              className="border p-2.5 w-full rounded-lg outline-none"
              placeholder="Section Title"
              value={detailsContent[sectionKey].title}
              onChange={(e) => setDetailsContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], title: e.target.value } }))}
            />
            <textarea
              className="border p-2.5 w-full rounded-lg h-20 outline-none"
              placeholder="Section Text"
              value={detailsContent[sectionKey].text}
              onChange={(e) => setDetailsContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], text: e.target.value } }))}
            />

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase">Bullet Points</p>
              {(detailsContent[sectionKey].points || []).map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2">
                  <input
                    className="border p-2 w-full rounded-lg outline-none"
                    value={point}
                    onChange={(e) => updateSectionPoints(sectionKey, pointIndex, e.target.value)}
                  />
                  <button type="button" onClick={() => removeSectionPoint(sectionKey, pointIndex)} className="px-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addSectionPoint(sectionKey)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">+ Add Point</button>
            </div>

            <textarea
              className="border p-2.5 w-full rounded-lg h-16 outline-none"
              placeholder="Highlight Text"
              value={detailsContent[sectionKey].highlight || ""}
              onChange={(e) => setDetailsContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], highlight: e.target.value } }))}
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Section Image</label>
              <input
                className="border p-2.5 w-full rounded-lg outline-none"
                placeholder="Image URL"
                value={detailsContent[sectionKey].image || ""}
                onChange={(e) => setDetailsContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], image: e.target.value } }))}
              />
              <input
                type="file"
                accept="image/*"
                className="text-sm"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  await handleUploadAndSet(file, (url) =>
                    setDetailsContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], image: url } }))
                  );
                }}
              />
            </div>
          </div>
        ))} */}

        {/* <div className="bg-white p-3 rounded-lg border space-y-2">
          <p className="font-semibold text-sm">Text Section One</p>
          <input
            className="border p-2.5 w-full rounded-lg outline-none"
            value={detailsContent.richSectionOne.title}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, richSectionOne: { ...prev.richSectionOne, title: e.target.value } }))}
          />
          <textarea
            className="border p-2.5 w-full rounded-lg h-20 outline-none"
            value={detailsContent.richSectionOne.text}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, richSectionOne: { ...prev.richSectionOne, text: e.target.value } }))}
          />
          {(detailsContent.richSectionOne.points || []).map((point, pointIndex) => (
            <div key={pointIndex} className="flex gap-2">
              <input
                className="border p-2 w-full rounded-lg outline-none"
                value={point}
                onChange={(e) => updateSectionPoints("richSectionOne", pointIndex, e.target.value)}
              />
              <button type="button" onClick={() => removeSectionPoint("richSectionOne", pointIndex)} className="px-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addSectionPoint("richSectionOne")} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">+ Add Point</button>
        </div> */}

        {/* <div className="bg-white p-3 rounded-lg border space-y-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">Text Section Two</p>
            <button type="button" onClick={addCard} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">+ Add Card</button>
          </div>
          <input
            className="border p-2.5 w-full rounded-lg outline-none"
            value={detailsContent.richSectionTwo.title}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, richSectionTwo: { ...prev.richSectionTwo, title: e.target.value } }))}
          />
          {(detailsContent.richSectionTwo.cards || []).map((card, index) => (
            <div key={index} className="border rounded-lg p-2 space-y-2">
              <input
                className="border p-2 w-full rounded-lg outline-none"
                placeholder="Card Title"
                value={card.title}
                onChange={(e) => updateCard(index, "title", e.target.value)}
              />
              <textarea
                className="border p-2 w-full rounded-lg h-16 outline-none"
                placeholder="Card Description"
                value={card.description}
                onChange={(e) => updateCard(index, "description", e.target.value)}
              />
              <button type="button" onClick={() => removeCard(index)} className="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Remove Card</button>
            </div>
          ))}
        </div> */}

        <div className="bg-white p-4 rounded-2xl border space-y-4 shadow-sm">
          <div className="flex justify-between items-center gap-3">
            <div>
              <p className="font-semibold text-sm">Page Content Sections</p>
              <p className="text-xs text-gray-500">Build the page from custom blocks. Existing fields still work for legacy content.</p>
            </div>
            
          </div>

          <div className="space-y-4">
            {(detailsContent.sections || []).map((section, sectionIndex) => (
              <div key={sectionIndex} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sm">Section {sectionIndex + 1}</p>
                    <p className="text-xs text-gray-500">{section.type || "text"} block</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => moveFlexibleSection(sectionIndex, -1)} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-700 disabled:opacity-40" disabled={sectionIndex === 0}>↑</button>
                    <button type="button" onClick={() => moveFlexibleSection(sectionIndex, 1)} className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-700 disabled:opacity-40" disabled={sectionIndex === (detailsContent.sections || []).length - 1}>↓</button>
                    <button type="button" onClick={() => removeFlexibleSection(sectionIndex)} className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">Remove</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Type</label>
                    <select
                      className="border p-2.5 w-full rounded-lg outline-none"
                      value={section.type}
                      onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, type: e.target.value }))}
                    >
                      <option value="text">Text</option>
                      <option value="image-text">Image + Text</option>
                      <option value="cards">Card Grid</option>
                      <option value="quote">Quote</option>
                      <option value="image">Image</option>
                      <option value="list">List</option>
                    </select>
                  </div>

                  {section.type === "image-text" ? (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Layout</label>
                      <select
                        className="border p-2.5 w-full rounded-lg outline-none"
                        value={section.layout}
                        onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, layout: e.target.value }))}
                      >
                        <option value="image-left">Image Left</option>
                        <option value="image-right">Image Right</option>
                      </select>
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="border p-2.5 w-full rounded-lg outline-none"
                    placeholder="Section title"
                    value={section.title}
                    onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, title: e.target.value }))}
                  />
                  <input
                    className="border p-2.5 w-full rounded-lg outline-none"
                    placeholder="Caption / small note"
                    value={section.caption || ""}
                    onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, caption: e.target.value }))}
                  />
                </div>

                {section.type !== "quote" ? (
                  <textarea
                    className="border p-2.5 w-full rounded-lg h-24 outline-none"
                    placeholder={section.type === "cards" ? "Intro text for card grid" : "Section text"}
                    value={section.text}
                    onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, text: e.target.value }))}
                  />
                ) : null}

                {(section.type === "image" || section.type === "image-text") ? (
                  <div className="space-y-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        className="border p-2.5 w-full rounded-2xl outline-none bg-white"
                        placeholder="Image URL"
                        value={section.image || ""}
                        onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, image: e.target.value }))}
                      />
                      <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 transition hover:border-black hover:bg-white sm:w-[220px]">
                        <span className="text-sm font-semibold text-gray-900">Upload image</span>
                        {uploading ? (
                          <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-bold text-white">Uploading...</span>
                        ) : (
                          <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white transition group-hover:bg-gray-800">Browse</span>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            await handleUploadAndSet(file, (url) => setDetailsContent((prev) => ({
                              ...prev,
                              sections: (prev.sections || []).map((item, idx) => idx === sectionIndex ? { ...item, image: url } : item),
                            })));
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ) : null}

                {section.type === "quote" ? (
                  <textarea
                    className="border p-2.5 w-full rounded-lg h-20 outline-none"
                    placeholder="Quote text"
                    value={section.quote || ""}
                    onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, quote: e.target.value }))}
                  />
                ) : null}

                {section.type === "cards" ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Variant</label>
                    <select
                      className="border p-2.5 w-full rounded-lg outline-none"
                      value={section.variant || "grid"}
                      onChange={(e) => updateFlexibleSection(sectionIndex, (current) => ({ ...current, variant: e.target.value }))}
                    >
                      <option value="grid">Grid (default)</option>
                      <option value="strip">Compact strip (for small cards)</option>
                    </select>
                  </div>
                ) : null}

                {(section.type === "list" || section.type === "image-text") ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase ml-1">Points</p>
                    {(section.points || []).map((point, pointIndex) => (
                      <div key={pointIndex} className="flex gap-2">
                        <input
                          className="border p-2 w-full rounded-lg outline-none"
                          value={point}
                          onChange={(e) => updateFlexibleSectionPoint(sectionIndex, pointIndex, e.target.value)}
                        />
                        <button type="button" onClick={() => removeFlexibleSectionPoint(sectionIndex, pointIndex)} className="px-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addFlexibleSectionPoint(sectionIndex)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">+ Add Point</button>
                  </div>
                ) : null}

                {section.type === "cards" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-500 uppercase ml-1">Cards</p>
                      <button type="button" onClick={() => addFlexibleSectionCard(sectionIndex)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold">+ Add Card</button>
                    </div>
                    {(section.cards || []).map((card, cardIndex) => (
                      <div key={cardIndex} className="border rounded-lg p-2 space-y-2 bg-white">
                        <input
                          className="border p-2 w-full rounded-lg outline-none"
                          placeholder="Card title"
                          value={card.title || ""}
                          onChange={(e) => updateFlexibleSectionCard(sectionIndex, cardIndex, "title", e.target.value)}
                        />
                        <textarea
                          className="border p-2 w-full rounded-lg h-16 outline-none"
                          placeholder="Card description"
                          value={card.description || ""}
                          onChange={(e) => updateFlexibleSectionCard(sectionIndex, cardIndex, "description", e.target.value)}
                        />
                        <button type="button" onClick={() => removeFlexibleSectionCard(sectionIndex, cardIndex)} className="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-bold">Remove Card</button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <button type="button" onClick={addFlexibleSection} className="text-xs bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-bold shadow-sm">+ Add Section</button>
        </div>

        {/* <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase">Banner Image URL</label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              className="border p-2.5 w-full rounded-2xl outline-none bg-white"
              value={detailsContent.bannerImage}
              onChange={(e) => setDetailsContent((prev) => ({ ...prev, bannerImage: e.target.value }))}
            />
            <label className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 transition hover:border-black hover:bg-white sm:w-[220px]">
              <span className="text-sm font-semibold text-gray-900">Upload banner</span>
              {uploading ? (
                <span className="rounded-full bg-gray-600 px-3 py-1 text-xs font-bold text-white">Uploading...</span>
              ) : (
                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-white transition group-hover:bg-gray-800">Browse</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  await handleUploadAndSet(file, (url) => setDetailsContent((prev) => ({ ...prev, bannerImage: url })));
                }}
              />
            </label>
          </div>

          <label className="text-xs font-bold text-gray-500 uppercase">Quote</label>
          <textarea
            className="border p-2.5 w-full rounded-lg h-16 outline-none"
            value={detailsContent.quoteText}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, quoteText: e.target.value }))}
          />

          <label className="text-xs font-bold text-gray-500 uppercase">Conclusion Title</label>
          <input
            className="border p-2.5 w-full rounded-lg outline-none"
            value={detailsContent.conclusion.title}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, conclusion: { ...prev.conclusion, title: e.target.value } }))}
          />

          <label className="text-xs font-bold text-gray-500 uppercase">Conclusion Text</label>
          <textarea
            className="border p-2.5 w-full rounded-lg h-20 outline-none"
            value={detailsContent.conclusion.text}
            onChange={(e) => setDetailsContent((prev) => ({ ...prev, conclusion: { ...prev.conclusion, text: e.target.value } }))}
          />
        </div> */}
      </div>

      {/* SEO/META TAGS SECTION */}
      <div className="border-t pt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-700 mb-4">SEO Meta Tags</h3>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Meta Title</label>
            <input 
              className="border p-2.5 w-full rounded-lg outline-none text-xs" 
              placeholder="SEO Title (50-60 characters)" 
              value={metaTags.title || ""}
              onChange={(e) => setMetaTags({ ...metaTags, title: e.target.value })}
              maxLength="60"
            />
            <span className="text-xs text-gray-400 ml-2">{(metaTags.title || "").length}/60</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Meta Description</label>
            <textarea 
              className="border p-2.5 w-full rounded-lg outline-none text-xs h-16" 
              placeholder="SEO Description (150-160 characters)" 
              value={metaTags.description || ""}
              onChange={(e) => setMetaTags({ ...metaTags, description: e.target.value })}
              maxLength="160"
            />
            <span className="text-xs text-gray-400 ml-2">{(metaTags.description || "").length}/160</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Keywords (comma separated)</label>
            <input 
              className="border p-2.5 w-full rounded-lg outline-none text-xs" 
              placeholder="e.g. case study, gaming, localization" 
              value={(metaTags.keywords || []).join(", ")}
              onChange={(e) => setMetaTags({ 
                ...metaTags, 
                keywords: e.target.value.split(",").map(k => k.trim()).filter(k => k) 
              })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">OG Image URL</label>
            <input 
              className="border p-2.5 w-full rounded-lg outline-none text-xs" 
              placeholder="Social media preview image URL" 
              value={metaTags.ogImage || ""}
              onChange={(e) => setMetaTags({ ...metaTags, ogImage: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button disabled={uploading} className={`flex-1 md:flex-none md:px-12 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${uploading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}>
          {uploading ? "⌛ Uploading..." : editing ? "Update Project" : "Create Project"}
        </button>
        {editing && <button type="button" onClick={clearForm} className="px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-100 transition-all">Cancel</button>}
      </div>
    </form>
  );
}
