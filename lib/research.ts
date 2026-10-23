import {
  acceptedAbstracts,
  additionalStudies,
  presentations,
  primaryStudies,
  researchOutputs,
} from "./site";
import { words, stageText, type Locale } from "./locale";
export { localizedPath, stageText, type Locale } from "./locale";
export const cases = [
  {
    id: "htk-cardioplegia",
    topic: words("Perioperative care", "Medicina perioperatória"),
    title: words(
      "Myocardial protection in valve surgery",
      "Proteção miocárdica em cirurgia valvar",
    ),
    question: words(
      "How does HTK/Custodiol compare with blood cardioplegia for myocardial protection in adults undergoing valve surgery?",
      "Como a cardioplegia HTK/Custodiol se compara à cardioplegia sanguínea na proteção miocárdica de adultos submetidos à cirurgia valvar?",
    ),
    design: words(
      "Systematic review and meta-analysis.",
      "Revisão sistemática e metanálise.",
    ),
    contribution: words(
      "First-listed author of the manuscript and AHA conference output.",
      "Primeiro autor listado no manuscrito e no trabalho de congresso da AHA.",
    ),
    detail: words(
      "The comparison is specific to adult valve surgery. The manuscript and AHA abstract are separate outputs of this registered review.",
      "A comparação é específica para cirurgia valvar em adultos. O manuscrito e o resumo da AHA são produtos distintos desta revisão registrada.",
    ),
    date: "2026-10-21",
    registration: "CRD420261416550",
    url: "https://www.crd.york.ac.uk/PROSPERO/view/CRD420261416550",
  },
  {
    id: "ugib-intubation",
    topic: words("Airway & critical care", "Vias aéreas e terapia intensiva"),
    title: words(
      "Intubation before endoscopy in acute bleeding",
      "Intubação antes da endoscopia na hemorragia aguda",
    ),
    question: words(
      "What is the evidence for prophylactic pre-endoscopic intubation in acute upper gastrointestinal bleeding?",
      "Quais são as evidências sobre intubação profilática antes da endoscopia na hemorragia digestiva alta aguda?",
    ),
    design: words(
      "Systematic review and meta-analysis.",
      "Revisão sistemática e metanálise.",
    ),
    contribution: words(
      "First-listed author of the manuscript.",
      "Primeiro autor listado no manuscrito.",
    ),
    detail: words(
      "The question concerns prophylactic intubation before endoscopy. The manuscript is under peer review and does not establish a treatment recommendation.",
      "A pergunta aborda a intubação profilática antes da endoscopia. O manuscrito está em avaliação por pares e não constitui uma recomendação terapêutica.",
    ),
    date: "2026-10-21",
    registration: "CRD420261492790",
    url: "https://www.crd.york.ac.uk/PROSPERO/view/CRD420261492790",
  },
  {
    id: "opioid-stewardship",
    topic: words("Clinical data & methods", "Dados clínicos e métodos"),
    title: words(
      "Opioid stewardship after orthopedic surgery",
      "Uso de opioides após cirurgia ortopédica",
    ),
    question: words(
      "Can inpatient analgesia and discharge prescribing data help identify opportunities for opioid stewardship after orthopedic surgery?",
      "Dados de analgesia hospitalar e prescrição na alta podem ajudar a identificar oportunidades para o uso criterioso de opioides após cirurgia ortopédica?",
    ),
    design: words(
      "Retrospective MIMIC-IV / MIMIC-IV-Note study.",
      "Estudo retrospectivo com MIMIC-IV / MIMIC-IV-Note.",
    ),
    contribution: words(
      "An ongoing study in my research portfolio; cohort definition and extraction are in progress.",
      "Estudo em andamento no meu portfólio de pesquisa, em fase de definição e extração da coorte.",
    ),
    detail: words(
      "The next milestone is cohort definition and extraction. Model validation is planned; no completed validation or clinical benefit is reported.",
      "O próximo marco é a definição e extração da coorte. A validação do modelo está planejada; não há validação concluída ou benefício clínico demonstrado.",
    ),
    date: "2026-09-26",
    registration: "OSF · 10.17605/OSF.IO/4KWRF",
    url: "https://doi.org/10.17605/OSF.IO/4KWRF",
  },
];
export type ResearchRecord = {
  id: string;
  studyId: string;
  kind: "studies" | "manuscripts" | "accepted" | "presented";
  title: string;
  authors?: string;
  year?: number;
  stage: string;
  detail: string;
  url?: string;
  registration?: string;
  tags: string;
};
export function getResearchRecords(locale: Locale): ResearchRecord[] {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return [
    ...primaryStudies
      .filter((s) => s.status === "published")
      .map((s) => ({
        id: s.id,
        studyId: s.id,
        kind: "studies" as const,
        title:
          locale === "pt-BR"
            ? s.id === "opioid-stewardship"
              ? "Uso de opioides após cirurgia ortopédica"
              : "Alertas de hipotensão após traumatismo cranioencefálico"
            : s.shortTitle,
        stage: stageText("In progress", locale),
        detail: t(
          s.description,
          s.id === "opioid-stewardship"
            ? "Estudo retrospectivo com MIMIC-IV/MIMIC-IV-Note. Definição e extração da coorte em andamento; validação planejada."
            : "Estudo com MIMIC-IV sobre atraso de registro, frequência das observações e transportabilidade. Simulações de Monte Carlo em andamento.",
        ),
        registration: s.registration,
        url: s.url,
        tags:
          s.title +
          (s.id === "opioid-stewardship"
            ? " opioid opioides"
            : " hypotension hipotensão") +
          " MIMIC-IV",
      })),
    ...additionalStudies.map((s) => ({
      id: s.id,
      studyId: s.id,
      kind: "studies" as const,
      title: s.title,
      stage: stageText("Research project", locale),
      detail: t(
        "Evidence synthesis on blood-pressure targets after acute brain injury.",
        "Síntese de evidências sobre metas de pressão arterial após lesão cerebral aguda.",
      ),
      tags: "neurocritical care neurocrítico autoregulação",
    })),
    ...researchOutputs
      .filter((o) => o.status === "published")
      .map((o) => ({
        id: o.id,
        studyId: o.studyId,
        kind: "manuscripts" as const,
        title: o.title,
        authors: o.authors,
        year: o.year,
        stage: stageText(o.stage, locale),
        detail: [
          locale === "en"
            ? o.methods
            : o.methods === "Research software"
              ? "Software de pesquisa"
              : o.methods?.includes("network")
                ? "Revisão sistemática e metanálise em rede"
                : "Revisão sistemática e metanálise",
          o.journal,
        ]
          .filter(Boolean)
          .join(" · "),
        registration: o.registration,
        url: o.registration
          ? `https://www.crd.york.ac.uk/PROSPERO/view/${o.registration.replace("PROSPERO ", "")}`
          : undefined,
        tags: cases.find((c) => c.id === o.studyId)?.title["pt-BR"] ?? "",
      })),
    ...[...acceptedAbstracts, ...presentations]
      .filter((o) => o.status === "published")
      .map((o) => ({
        id: o.id,
        studyId: o.studyId,
        kind: (o.format.startsWith("Accepted") ? "accepted" : "presented") as
          | "accepted"
          | "presented",
        title: o.title,
        authors: o.authors,
        year: o.year,
        stage: stageText(o.format, locale),
        detail: o.venue,
        tags: "conference congresso " + o.studyId,
      })),
  ];
}
// Explicit relationships, independent from output stages. Similar titles alone never imply one study.
export const studies = Array.from(
  new Set(getResearchRecords("en").map((r) => r.studyId)),
).map((id) => ({
  id,
  outputIds: getResearchRecords("en")
    .filter((r) => r.studyId === id && r.kind !== "studies")
    .map((r) => r.id),
}));
