import { portfolio as p, linkedin } from "../content/portfolio";
import { Link, useHref } from "react-router";
import { profile } from "../content/profile";

export function SiteFooter() {
  const cvHref = useHref(p.site.cvPath);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <span className="section-kicker">{p.copy.contactEyebrow}</span>
          <h2>{p.copy.contactHeading}</h2>
        </div>
        <div className="footer-actions">
          <a
            className="button button-primary"
            href={linkedin.href}
            target="_blank"
            rel="noreferrer"
          >
            {p.copy.contactLabel} <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-quiet" href={cvHref} download>
            {p.copy.cvLabel}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <Link className="brand" to="/">
          <span className="brand-mark">MZ</span>
          <span className="brand-name">{profile.shortName}</span>
        </Link>
        <p>{p.copy.footerNote}</p>
        <nav className="footer-social" aria-label="GitHub profiles">
          {profile.socialLinks
            .filter((link) => link.kind !== "linkedin")
            .map((link) => (
              <a
                key={link.kind}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
        </nav>
        <span>© {p.site.copyrightYear}</span>
      </div>
    </footer>
  );
}
