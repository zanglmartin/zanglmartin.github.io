import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "Reliable mobile systems, built for the real world." },
  { path: "/about/", heading: "Engineering depth, product perspective." },
  { path: "/experience/", heading: "15+ years building software that ships." },
  { path: "/expertise/", heading: "Depth in Android. Range across mobile systems." },
  { path: "/case-studies/", heading: "Engineering stories with measurable outcomes." },
  { path: "/case-studies/mobile-reliability/", heading: "Turning a fragile legacy app into reliable mobile software" },
  { path: "/case-studies/payment-sdks/", heading: "Keeping payment SDK behavior aligned across platforms" },
  { path: "/case-studies/fintech-architecture/", heading: "Reusable architecture for wallet and credit-card experiences" },
];

function localPath(path: string) {
  return path === "/" ? "./" : `.${path}`;
}

for (const route of routes) {
  test(`${route.path} loads directly with accessible content`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(localPath(route.path));
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    expect(errors).toEqual([]);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("desktop navigation reaches every primary section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.goto("./");

  for (const item of ["About", "Experience", "Expertise", "Case studies"]) {
    const link = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: item });
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/${item.toLowerCase().replace(" ", "-")}/?$`));
    await expect(link).toHaveAttribute("aria-current", "page");
  }
});

test("engineering outcomes stay in one row on laptop screens", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.goto("./");

  const outcomes = page.locator(".metric-strip article");
  await expect(outcomes).toHaveCount(4);
  const topEdges = await outcomes.evaluateAll((items) =>
    items.map((item) => Math.round(item.getBoundingClientRect().top)),
  );
  expect(new Set(topEdges).size).toBe(1);
});

test("mobile menu supports navigation and Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("./");
  const menu = page.locator(".menu-toggle");

  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();

  await menu.click();
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/zanglmartin\/about\/?$/);
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
});

test("theme follows the system and persists one local preference", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => ({
    keys: Object.keys(localStorage),
    theme: localStorage.getItem("martin-portfolio-theme"),
  }))).toEqual({ keys: ["martin-portfolio-theme"], theme: "dark" });

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("CV and local media assets are publishable", async ({ page, request }) => {
  await page.goto("./");
  const cvLinks = page.getByRole("link", { name: "Download CV" });
  await expect(cvLinks).toHaveCount(2);
  const cvHref = await cvLinks.first().getAttribute("href");
  expect(cvHref).toBe("/cv/martin-zangl-cv-2026.pdf");
  const cvResponse = await request.get(cvHref!);
  expect(cvResponse.ok()).toBeTruthy();
  expect(cvResponse.headers()["content-type"]).toContain("application/pdf");

  for (const asset of ["images/martin-zangl.webp", "og.png", "og/portfolio.png"]) {
    const response = await request.get(`/${asset}`);
    expect(response.ok(), asset).toBeTruthy();
  }
});

test("contact and GitHub links use the expected safe destinations", async ({ page }) => {
  await page.goto("./");
  const links = [
    { name: /Connect|Message on LinkedIn/, href: "https://www.linkedin.com/in/martinzangl/" },
    { name: "Primary GitHub", href: "https://github.com/mizangl" },
    { name: "Portfolio repository", href: "https://github.com/zanglmartin" },
  ];

  for (const expectedLink of links) {
    const matches = page.getByRole("link", { name: expectedLink.name });
    expect(await matches.count()).toBeGreaterThan(0);
    for (const link of await matches.all()) {
      await expect(link).toHaveAttribute("href", expectedLink.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  }
});

test("keyboard focus, skip navigation, and reduced motion remain accessible", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  const outline = await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const durations = await page.getByRole("link", { name: "Explore my impact" }).evaluate((element) =>
    getComputedStyle(element).transitionDuration.split(",").map((value) => Number.parseFloat(value)),
  );
  expect(durations.every((duration) => duration <= 0.001)).toBeTruthy();
});

for (const route of routes) {
  test(`${route.path} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(localPath(route.path));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blockingViolations = results.violations.filter((violation) =>
      violation.impact === "serious" || violation.impact === "critical",
    );
    expect(blockingViolations).toEqual([]);
  });
}
