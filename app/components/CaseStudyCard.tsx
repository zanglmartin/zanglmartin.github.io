import { Link } from "react-router";
import type { CaseStudy } from "../content/types";

export function CaseStudyCard({ caseStudy, index }: { caseStudy: CaseStudy; index: number }) {
  return (
    <article className="case-card">
      <div className="case-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{caseStudy.eyebrow}</span>
      </div>
      <h3>{caseStudy.title}</h3>
      <p>{caseStudy.summary}</p>
      <div className="case-metrics">
        {caseStudy.metrics.map((metric) => (
          <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
        ))}
      </div>
      <Link className="text-link" to={`/case-studies/${caseStudy.slug}`}>
        Read the case study <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
