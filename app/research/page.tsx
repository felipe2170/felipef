import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research profile of Felipe de Carvalho Figueiredo, including methods in systematic reviews, pairwise meta-analysis, and network meta-analysis.",
  alternates: { canonical: "https://felipef.com/research" },
};

const methods = ["Systematic reviews", "Pairwise meta-analysis", "Network meta-analysis"];
const interests = ["Pain", "Airway management", "Critical patient care", "Burn victims"];

export default function ResearchPage() {
  return (
    <>
      <section className="section card">
        <p className="eyebrow">Research</p>
        <h1>Evidence-focused clinical research profile</h1>
        <p className="muted">
          This section presents finished work and a framework for future publications. Research collaborations are welcome when projects are clinically meaningful, methodologically sound, and execution-oriented.
        </p>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h2>Methods</h2>
          <ul className="list">{methods.map((method) => <li key={method}>{method}</li>)}</ul>
        </article>
        <article className="card">
          <h2>Selected research interests</h2>
          <ul className="list">{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
        </article>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h3>Formal citation list</h3>
          <p className="muted"><strong>Under construction.</strong> Replace this block with finalized citations when available.</p>
          <ol className="list muted">
            <li>Publication placeholder 01 — add full reference, DOI, and journal details.</li>
            <li>Publication placeholder 02 — add full reference, DOI, and journal details.</li>
          </ol>
        </article>
        <article className="card">
          <h3>Research summaries</h3>
          <p className="muted"><strong>Under construction.</strong> Add one polished summary card per completed study with question, methods, and key finding.</p>
        </article>
      </section>

      <section className="section card">
        <h2>Work with Felipe</h2>
        <p className="muted">Open to collaborative research in anesthesiology-adjacent and critical care topics, especially evidence synthesis and clinically applicable projects.</p>
        <Link href="/contact" className="btn">Discuss a collaboration</Link>
      </section>
    </>
  );
}
