import { chromium } from "@playwright/test";
import { copyFile, mkdir } from "node:fs/promises";
import { portfolio } from "../app/content/portfolio";

// A code-rendered social card shares the site's copy; it is not hand-edited artwork.
export async function generateSocialCard() {
  const escape = (text: string) =>
    text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });
    await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
      *{box-sizing:border-box}body{margin:0;background:#f8f6f1;color:#24282e;padding:65px 75px;font-family:Arial,sans-serif}
      header{display:flex;justify-content:space-between;border-bottom:1px solid #d8d8d2;padding-bottom:25px;font-size:20px}
      .role{color:#2457a6;font-size:17px;margin-top:38px}h1{font-family:Georgia,serif;font-size:59px;line-height:1.08;font-weight:normal;letter-spacing:-2px;margin:22px 0;max-width:940px}
      footer{position:absolute;bottom:55px;font-size:17px;color:#585f68}
      </style><header><strong>${escape(portfolio.profile.shortName)}</strong><span>${escape(portfolio.profile.location)}</span></header>
      <div class="role">${escape(portfolio.profile.headline)}</div><h1>${escape(portfolio.pages.home.heading)}</h1>
      <footer>${escape(new URL(portfolio.site.url).hostname)}</footer></html>`);
    await page.screenshot({ path: `public${portfolio.site.socialImagePath}` });
    await mkdir("public/og", { recursive: true });
    await copyFile(
      `public${portfolio.site.socialImagePath}`,
      "public/og/portfolio.png",
    );
  } finally {
    await browser.close();
  }
}
