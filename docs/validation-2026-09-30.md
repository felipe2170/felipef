# Validation — September 30, 2026

## Executed checks

- **TypeScript:** `pnpm typecheck` passed.
- **Production build:** `pnpm build` passed. The homepage, profile pages, CV, research, project page, blog index, all three articles, sitemap, and social image were generated successfully. Legacy note routes preserve permanent redirects.
- **Browser suite:** `pnpm test:e2e` — **11 tests passed** against the production build (Chromium, Playwright 1.63.0).
- **Accessibility:** axe-core 4.13.0 reported **zero violations** in 44 page/theme/viewport scans: 11 public pages × light/dark × 390/1440 px. A light-theme accent contrast issue found during the first pass was corrected before the passing run.
- **Responsive layout:** no horizontal document overflow in those 44 scans or the additional homepage, research, CV, contact, and blog checks at 320, 768, and 1024 px.
- **Final interaction refinements:** selecting the current mobile navigation item closes the menu and restores focus; revealing email transfers focus to the new mail link. Both targeted browser tests passed after these changes.
- **Behavior:** research-type filters, combined search, empty/reset state, pending-status labels, mobile focus boundary, Escape/return focus, route changes, resize cleanup, persisted theme, blocked-storage fallback, reduced motion, email reveal/copy feedback.
- **Content and routing:** current GPA, dated Step 1 pass, Afya start date, measured English result, removal of superseded public claims, CV file signatures, internal links, canonical URLs, new blog sitemap entries, and 308 legacy redirects.
- **CV assets:** bundled DOCX matches the upload byte-for-byte. Every source paragraph is present in the regenerated PDF after whitespace normalization. All three PDF pages were visually inspected; individual paragraphs do not split between pages.
- **Final interior layout:** five targeted responsive/accessibility tests passed after aligning titles, context, and CV actions. These repeated all 44 axe scans plus narrow/tablet overflow checks.
- **Diff hygiene:** `git diff --check` passed.

## Visual inspection

Inspected the homepage on desktop and mobile, both color themes, mobile navigation, research and CV layouts, and all three PDF pages. The original pre-change desktop/mobile screenshots were retained outside the repository for comparison.

Custom illustrations are lightweight SVG components. The small portrait uses Next.js image optimization. Navigation, disclosures, and search have visible focus styling; status distinctions are written in text rather than encoded only in color.

## Scope of verification

Automated accessibility results are bounded checks, not a certification of universal accessibility. This session used Chromium; Safari, Firefox, physical devices, screen-reader testing, and usability sessions with real visitors were not performed. No independent journal, conference, credential, or registry verification was claimed. No live deployment or GitHub profile change was made.
