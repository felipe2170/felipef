import type { Metadata } from "next";
import { siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Online CV of Felipe de Carvalho Figueiredo with education, clinical experience, research, and leadership sections.",
  alternates: { canonical: "https://felipef.com/cv" },
};

const sections = [
  "Education",
  "Clinical Experience",
  "Research",
  "Publications",
  "Presentations",
  "Awards",
  "Languages",
  "Technical Skills",
  "Leadership",
  "Extracurriculars",
];

export default function CvPage() {
  return (
    <>
      <section className="section card">
        <p className="eyebrow">Curriculum Vitae</p>
        <h1>Online CV</h1>
        <p className="muted">This page is structured for rapid review by physicians, mentors, and collaborators. Replace placeholders with finalized details.</p>
        <a className="btn primary" href="/cv/Felipe_de_Carvalho_Figueiredo_CV.pdf" download>Download PDF CV (placeholder)</a>
      </section>

      <section className="section card">
        <h2>Sections</h2>
        <ul className="list">{sections.map((s) => <li key={s}>{s}: <span className="muted">placeholder for validated entries</span></li>)}</ul>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h3>Lattes</h3>
          <a className="btn" href={siteConfig.lattes} target="_blank" rel="noreferrer">Lattes placeholder link</a>
        </article>
        <article className="card">
          <h3>LinkedIn</h3>
          <a className="btn" href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn placeholder link</a>
        </article>
      </section>
    </>
  );
}
