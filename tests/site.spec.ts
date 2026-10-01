import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/about",
  "/research",
  "/projects",
  "/cv",
  "/contact",
  "/pt-br",
  "/blog",
  "/blog/clinical-prediction-begins-with-the-clock",
  "/blog/building-tools-for-the-work-of-learning",
  "/blog/evidence-synthesis-should-begin-with-the-question",
];

for (const mode of ["light", "dark"] as const) {
  for (const width of [390, 1440]) {
    test(`${mode} ${width}px: routes, accessibility, and horizontal fit`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: mode, reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      for (const route of routes) {
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("h1"), route).toHaveCount(1);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route,
        ).toBeTruthy();
        const a11y = await new AxeBuilder({ page }).analyze();
        expect(
          a11y.violations,
          `${route}: ${JSON.stringify(a11y.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
        ).toEqual([]);
      }
      expect(errors).toEqual([]);
    });
  }
}

test("research types, combined search, empty state, and reset", async ({
  page,
}) => {
  await page.goto("/research");
  await page
    .getByRole("button", { name: "Accepted posters", exact: true })
    .click();
  await expect(page.locator(".research-records > li")).toHaveCount(2);
  await expect(page.locator(".research-records")).toContainText(
    "Accepted digital poster",
  );
  await page.getByRole("searchbox", { name: "Search research" }).fill("glioma");
  await expect(page.locator(".research-records > li")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Submitted abstracts", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "No matching work." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show all research", exact: true })
    .click();
  await expect(page.locator(".research-records > li")).toHaveCount(17);
  await page
    .getByRole("button", { name: "Submitted abstracts", exact: true })
    .click();
  await expect(page.locator(".research-records > li")).toHaveCount(8);
  await expect(page.locator(".status-tag")).toHaveText(
    Array(8).fill("Submitted abstract · decision pending"),
  );
  await page.getByRole("button", { name: "Manuscripts", exact: true }).click();
  await page.getByRole("searchbox").fill("CRD420261492790");
  await expect(page.locator(".research-records > li")).toHaveCount(1);
  await expect(page.locator(".research-records")).toContainText(
    "Prepared for submission",
  );
});

test("mobile keyboard menu: focus, Escape, route changes, resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await trigger.click();
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(
    nav.getByRole("link", { name: "About", exact: true }),
  ).toBeFocused();
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    nav.getByRole("button", { name: "Use dark theme" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await trigger.click();
  await nav.getByRole("link", { name: "Research", exact: true }).click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("main")).not.toHaveAttribute("inert");
  await trigger.click();
  await nav.getByRole("link", { name: "Research", exact: true }).click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page.locator("main")).not.toHaveAttribute("inert");
});

test("theme persistence, reduced motion, and storage denial", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Use dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".hero-atlas")
      .evaluate((el) => parseFloat(getComputedStyle(el).animationDuration)),
  ).toBeLessThan(0.01);
  const restricted = await context.newPage();
  await restricted.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    });
  });
  await restricted.goto("/");
  await restricted.getByRole("button", { name: "Use dark theme" }).click();
  await expect(restricted.locator("html")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await restricted.close();
});

test("updated credentials and superseded claims stay consistent", async ({
  page,
  request,
}) => {
  await page.goto("/cv");
  await expect(page.locator("main")).toContainText("3.73/4.00");
  await expect(page.locator("main")).toContainText(
    "USMLE Step 1: Pass (September 2026)",
  );
  await expect(page.locator("main")).toContainText("Jan 2026 — present");
  await expect(page.locator("main")).toContainText("Duolingo English Test 145");
  await expect(page.locator("main")).not.toContainText("English — C2");
  await expect(page.locator("main")).not.toContainText(
    "Cerebral Autoregulation-Guided BP Targets",
  );
  await expect(page.locator("main")).not.toContainText("71st Brazilian");
  const pdf = await request.get("/cv/Felipe_de_Carvalho_Figueiredo_CV.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const docx = await request.get("/cv/Felipe_de_Carvalho_Figueiredo_CV.docx");
  expect(docx.status()).toBe(200);
  expect((await docx.body()).subarray(0, 2).toString()).toBe("PK");
  await page.goto("/projects");
  await expect(page.locator("main")).not.toContainText(
    "Bayesian Triage Assistant",
  );
});

test("blog, legacy redirects, metadata, and internal links", async ({
  page,
  request,
}) => {
  const internal = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toBe(`https://felipef.com${route === "/" ? "" : route}`);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")!)))
      internal.add(href.split("#")[0]);
  }
  for (const route of internal)
    expect((await request.get(route)).status(), route).toBe(200);
  const legacy = await request.get(
    "/notes/clinical-prediction-begins-with-the-clock",
    { maxRedirects: 0 },
  );
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe(
    "/blog/clinical-prediction-begins-with-the-clock",
  );
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/blog/clinical-prediction-begins-with-the-clock");
  expect(sitemap).toContain("/blog/building-tools-for-the-work-of-learning");
  await page.goto("/not-a-real-page");
  await expect(page.locator("h1")).toBeVisible();
});

test("contact reveal and copy feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page.getByRole("button", { name: "Reveal email address" }).click();
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toBeFocused();
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied.");
});

test("narrow and tablet layouts keep content within the viewport", async ({
  page,
}) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/research", "/cv", "/contact", "/blog"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBeTruthy();
    }
  }
});
