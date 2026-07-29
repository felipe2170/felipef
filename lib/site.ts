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
  expectedGraduation: string;
  affiliation: {
    name: string;
    shortName: string;
    type: "CollegeOrUniversity";
  };
  currentRole: {
    title: string;
    organization: string;
  };
  links: {
    linkedin: string;
    github: string;
  };
  updatedAt: string;
}

export interface Experience {
  title: string;
  institution: string;
  place: string;
  period: string;
  description: string;
  details?: string[];
  status: ContentStatus;
}

export interface ResearchInterest {
  name: string;
  description: string;
  status: ContentStatus;
}

export interface ResearchOutput {
  title: string;
  authors: string;
  year: number;
  stage: "Under review";
  methods?: string;
  registration?: string;
  status: ContentStatus;
}

export interface Presentation {
  title: string;
  authors: string;
  year: number;
  venue: string;
  format: "Conference abstract" | "Review presentation" | "Case presentation";
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
  highlight?: string;
  registration?: string;
  url?: string;
  status: ContentStatus;
}

export interface BlogPost {
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
  headline:
    "Brazilian medical student focused on anesthesiology, evidence synthesis, and health technology.",
  description:
    "Felipe de Carvalho Figueiredo is a final-year medical student at UFMG, an Assistant Editor and Healthcare Consultant at Afya, and a researcher working across anesthesiology, evidence synthesis, and health technology.",
  academicStatus: "Final-year medical student",
  expectedGraduation: "December 2026",
  affiliation: {
    name: "Universidade Federal de Minas Gerais",
    shortName: "UFMG",
    type: "CollegeOrUniversity",
  },
  currentRole: {
    title: "Assistant Editor and Healthcare Consultant",
    organization: "Afya",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/felipedcfigueiredo",
    github: "https://github.com/felipe2170",
  },
  updatedAt: "2026-07-29",
};

export const experiences: Experience[] = [
  {
    title: "Medical training",
    institution: "Universidade Federal de Minas Gerais",
    place: "Belo Horizonte, Brazil",
    period: "Expected Dec 2026",
    description:
      "Final-year clinical training with a principal interest in anesthesiology, perioperative medicine, and care of critically ill patients.",
    status: "published",
  },
  {
    title: "International clinical clerkship",
    institution: "CHU Lille — Lille University Hospital",
    place: "Lille, France",
    period: "2026",
    description:
      "Completed a 10-week clerkship in Burn Anesthesia and Cardiothoracic Anesthesia at a tertiary academic referral center.",
    status: "published",
  },
  {
    title: siteProfile.currentRole.title,
    institution: siteProfile.currentRole.organization,
    place: "Brazil",
    period: "2025 — present",
    description:
      "Develops evidence-based educational content, reviews AI-generated clinical materials, and contributes to a clinical-AI evidence tool for physicians and medical students.",
    status: "published",
  },
];

export const researchExperience: Experience[] = [
  {
    title: "Research Assistant",
    institution: "Instituto Alfa de Gastroenterologia, UFMG",
    place: "Belo Horizonte, Brazil",
    period: "2024",
    description:
      "Supported a prospective microbiome cohort involving liver transplant recipients.",
    details: [
      "Coordinated patient recruitment and informed consent.",
      "Processed, catalogued, and archived biospecimens under standardized biobanking protocols.",
    ],
    status: "published",
  },
  {
    title: "Research Assistant",
    institution: "Hypertension Laboratory, UFMG",
    place: "Belo Horizonte, Brazil",
    period: "2022",
    description:
      "Contributed to preclinical cardiovascular research on blood-pressure regulation using MRGPRD-knockout mouse models.",
    details: [
      "Performed tail-cuff plethysmography and analyzed cardiovascular physiology data.",
      "Conducted spectrophotometric assays and vascular-reactivity experiments involving almandine-mediated responses and arterial stiffness.",
    ],
    status: "published",
  },
];

export const researchInterests: ResearchInterest[] = [
  {
    name: "Pain & perioperative care",
    description:
      "Analgesia, recovery, myocardial protection, and clinically meaningful perioperative outcomes.",
    status: "published",
  },
  {
    name: "Airway management",
    description:
      "Evidence that can clarify choices in airway assessment and management.",
    status: "published",
  },
  {
    name: "Critical & neurocritical care",
    description:
      "Hemodynamic targets, sedation, and outcomes in the care of critically ill patients.",
    status: "published",
  },
  {
    name: "Burn care",
    description:
      "Anesthesia and critical-care questions concerning patients with complex burn injuries.",
    status: "published",
  },
];

