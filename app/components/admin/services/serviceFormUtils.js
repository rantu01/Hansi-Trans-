export const generateSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const createSupportCard = () => ({
  title: "",
  description: "",
  image: "",
});

export const createHighlightCard = () => ({
  title: "",
  description: "",
});

export const createFeatureCard = () => ({
  title: "",
  description: "",
});

export const createDetailSection = () => ({
  title: "",
  description: "",
  image: "",
  layout: "image-left",
  itemsText: "",
});

const createServicePageContent = () => ({
  subServicesTitle: "",
  subServicesDescription: "",
  supportTitle: "Professional Support Services",
  supportDescription: "",
  supportHighlights: [createHighlightCard(), createHighlightCard(), createHighlightCard()],
  coverageTitle: "",
  coverageDescription: "",
});

const createSubServicePageContent = () => ({
  introTitle: "",
  introDescription: "",
  featureCards: [createFeatureCard(), createFeatureCard(), createFeatureCard()],
  detailSections: [createDetailSection(), createDetailSection()],
  footerTitle: "",
  footerDescription: "",
});

const ensureArray = (value, fallbackFactory, minimum = 1) => {
  const safeValue = Array.isArray(value) ? value : [];
  if (safeValue.length >= minimum) {
    return safeValue;
  }

  return [...safeValue, ...Array.from({ length: minimum - safeValue.length }, () => fallbackFactory())];
};

const joinCommaSeparated = (value) =>
  Array.isArray(value) ? value.filter(Boolean).join(", ") : "";

const joinLines = (value) =>
  Array.isArray(value) ? value.filter(Boolean).join("\n") : "";

const splitCommaSeparated = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const splitLines = (value = "") =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export const createEmptyServiceFormData = () => ({
  title: "",
  slug: "",
  description: "",
  content: "",
  image: "",
  featuresText: "",
  parentService: "",
  professionalSupports: [createSupportCard(), createSupportCard(), createSupportCard()],
  servicePageContent: createServicePageContent(),
  subServicePageContent: createSubServicePageContent(),
  metaTitle: "",
  metaDescription: "",
  metaTags: {
    title: "",
    description: "",
    keywordsText: "",
    ogImage: "",
  },
});

export const mergeServiceIntoFormData = (service = {}) => {
  const baseData = createEmptyServiceFormData();
  const servicePageContent = service.servicePageContent || {};
  const subServicePageContent = service.subServicePageContent || {};

  return {
    ...baseData,
    title: service.title || "",
    slug: service.slug || "",
    description: service.description || "",
    content: service.content || "",
    image: service.image || "",
    featuresText: joinCommaSeparated(service.features),
    parentService: service.parentService?._id || service.parentService || "",
    professionalSupports: ensureArray(
      service.professionalSupports?.map((item) => ({
        title: item?.title || "",
        description: item?.description || "",
        image: item?.image || "",
      })),
      createSupportCard,
      1
    ),
    servicePageContent: {
      ...baseData.servicePageContent,
      ...servicePageContent,
      supportHighlights: ensureArray(
        servicePageContent.supportHighlights?.map((item) => ({
          title: item?.title || "",
          description: item?.description || "",
        })),
        createHighlightCard,
        1
      ),
    },
    subServicePageContent: {
      ...baseData.subServicePageContent,
      ...subServicePageContent,
      featureCards: ensureArray(
        subServicePageContent.featureCards?.map((item) => ({
          title: item?.title || "",
          description: item?.description || "",
        })),
        createFeatureCard,
        1
      ),
      detailSections: ensureArray(
        subServicePageContent.detailSections?.map((item) => ({
          title: item?.title || "",
          description: item?.description || "",
          image: item?.image || "",
          layout: item?.layout || "image-left",
          itemsText: joinLines(item?.items),
        })),
        createDetailSection,
        1
      ),
    },
    metaTitle: service.metaTitle || "",
    metaDescription: service.metaDescription || "",
    metaTags: {
      title: service.metaTags?.title || "",
      description: service.metaTags?.description || "",
      keywordsText: joinCommaSeparated(service.metaTags?.keywords),
      ogImage: service.metaTags?.ogImage || "",
    },
  };
};

const hasMeaningfulValue = (value) =>
  Object.values(value || {}).some((item) => {
    if (Array.isArray(item)) {
      return item.length > 0;
    }

    return Boolean(item);
  });

export const buildServicePayload = (formData) => {
  const professionalSupports = (formData.professionalSupports || []).filter(
    (item) => item.title.trim() || item.description.trim() || item.image.trim()
  );

  const supportHighlights = (formData.servicePageContent.supportHighlights || []).filter(
    (item) => item.title.trim() || item.description.trim()
  );

  const featureCards = (formData.subServicePageContent.featureCards || []).filter(
    (item) => item.title.trim() || item.description.trim()
  );

  const detailSections = (formData.subServicePageContent.detailSections || [])
    .map((item) => ({
      title: item.title.trim(),
      description: item.description.trim(),
      image: item.image.trim(),
      layout: item.layout || "image-left",
      items: splitLines(item.itemsText),
    }))
    .filter(
      (item) => item.title || item.description || item.image || item.items.length > 0
    );

  const payload = {
    title: formData.title.trim(),
    slug: generateSlug(formData.slug || formData.title),
    description: formData.description.trim(),
    content: formData.content.trim(),
    image: formData.image.trim(),
    features: splitCommaSeparated(formData.featuresText),
    parentService: formData.parentService || null,
    professionalSupports,
    servicePageContent: {
      subServicesTitle: formData.servicePageContent.subServicesTitle.trim(),
      subServicesDescription: formData.servicePageContent.subServicesDescription.trim(),
      supportTitle: formData.servicePageContent.supportTitle.trim(),
      supportDescription: formData.servicePageContent.supportDescription.trim(),
      supportHighlights,
      coverageTitle: formData.servicePageContent.coverageTitle.trim(),
      coverageDescription: formData.servicePageContent.coverageDescription.trim(),
    },
    subServicePageContent: {
      introTitle: formData.subServicePageContent.introTitle.trim(),
      introDescription: formData.subServicePageContent.introDescription.trim(),
      featureCards,
      detailSections,
      footerTitle: formData.subServicePageContent.footerTitle.trim(),
      footerDescription: formData.subServicePageContent.footerDescription.trim(),
    },
    metaTitle: formData.metaTitle.trim(),
    metaDescription: formData.metaDescription.trim(),
    metaTags: {
      title: formData.metaTags.title.trim(),
      description: formData.metaTags.description.trim(),
      keywords: splitCommaSeparated(formData.metaTags.keywordsText),
      ogImage: formData.metaTags.ogImage.trim(),
    },
  };

  if (!hasMeaningfulValue(payload.servicePageContent)) {
    payload.servicePageContent = {};
  }

  if (!hasMeaningfulValue(payload.subServicePageContent)) {
    payload.subServicePageContent = {};
  }

  if (!hasMeaningfulValue(payload.metaTags)) {
    payload.metaTags = {};
  }

  return payload;
};