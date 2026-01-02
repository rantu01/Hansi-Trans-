const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  featuredCaseStudies:
    `${API_BASE_URL}/api/common/featured-case-studies`,


  uploadImage:
    `${API_BASE_URL}/api/upload/image`,

  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh-token`,
  },
  site: {
    getConfig: `${API_BASE_URL}/api/site`,
  },
  OurInfluencer: {
    getInfluencers: `${API_BASE_URL}/api/common/our-influencers`,
  },
  Testimonials: {
    getTestimonials: `${API_BASE_URL}/api/common/testimonials`,
  },
  WhyChooseUs: `${API_BASE_URL}/api/common/why-choose-us`,
  WorkProcess: `${API_BASE_URL}/api/common/work-process`,
  AboutUs: {
    get: `${API_BASE_URL}/api/about-us`,
    upsert: `${API_BASE_URL}/api/about-us`,
    deleteGalleryImage: `${API_BASE_URL}/api/about-us/gallery`,
  },
  Domains: `${API_BASE_URL}/api/common/domains`,
};
