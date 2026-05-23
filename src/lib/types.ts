export interface Meta {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  avatar: string;
  resumeUrl: string;
}

export interface Intro {
  greeting: string;
  name: string;
  roles: string[];
  bio: string;
  cta: { label: string; href: string };
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface SaasProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  videoUrl?: string;
  url: string;
  tags: string[];
  status: "live" | "beta" | "building";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  featured: boolean;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  logo: string;
  description: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  logo: string;
  highlights: string[];
}

export interface BlogPost {
  title: string;
  summary: string;
  url: string;
  platform: string;
  publishedAt: string;
  tags: string[];
}

export interface Social {
  platform: string;
  label: string;
  url: string;
}

export interface Contact {
  email: string;
  socials: Social[];
}

export interface SectionSubtitle {
  muted: string;
  highlight: string;
}

export interface SectionSubtitles {
  skills: SectionSubtitle;
  products: SectionSubtitle;
  projects: SectionSubtitle;
  background: SectionSubtitle;
  blogs: SectionSubtitle;
  contact: SectionSubtitle;
}

export interface Profile {
  meta: Meta;
  intro: Intro;
  skills: Skills;
  saasProducts: SaasProduct[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  blogs: BlogPost[];
  contact: Contact;
  sectionSubtitles: SectionSubtitles;
}
