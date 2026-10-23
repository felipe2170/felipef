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
  "/pt-br/about",
  "/pt-br/research",
  "/pt-br/projects",
  "/pt-br/cv",
  "/pt-br/contact",
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

test("research collection, combined filters, shared URLs, history, and recovery", async ({
  page,
}) => {
  await page.goto("/research");
  const search = page.getByRole("searchbox", { name: "Search research" });
  await search.fill("opioid");
  await expect(page.locator(".research-records > li")).toHaveCount(1);
  await expect(page.locator(".research-records")).toContainText(
    "Opioid stewardship",
  );
  await expect(
    page.locator(".research-records a[href^='https://doi.org/']"),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Manuscripts", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No matching work." }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.locator(".research-records > li")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Accepted conference outputs", exact: true })
    .click();
  await search.fill("SCCM");
  await expect(page.locator(".research-records > li")).toHaveCount(7);
  await expect(page.locator(".status-tag")).toHaveText(
    Array(7).fill("Accepted for presentation"),
  );
  await page.reload();
  await expect(search).toHaveValue("SCCM");
  await expect(page.locator(".research-records > li")).toHaveCount(7);
  await page
    .getByRole("link", { name: "Ler em português", exact: true })
    .click();
  await expect(page).toHaveURL(/pt-br\/research\?type=accepted&q=SCCM/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.getByRole("searchbox")).toHaveValue("SCCM");
  await expect(page.locator(".status-tag")).toHaveText(
    Array(7).fill("Aceito para apresentação"),
  );
  await page.goto(
    "/research?type=manuscripts&q=CRD420261492790#research-library",
  );
  await expect(page.locator(".research-records > li")).toHaveCount(1);
  await expect(page.locator(".research-records")).toContainText("Under review");
  await expect(page.locator(".research-records")).toContainText(
    "Anaesthesia Critical Care & Pain Medicine",
  );
  await page.getByRole("searchbox").fill("unmatched-query");
  await page
    .getByRole("button", { name: "Show all research", exact: true })
    .click();
  await expect(page.locator(".research-records > li")).toHaveCount(19);
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
      .locator(".portrait-hero")
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
  await expect(page.locator("main")).not.toContainText(
    "Duolingo English Test 145",
  );
  await expect(page.locator("main")).toContainText("English — C2");
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
    ).toBe(`https://www.felipef.com${route === "/" ? "" : route}`);
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

test("citation relationships preserve distinct outputs and source omissions", async ({
  page,
}) => {
  await page.goto("/research");
  const records = page.locator(".research-records");
  const ids = await records
    .locator("> li")
    .evaluateAll((els) => els.map((el) => el.id));
  expect(new Set(ids).size).toBe(ids.length);
  await page.getByRole("searchbox").fill("Remimazolam");
  await expect(records.locator("> li")).toHaveCount(3);
  await expect(
    page.locator("#record-remimazolam-propofol-sccm .record-authors"),
  ).toHaveCount(0);
  await page.goto("/cv");
  await expect(page.locator("#manuscripts .cv-citations > li")).toHaveCount(5);
  await expect(page.locator("#conferences .cv-citations > li")).toHaveCount(7);
});

test("localization, reciprocal alternates, and localized actions", async ({
  page,
}) => {
  for (const suffix of [
    "",
    "/about",
    "/research",
    "/projects",
    "/cv",
    "/contact",
  ]) {
    await page.goto("/pt-br" + suffix);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://www.felipef.com" + suffix,
    );
    await page
      .getByRole("link", { name: "Read in English", exact: true })
      .click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveURL(new RegExp(suffix || "/$"));
  }
  await page.goto("/pt-br/contact");
  await page.getByRole("button", { name: "Mostrar endereço de email" }).click();
  await expect(page.locator('a[href^="mailto:"]')).toBeFocused();
});

test("clipboard failure keeps a selectable address and mailto fallback", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Denied")) },
      configurable: true,
    }),
  );
  await page.goto("/contact");
  await page.getByRole("button", { name: "Reveal email address" }).click();
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copy unavailable");
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
});

test("skip link, anchors, text enlargement, and reflow", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  for (const route of [
    "/",
    "/research",
    "/cv",
    "/pt-br/research",
    "/blog/clinical-prediction-begins-with-the-clock",
  ]) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(route);
    await page.evaluate(() => {
      const sizes = Array.from(
        document.body.querySelectorAll<HTMLElement>("*"),
      ).map((el) => [el, parseFloat(getComputedStyle(el).fontSize)] as const);
      for (const [el, size] of sizes) el.style.fontSize = size * 2 + "px";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route + " 200% text",
    ).toBeTruthy();
    await page.setViewportSize({ width: 320, height: 900 });
    await page.reload();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route + " 400% equivalent reflow",
    ).toBeTruthy();
  }
  await page.goto("/research#ugib-intubation");
  await expect(page.locator("#ugib-intubation")).toBeInViewport();
  expect(
    (await page.locator("#ugib-intubation").boundingBox())!.y,
  ).toBeGreaterThanOrEqual(68);
});

test("preferred host redirects and missing-page status", async ({
  request,
}) => {
  const response = await request.get("/research?q=opioid", {
    headers: { host: "felipef.com" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe(
    "https://www.felipef.com/research?q=opioid",
  );
  const missing = await request.get("/not-a-real-page");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain(
    "This page is not part of the current profile.",
  );
  expect((await request.get("/blog/not-a-real-article")).status()).toBe(404);
});

test("narrow portrait and language navigation do not obscure content or retain unrelated queries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  const title = await page.locator(".hero-copy h1").boundingBox();
  const portrait = await page.locator(".hero-portrait").boundingBox();
  expect(title!.x + title!.width).toBeLessThan(portrait!.x);
  expect(
    await page
      .locator(".hero-copy h1")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBeTruthy();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/research?q=opioid");
  await page.getByRole("link", { name: "About", exact: true }).first().click();
  await page
    .getByRole("link", { name: "Ler em português", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt-br\/about$/);
});
