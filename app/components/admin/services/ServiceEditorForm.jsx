"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { API } from "@/app/config/api";
import {
  buildServicePayload,
  createDetailSection,
  createEmptyServiceFormData,
  createFeatureCard,
  createHighlightCard,
  createSupportCard,
  generateSlug,
  mergeServiceIntoFormData,
} from "./serviceFormUtils";

const setNestedValue = (source, path, value) => {
  const keys = path.split(".");
  const next = Array.isArray(source) ? [...source] : { ...source };
  let cursor = next;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;

    if (isLast) {
      cursor[key] = value;
      return;
    }

    const current = cursor[key];
    cursor[key] = Array.isArray(current) ? [...current] : { ...current };
    cursor = cursor[key];
  });

  return next;
};

const SectionCard = ({ title, description, children }) => (
  <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
    <div className="space-y-1">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
    </div>
    {children}
  </section>
);

const Field = ({ label, required = false, ...props }) => (
  <div className="space-y-2">
    <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
      {label}
      {required ? " *" : ""}
    </label>
    <input
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
      {...props}
    />
  </div>
);

const TextArea = ({ label, rows = 4, ...props }) => (
  <div className="space-y-2">
    <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</label>
    <textarea
      rows={rows}
      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 resize-y"
      {...props}
    />
  </div>
);

