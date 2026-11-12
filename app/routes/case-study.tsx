import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import { portfolio as p, getCaseStudy, workById } from "../content/portfolio";
import { createPageMeta } from "../content/meta";
export const meta: MetaFunction = ({ params }) => {
  const work = getCaseStudy(params.slug);
  if (params.slug === "fintech-architecture")
    return createPageMeta(p.pages.legacy);
  return work
    ? createPageMeta({
        title: `${work.story.title} | ${p.profile.shortName}`,
        description: work.summary,
        path: `/case-studies/${work.story.slug}/`,
        type: "article",
      })
    : [{ title: `Story not found | ${p.profile.shortName}` }];
};
export default function CaseStudy() {
  const { slug } = useParams();
  const work = getCaseStudy(slug);
  if (slug === "fintech-architecture")
    return (
      <section className="page-intro legacy-intro">
        <span className="section-kicker">{p.pages.legacy.eyebrow}</span>
        <h1>{p.pages.legacy.heading}</h1>
        <p>{p.pages.legacy.description}</p>
        <div className="hero-actions">
          {["paypal", "mercadolibre"].map((id) => {
            const w = workById(id);
            return (
              <Link
                className="button button-secondary"
                key={id}
                to={`/case-studies/${w.story!.slug}`}
              >
                {w.company} ↗
              </Link>
            );
          })}
        </div>
      </section>
    );
  if (!work)
    return (
      <section className="error-page">
        <h1>This story is not available.</h1>
        <Link to="/case-studies">View all case studies</Link>
      </section>
    );
  const sections = p.copy.sections;
  return (
    <article className="case-detail">
      <header className="case-detail-header">
        <Link className="back-link" to="/case-studies">
          ← {p.copy.allStories}
        </Link>
        <span className="section-kicker">
          {work.client ?? work.company} / {work.period}
        </span>
        <h1>{work.story.title}</h1>
        <p>{work.summary}</p>
        <p className="work-role">
          {work.role}
          {work.client ? ` · ${work.company} contractor` : ""}
        </p>
        {work.metrics.length > 0 && (
          <div className="case-detail-metrics">
            {work.metrics.map((metric) => (
              <div key={metric.id}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        )}
      </header>
      <div className="case-detail-body">
        <aside>
          <nav className="contents" aria-label="Story sections">
            {Object.entries(sections).map(([id, label], i) => (
              <a href={`#${id}`} key={id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-narrative">
          <section id="context">
            <h2>{sections.context}</h2>
            <p>{work.story.context}</p>
            <p>{work.story.challenge}</p>
          </section>
          {(
            [
              ["ownership", work.achievements],
              ["decisions", work.story.decisions],
              ["quality", work.story.quality],
              ["outcomes", work.outcomes],
            ] as const
          ).map(([key, items]) => (
            <section id={key} key={key}>
              <h2>{sections[key]}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <section id="technology">
            <h2>{sections.technology}</h2>
            <div className="technology-row">
              {work.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
