import assert from "node:assert/strict";
import test from "node:test";
import { portfolioContent, validateContent } from "../app/content/validate";
import { renderReadme } from "../scripts/generate-content";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { MemoryRouter } from "react-router";
import { CaseStudyCard } from "../app/components/CaseStudyCard";
import type { StoryWork } from "../app/content/portfolio";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
const fixture = () => structuredClone(portfolioContent);
test("production records validate, including stories without metrics", () =>
  assert.doesNotThrow(() => validateContent(fixture())));
for (const [name, mutate, error] of [
  [
    "missing dates",
    (p: ReturnType<typeof fixture>) => {
      p.work[0].period = "";
    },
    /period/,
  ],
  [
    "missing story title",
    (p: ReturnType<typeof fixture>) => {
      p.work[0].story!.title = "";
    },
    /title/,
  ],
  [
    "duplicate IDs",
    (p: ReturnType<typeof fixture>) => {
      p.work[1].id = p.work[0].id;
    },
    /Duplicate work ID/,
  ],
  [
    "duplicate slugs",
    (p: ReturnType<typeof fixture>) => {
      p.work[1].story!.slug = p.work[0].story!.slug;
    },
    /Duplicate story slug/,
  ],
  [
    "unsafe link",
    (p: ReturnType<typeof fixture>) => {
      p.profile.socialLinks[0].href = "javascript:alert(1)";
    },
    /Invalid URL/,
  ],
  [
    "missing outcomes",
    (p: ReturnType<typeof fixture>) => {
      p.work[0].outcomes = [];
    },
    /outcomes/,
  ],
  [
    "broken reference",
    (p: ReturnType<typeof fixture>) => {
      p.featuredWork[0] = "missing";
    },
    /Unknown work reference/,
  ],
  [
    "missing skills",
    (p: ReturnType<typeof fixture>) => {
      p.skillGroups[0].skills = [];
    },
    /skills/,
  ],
  [
    "invalid navigation",
    (p: ReturnType<typeof fixture>) => {
      p.navigation[0].to = "/missing";
    },
    /navigation/,
  ],
] as const)
  test(`rejects ${name}`, () => {
    const p = fixture();
    mutate(p);
    assert.throws(() => validateContent(p), error);
  });

test("one metric and role edit propagate to web, README and PDF", async () => {
  const p = fixture();
  const work = p.work.find((w) => w.id === "swift")!;
  work.metrics[0].value = "98.765%";
  work.company = "Example Clinical Team";
  const html = renderToStaticMarkup(
    createElement(
      MemoryRouter,
      null,
      createElement(CaseStudyCard, { caseStudy: work as StoryWork, index: 0 }),
    ),
  );
  const readme = renderReadme(p);
  for (const output of [html, readme]) {
    assert.match(output, /98\.765%/);
    assert.match(output, /Example Clinical Team/);
  }
  const directory = await mkdtemp(join(tmpdir(), "portfolio-content-"));
  try {
    const input = join(directory, "content.json"),
      output = join(directory, "cv.pdf");
    await writeFile(input, JSON.stringify(p));
    const process = spawnSync(
      globalThis.process.env.PYTHON ?? "python3",
      ["scripts/generate_cv.py", "--content", input, "--output", output],
      { encoding: "utf8" },
    );
    assert.equal(process.status, 0, process.stderr);
    const task = getDocument({
      data: new Uint8Array(await readFile(output)),
      useSystemFonts: true,
    });
    const pdf = await task.promise;
    let text = "";
    for (let n = 1; n <= pdf.numPages; n++) {
      const page = await pdf.getPage(n);
      const content = await page.getTextContent();
      text += content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
    }
    assert.match(text, /98\.765%/);
    assert.match(text, /Example Clinical Team/);
    await task.destroy();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
