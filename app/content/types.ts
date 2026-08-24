export interface SocialLink {
  label: string;
  href: string;
  kind: "linkedin" | "github" | "portfolio";
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
}

export interface SpokenLanguage {
  language: string;
  proficiency: string;
}

export interface BusinessArea {
  name: string;
  focus: string;
  detail: string;
}

export interface Profile {
  name: string;
  shortName: string;
  headline: string;
  location: string;
  summary: string;
  longSummary: string[];
  socialLinks: SocialLink[];
  education: Education;
  spokenLanguages: SpokenLanguage[];
  domains: string[];
  businessAreas: BusinessArea[];
}

export interface Experience {
  company: string;
  client?: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  featured?: boolean;
}

export interface SkillGroup {
  title: string;
  level: "Primary" | "Applied" | "Supporting" | "Tooling";
  description: string;
  skills: string[];
}

export interface SystemDesignTheme {
  id: string;
  number: string;
  title: string;
  description: string;
  evidence: string;
  technologies: string[];
}

export interface CaseStudy {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  context: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  metrics: Array<{ value: string; label: string }>;
  technologies: string[];
  disclaimer: string;
}
