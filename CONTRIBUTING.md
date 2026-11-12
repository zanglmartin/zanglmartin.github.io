# Maintaining the portfolio

`app/content/portfolio.json` is the source for the website, the generated section of `README.md`, and the public CV. The original Obsidian notes were migration inputs and are no longer part of the build.

Use Node 24 or newer and Python 3.11 or newer. Install the JavaScript dependencies with `npm ci`. Install the PDF dependency with `python3 -m pip install -r scripts/requirements.txt`, preferably in a virtual environment. Install Chromium once with `npx playwright install chromium`. Set `PYTHON` when the Python executable has a different path.

## 1. Edit the source content

Make career and portfolio changes in `app/content/portfolio.json`.

- `profile`, `site`, `pages`, `navigation`, and `copy` contain shared identity and page text.
- `work` contains career entries in reverse chronological order. Keep each `id` stable.
- A `story` contains the context, challenge, decisions, and validation for a case study.
- `metrics` belong to a work record. Change a measurement once at its source instead of copying it into separate prose.
- `featuredWork`, expertise `workIds`, and `cv.workIds` refer to existing work IDs.
- The CV bullet limits select existing contributions. The PDF generator does not maintain a separate career history.

## 2. Generate the public artifacts

Run:

```sh
npm run generate
```

This command validates the content and regenerates:

- the marked portfolio section in `README.md`
- `public/cv/martin-zangl-cv-2026.pdf`
- the social preview image
- `public/sitemap.xml`
- `public/robots.txt`

Do not edit those generated files directly. Text outside the generated markers in `README.md` remains hand-editable.

## 3. Validate code and content

Run all checks with Node 24:

```sh
npm run typecheck
npm run lint
npm test
```

The tests cover content references, generated routes and metadata, source propagation, PDF text and page count, privacy, mobile and desktop navigation, themes, and accessibility.

## 4. Review the results

Use `npm run dev` during editing. Use `npm run preview` to inspect the GitHub Pages build produced by the test or build command.

Review these pages on desktop and mobile:

- Home
- About
- Experience
- Expertise
- all four case studies

Render and inspect both pages of the public CV after any content or layout change:

```sh
pdftoppm -png public/cv/martin-zangl-cv-2026.pdf /tmp/portfolio-cv
```

The existing GitHub Actions workflow uses Node 24, builds the GitHub Pages output, deploys merges to `main`, and checks the live routes afterward. The legacy fintech URL remains a landing page for the separate PayPal and MercadoLibre case studies.

## Editorial rules

- Publish facts that can be supported by the career notes or confirmed production work.
- Use a metric only when its value and meaning have been confirmed.
- Describe internal systems by their function. Do not publish internal codenames.
- Keep the public CV free of phone numbers, email addresses, citizenship, and other private identity details.
- Use direct first-person language. Begin with the problem, contribution, or result.
- Prefer concrete product behavior over promotional claims and generic adjectives.
- Keep job titles, dates, technologies, and outcomes consistent across the site, README, and PDF.