export const researchOutputs: ResearchOutput[] = [
  {
    title:
      "Septal Myectomy Combined with Mitral Valve Repair vs. Replacement in Hypertrophic Cardiomyopathy: A Systematic Review and Meta-analysis",
    authors:
      "Menezes CRB, Saffi M, Vendrusculo C, Figueiredo FC, Viana DC, Machado A, Sampaio GM",
    year: 2026,
    stage: "Under review",
    methods: "Systematic review and meta-analysis",
    registration: "PROSPERO CRD420261416319",
    status: "published",
  },
  {
    title:
      "Histidine-Tryptophan-Ketoglutarate (HTK/Custodiol) Cardioplegia Versus Blood Cardioplegia for Myocardial Protection in Adult Valve Surgery: A Systematic Review and Meta-Analysis",
    authors:
      "Figueiredo FC, Machado A, Marques MEG, Saffi M, Pinheiro LF, Menezes CRB, Sousa L, Sampaio GM",
    year: 2026,
    stage: "Under review",
    methods: "Systematic review and meta-analysis",
    registration: "PROSPERO CRD420261416550",
    status: "published",
  },
  {
    title: "Cerebral Autoregulation-Guided BP Targets in Neurocritical Care",
    authors: "Figueiredo F, Guio AMS, Lele AV",
    year: 2026,
    stage: "Under review",
    methods: "Clinical evidence review",
    status: "published",
  },
  {
    title:
      "Durability, Discontinuation, Rebound Progression, and Rechallenge After MAPK-Pathway Inhibition in Pediatric BRAF V600E-Mutant Low-Grade Glioma",
    authors: "Figueiredo F, et al",
    year: 2026,
    stage: "Under review",
    methods: "Systematic review and meta-analysis",
    status: "published",
  },
];

export const presentations: Presentation[] = [
  {
    title:
      "Remimazolam as a Novel Sedative Agent in Adult Intensive Care Units: A Systematic Review and Network Meta-Analysis",
    authors: "Figueiredo FC, et al",
    year: 2026,
    venue: "71st Brazilian Congress of Anesthesiology",
    format: "Conference abstract",
    status: "published",
  },
  {
    title: "Snakebite Emergencies: A Review",
    authors: "Figueiredo FC, et al",
    year: 2024,
    venue: "III National Congress of Trauma and Emergency Medicine",
    format: "Review presentation",
    status: "published",
  },
  {
    title: "Myocardial Bridge in Athletes: A Case Study",
    authors: "Figueiredo FC, et al",
    year: 2023,
    venue:
      "35th Brazilian Congress and 29th Pan-American Congress of Sports Medicine",
    format: "Case presentation",
    status: "published",
  },
];

export const projects: ProjectCaseStudy[] = [
  {
    slug: "clinia",
    title: "Clinia",
    stage: "active",
    summary:
      "An open-source workspace for organizing clinical notes and case logs during medical internship rotations.",
    problem:
      "Medical students often track cases, notes, and rotation-specific learning across fragmented tools, creating avoidable friction during already demanding clinical placements.",
    direction:
      "Clinia centralizes those workflows in a restrained web application designed around the practical routines of Brazilian medical internship rotations.",
    role:
      "Felipe's work spans the clinical workflow, product structure, and software implementation.",
    limitation:
      "Educational workflow software. It is not a clinical record system and is not intended to guide patient-care decisions.",
    highlight:
      "Approximately 200 users across multiple Brazilian medical schools.",
    registration: "Brazilian software registration BR512025003190-4",
    url: "https://github.com/felipe2170/Clinia",
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

export const teachingService: Experience[] = [
  {
    title: "Student Tutor, Systemic Anatomy",
    institution: "UFMG",
    place: "Belo Horizonte, Brazil",
    period: "2022",
    description:
      "Designed weekly review sessions and supervised cadaveric dissection for a cohort of 16 medical students.",
    status: "published",
  },
  {
    title: "Volunteer Medical Student",
    institution: "Caminhos do Trabalho",
    place: "Brazil",
    period: "2025 — 2026",
    description:
      "Supported occupational-health assessments and preventive-health education for underserved workers.",
    status: "published",
  },
  {
    title: "Volunteer Medical Student",
    institution: "Brazilian Red Cross",
    place: "Brazil",
    period: "2025 — 2026",
    description:
      "Supported community health education, humanitarian outreach, and disaster-relief initiatives.",
    status: "published",
  },
];

export const skillGroups = [
  {
    label: "Research",
    items: [
      "Systematic reviews",
      "Pairwise and network meta-analysis",
      "Screening and data extraction",
      "Risk-of-bias assessment",
      "GRADE",
      "Biostatistics",
      "REDCap",
      "Patient recruitment",
      "Biobanking",
    ],
  },
  {
    label: "Languages",
    items: [
      "Portuguese — native",
      "English — C2",
      "French — B1",
      "Spanish — B1",
    ],
  },
] as const;

export const cvDownloads = {
  pdf: "/cv/Felipe_de_Carvalho_Figueiredo_CV.pdf",
  docx: "/cv/Felipe_de_Carvalho_Figueiredo_CV.docx",
} as const;

export const publicRoutes = [
  "",
  "/about",
  "/research",
  "/projects",
  "/cv",
  "/blog",
  "/contact",
  "/pt-br",
] as const;
