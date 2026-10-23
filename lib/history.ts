import {
  experiences,
  researchExperience,
  teachingService,
  type Experience,
  skillGroups,
} from "./site";
import type { Locale } from "./research";
const translations = [
  {
    title: "Formação médica",
    institution: "Universidade Federal de Minas Gerais",
    place: "Belo Horizonte, Brasil",
    period: "Conclusão prevista: dez. 2026",
    description:
      "Último ano de medicina, com interesse principal em anestesiologia, medicina perioperatória e cuidado ao paciente crítico.",
    details: ["GPA: 3,73/4,0.", "USMLE Step 1: aprovado em setembro de 2026."],
  },
  {
    title: "Estágio clínico internacional",
    institution: "CHU Lille — Hospital Universitário de Lille",
    place: "Lille, França",
    period: "2026",
    description:
      "Estágio clínico de 10 semanas concluído em anestesia para queimados e anestesia cardiotorácica em um centro acadêmico de referência.",
  },
  {
    title: "Editor assistente e consultor em saúde",
    institution: "Afya",
    place: "Brasil",
    period: "Jan. 2026 — atual",
    description:
      "Produção de conteúdo educacional baseado em evidências, controle de qualidade de um modelo de linguagem e contribuição ao desenvolvimento técnico de uma ferramenta de IA clínica.",
  },
  {
    title: "Assistente de pesquisa",
    institution: "Instituto Alfa de Gastroenterologia, UFMG",
    place: "Belo Horizonte, Brasil",
    period: "2024",
    description:
      "Coorte prospectiva de microbioma em receptores de transplante hepático.",
    details: [
      "Coordenação de recrutamento e consentimento informado.",
      "Processamento, catalogação e armazenamento de amostras biológicas segundo protocolos padronizados de biobanco.",
    ],
  },
  {
    title: "Assistente de pesquisa",
    institution: "Laboratório de Hipertensão, UFMG",
    place: "Belo Horizonte, Brasil",
    period: "2022",
    description:
      "Pesquisa cardiovascular pré-clínica sobre regulação da pressão arterial em camundongos com deleção de MRGPRD.",
    details: [
      "Pletismografia de cauda e análise de dados de fisiologia cardiovascular.",
      "Ensaios espectrofotométricos, preparo de amostras e experimentos de reatividade vascular, incluindo respostas à alamandina e rigidez arterial.",
    ],
  },
  {
    title: "Monitor de Anatomia Sistêmica",
    institution: "UFMG",
    place: "Belo Horizonte, Brasil",
    period: "2022",
    description:
      "Planejamento de revisões semanais e supervisão de dissecação cadavérica para uma turma de 16 estudantes de medicina.",
  },
  {
    title: "Estudante de medicina voluntário",
    institution: "Caminhos do Trabalho",
    place: "Brasil",
    period: "2025 — 2026",
    description:
      "Participação em avaliações supervisionadas de saúde ocupacional e educação em saúde preventiva para trabalhadores em situação de vulnerabilidade.",
  },
  {
    title: "Estudante de medicina voluntário",
    institution: "Cruz Vermelha Brasileira",
    place: "Brasil",
    period: "2025 — 2026",
    description:
      "Educação comunitária em saúde, ações humanitárias e apoio a iniciativas de resposta a desastres.",
  },
];
export function history(locale: Locale): Experience[] {
  const all = [...experiences, ...researchExperience, ...teachingService];
  return locale === "en"
    ? all
    : all.map((e, i) => ({
        ...e,
        ...translations[i],
        details: translations[i].details,
      }));
}

const skillsPt: Record<string, string> = {
  Research: "Pesquisa",
  Computational: "Computação",
  Languages: "Idiomas",
  "Protocol and question development":
    "Desenvolvimento de perguntas e protocolos",
  "Systematic reviews": "Revisões sistemáticas",
  "Pairwise and network meta-analysis": "Metanálise pareada e em rede",
  "Screening and data extraction": "Seleção e extração de dados",
  "Risk-of-bias assessment": "Avaliação de risco de viés",
  "Statistical analysis in R": "Análise estatística em R",
  "Manuscript drafting and project coordination":
    "Redação de manuscritos e coordenação de projetos",
  "Patient recruitment and informed consent":
    "Recrutamento e consentimento informado",
  Biobanking: "Biobanco",
  "Git — proficient": "Git — proficiente",
  "Python, SQL, pandas, and scikit-learn — working knowledge":
    "Python, SQL, pandas e scikit-learn — conhecimento de trabalho",
  "Portuguese — native": "Português — nativo",
  "English — C2": "Inglês — C2",
  "French — B1": "Francês — B1",
  "Spanish — B1": "Espanhol — B1",
};
export function skills(locale: Locale) {
  return skillGroups.map((g) => ({
    label: locale === "en" ? g.label : skillsPt[g.label],
    items: g.items.map((i) => (locale === "en" ? i : (skillsPt[i] ?? i))),
  }));
}
