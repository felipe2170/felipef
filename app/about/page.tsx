import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Felipe de Carvalho Figueiredo: UFMG medical student in internato with focus on anesthesiology, research methodology, and health-tech.",
  alternates: { canonical: "https://felipef.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section card">
        <p className="eyebrow">About</p>
        <h1>Academic trajectory and professional direction</h1>
        <p className="muted">
          Felipe de Carvalho Figueiredo is a Brazilian medical student at the Universidade Federal de Minas Gerais (UFMG), currently in final-year internato. His training focus includes anesthesiology and perioperative care, with methodologically rigorous research interests and practical technology development for medicine.
        </p>
        <p className="muted">
          His trajectory combines clinical immersion, evidence-based research, and entrepreneurial product thinking. A clinical rotation in France expanded his perspective on international collaboration and reinforced a long-term pathway oriented to cross-border clinical-research opportunities.
        </p>
        <p className="muted">
          He is pursuing the ECFMG pathway and remains open to mentorship, research collaboration, and residency-related networking in the US and Europe.
        </p>
      </section>
    </>
  );
}
