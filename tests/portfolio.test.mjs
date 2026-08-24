import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = new URL("../", import.meta.url);
const buildRoot = new URL("../build/pages/", import.meta.url);
const siteUrl = "https://zanglmartin.github.io/";
const sensitive = [
  "+34 664 209 089",
  "martin.zangl@gmail.com",
  "nationality: argentine",
  "citizenship: austrian",
];

const routes = [
  { output: "index.html", path: "", title: "Martin Zangl | Senior Android &amp; Mobile Engineer" },
  { output: "about/index.html", path: "about/", title: "About | Martin Zangl" },
  { output: "experience/index.html", path: "experience/", title: "Experience | Martin Zangl" },
  { output: "expertise/index.html", path: "expertise/", title: "Expertise | Martin Zangl" },
  { output: "case-studies/index.html", path: "case-studies/", title: "Case Studies | Martin Zangl" },
  {
    output: "case-studies/mobile-reliability/index.html",
    path: "case-studies/mobile-reliability/",
    title: "Turning a fragile legacy app into reliable mobile software | Martin Zangl",
  },
  {
    output: "case-studies/payment-sdks/index.html",
    path: "case-studies/payment-sdks/",
    title: "Keeping payment SDK behavior aligned across platforms | Martin Zangl",
  },
  {
    output: "case-studies/fintech-architecture/index.html",
    path: "case-studies/fintech-architecture/",
    title: "Reusable architecture for wallet and credit-card experiences | Martin Zangl",
  },
];

async function collectFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(target, extension));
    else if (!extension || target.endsWith(extension)) files.push(target);
  }
  return files;
}

function metaContent(html, key, value) {
  const tag = html.match(new RegExp(`<meta[^>]+${key}="${value}"[^>]*>`))?.[0];
  assert.ok(tag, `missing ${key}=${value}`);
  const content = tag.match(/content="([^"]+)"/)?.[1];
  assert.ok(content, `missing content for ${key}=${value}`);
  return content;
}

async function extractPdfText(buffer) {
  const loadingTask = getDocument({ data: new Uint8Array(buffer), useSystemFonts: true });
  const document = await loadingTask.promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" "));
  }
  await loadingTask.destroy();
  return pages.join("\n");
}

test("pre-renders exactly the expected routes at the GitHub Pages root", async () => {
  const htmlFiles = await collectFiles(buildRoot.pathname, ".html");
  const relativeFiles = htmlFiles.map((file) => path.relative(buildRoot.pathname, file)).sort();
  assert.deepEqual(relativeFiles, routes.map((route) => route.output).sort());

  for (const route of routes) {
    const html = await readFile(new URL(route.output, buildRoot), "utf8");
    assert.match(html, new RegExp(`<title>${route.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.match(html, /"\/assets\//);
    assert.doesNotMatch(html, /"\/zanglmartin(?:\/|")/);
    const internalReferences = [...html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)].map((match) => match[1]);
    assert.ok(internalReferences.length > 0, `${route.output} should contain internal references`);
    for (const reference of internalReferences) {
      assert.ok(!reference.startsWith("/zanglmartin"), `${route.output} contains the old Pages base path: ${reference}`);
    }
  }

  const JavaScriptFiles = await collectFiles(new URL("assets/", buildRoot).pathname, ".js");
  const JavaScript = (await Promise.all(JavaScriptFiles.map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(JavaScript, /"\/zanglmartin(?:\/|")/);
});

test("publishes unique complete metadata for every route", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const route of routes) {
    const html = await readFile(new URL(route.output, buildRoot), "utf8");
    const canonical = `${siteUrl}${route.path}`;
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = metaContent(html, "name", "description");
    titles.add(title);
    descriptions.add(description);

    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.equal(metaContent(html, "property", "og:title"), title);
    assert.equal(metaContent(html, "property", "og:description"), description);
    assert.equal(metaContent(html, "property", "og:url"), canonical);
    assert.equal(metaContent(html, "property", "og:image"), `${siteUrl}og.png`);
    assert.equal(metaContent(html, "name", "twitter:card"), "summary_large_image");
    assert.equal(metaContent(html, "name", "twitter:title"), title);
    assert.equal(metaContent(html, "name", "twitter:description"), description);
    assert.equal(metaContent(html, "name", "twitter:image"), `${siteUrl}og.png`);
    assert.equal(
      metaContent(html, "property", "og:type"),
      route.path.startsWith("case-studies/") && route.path !== "case-studies/" ? "article" : "website",
    );
  }

  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
});

test("sitemap and robots enumerate the production site", async () => {
  const sitemap = await readFile(new URL("sitemap.xml", buildRoot), "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, routes.map((route) => `${siteUrl}${route.path}`));

  const robots = await readFile(new URL("robots.txt", buildRoot), "utf8");
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, new RegExp(`Sitemap: ${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}sitemap\\.xml`));
});

test("does not publish private CV contact or identity details", async () => {
  const sourceFiles = await collectFiles(new URL("app/", root).pathname);
  const publicFiles = await collectFiles(new URL("public/", root).pathname);
  const buildFiles = await collectFiles(buildRoot.pathname);
  const readableFiles = [...sourceFiles, ...publicFiles, ...buildFiles].filter((file) =>
    /\.(?:ts|tsx|css|txt|xml|html|js|md)$/.test(file),
  );
  const publicText = (await Promise.all(readableFiles.map((file) => readFile(file, "utf8")))).join("\n").toLowerCase();
  const pdfBuffer = await readFile(new URL("public/cv/martin-zangl-cv-2026.pdf", root));
  const pdfText = (await extractPdfText(pdfBuffer)).toLowerCase();

  for (const value of sensitive) {
    assert.equal(publicText.includes(value), false, `published files contain ${value}`);
    assert.equal(pdfText.includes(value), false, `sanitized PDF contains ${value}`);
  }
  assert.match(pdfText, /linkedin\.com\/in\/martinzangl/);
  assert.match(pdfText, /github\.com\/mizangl/);
});
