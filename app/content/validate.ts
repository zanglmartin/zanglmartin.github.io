import { portfolio, type PortfolioContent } from "./portfolio";
export type { PortfolioContent } from "./portfolio";
export const portfolioContent = portfolio;
export function validateContent(content: PortfolioContent) {
  const text = (value: unknown, label: string) => {
    if (typeof value !== "string" || !value.trim())
      throw new Error(`Missing content: ${label}`);
  };
  const list = (values: string[], label: string) => {
    if (!Array.isArray(values) || !values.length)
      throw new Error(`Missing content: ${label}`);
    values.forEach((value) => text(value, label));
  };
  const unique = (values: string[], label: string) => {
    values.forEach((value) => text(value, label));
    if (new Set(values).size !== values.length)
      throw new Error(`Duplicate ${label}`);
  };
  const url = (value: string, label: string) => {
    if (
      !URL.canParse(value) ||
      !["https:", "http:"].includes(new URL(value).protocol)
    )
      throw new Error(`Invalid URL: ${label}`);
  };
  for (const key of [
    "name",
    "shortName",
    "headline",
    "summary",
    "location",
  ] as const)
    text(content.profile[key], `profile.${key}`);
  content.profile.socialLinks.forEach((link) => {
    text(link.label, "social label");
    url(link.href, "social href");
  });
  url(content.site.url, "site.url");
  unique(
    content.work.map((work) => work.id),
    "work ID",
  );
  unique(
    content.work.flatMap((work) => (work.story ? [work.story.slug] : [])),
    "story slug",
  );
  const ids = new Set(content.work.map((work) => work.id));
  const references = (values: string[], label: string) => {
    list(values, label);
    unique(values, label);
    values.forEach((id) => {
      if (!ids.has(id)) throw new Error(`Unknown work reference: ${id}`);
    });
  };
  content.work.forEach((work) => {
    for (const key of ["company", "role", "period", "summary"] as const)
      text(work[key], `${work.id}.${key}`);
    list(work.achievements, `${work.id}.achievements`);
    list(work.technologies, `${work.id}.technologies`);
    unique(
      work.metrics.map((metric) => metric.id),
      "metric ID",
    );
    work.metrics.forEach((metric) => {
      text(metric.value, "metric.value");
      text(metric.label, "metric.label");
    });
    if (work.story) {
      for (const key of ["slug", "title", "context", "challenge"] as const)
        text(work.story[key], `story.${key}`);
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(work.story.slug) ||
        work.story.slug === "fintech-architecture"
      )
        throw new Error("Invalid or reserved story slug");
      list(work.story.decisions, "story.decisions");
      list(work.story.quality, "story.quality");
      list(work.outcomes, "outcomes");
    }
  });
  references(content.featuredWork, "featuredWork");
  references(content.cv.workIds, "cv.workIds");
  content.featuredWork.forEach((id) => {
    if (!content.work.find((work) => work.id === id)?.story)
      throw new Error(`Featured work needs a story: ${id}`);
  });
  content.skillGroups.forEach((group) => {
    text(group.title, "skill title");
    list(group.skills, "skills");
  });
  unique(
    content.systemDesignThemes.map((theme) => theme.id),
    "theme ID",
  );
  content.systemDesignThemes.forEach((theme) => {
    references(theme.workIds, "theme.workIds");
    text(theme.title, "theme.title");
    text(theme.description, "theme.description");
    theme.workIds.forEach((id) => {
      if (!content.work.find((work) => work.id === id)?.story)
        throw new Error(`Expertise reference needs a story: ${id}`);
    });
  });
  list(content.profile.longSummary, "profile.longSummary");
  Object.entries(content.profile.education).forEach(([key, value]) =>
    text(value, `education.${key}`),
  );
  content.profile.spokenLanguages.forEach((item) => {
    text(item.language, "language");
    text(item.proficiency, "proficiency");
  });
  const validateCopy = (value: unknown, label: string) => {
    if (typeof value === "object" && value !== null)
      Object.entries(value).forEach(([key, item]) =>
        validateCopy(item, `${label}.${key}`),
      );
    else text(value, label);
  };
  validateCopy(content.copy, "copy");
  for (const key of ["cvPath", "portraitPath", "socialImagePath"] as const) {
    if (
      !/^\/(?!\/)[^?#]+$/.test(content.site[key]) ||
      content.site[key].includes("..")
    )
      throw new Error(`Invalid asset path: ${key}`);
  }
  for (const count of [
    content.cv.featuredBulletLimit,
    content.cv.earlierBulletLimit,
  ]) {
    if (!Number.isInteger(count) || count < 1)
      throw new Error("CV bullet limits must be positive integers");
  }
  if (!content.profile.socialLinks.some((link) => link.kind === "linkedin"))
    throw new Error("Missing LinkedIn contact");
  const paths = Object.values(content.pages).map((page) => page.path);
  unique(paths, "page path");
  Object.values(content.pages).forEach((page) => {
    text(page.title, "page title");
    text(page.heading, "page heading");
    text(page.description, "page description");
  });
  content.navigation.forEach((link) => {
    text(link.label, "navigation label");
    if (!paths.includes(link.to))
      throw new Error(`Unknown navigation path: ${link.to}`);
  });
}
validateContent(portfolio);