const ImageUploadField = ({ label, value, onUpload, disabled = false }) => (
  <div className="space-y-3">
    <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</label>
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 space-y-3">
      {value ? (
        <img src={value} alt={label} className="h-28 w-full rounded-xl object-cover border border-slate-200 bg-white" />
      ) : (
        <div className="h-28 rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-center text-sm text-slate-400">
          No image uploaded
        </div>
      )}
      <label className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${disabled ? "bg-slate-200 text-slate-500" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
        <Upload size={16} /> Upload Image
        <input type="file" accept="image/*" className="hidden" disabled={disabled} onChange={(event) => onUpload(event.target.files?.[0])} />
      </label>
    </div>
  </div>
);

export default function ServiceEditorForm({
  mode = "create",
  initialData,
  mainServices = [],
  submitLabel,
  onSave,
}) {
  const [formData, setFormData] = useState(createEmptyServiceFormData());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setFormData(initialData ? mergeServiceIntoFormData(initialData) : createEmptyServiceFormData());
  }, [initialData]);

  const selectedParent = useMemo(
    () => mainServices.find((service) => service._id === formData.parentService),
    [formData.parentService, mainServices]
  );

  const pathPreview = useMemo(() => {
    const currentSlug = generateSlug(formData.slug || formData.title);
    if (!currentSlug) return "";
    if (!selectedParent) return currentSlug;
    return `${selectedParent.slug}/${currentSlug}`;
  }, [formData.slug, formData.title, selectedParent]);

  const canSelectParent = useMemo(
    () => mainServices.filter((service) => service._id !== initialData?._id),
    [initialData?._id, mainServices]
  );

  const isSubService = Boolean(formData.parentService);

  const updateField = (path, value) => {
    setFormData((current) => setNestedValue(current, path, value));
  };

  const replaceArrayItem = (path, index, updater) => {
    setFormData((current) => {
      const currentArray = path.split(".").reduce((accumulator, key) => accumulator[key], current);
      const nextArray = currentArray.map((item, itemIndex) => (itemIndex === index ? updater(item) : item));
      return setNestedValue(current, path, nextArray);
    });
  };

  const addArrayItem = (path, factory) => {
    setFormData((current) => {
      const currentArray = path.split(".").reduce((accumulator, key) => accumulator[key], current);
      return setNestedValue(current, path, [...currentArray, factory()]);
    });
  };

  const removeArrayItem = (path, index) => {
    setFormData((current) => {
      const currentArray = path.split(".").reduce((accumulator, key) => accumulator[key], current);
      const nextArray = currentArray.filter((_, itemIndex) => itemIndex !== index);
      return setNestedValue(current, path, nextArray.length > 0 ? nextArray : currentArray);
    });
  };

  const handleImageUpload = async (file, path) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB allowed per image.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    const uploadData = new FormData();
    uploadData.append("image", file);
    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");

    try {
      const response = await fetch(API.uploadImage, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadData,
      });
      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(result.message || "Upload failed");
      }

      updateField(path, result.url);
      toast.success("Image uploaded", { id: loadingToast });
    } catch (error) {
      toast.error(error.message || "Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.image.trim()) {
      toast.error("Main banner image is required.");
      return;
    }

    setSaving(true);
    try {
      await onSave(buildServicePayload(formData));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <SectionCard title="Basic Information" description="Core service identity, hierarchy, and the shared content used across the public service pages.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Service Title"
            required
            value={formData.title}
            onChange={(event) => {
              const title = event.target.value;
              updateField("title", title);
              if (mode === "create" || formData.slug === generateSlug(formData.title)) {
                updateField("slug", generateSlug(title));
              }
            }}
            placeholder="e.g. Music & Sound Effects"
          />
          <Field
            label="Slug"
            required
            value={formData.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="music-sound-effects"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Assign Parent Service</label>
            <select
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500"
              value={formData.parentService}
              onChange={(event) => updateField("parentService", event.target.value)}
            >
              <option value="">None (Main Service)</option>
              {canSelectParent.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <Field label="Path Preview" value={pathPreview} readOnly placeholder="service path will appear here" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
          <div className="space-y-6">
            <TextArea
              label="Short Description"
              rows={4}
              value={formData.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="This appears in the hero and summary card."
            />
            <TextArea
              label="Extended Content"
              rows={5}
              value={formData.content}
              onChange={(event) => updateField("content", event.target.value)}
              placeholder="Longer body copy used as fallback for service page sections."
            />
            <TextArea
              label="Key Features"
              rows={3}
              value={formData.featuresText}
              onChange={(event) => updateField("featuresText", event.target.value)}
              placeholder="Comma separated values or 'Title: Description' pairs."
            />
          </div>
          <ImageUploadField label="Main Banner Image" value={formData.image} onUpload={(file) => handleImageUpload(file, "image")} disabled={uploading} />
        </div>
      </SectionCard>

      {!isSubService ? (
        <SectionCard title="Main Service Page Content" description="Controls the parent service detail page, including the sub-service section and support content.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Feature Badge Text"
              value={formData.servicePageContent.badgeText}
              onChange={(event) => updateField("servicePageContent.badgeText", event.target.value)}
              placeholder="Core promise"
            />
            <Field
              label="Project Summary Text"
              value={formData.servicePageContent.projectSummaryText}
              onChange={(event) => updateField("servicePageContent.projectSummaryText", event.target.value)}
              placeholder="over 5k+ project"
            />
          </div>

          <TextArea
            label="Feature Grid Main Description"
            rows={4}
            value={formData.servicePageContent.featureDescription}
            onChange={(event) => updateField("servicePageContent.featureDescription", event.target.value)}
            placeholder="Main paragraph under the feature grid header."
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Feature Grid Cards</h3>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => addArrayItem("servicePageContent.supportFeatures", createFeatureCard)}>
                <Plus size={16} /> Add Feature
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {formData.servicePageContent.supportFeatures.map((item, index) => (
                <div key={`support-feature-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Feature {index + 1}</h4>
                    {formData.servicePageContent.supportFeatures.length > 1 ? (
                      <button type="button" className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("servicePageContent.supportFeatures", index)}>
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                  <Field label="Title" value={item.title} onChange={(event) => replaceArrayItem("servicePageContent.supportFeatures", index, (current) => ({ ...current, title: event.target.value }))} placeholder="Global localization" />
                  <TextArea label="Description" rows={3} value={item.description} onChange={(event) => replaceArrayItem("servicePageContent.supportFeatures", index, (current) => ({ ...current, description: event.target.value }))} placeholder="Feature summary text." />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Sub-service Section Title"
              value={formData.servicePageContent.subServicesTitle}
              onChange={(event) => updateField("servicePageContent.subServicesTitle", event.target.value)}
              placeholder="Core Music & Sound Effects Services"
            />
            <Field
              label="Support Section Title"
              value={formData.servicePageContent.supportTitle}
              onChange={(event) => updateField("servicePageContent.supportTitle", event.target.value)}
              placeholder="Professional Support Services"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextArea
              label="Sub-service Section Description"
              rows={4}
              value={formData.servicePageContent.subServicesDescription}
              onChange={(event) => updateField("servicePageContent.subServicesDescription", event.target.value)}
              placeholder="Optional intro above the sub-service cards."
            />
            <TextArea
              label="Support Section Description"
              rows={4}
              value={formData.servicePageContent.supportDescription}
              onChange={(event) => updateField("servicePageContent.supportDescription", event.target.value)}
              placeholder="Optional intro above the support cards."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Professional Support Cards</h3>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => addArrayItem("professionalSupports", createSupportCard)}>
                <Plus size={16} /> Add Card
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {formData.professionalSupports.map((card, index) => (
                <div key={`support-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Support Card {index + 1}</h4>
                    {formData.professionalSupports.length > 1 ? (
                      <button type="button" className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("professionalSupports", index)}>
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                  <Field label="Title" value={card.title} onChange={(event) => replaceArrayItem("professionalSupports", index, (item) => ({ ...item, title: event.target.value }))} placeholder="Studio-grade quality" />
                  <TextArea label="Description" rows={3} value={card.description} onChange={(event) => replaceArrayItem("professionalSupports", index, (item) => ({ ...item, description: event.target.value }))} placeholder="Explain what this support card communicates." />
                  <ImageUploadField label="Card Image" value={card.image} onUpload={(file) => handleImageUpload(file, `professionalSupports.${index}.image`)} disabled={uploading} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Support Highlight Grid</h3>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => addArrayItem("servicePageContent.supportHighlights", createHighlightCard)}>
                <Plus size={16} /> Add Highlight
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {formData.servicePageContent.supportHighlights.map((item, index) => (
                <div key={`highlight-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Highlight {index + 1}</h4>
                    {formData.servicePageContent.supportHighlights.length > 1 ? (
                      <button type="button" className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("servicePageContent.supportHighlights", index)}>
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                  <Field label="Title" value={item.title} onChange={(event) => replaceArrayItem("servicePageContent.supportHighlights", index, (current) => ({ ...current, title: event.target.value }))} placeholder="Fast Turnaround Times" />
                  <TextArea label="Description" rows={3} value={item.description} onChange={(event) => replaceArrayItem("servicePageContent.supportHighlights", index, (current) => ({ ...current, description: event.target.value }))} placeholder="24-72 hours typical" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Coverage Footer Title" value={formData.servicePageContent.coverageTitle} onChange={(event) => updateField("servicePageContent.coverageTitle", event.target.value)} placeholder="Coverage Across 40+ Languages" />
            <TextArea label="Coverage Footer Description" rows={4} value={formData.servicePageContent.coverageDescription} onChange={(event) => updateField("servicePageContent.coverageDescription", event.target.value)} placeholder="Footer copy under the support highlights." />
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Sub-service Page Content" description="Controls the detailed content blocks for the nested sub-service page.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Intro Title" value={formData.subServicePageContent.introTitle} onChange={(event) => updateField("subServicePageContent.introTitle", event.target.value)} placeholder="Why Music Sound Matters" />
            <TextArea label="Intro Description" rows={4} value={formData.subServicePageContent.introDescription} onChange={(event) => updateField("subServicePageContent.introDescription", event.target.value)} placeholder="Lead-in copy for the first section." />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Feature Cards</h3>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => addArrayItem("subServicePageContent.featureCards", createFeatureCard)}>
                <Plus size={16} /> Add Feature
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {formData.subServicePageContent.featureCards.map((item, index) => (
                <div key={`feature-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Feature Card {index + 1}</h4>
                    {formData.subServicePageContent.featureCards.length > 1 ? (
                      <button type="button" className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("subServicePageContent.featureCards", index)}>
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                  <Field label="Title" value={item.title} onChange={(event) => replaceArrayItem("subServicePageContent.featureCards", index, (current) => ({ ...current, title: event.target.value }))} placeholder="Native Voice Talent" />
                  <TextArea label="Description" rows={3} value={item.description} onChange={(event) => replaceArrayItem("subServicePageContent.featureCards", index, (current) => ({ ...current, description: event.target.value }))} placeholder="Explain the feature in one short paragraph." />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Detail Sections</h3>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => addArrayItem("subServicePageContent.detailSections", createDetailSection)}>
                <Plus size={16} /> Add Section
              </button>
            </div>
            <div className="space-y-6">
              {formData.subServicePageContent.detailSections.map((section, index) => (
                <div key={`detail-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-800">Detail Section {index + 1}</h4>
                    {formData.subServicePageContent.detailSections.length > 1 ? (
                      <button type="button" className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50" onClick={() => removeArrayItem("subServicePageContent.detailSections", index)}>
                        <Trash2 size={16} />
                      </button>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="Section Title" value={section.title} onChange={(event) => replaceArrayItem("subServicePageContent.detailSections", index, (current) => ({ ...current, title: event.target.value }))} placeholder="Ready for 40+ Languages" />
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Layout</label>
                      <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500" value={section.layout} onChange={(event) => replaceArrayItem("subServicePageContent.detailSections", index, (current) => ({ ...current, layout: event.target.value }))}>
                        <option value="image-left">Image Left</option>
                        <option value="image-right">Image Right</option>
                        <option value="full-width">Full Width</option>
                      </select>
                    </div>
                  </div>
                  <TextArea label="Section Description" rows={4} value={section.description} onChange={(event) => replaceArrayItem("subServicePageContent.detailSections", index, (current) => ({ ...current, description: event.target.value }))} placeholder="Main paragraph for this section." />
                  <TextArea label="Checklist Items" rows={4} value={section.itemsText} onChange={(event) => replaceArrayItem("subServicePageContent.detailSections", index, (current) => ({ ...current, itemsText: event.target.value }))} placeholder={"One item per line\nExample point 1\nExample point 2"} />
                  <ImageUploadField label="Section Image" value={section.image} onUpload={(file) => handleImageUpload(file, `subServicePageContent.detailSections.${index}.image`)} disabled={uploading} />
                </div>
              ))}
            </div>
          </div>

          <ImageUploadField
            label="Flow Diagram Image"
            value={formData.subServicePageContent.flowImage}
            onUpload={(file) => handleImageUpload(file, "subServicePageContent.flowImage")}
            disabled={uploading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Footer Title" value={formData.subServicePageContent.footerTitle} onChange={(event) => updateField("subServicePageContent.footerTitle", event.target.value)} placeholder="Ready for 40+ Languages" />
            <TextArea label="Footer Description" rows={4} value={formData.subServicePageContent.footerDescription} onChange={(event) => updateField("subServicePageContent.footerDescription", event.target.value)} placeholder="Final closing copy on the sub-service page." />
          </div>
        </SectionCard>
      )}

      <SectionCard title="SEO" description="Optional metadata for search and social previews.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Meta Title" value={formData.metaTitle} onChange={(event) => updateField("metaTitle", event.target.value)} placeholder="Search title" />
          <Field label="Meta Description" value={formData.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} placeholder="Search description" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Open Graph Title" value={formData.metaTags.title} onChange={(event) => updateField("metaTags.title", event.target.value)} placeholder="Social title" />
          <Field label="Keywords" value={formData.metaTags.keywordsText} onChange={(event) => updateField("metaTags.keywordsText", event.target.value)} placeholder="keyword one, keyword two" />
        </div>
        <TextArea label="Open Graph Description" rows={4} value={formData.metaTags.description} onChange={(event) => updateField("metaTags.description", event.target.value)} placeholder="Social description" />
        <ImageUploadField label="Open Graph Image" value={formData.metaTags.ogImage} onUpload={(file) => handleImageUpload(file, "metaTags.ogImage")} disabled={uploading} />
      </SectionCard>

      <div className="flex justify-end">
        <button type="submit" disabled={saving || uploading} className={`inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-lg transition ${saving || uploading ? "bg-slate-400" : "bg-blue-600 hover:bg-blue-700"}`}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}