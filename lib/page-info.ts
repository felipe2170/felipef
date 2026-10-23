import { pageMetadata } from "./seo";
import { localizedPath, type Locale } from "./research";
import { siteProfile } from "./site";
const pages = {
  home: {
    path: "/",
    en: "M.D. candidate · Research & software",
    pt: "Medicina · Pesquisa e software",
  },
  about: { path: "/about", en: "About", pt: "Sobre" },
  research: { path: "/research", en: "Research", pt: "Pesquisa" },
  projects: { path: "/projects", en: "Software", pt: "Software" },
  cv: { path: "/cv", en: "Curriculum vitae", pt: "Currículo" },
  contact: { path: "/contact", en: "Contact", pt: "Contato" },
};
export type PageKey = keyof typeof pages;
export function essentialMetadata(page: PageKey, locale: Locale = "en") {
  const info = pages[page];
  return pageMetadata({
    title: locale === "en" ? info.en : info.pt,
    description:
      locale === "en"
        ? siteProfile.description
        : "Felipe C. Figueiredo, estudante de medicina na UFMG, com interesses em anestesiologia, síntese de evidências e tecnologia em saúde.",
    path: localizedPath(info.path, locale).replace(/\/$/, ""),
    locale,
  });
}
