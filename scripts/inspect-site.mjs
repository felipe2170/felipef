import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const out = process.env.SCREENSHOT_DIR || "/tmp/felipe-preview";
const origin = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
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
const report = [];
for (const mode of ["light", "dark"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: mode,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("requestfailed", (r) => {
    if (r.failure()?.errorText !== "net::ERR_ABORTED")
      errors.push(r.url() + ": " + r.failure()?.errorText);
  });
  for (const route of mode === "light"
    ? routes
    : ["/", "/research", "/projects", "/contact", "/pt-br/cv"]) {
    const response = await page.goto(origin + route);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("h1").waitFor();
    const name =
      (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) +
      "-" +
      mode;
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    report.push({
      route,
      mode,
      width: 1440,
      status: response.status(),
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      lang: await page.locator("html").getAttribute("lang"),
      errors: [...errors],
    });
  }
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/research",
      "/projects",
      "/pt-br/contact",
      "/blog/clinical-prediction-begins-with-the-clock",
    ]) {
      await page.goto(origin + route);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${out}/${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${mode}-${width}.png`,
        fullPage: true,
      });
      report.push({
        route,
        mode,
        width,
        overflow: await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        errors: [...errors],
      });
    }
  }
  await context.close();
}
await browser.close();
await fs.writeFile(out + "/inspection.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      screenshots: report.length,
      issues: report.filter(
        (r) => r.overflow || r.errors.length || (r.status && r.status !== 200),
      ),
    },
    null,
    2,
  ),
);
