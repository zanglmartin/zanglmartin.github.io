import { portfolio as p, workById } from "../content/portfolio";
import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { createPageMeta } from "../content/meta";
import { skillGroups, systemDesignThemes } from "../content/skills";

export const meta: MetaFunction = () => createPageMeta(p.pages.expertise);

export default function Expertise() {
  return (
    <>
      <PageIntro
        eyebrow={p.pages.expertise.eyebrow}
        title={p.pages.expertise.heading}
        aside={
          <div className="page-stat">
            <strong>{p.systemDesignThemes.length}</strong>
            <span>{p.copy.themeCount}</span>
          </div>
        }
      >
        <p>{p.pages.expertise.description}</p>
      </PageIntro>

      <section className="expertise-section">
        <div className="section-heading">
          <span className="section-kicker">{p.copy.skillsEyebrow}</span>
          <h2>{p.copy.skillsHeading}</h2>
        </div>
        <div className="skill-group-grid">
          {skillGroups.map((group) => (
            <article key={group.title}>
              <div className="skill-group-head">
                <span>{group.level}</span>
                <h3>{group.title}</h3>
              </div>
              <p>{group.description}</p>
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">{p.copy.systemsEyebrow}</span>
            <h2>{p.copy.systemsHeading}</h2>
          </div>
          <p>{p.copy.systemsDescription}</p>
        </div>
        <div className="design-theme-grid full">
          {systemDesignThemes.map((theme) => (
            <article id={theme.id} key={theme.id}>
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
              <div className="technology-row">
                {theme.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
