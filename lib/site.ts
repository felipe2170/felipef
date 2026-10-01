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
  stage: "Under review" | "Prepared for submission";
  journal?: string;
  methods?: string;
  registration?: string;
  status: ContentStatus;
}

export interface Presentation {
  title: string;
  authors: string;
  year: number;
  venue: string;
  format:
    | "Accepted digital poster"
    | "Review presentation"
    | "Case presentation"
    | "Submitted abstract · decision pending";
  status: ContentStatus;
}

export interface PrimaryStudy {
  title: string;
  shortTitle: string;
  description: string;
  stage: string;
  registration?: string;
  url?: string;
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
    "MD candidate at UFMG, working across anesthesiology, evidence synthesis, and health technology.",
  description:
    "Felipe de Carvalho Figueiredo is a final-year medical student at UFMG, an Assistant Editor and Healthcare Consultant at Afya, and a researcher working across anesthesiology, evidence synthesis, and health technology.",
  academicStatus: "MD candidate · Final-year medical student",
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
  updatedAt: "2026-09-30",
};

export const experiences: Experience[] = [
  {
    title: "Medical training",
    institution: "Universidade Federal de Minas Gerais",
    place: "Belo Horizonte, Brazil",
    period: "Expected Dec 2026",
    description:
      "Final-year clinical training with a principal interest in anesthesiology, perioperative medicine, and care of critically ill patients.",
    details: [
      "WES course-by-course evaluated GPA: 3.73/4.00, based on 245 completed credit hours through the 10th semester.",
      "USMLE Step 1: Pass (September 2026).",
      "Duolingo English Test: 145 (July 17, 2026).",
    ],
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
    period: "Jan 2026 — present",
    description:
      "Authors evidence-based clinical educational content, reviews large-language-model outputs, and contributes clinical-domain expertise to digital tools for medical education and bedside information retrieval.",
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
      "Performed spectrophotometric assays, biospecimen preparation, and vascular-reactivity experiments.",
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

// Source: user-supplied Felipe_Figueiredo_CV.docx, modified September 26, 2026.
// Visibility (status) and scholarly progress (stage/format) are separate concepts.
export const researchContribution =
  "Selected first-author reviews involved question and protocol development, literature searching and screening, project coordination, manuscript drafting, and submission. Statistical analyses were performed in R where applicable; all review stages involved at least two investigators.";

export const primaryStudies: PrimaryStudy[] = [
  {
    shortTitle: "Opioid stewardship after orthopedic surgery",
    title:
      "From Inpatient Analgesia to Discharge Prescribing: Clinically Validated Machine Learning to Identify Opioid Stewardship Opportunities After Orthopedic Surgery",
    description:
      "A retrospective MIMIC-IV/MIMIC-IV-Note EHR model-validation study. Validation is part of the planned study; no completed validation or clinical benefit is claimed.",
    stage: "Cohort definition and extraction in progress",
    registration: "OSF · 10.17605/OSF.IO/4KWRF",
    url: "https://doi.org/10.17605/OSF.IO/4KWRF",
    status: "published",
  },
  {
    shortTitle: "Hypotension warnings after traumatic brain injury",
    title:
      "Clinical Usefulness and Transportability of Routine-Data Hypotension Warnings After Traumatic Brain Injury",
    description:
      "A MIMIC-IV neurocritical-care machine-learning study evaluating documentation delay, observation frequency, and transportability.",
    stage: "Monte Carlo simulations in progress",
    status: "published",
  },
];

export const researchOutputs: ResearchOutput[] = [
  {
    title:
      "Remimazolam as a Novel Sedative Agent in Adult Intensive Care Units: A Systematic Review and Network Meta-Analysis",
    authors: "Figueiredo FC, et al",
    year: 2026,
    stage: "Under review",
    journal: "Journal of Critical Care",
    methods: "Systematic review and network meta-analysis",
    registration: "PROSPERO CRD420261437255",
    status: "published",
  },
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
    title:
      "afya-medqol: A Python Package for Computing the Afya MedQoL Physician Quality-of-Life Index",
    authors: "Souza M, Figueiredo FC",
    year: 2026,
    stage: "Under review",
    methods: "Research software",
    status: "published",
  },
  {
    title:
      "Prophylactic Pre-Endoscopic Intubation in Acute Upper Gastrointestinal Bleeding: A Systematic Review and Meta-Analysis",
    authors: "Figueiredo FC, et al",
    year: 2026,
    stage: "Prepared for submission",
    journal: "Journal of Critical Care",
    methods: "Systematic review and meta-analysis",
    registration: "PROSPERO CRD420261492790",
    status: "published",
  },
];

export const presentations: Presentation[] = [
  {
    title: researchOutputs[2].title,
    authors: researchOutputs[2].authors,
    year: 2026,
    venue: "American Heart Association Scientific Sessions",
    format: "Accepted digital poster",
    status: "published",
  },
  {
    title:
      "Durability, discontinuation, rebound progression, and rechallenge after MAPK-pathway inhibition in pediatric BRAF V600E-mutant low-grade glioma: a systematic review and meta-analysis",
    authors: "Figueiredo FC, et al",
    year: 2026,
    venue: "Congress of Neurological Surgeons Annual Meeting",
    format: "Accepted digital poster",
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

export const submittedAbstracts: Presentation[] = [
  { title: researchOutputs[0].title, authors: "Figueiredo FC, et al" },
  {
    title:
      "Early Vasopressor with Fluid Restriction Versus Standard Fluid Resuscitation in Septic Shock",
    authors: "Figueiredo FC, et al",
  },
  {
    title:
      "Functional-flow Monitoring for Delirium and Cognitive Outcomes After Adult Cardiac Surgery",
    authors: "Figueiredo FC, et al",
  },
  {
    title:
      "Individualized Cerebral Autoregulation-derived Blood-pressure Targets After Acute Brain Injury",
    authors: "Figueiredo FC, et al",
  },
  {
    title:
      "Prophylactic Pre-Endoscopic Intubation in Acute Upper GI Bleeding: Systematic Review & Meta-Analysis",
    authors: "Figueiredo FC, et al",
  },
  {
    title:
      "Transpulmonary Thermodilution in Septic Shock and ARDS: A Meta-Analysis of Randomized Trials",
    authors: "Jorqueira ECB, et al",
  },
  {
    title:
      "Automated vs. Manual Oxygen Titration in Critically Ill Patients: A Meta-Analysis of RCTs and TSA",
    authors:
      "Rangel da Silva Neto M, Jones PNR, Vergna RD, Souza de Moura Ribeiro M, Teles GA, Figueiredo FC",
  },
  {
    title:
      "LMWH versus DOACs for Thromboprophylaxis After Bariatric Surgery: A Meta-Analysis",
    authors:
      "Pivetta HB, Costa JVG, Massoud RO, Mendes RG, Alles I, Fonseca LG, Forte DN, Pimenta GP, Figueiredo FC",
  },
].map((item) => ({
  ...item,
  year: 2027,
  venue: "Society of Critical Care Medicine Critical Care Congress",
  format: "Submitted abstract · decision pending",
  status: "published",
}));

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
    role: "Felipe's work spans the clinical workflow, product structure, and software implementation.",
    limitation:
      "Educational workflow software. It is not a clinical record system and is not intended to guide patient-care decisions.",
    highlight:
      "Approximately 200 users across multiple Brazilian medical schools, as reported in the September 2026 CV.",
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
    role: "Felipe leads the clinical framing and product concept.",
    limitation:
      "Unvalidated educational concept only. It does not provide medical advice, diagnose patients, or replace professional clinical judgment.",
    status: "draft",
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
      "Supported supervised occupational-health assessments and preventive-health education for underserved workers.",
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
      "Protocol and question development",
      "Systematic reviews",
      "Pairwise and network meta-analysis",
      "Screening and data extraction",
      "Risk-of-bias assessment",
      "GRADE",
      "Statistical analysis in R",
      "Manuscript drafting and project coordination",
      "REDCap",
      "Patient recruitment and informed consent",
      "Biobanking",
    ],
  },
  {
    label: "Computational",
    items: [
      "Git — proficient",
      "Python, SQL, pandas, and scikit-learn — working knowledge",
    ],
  },
  {
    label: "Languages",
    items: [
      "Portuguese — native",
      "English — Duolingo English Test 145 (July 2026)",
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
