import { portfolio, caseStudies } from "./portfolio";
export const routeManifest = [
  ...Object.values(portfolio.pages).map((page) => ({
    path: page.path,
    title: page.title,
    heading: page.heading,
    description: page.description,
  })),
  ...caseStudies.map((work) => ({
    path: `/case-studies/${work.story.slug}`,
    title: `${work.story.title} | ${portfolio.profile.shortName}`,
    heading: work.story.title,
    description: work.summary,
  })),
];
export const canonicalPath = (path: string) =>
  path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
