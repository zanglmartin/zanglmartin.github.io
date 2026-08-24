import type { MetaFunction } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { createPageMeta } from "../content/meta";
import { skillGroups, systemDesignThemes } from "../content/skills";

export const meta: MetaFunction = () => createPageMeta({
  title: "Expertise | Martin Zangl",
  description: "Kotlin, Java, mobile architecture, SDK design, offline-first systems, performance, testing, and camera infrastructure.",
  path: "expertise/",
});

export default function Expertise() {
  return (
    <>
      <PageIntro
        eyebrow="Expertise"
        title="Depth in Android. Range across mobile systems."
        aside={<div className="page-stat"><strong>6</strong><span>System-design themes grounded in delivery</span></div>}
      >
        <p>A practical technology map based on where I have shipped, diagnosed, modernized, and supported production software.</p>
      </PageIntro>

      <section className="expertise-section">
        <div className="section-heading">
          <span className="section-kicker">Programming languages &amp; platforms</span>
          <h2>Evidence over proficiency bars.</h2>
        </div>
        <div className="skill-group-grid">
          {skillGroups.map((group) => (
            <article key={group.title}>
              <div className="skill-group-head"><span>{group.level}</span><h3>{group.title}</h3></div>
              <p>{group.description}</p>
              <div className="tag-list">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="expertise-section">
        <div className="section-heading split-heading">
          <div><span className="section-kicker">System design</span><h2>How I approach mobile systems.</h2></div>
          <p>Each theme is connected to concrete work rather than abstract architecture diagrams.</p>
        </div>
        <div className="design-theme-grid full">
          {systemDesignThemes.map((theme) => (
            <article id={theme.id} key={theme.id}>
              <span className="theme-number">{theme.number}</span>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
              <small>{theme.evidence}</small>
              <div className="technology-row">
                {theme.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
