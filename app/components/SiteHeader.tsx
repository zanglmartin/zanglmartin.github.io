import { portfolio as p, linkedin } from "../content/portfolio";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

const links = p.navigation;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          to="/"
          aria-label={`${p.profile.shortName} home`}
          onClick={() => setIsOpen(false)}
        >
          <span className="brand-mark">MZ</span>
          <span className="brand-name">{p.profile.shortName}</span>
        </Link>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
        </button>

        <nav
          id="primary-navigation"
          className={isOpen ? "primary-nav is-open" : "primary-nav"}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "nav-item is-active" : "nav-item"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="nav-contact"
            href={linkedin.href}
            target="_blank"
            rel="noreferrer"
          >
            {p.copy.connect} <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
