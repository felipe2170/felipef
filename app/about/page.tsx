import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Felipe de Carvalho Figueiredo, UFMG medical student focused on anesthesiology, research, and health-tech.",
  alternates: {
    canonical: "https://felipef.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">About</div>
        <h1>About Felipe de Carvalho Figueiredo</h1>
        <p className="lead">
          Felipe de Carvalho Figueiredo is a medical student at the Universidade
          Federal de Minas Gerais (UFMG) with interests in anesthesiology,
          perioperative medicine, critical care, clinical research, and
          health-tech.
        </p>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card wide">
            <h3>Background</h3>
            <p className="muted">
              My work combines medical training with a strong interest in
              reproducible research methods, practical clinical tools, and
              technology applied to healthcare. I am particularly interested in
              projects that improve decision-making, workflow, and education in
              medicine.
            </p>
          </article>

          <article className="card wide">
            <h3>Approach</h3>
            <p className="muted">
              I prefer work that is clinically grounded, methodologically
              rigorous, and directly useful. That includes evidence synthesis,
              careful quantitative analysis, and product development that solves
              real problems for students, clinicians, and healthcare teams.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Core areas</p>
        <ul className="list">
          <li>Anesthesiology and airway management</li>
          <li>Perioperative and critical care topics</li>
          <li>Systematic reviews and meta-analysis</li>
          <li>Clinical education and digital tools</li>
          <li>Health-tech product building</li>
        </ul>
      </section>
    </>
  );
}