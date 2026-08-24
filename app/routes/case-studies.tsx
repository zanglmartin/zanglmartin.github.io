import type { MetaFunction } from "react-router";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { PageIntro } from "../components/PageIntro";
import { caseStudies } from "../content/caseStudies";
import { createPageMeta } from "../content/meta";

export const meta: MetaFunction = () => createPageMeta({
  title: "Case Studies | Martin Zangl",
  description: "Mobile reliability, cross-platform payment SDKs, and reusable fintech architecture.",
  path: "case-studies/",
});

export default function CaseStudies() {
  return (
    <>
      <PageIntro
        eyebrow="Case studies"
        title="Engineering stories with measurable outcomes."
        aside={<p className="privacy-note">Public summaries only. No proprietary code or confidential product details.</p>}
      >
        <p>Selected examples of modernization, platform alignment, and architecture work from healthcare and fintech products.</p>
      </PageIntro>
      <section className="case-grid case-grid-page">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
        ))}
      </section>
    </>
  );
}
