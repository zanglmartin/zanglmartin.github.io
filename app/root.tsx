import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
} from "react-router";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem("martin-portfolio-theme");
      const theme = saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

export function Layout({ children }: { children: React.ReactNode }) {
  const avatarHref = useHref("/images/martin-zangl.webp");

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08110D" />
        <link rel="icon" type="image/webp" href={avatarHref} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return (
    <section className="error-page">
      <span className="section-kicker">404 · Route not found</span>
      <h1>This page took a wrong turn.</h1>
      <p>The portfolio is still here. Use the navigation to get back on track.</p>
      <Link className="button button-primary" to="/">Return home</Link>
    </section>
  );
}
