import { caseStudies } from "./caseStudies";
import { experiences } from "./experience";
import { profile } from "./profile";
import { skillGroups, systemDesignThemes } from "./skills";
import type {
  CaseStudy,
  Experience,
  Profile,
  SkillGroup,
  SystemDesignTheme,
} from "./types";

export interface PortfolioContent {
  profile: Profile;
  experiences: Experience[];
  skillGroups: SkillGroup[];
  systemDesignThemes: SystemDesignTheme[];
  caseStudies: CaseStudy[];
}

export const portfolioContent: PortfolioContent = {
  profile,
  experiences,
  skillGroups,
  systemDesignThemes,
  caseStudies,
};

function requireText(value: string, label: string) {
  if (!value.trim()) throw new Error(`Missing portfolio content: ${label}`);
}

function requireList(values: string[], label: string) {
  if (!values.length) throw new Error(`Missing portfolio content: ${label}`);
  values.forEach((value, index) => requireText(value, `${label}[${index}]`));
}

export function validateContent(content: PortfolioContent) {
  const {
    profile: currentProfile,
    experiences: currentExperiences,
    skillGroups: currentSkillGroups,
    systemDesignThemes: currentThemes,
    caseStudies: currentCaseStudies,
  } = content;

  requireText(currentProfile.name, "profile.name");
  requireText(currentProfile.headline, "profile.headline");
  requireText(currentProfile.summary, "profile.summary");
  requireText(currentProfile.location, "profile.location");

  if (!currentProfile.businessAreas.length) throw new Error("Missing portfolio content: profile.businessAreas");
  currentProfile.businessAreas.forEach((area, index) => {
    const label = `profile.businessAreas[${index}]`;
    requireText(area.name, `${label}.name`);
    requireText(area.focus, `${label}.focus`);
    requireText(area.detail, `${label}.detail`);
  });

  currentProfile.socialLinks.forEach((link, index) => {
    requireText(link.label, `profile.socialLinks[${index}].label`);
    if (!URL.canParse(link.href)) {
      throw new Error(`Invalid portfolio URL: profile.socialLinks[${index}].href`);
    }
  });

  if (!currentExperiences.length) throw new Error("Missing portfolio content: experiences");
  currentExperiences.forEach((experience, index) => {
    const label = `experiences[${index}]`;
    requireText(experience.company, `${label}.company`);
    requireText(experience.role, `${label}.role`);
    requireText(experience.period, `${label}.period`);
    requireText(experience.summary, `${label}.summary`);
    requireList(experience.achievements, `${label}.achievements`);
    requireList(experience.technologies, `${label}.technologies`);
  });

  if (!currentSkillGroups.length) throw new Error("Missing portfolio content: skillGroups");
  currentSkillGroups.forEach((group, index) => {
    const label = `skillGroups[${index}]`;
    requireText(group.title, `${label}.title`);
    requireText(group.description, `${label}.description`);
    requireList(group.skills, `${label}.skills`);
  });

  if (!currentThemes.length) throw new Error("Missing portfolio content: systemDesignThemes");
  currentThemes.forEach((theme, index) => {
    const label = `systemDesignThemes[${index}]`;
    requireText(theme.id, `${label}.id`);
    requireText(theme.number, `${label}.number`);
    requireText(theme.title, `${label}.title`);
    requireText(theme.description, `${label}.description`);
    requireText(theme.evidence, `${label}.evidence`);
    requireList(theme.technologies, `${label}.technologies`);
  });

  const slugs = new Set<string>();
  currentCaseStudies.forEach((item, index) => {
    const label = `caseStudies[${index}]`;
    requireText(item.slug, `${label}.slug`);
    requireText(item.eyebrow, `${label}.eyebrow`);
    requireText(item.title, `${label}.title`);
    requireText(item.summary, `${label}.summary`);
    requireText(item.context, `${label}.context`);
    requireText(item.challenge, `${label}.challenge`);
    requireText(item.disclaimer, `${label}.disclaimer`);
    requireList(item.approach, `${label}.approach`);
    requireList(item.outcomes, `${label}.outcomes`);
    requireList(item.technologies, `${label}.technologies`);
    if (!item.metrics.length) throw new Error(`Missing portfolio content: ${label}.metrics`);
    item.metrics.forEach((metric, metricIndex) => {
      requireText(metric.value, `${label}.metrics[${metricIndex}].value`);
      requireText(metric.label, `${label}.metrics[${metricIndex}].label`);
    });
    if (slugs.has(item.slug)) throw new Error(`Duplicate case-study slug: ${item.slug}`);
    slugs.add(item.slug);
  });
}

validateContent(portfolioContent);
