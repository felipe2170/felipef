export type Locale = "en" | "pt-BR";
export type LocalText = { en: string; "pt-BR": string };
export const words = (en: string, pt: string): LocalText => ({
  en,
  "pt-BR": pt,
});
export const localizedPath = (path: string, locale: Locale) =>
  locale === "pt-BR" ? `/pt-br${path === "/" ? "" : path}` : path;
export const stageText = (stage: string, locale: Locale) =>
  locale === "en"
    ? stage
    : ({
        "Under review": "Em avaliação",
        "Accepted for presentation": "Aceito para apresentação",
        "Accepted digital poster": "Pôster digital aceito",
        "Review presentation": "Apresentação de revisão",
        "Case presentation": "Apresentação de caso",
        "In progress": "Em andamento",
        "Research project": "Projeto de pesquisa",
      }[stage] ?? stage);
