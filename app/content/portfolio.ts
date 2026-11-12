import data from "./portfolio.json" with { type: "json" };
export type PortfolioContent = typeof data;
export type Work = PortfolioContent["work"][number];
export type StoryWork = Work & { story: NonNullable<Work["story"]> };
export const portfolio = data;
export const workById = (id: string): Work => {
  const work = portfolio.work.find((item) => item.id === id);
  if (!work) throw new Error(`Unknown work ID: ${id}`);
  return work;
};
export const caseStudies = [
  ...portfolio.featuredWork,
  ...portfolio.work
    .map((work) => work.id)
    .filter((id) => !portfolio.featuredWork.includes(id)),
]
  .map(workById)
  .filter((work): work is StoryWork => Boolean(work.story));
export const getCaseStudy = (slug?: string) =>
  caseStudies.find((work) => work.story.slug === slug);
export const linkedin = portfolio.profile.socialLinks.find(
  (link) => link.kind === "linkedin",
)!;
