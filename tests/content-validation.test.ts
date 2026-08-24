import assert from "node:assert/strict";
import test from "node:test";
import {
  portfolioContent,
  validateContent,
  type PortfolioContent,
} from "../app/content/validate";

function contentFixture(): PortfolioContent {
  return structuredClone(portfolioContent);
}

test("accepts the production content records", () => {
  assert.doesNotThrow(() => validateContent(contentFixture()));
});

test("rejects an experience without dates", () => {
  const content = contentFixture();
  content.experiences[0].period = "";
  assert.throws(() => validateContent(content), /experiences\[0\]\.period/);
});

test("rejects a case study without a title", () => {
  const content = contentFixture();
  content.caseStudies[0].title = "";
  assert.throws(() => validateContent(content), /caseStudies\[0\]\.title/);
});

test("rejects an invalid social link", () => {
  const content = contentFixture();
  content.profile.socialLinks[0].href = "not-a-url";
  assert.throws(() => validateContent(content), /profile\.socialLinks\[0\]\.href/);
});

test("rejects duplicate case-study slugs", () => {
  const content = contentFixture();
  content.caseStudies[1].slug = content.caseStudies[0].slug;
  assert.throws(() => validateContent(content), /Duplicate case-study slug/);
});

test("rejects an incomplete skill group", () => {
  const content = contentFixture();
  content.skillGroups[0].skills = [];
  assert.throws(() => validateContent(content), /skillGroups\[0\]\.skills/);
});

test("rejects an incomplete case study", () => {
  const content = contentFixture();
  content.caseStudies[0].outcomes = [];
  assert.throws(() => validateContent(content), /caseStudies\[0\]\.outcomes/);
});
