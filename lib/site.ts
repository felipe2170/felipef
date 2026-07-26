export type ContentStatus = "draft" | "published";
export type ProjectStage = "concept" | "prototype" | "active";

export interface SiteProfile {
  name: string;
  shortName: string;
  url: string;
  locale: "en";
  alternateLocale: "pt-BR";
  location: string;
  headline: string;
  description: string;
  academicStatus: string;
  affiliation: {
    name: string;
    shortName: string;
    type: "CollegeOrUniversity";
  };
  links: {
    linkedin: string;
  };
  updatedAt: string;
}

export interface Experience {
  title: string;
  institution: string;
  place: string;
  period: string;
  description: string;
  status: ContentStatus;
}

export interface ResearchInterest {
  name: string;
  description: string;
  status: ContentStatus;
}

export interface Publication {
  title: string;
  authors: string[];
  year: number;
  type: "journal-article" | "conference-abstract" | "preprint";
  url: string;
  status: ContentStatus;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  stage: ProjectStage;
  summary: string;
  problem: string;
  direction: string;
  role: string;
  limitation: string;
  status: ContentStatus;
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string;
  language: "en" | "pt-BR";
  status: ContentStatus;
  image?: string;
}

export const siteProfile: SiteProfile = {
  name: "Felipe de Carvalho Figueiredo",
  shortName: "Felipe C. Figueiredo",
  url: "https://felipef.com",
  locale: "en",
  alternateLocale: "pt-BR",
  location: "Belo Horizonte, Brazil",
  headline: "Medical student working across clinical medicine, evidence synthesis, and health technology.",
  description:
    "Felipe de Carvalho Figueiredo is a final-year medical student at UFMG with interests in anesthesiology, clinical research, and thoughtfully designed health technology.",
  academicStatus: "Final-year medical student",
  affiliation: {
    name: "Universidade Federal de Minas Gerais",
    shortName: "UFMG",
    type: "CollegeOrUniversity",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/felipedcfigueiredo",
  },
  updatedAt: "2026-07-25",
};

export const experiences: Experience[] = [
  {
    title: "Medical training",
    institution: "Universidade Federal de Minas Gerais",
    place: "Belo Horizonte, Brazil",
    period: "Current",
    description:
      "Final-year clinical training, with particular interest in anesthesiology, perioperative medicine, and care of critically ill patients.",
    status: "published",
  },
  {
    title: "International clinical rotation",
    institution: "Clinical rotation in France",
    place: "France",
    period: "Completed",
    description:
      "An international clinical experience that broadened Felipe’s view of medical education and cross-border collaboration.",
    status: "published",
  },
];

export const researchInterests: ResearchInterest[] = [
  {
    name: "Pain & perioperative care",
    description: "Questions around analgesia, recovery, and clinically meaningful perioperative outcomes.",
    status: "published",
  },
  {
    name: "Airway management",
    description: "Evidence that can clarify choices in airway assessment and management.",
    status: "published",
  },
  {
    name: "Critical care",
    description: "Decision-making and outcomes in the care of critically ill patients.",
    status: "published",
  },
  {
    name: "Burn care",
    description: "Clinical questions concerning patients with burn injuries and complex critical-care needs.",
    status: "published",
  },
];

export const projects: ProjectCaseStudy[] = [
  {
    slug: "internato-suite",
    title: "Internato Suite",
    stage: "concept",
    summary:
      "A structured workspace concept for the fragmented routines of medical clerkship.",
    problem:
      "Clinical learning is distributed across notes, cases, schedules, and scattered reference material. The result is avoidable friction at a stage when attention is already scarce.",
    direction:
      "The concept brings case tracking, structured reflection, and learning prompts into one restrained workflow designed around the day-to-day reality of internato.",
    role:
      "Felipe defines the clinical context, information architecture, and product direction.",
    limitation:
      "Concept-stage educational project. It is not a clinical record system and is not intended for patient-care decisions.",
    status: "published",
  },
  {
    slug: "bayesian-triage-assistant",
    title: "Bayesian Triage Assistant",
    stage: "concept",
    summary:
      "An educational exploration of probability, uncertainty, and triage reasoning.",
    problem:
      "Clinical urgency is often discussed as a category rather than as an evolving estimate shaped by new information, base rates, and uncertainty.",
    direction:
      "The project explores ways to make probabilistic reasoning visible and inspectable, with emphasis on teaching how evidence changes an assessment.",
    role:
      "Felipe leads the clinical framing and product concept.",
    limitation:
      "Unvalidated educational concept only. It does not provide medical advice, diagnose patients, or replace professional clinical judgment.",
    status: "published",
  },
];

export const publications: Publication[] = [];

export const publicRoutes = [
  "",
  "/research",
  "/projects",
  "/notes",
  "/contact",
  "/pt-br",
] as const;
