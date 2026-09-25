import { Link } from "react-router";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { portfolio as p, caseStudies, workById } from "../content/portfolio";
import { createPageMeta } from "../content/meta";
export const meta = () => createPageMeta(p.pages.home);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="section-kicker">
            {p.pages.home.eyebrow} · {p.profile.location}
          </span>
          <h1>{p.pages.home.heading}</h1>
          <p>{p.profile.summary}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/case-studies">
              {p.copy.exploreWork} <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="button button-secondary"
              href={p.site.cvPath}
              download
            >
              {p.copy.cvLabel}
            </a>
          </div>
        </div>
        <figure className="portrait-panel">
          <img
            src={p.site.portraitPath}
            alt={p.profile.shortName}
            width="520"
            height="520"
          />
          <figcaption>
            {p.profile.shortName}
            <span>{p.profile.headline}</span>
          </figcaption>
        </figure>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <span className="section-kicker">01 / {p.copy.selectedWork}</span>
          <h2>{p.pages.stories.heading}</h2>
          <p>{p.pages.stories.description}</p>
        </div>
        <div className="case-grid">
          {caseStudies.map((work, index) => (
            <CaseStudyCard key={work.id} caseStudy={work} index={index} />
          ))}
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <span className="section-kicker">
            02 / {p.pages.expertise.eyebrow}
          </span>
          <h2>{p.copy.expertiseHeading}</h2>
        </div>
        <div className="design-theme-grid">
          {p.systemDesignThemes.slice(0, 4).map((theme) => (
            <article key={theme.id}>
              <span className="theme-number">{theme.number}</span>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
              <div className="evidence-links">
                {theme.workIds.map((id) => {
                  const work = workById(id);
                  return (
                    <Link key={id} to={`/case-studies/${work.story!.slug}`}>
                      {work.client ?? work.company} ↗
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
        <Link className="text-link section-link" to="/expertise">
          {p.copy.exploreExpertise} →
        </Link>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <span className="section-kicker">
            03 / {p.pages.experience.eyebrow}
          </span>
          <h2>{p.copy.careerHeading}</h2>
        </div>
        <div className="career-list">
          {p.work
            .filter((work) => work.story)
            .slice(0, 4)
            .map((work) => (
              <Link key={work.id} to={`/case-studies/${work.story!.slug}`}>
                <strong>{work.client ?? work.company}</strong>
                <span>{work.role}</span>
                <small>{work.period}</small>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
        </div>
        <Link className="text-link section-link" to="/experience">
          {p.copy.fullExperience} →
        </Link>
      </section>
    </>
  );
}
