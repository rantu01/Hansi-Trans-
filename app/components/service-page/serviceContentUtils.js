const defaultSupportHighlights = [
  { title: "Native Speakers Only", description: "No robotic or machine-generated voices." },
  { title: "Studio-Grade Quality", description: "Clean, polished output ready for production." },
  { title: "Culturally Adapted", description: "Messaging shaped for local tone and audience context." },
  { title: "Fast Turnaround", description: "Clear timelines and responsive delivery windows." },
  { title: "Flexible Delivery Formats", description: "Assets can be prepared for the channels you use." },
  { title: "Confidential Workflow", description: "Sensitive content handled with controlled access." },
];

const defaultCoverageDescription =
  "We support both globally used languages and region-specific variants so your content feels native, credible, and market-ready wherever it appears.";

const buildFeatureCardsFromFeatures = (features = []) => {
  if (!Array.isArray(features) || features.length === 0) {
    return [];
  }

  return features.map((feature, index) => {
    const [title, ...descriptionParts] = feature.split(":");
    const description = descriptionParts.join(":").trim();

    return {
      title: description ? title.trim() : `Feature ${index + 1}`,
      description: description || feature,
    };
  });
};

const buildDefaultDetailSections = (serviceTitle = "This Service", description = "") => [
  {
    title: `Why ${serviceTitle} Matters`,
    description:
      description ||
      "Clear, localized delivery helps your content feel trustworthy and natural to the audience you want to reach.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
    layout: "image-left",
    items: ["Improve audience trust", "Make content easier to understand", "Strengthen brand credibility", "Ship faster across markets"],
  },
  {
    title: "Ready for 40+ Languages",
    description:
      "Projects can be adapted for major international languages as well as market-specific variants, accents, and localized phrasing.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200",
    layout: "full-width",
    items: [],
  },
  {
    title: "Built for Real Delivery Workflows",
    description:
      "Whether the output is for ads, product audio, mobile apps, training, or broadcast content, assets can be prepared to match the delivery format you need.",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200",
    layout: "image-right",
    items: ["Aligned with production timelines", "Structured for review and approval", "Optimized for multiple output channels"],
  },
];

export const getServicePageContent = (service = {}) => {
  const section = service.servicePageContent || {};

  return {
    subServicesTitle: section.subServicesTitle || `Core ${service.title || "Service"} Services`,
    subServicesDescription: section.subServicesDescription || service.content || "",
    supportTitle: section.supportTitle || "Professional Support Services",
    supportDescription: section.supportDescription || service.content || "",
    supportHighlights:
      Array.isArray(section.supportHighlights) && section.supportHighlights.length > 0
        ? section.supportHighlights
        : defaultSupportHighlights,
    coverageTitle: section.coverageTitle || "Coverage Across 40+ Languages",
    coverageDescription: section.coverageDescription || defaultCoverageDescription,
  };
};

export const getSubServicePageContent = (service = {}) => {
  const section = service.subServicePageContent || {};
  const fallbackFeatureCards = buildFeatureCardsFromFeatures(service.features);
  const fallbackDetailSections = buildDefaultDetailSections(service.title, service.content || service.description);

  return {
    introTitle: section.introTitle || `Why ${service.title || "This Service"} Matters`,
    introDescription:
      section.introDescription ||
      service.content ||
      service.description ||
      "This service helps you adapt content with clarity, consistency, and market relevance.",
    featureCards:
      Array.isArray(section.featureCards) && section.featureCards.length > 0
        ? section.featureCards
        : fallbackFeatureCards,
    detailSections:
      Array.isArray(section.detailSections) && section.detailSections.length > 0
        ? section.detailSections
        : fallbackDetailSections,
    footerTitle: section.footerTitle || "Ready for 40+ Languages",
    footerDescription: section.footerDescription || defaultCoverageDescription,
  };
};