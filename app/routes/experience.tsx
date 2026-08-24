import type { MetaFunction } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { experiences } from "../content/experience";
import { createPageMeta } from "../content/meta";

export const meta: MetaFunction = () => createPageMeta({
  title: "Experience | Martin Zangl",
  description: "15+ years of mobile engineering across Checkout.com, Swift Medical, PayPal, MercadoLibre, and more.",
  path: "experience/",
});

export default function Experience() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="15+ years building software that ships."
        aside={<div className="page-stat"><strong>8</strong><span>Roles across mobile, platform, and product engineering</span></div>}
      >
        <p>From early embedded and Android systems to global wallet modules, clinical imaging, and cross-platform payment SDKs.</p>
      </PageIntro>

      <section className="timeline">
        {experiences.map((experience, index) => (
          <article className={experience.featured ? "timeline-item is-featured" : "timeline-item"} key={`${experience.company}-${experience.period}`}>
            <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
            <div className="timeline-meta">
              <span>{experience.period}</span>
              {experience.featured ? <small>Selected experience</small> : null}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">
                <h2>{experience.company}</h2>
                {experience.client ? <span>for {experience.client}</span> : null}
                <p>{experience.role}</p>
              </div>
              <p className="timeline-summary">{experience.summary}</p>
              <ul>
                {experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
              </ul>
              <div className="technology-row">
                {experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
