import type { MetaFunction } from "react-router";
import { Link, useHref } from "react-router";
import { CaseStudyCard } from "../components/CaseStudyCard";
import { caseStudies } from "../content/caseStudies";
import { createPageMeta } from "../content/meta";
import { profile } from "../content/profile";
import { skillGroups, systemDesignThemes } from "../content/skills";
import "../content/validate";

export const meta: MetaFunction = () => createPageMeta({
  title: "Martin Zangl | Senior Android & Mobile Engineer",
  description: "Senior Android and mobile engineer building reliable products and SDKs across fintech, healthcare, and IoT.",
});

export default function Home() {
  const avatarHref = useHref("/images/martin-zangl.webp");
  const cvHref = useHref("/cv/martin-zangl-cv-2026.pdf");
  const primarySkills = skillGroups.slice(0, 3).flatMap((group) => group.skills).slice(0, 10);

  return (
    <>
      <section className="hero">
        <div className="hero-copy-block">
          <span className="section-kicker"><i /> {profile.location} · Mobile engineering</span>
          <h1>Reliable mobile systems, built for the <em>real world.</em></h1>
          <p>{profile.summary}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/case-studies">Explore my impact <span aria-hidden="true">→</span></Link>
            <a className="button button-secondary" href={cvHref} download>Download CV</a>
          </div>
        </div>

        <div className="portrait-panel">
          <div className="portrait-frame">
            <img src={avatarHref} alt="Martin Zangl" width="520" height="520" />
            <div className="portrait-scanline" aria-hidden="true" />
          </div>
          <div className="portrait-caption">
            <span>Senior Android<br />&amp; Mobile Engineer</span>
            <span>15+ years<br />shipping software</span>
          </div>
        </div>
      </section>

      <section className="business-strip" aria-label="Business experience across industries">
        {profile.businessAreas.map((area) => (
          <article key={area.name}>
            <strong>{area.name}</strong>
            <div><span>{area.focus}</span><small>{area.detail}</small></div>
          </article>
        ))}
      </section>

      <section className="home-section">
        <div className="section-heading split-heading">
          <div>
            <span className="section-kicker">What I solve</span>
            <h2>Architecture is only useful when it improves delivery.</h2>
          </div>
          <p>I connect deep mobile engineering with product outcomes: stability, performance, safe change, and consistent platform behavior.</p>
        </div>
        <div className="design-theme-grid">
          {systemDesignThemes.slice(0, 4).map((theme) => (
            <article key={theme.id}>
              <span className="theme-number">{theme.number}</span>
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
              <small>{theme.evidence}</small>
            </article>
          ))}
        </div>
        <Link className="text-link section-link" to="/expertise">See the complete expertise map <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-section cases-home">
        <div className="section-heading">
          <span className="section-kicker">Selected work</span>
          <h2>Complex systems.<br />Clear outcomes.</h2>
        </div>
        <div className="case-grid">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>
      </section>

      <section className="stack-band">
        <div>
          <span className="section-kicker">Core stack</span>
          <h2>Mobile-first.<br />Platform-aware.</h2>
        </div>
        <div className="stack-cloud">
          {primarySkills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>
    </>
  );
}
