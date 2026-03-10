import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Felipe de Carvalho Figueiredo, including Internato Suite and Bayesian Triage Assistant.",
  alternates: { canonical: "https://felipef.com/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="section card">
        <p className="eyebrow">Projects</p>
        <h1>Selected product and innovation projects</h1>
        <p className="muted">
          These projects reflect a clinical lens first, informed by evidence-based thinking and translated into practical digital product concepts.
        </p>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h2>Internato Suite</h2>
          <p className="muted">A focused concept for clerkship/internato workflow support: structured notes, longitudinal case tracking, educational reinforcement, and better day-to-day cognitive organization for trainees.</p>
          <p className="muted">Placeholder for screenshot: <em>/public/images/internato-suite-placeholder.png</em></p>
        </article>
        <article className="card">
          <h2>Bayesian Triage Assistant</h2>
          <p className="muted">A decision-support concept that frames triage prioritization through explicit probability reasoning and transparent uncertainty communication, aiming to improve clinical judgment quality in high-pressure contexts.</p>
          <p className="muted">Placeholder for screenshot: <em>/public/images/bayesian-triage-placeholder.png</em></p>
        </article>
      </section>
    </>
  );
}
