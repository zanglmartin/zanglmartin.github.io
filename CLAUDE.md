# zanglmartin.github.io — portfolio site

Martín Zangl's personal portfolio and public CV, deployed to GitHub Pages at
<https://zanglmartin.github.io/>. React Router 8 (framework mode) + Vite + React 19, static
prerender, TypeScript throughout. Content is data, not markup.

Built from `README.md` and `CONTRIBUTING.md`; read `CONTRIBUTING.md` for the full maintenance
procedure. This file is the short version plus what the docs don't say.

## The one rule that matters

**`app/content/portfolio.json` is the single source of truth.** It feeds the website, the
generated section of `README.md`, and the public CV PDF. Change a fact once, there.

**Never hand-edit these — `npm run generate` overwrites them:**

- the block in `README.md` between `<!-- portfolio:generated:start -->` and `:end -->`
  (text outside the markers *is* hand-editable, e.g. the Maintenance section)
- `public/cv/martin-zangl-cv-2026.pdf`
- the social preview image, `public/sitemap.xml`, `public/robots.txt`

A metric lives on its `work` record and is referenced, never copied into prose. `featuredWork`,
expertise `workIds` and `cv.workIds` are foreign keys into `work[].id` — keep IDs stable.

## Commands

```sh
npm ci                      # install
npm run dev                 # local dev server
npm run generate            # validate content + regenerate all public artifacts
npm run typecheck           # react-router typegen && tsc
npm run lint                # eslint
npm test                    # build:pages + static tests + playwright e2e
npm run preview             # serve the GitHub Pages build
```

First-time extras: `python3 -m pip install -r scripts/requirements.txt` (PDF generation) and
`npx playwright install chromium`. Set `PYTHON` if python3 isn't on the default path.

## Environment gotchas on this machine

- **Node is v22.12.0; `package.json` requires `>=24`** and CI uses 24. Expect `npm ci` and the
  test suite to complain or misbehave. Upgrade Node before trusting a local test run.
- **`pdftoppm` is not installed**, so CONTRIBUTING's CV-review step
  (`pdftoppm -png public/cv/... /tmp/portfolio-cv`) will fail. `brew install poppler` to fix,
  or inspect the PDF another way.
- Python 3.15 is present, comfortably above the 3.11 floor.

## Layout

```
app/content/portfolio.json   the source of truth
app/content/*.ts             typed accessors (profile, experience, skills, caseStudies,
                             meta, routes) + types.ts and validate.ts
app/routes/                  home, about, experience, expertise, case-studies, case-study
app/components/              SiteHeader, SiteFooter, PageIntro, CaseStudyCard, ThemeToggle
scripts/generate-content.ts  the generator entry point (`npm run generate`)
scripts/generate_cv.py       builds the public CV PDF
scripts/generate-social.ts   social preview image
scripts/prepare-pages.mjs    post-build step for GitHub Pages
scripts/smoke-live.mjs       checks live routes after deploy (`npm run test:live`)
tests/                       content-validation, portfolio (static), e2e/ (playwright)
```

Tests cover content references, generated routes and metadata, source propagation, PDF text and
page count, privacy, mobile and desktop navigation, themes, and accessibility. `graphify-out/`
holds a generated code graph; it is not part of the build.

Deployment: `.github/workflows/deploy-pages.yml` on push to `main`, Node 24, then a live-route
check. The legacy fintech URL stays as a landing page for the separate PayPal and MercadoLibre
case studies.

## Editorial rules

From `CONTRIBUTING.md`, and they are the point of the project:

- Publish only facts supportable by the career notes or confirmed production work.
- Use a metric only when its value **and meaning** are confirmed.
- Describe internal systems by function. No internal codenames.
- Keep the public CV free of phone numbers, email addresses, citizenship and other private
  identity details. (Note: the *private* CV in the sibling project does carry a phone number —
  different artifact, different rules.)
- First person, direct. Start with the problem, contribution or result.
- Concrete product behavior over promotional claims and generic adjectives.
- Keep titles, dates, technologies and outcomes consistent across the site, README and PDF.

## Consistency with the CV project

`../../personal/CV/` holds a separate, newer CV (`cv_2026.tex`) and a LinkedIn rewrite. Its
**`DECISIONS.md` is authoritative for biographical facts** and was settled over 26 resolved
questions. All eight `work[].period` values here already match it. These do not:

**Fixed on 2026-11-12** — the years claim (now "13+ years building Android", no total, in all
three places), `santex.company` → Santex, `globant.role` → Semi-Senior Android Engineer,
`independent` → Freelance / Software Developer, the metric labels (crash-free **users**, with
Crashlytics named, and both percentages labelled whole-app over a full session), and the
agentless "synchronization and memory changes helped move crash-free usage" in `longSummary`.
**`README.md` still shows the old text until `npm run generate` runs.**

Still open:

- **The MercadoLibre case study mentions a "Brazil launch"**, which appears nowhere in the CV
  project. Either genuinely new (then it belongs in `DECISIONS.md`) or unverified.
- **`swift` achievements say "an application-owned queue"** where the CV now names **Room**, and
  say nothing about the screens rebuilt in **Jetpack Compose**. Both are accurate-but-vaguer
  rather than wrong, so they were left alone; naming them would strengthen the page.
- Any wording implying a **product-wide** RxJava→Coroutines migration is wrong: it covered the
  paths users hit most, over two to three months, iteratively with measurement at each step.

Two public CVs now exist — this generated 2-page one and the 3-page `cv_2026.pdf`. Decide
deliberately which is canonical rather than letting them drift.
