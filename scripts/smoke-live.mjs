import { routeManifest, canonicalPath } from "../app/content/routes.ts";
import { portfolio } from "../app/content/portfolio.ts";
const baseUrl = process.env.PORTFOLIO_BASE_URL ?? portfolio.site.url;
const routes = routeManifest.map((route) => canonicalPath(route.path).slice(1));
const assets = [
  portfolio.site.cvPath.slice(1),
  portfolio.site.portraitPath.slice(1),
  "og.png",
  "sitemap.xml",
  "robots.txt",
];
const targets = [...routes, ...assets];

async function verifyTarget(target) {
  const url = new URL(target, baseUrl);
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);

  const contentType = response.headers.get("content-type") ?? "";
  if (routes.includes(target)) {
    if (!contentType.includes("text/html"))
      throw new Error(`${url} did not return HTML`);
    const html = await response.text();
    if (!html.includes(portfolio.profile.shortName))
      throw new Error(`${url} did not contain portfolio content`);
  } else if (
    target.endsWith(".pdf") &&
    !contentType.includes("application/pdf")
  ) {
    throw new Error(`${url} did not return a PDF`);
  } else if (target.endsWith(".webp") && !contentType.includes("image/webp")) {
    throw new Error(`${url} did not return a WebP image`);
  } else if (target.endsWith(".png") && !contentType.includes("image/png")) {
    throw new Error(`${url} did not return a PNG image`);
  }
}

const attempts = 6;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    await Promise.all(targets.map(verifyTarget));
    console.log(`Verified ${targets.length} live portfolio URLs at ${baseUrl}`);
    process.exit(0);
  } catch (error) {
    if (attempt === attempts) throw error;
    console.log(
      `Live site is not ready yet (${attempt}/${attempts}); retrying in 8 seconds.`,
    );
    await new Promise((resolve) => setTimeout(resolve, 8_000));
  }
}
