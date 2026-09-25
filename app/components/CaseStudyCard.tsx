import { Link } from "react-router";
import { portfolio, type StoryWork } from "../content/portfolio";
export function CaseStudyCard({
  caseStudy: work,
  index,
}: {
  caseStudy: StoryWork;
  index: number;
}) {
  return (
    <article className="case-card">
      <div className="case-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{work.client ?? work.company}</span>
        <span>{work.period}</span>
      </div>
      <h3>
        <Link to={`/case-studies/${work.story.slug}`}>{work.story.title}</Link>
      </h3>
      <p>{work.summary}</p>
      {work.metrics.length > 0 && (
        <div className="case-metrics">
          {work.metrics.map((metric) => (
            <div key={metric.id}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      )}
      <Link className="text-link" to={`/case-studies/${work.story.slug}`}>
        {portfolio.copy.readStory} <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
