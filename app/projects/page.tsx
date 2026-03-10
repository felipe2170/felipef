import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Felipe de Carvalho Figueiredo, including medical education, research workflow, and health-tech initiatives.",
  alternates: {
    canonical: "https://felipef.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Projects</div>
        <h1>Projects</h1>
        <p className="lead">
          Selected work at the intersection of medicine, research, and software.
        </p>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h3>Clinia Companion</h3>
            <p className="muted">
              A medical productivity and education project designed to support
              students during clinical rotations with a practical, mobile-first
              workflow.
            </p>
            <a
              href="https://github.com/felipe2170/Clinia"
              target="_blank"
              rel="noreferrer"
            >
              View public repository
            </a>
          </article>

          <article className="card">
            <h3>Internato Suite</h3>
            <p className="muted">
              A broader vision for digital tools supporting patient tracking,
              note organization, and structured educational use during clerkship
              and ward work.
            </p>
          </article>

          <article className="card">
            <h3>Research workflows</h3>
            <p className="muted">
              Reproducible pipelines for systematic reviews, evidence synthesis,
              and quantitative analysis in clinically relevant questions.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">What I build</p>
        <ul className="list">
          <li>Clinical education tools</li>
          <li>Health-tech prototypes</li>
          <li>Research support and analysis workflows</li>
          <li>Interfaces for real-world medical use cases</li>
        </ul>
      </section>
    </>
  );
}