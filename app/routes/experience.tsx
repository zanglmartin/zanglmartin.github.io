import { Link } from "react-router";
import { portfolio as p } from "../content/portfolio";
import type { MetaFunction } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { experiences } from "../content/experience";
import { createPageMeta } from "../content/meta";

export const meta: MetaFunction = () => createPageMeta(p.pages.experience);

export default function Experience() {
  return (
    <>
      <PageIntro
        eyebrow={p.pages.experience.eyebrow}
        title={p.pages.experience.heading}
        aside={
          <div className="page-stat">
            <strong>{p.work.length}</strong>
            <span>{p.copy.roleCount}</span>
          </div>
        }
      >
        <p>{p.pages.experience.description}</p>
      </PageIntro>

      <section className="timeline">
        {experiences.map((experience, index) => (
          <article
            className={
              experience.featured
                ? "timeline-item is-featured"
                : "timeline-item"
            }
            key={`${experience.company}-${experience.period}`}
          >
            <div className="timeline-marker">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="timeline-meta">
              <span>{experience.period}</span>
              {experience.featured ? (
                <small>{p.copy.selectedExperience}</small>
              ) : null}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">
                <h2>{experience.company}</h2>
                {experience.client ? (
                  <span>for {experience.client}</span>
                ) : null}
                <p>{experience.role}</p>
              </div>
              <p className="timeline-summary">{experience.summary}</p>
              <div className="case-metrics">
                {experience.metrics.map((metric) => (
                  <div key={metric.id}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <ul>
                {experience.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              {experience.story && (
                <Link
                  className="text-link"
                  to={`/case-studies/${experience.story.slug}`}
                >
                  {p.copy.readStory} ↗
                </Link>
              )}
              <div className="technology-row">
                {experience.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
