# Maintaining the portfolio

Edit **app/content/portfolio.json**. It is the source for the website, downloadable CV, and generated portfolio section of README.md. The original Obsidian stories were migration inputs; neither the vault nor an export step is required.

Use Node 24 or newer and Python 3.11 or newer. Install dependencies with `npm ci` and `python3 -m pip install -r scripts/requirements.txt` (prefer a virtual environment). Install Chromium once with `npx playwright install chromium` for social-card generation and browser tests. Set `PYTHON` if your Python executable has another path.

## Content structure

- `profile`, `site`, `pages`, `navigation`, and `copy` own shared identity, destinations, and presentation text.
- `work` contains career entries in reverse chronological order. Keep IDs stable. A `story` adds context, challenge, decisions, and validation to the shared ownership (`achievements`), outcomes, and technologies.
- `metrics` belong to a work record and are optional. Update their value here; never copy measurements into separately maintained prose.
- `featuredWork`, expertise `workIds`, and `cv.workIds` select existing records by ID. CV bullet limits choose how many existing contributions to include.
- Case study sections share a template. Describe contributions accurately when shipment or measurement is not established. Do not add interview prompts or speculative metrics.

Run `npm run generate` after editing. This validates content and generates the PDF, social preview PNGs, sitemap, robots.txt, and the marked README section. The same step runs during both builds. Do not edit generated outputs directly. Text outside the README markers remains editable.

Run `npm run typecheck`, `npm run lint`, and `npm test` before committing. Tests cover content integrity, generated routes and metadata, PDF text, privacy checks, mobile/desktop navigation, themes, and accessibility. Render the CV with `pdftoppm -png public/cv/martin-zangl-cv-2026.pdf /tmp/portfolio-cv` and inspect every page after layout or content changes.

`npm run dev` starts development; `npm run preview` serves the GitHub Pages build. The existing workflow deploys merges to main and checks live routes afterward. The legacy combined fintech URL remains a landing page for the separate PayPal and MercadoLibre stories.
