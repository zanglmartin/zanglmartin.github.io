import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import { getCaseStudy } from "../content/caseStudies";
import { createPageMeta } from "../content/meta";

export const meta: MetaFunction = ({ params }) => {
  const caseStudy = getCaseStudy(params.slug);
  if (!caseStudy) return [{ title: "Case study not found | Martin Zangl" }];
  return createPageMeta({
    title: `${caseStudy.title} | Martin Zangl`,
    description: caseStudy.summary,
    path: `case-studies/${caseStudy.slug}/`,
    type: "article",
  });
};

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return (
      <section className="error-page">
        <span className="section-kicker">Case study not found</span>
        <h1>This story is not available.</h1>
        <Link className="button button-primary" to="/case-studies">View all case studies</Link>
      </section>
    );
  }

  return (
    <article className="case-detail">
      <header className="case-detail-header">
        <Link className="back-link" to="/case-studies"><span aria-hidden="true">←</span> All case studies</Link>
        <span className="section-kicker">{caseStudy.eyebrow}</span>
        <h1>{caseStudy.title}</h1>
        <p>{caseStudy.summary}</p>
        <div className="case-detail-metrics">
          {caseStudy.metrics.map((metric) => (
            <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
          ))}
        </div>
      </header>

      <div className="case-detail-body">
        <aside>
          <span className="section-kicker">Technology</span>
          <div className="technology-stack">
            {caseStudy.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </aside>
        <div className="case-narrative">
          <section><span className="case-section-number">01</span><h2>Context</h2><p>{caseStudy.context}</p></section>
          <section><span className="case-section-number">02</span><h2>Challenge</h2><p>{caseStudy.challenge}</p></section>
          <section><span className="case-section-number">03</span><h2>Approach</h2><ol>{caseStudy.approach.map((item) => <li key={item}>{item}</li>)}</ol></section>
          <section><span className="case-section-number">04</span><h2>Outcome</h2><ul className="outcome-list">{caseStudy.outcomes.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <p className="case-disclaimer">{caseStudy.disclaimer}</p>
        </div>
      </div>
    </article>
  );
}
