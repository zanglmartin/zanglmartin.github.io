import { generateSocialCard } from "./generate-social";
import { writeFile, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { portfolio as p } from "../app/content/portfolio";
import { routeManifest, canonicalPath } from "../app/content/routes";
import "../app/content/validate";
export function renderReadme(content: typeof p) {
  const works = content.featuredWork.map((id) =>
    content.work.find((work) => work.id === id)!,
  );
  const linkedin = content.profile.socialLinks.find(
    (link) => link.kind === "linkedin",
  )!;
  const github = content.profile.socialLinks.find(
    (link) => link.kind === "github",
  )!;
  const focusAreas = content.systemDesignThemes.slice(0, 3);
  const cvUrl = new URL(content.site.cvPath, content.site.url).href;
  return `# ${content.profile.shortName}\n\n**${content.profile.headline} in ${content.profile.location}.**\n\nI have spent 12+ years building Android products and 15+ years in software. My recent work covers payment SDKs, offline synchronization, production reliability, and the native code behind cross-platform apps.\n\n[Portfolio](${content.site.url}) · [Public CV](${cvUrl}) · [LinkedIn](${linkedin.href}) · [GitHub](${github.href})\n\n## What I work on\n\n${focusAreas.map((area) => `- **${area.title}:** ${area.description}`).join("\n")}\n\n## Selected case studies\n\n${works.map((work) => `- **[${work.client ?? work.company}: ${work.story!.title}](${content.site.url}case-studies/${work.story!.slug}/)**\n  ${work.summary}${work.metrics.length ? ` ${work.metrics.map((metric) => `${metric.label}: ${metric.value}`).join(", ")}.` : ""}`).join("\n")}\n`;
}
if (process.argv[1]?.endsWith("generate-content.ts")) {
  const file = "README.md";
  const old = await readFile(file, "utf8");
  const start = "<!-- portfolio:generated:start -->";
  const end = "<!-- portfolio:generated:end -->";
  const generated = `${start}\n${renderReadme(p)}${end}`;
  const readme = old.includes(start)
    ? old.replace(new RegExp(`${start}[\\s\\S]*?${end}`), () => generated)
    : `${generated}\n\n## Maintenance\n\nSee [CONTRIBUTING.md](CONTRIBUTING.md) for content editing, generation, and verification.\n`;
  await writeFile(file, readme);
  const xml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  await writeFile(
    "public/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated from the portfolio route manifest. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routeManifest.map((route) => `  <url><loc>${xml(new URL(canonicalPath(route.path), p.site.url).href)}</loc></url>`).join("\n")}\n</urlset>\n`,
  );
  await writeFile(
    "public/robots.txt",
    `# Generated from portfolio.json\nUser-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", p.site.url).href}\n`,
  );
  const result = spawnSync(
    process.env.PYTHON ?? "python3",
    ["scripts/generate_cv.py"],
    { stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  await generateSocialCard();
}
