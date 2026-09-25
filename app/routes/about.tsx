import { portfolio as p } from "../content/portfolio";
import type { MetaFunction } from "react-router";
import { useHref } from "react-router";
import { PageIntro } from "../components/PageIntro";
import { createPageMeta } from "../content/meta";
import { profile } from "../content/profile";

export const meta: MetaFunction = () => createPageMeta(p.pages.about);

export default function About() {
  const avatarHref = useHref(p.site.portraitPath);

  return (
    <>
      <PageIntro
        eyebrow={p.pages.about.eyebrow}
        title={p.pages.about.heading}
        aside={
          <div className="about-aside">
            <span>{p.copy.basedIn}</span>
            <strong>{profile.location}</strong>
            <span>{p.copy.workingAcross}</span>
            <strong>{p.copy.platformFocus}</strong>
          </div>
        }
      >
        <p>{p.pages.about.description}</p>
      </PageIntro>

      <section className="about-layout">
        <div className="about-portrait">
          <img
            src={avatarHref}
            alt={p.profile.shortName}
            width="620"
            height="620"
          />
          <span>{p.copy.portraitCaption}</span>
        </div>
        <div className="about-story">
          {profile.longSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="about-details">
        <article>
          <span className="section-kicker">{p.copy.education}</span>
          <h2>{profile.education.degree}</h2>
          <p>
            {profile.education.institution}
            <br />
            {profile.education.location}
          </p>
        </article>
        <article>
          <span className="section-kicker">{p.copy.languages}</span>
          <ul className="language-list">
            {profile.spokenLanguages.map((item) => (
              <li key={item.language}>
                <strong>{item.language}</strong>
                <span>{item.proficiency}</span>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <span className="section-kicker">{p.copy.domains}</span>
          <div className="tag-list">
            {profile.domains.map((domain) => (
              <span key={domain}>{domain}</span>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
