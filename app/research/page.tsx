import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research interests and methodological focus of Felipe de Carvalho Figueiredo.",
  alternates: {
    canonical: "https://felipef.com/research",
  },
};

export default function ResearchPage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Research</div>
        <h1>Research focus</h1>
        <p className="lead">
          My research interests center on clinically important questions in
          anesthesiology, perioperative care, critical care, and evidence
          synthesis.
        </p>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card wide">
            <h3>Topics of interest</h3>
            <ul className="list">
              <li>Anesthesiology and airway management</li>
              <li>Perioperative and critical care outcomes</li>
              <li>Systematic reviews and meta-analysis</li>
              <li>Reproducible methods in clinical research</li>
              <li>Digital tools for medicine and education</li>
            </ul>
          </article>

          <article className="card wide">
            <h3>Methodological focus</h3>
            <p className="muted">
              I am interested in structured evidence synthesis, clinically useful
              quantitative methods, transparent reporting, and workflows that
              make research easier to reproduce and apply.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Working style</p>
        <p className="muted">
          I favor research questions that are methodologically sound, clinically
          relevant, and capable of producing a clear practical takeaway.
        </p>
      </section>
    </>
  );
}