import { Link, useHref } from "react-router";
import { profile } from "../content/profile";

export function SiteFooter() {
  const cvHref = useHref("/cv/martin-zangl-cv-2026.pdf");

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <span className="section-kicker">Next conversation</span>
          <h2>Let&apos;s build mobile software people can rely on.</h2>
        </div>
        <div className="footer-actions">
          <a className="button button-primary" href="https://www.linkedin.com/in/martinzangl/" target="_blank" rel="noreferrer">
            Message on LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-quiet" href={cvHref} download>Download CV</a>
        </div>
      </div>
      <div className="footer-bottom">
        <Link className="brand" to="/"><span className="brand-mark">MZ</span><span className="brand-name">{profile.shortName}</span></Link>
        <p>Built as a fast, accessible static site. No tracking, no cookies.</p>
        <nav className="footer-social" aria-label="GitHub profiles">
          {profile.socialLinks.filter((link) => link.kind !== "linkedin").map((link) => (
            <a key={link.kind} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          ))}
        </nav>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
