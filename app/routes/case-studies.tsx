import { CaseStudyCard } from "../components/CaseStudyCard";
import { PageIntro } from "../components/PageIntro";
import { portfolio as p, caseStudies } from "../content/portfolio";
import { createPageMeta } from "../content/meta";
export const meta = () => createPageMeta(p.pages.stories);
export default function CaseStudies() {
  return (
    <>
      <PageIntro
        eyebrow={p.pages.stories.eyebrow}
        title={p.pages.stories.heading}
      >
        <p>{p.pages.stories.description}</p>
      </PageIntro>
      <section className="case-grid case-grid-page">
        {caseStudies.map((work, index) => (
          <CaseStudyCard key={work.id} caseStudy={work} index={index} />
        ))}
      </section>
    </>
  );
}
