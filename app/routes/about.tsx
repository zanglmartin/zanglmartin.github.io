import type { MetaFunction } from "react-router";
import { useHref } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { createPageMeta } from "../content/meta";
import { profile } from "../content/profile";

export const meta: MetaFunction = () => createPageMeta({
  title: "About | Martin Zangl",
  description: "About Martin Zangl, a senior Android and mobile engineer in Valencia, Spain.",
  path: "about/",
});

export default function About() {
  const avatarHref = useHref("/images/martin-zangl.webp");

  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Engineering depth, product perspective."
        aside={<div className="about-aside"><span>Based in</span><strong>{profile.location}</strong><span>Working across</span><strong>Mobile platforms &amp; SDKs</strong></div>}
      >
        <p>I help teams make complex mobile products more reliable, maintainable, and easier to evolve.</p>
      </PageIntro>

      <section className="about-layout">
        <div className="about-portrait">
          <img src={avatarHref} alt="Martin Zangl" width="620" height="620" />
          <span>Product-oriented · Customer-obsessed</span>
        </div>
        <div className="about-story">
          {profile.longSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="about-details">
        <article>
          <span className="section-kicker">Education</span>
          <h2>{profile.education.degree}</h2>
          <p>{profile.education.institution}<br />{profile.education.location}</p>
        </article>
        <article>
          <span className="section-kicker">Languages</span>
          <ul className="language-list">
            {profile.spokenLanguages.map((item) => (
              <li key={item.language}><strong>{item.language}</strong><span>{item.proficiency}</span></li>
            ))}
          </ul>
        </article>
        <article>
          <span className="section-kicker">Domains</span>
          <div className="tag-list">{profile.domains.map((domain) => <span key={domain}>{domain}</span>)}</div>
        </article>
      </section>
    </>
  );
}
