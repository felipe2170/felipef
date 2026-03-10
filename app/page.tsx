import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Felipe de Carvalho Figueiredo is a Brazilian medical student at UFMG, currently in internato, focused on anesthesiology, clinical research, and health-tech.",
  alternates: { canonical: siteConfig.url },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    alternateName: ["Felipe Figueiredo", "felipedcfigueiredo", "FelipeF medicine"],
    description: siteConfig.tagline,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal de Minas Gerais (UFMG)",
    },
    knowsAbout: [
      "anesthesiology",
      "systematic reviews",
      "pairwise meta-analysis",
      "network meta-analysis",
      "health technology",
    ],
    nationality: "Brazilian",
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <section className="hero">
        <div>
          <p className="eyebrow">Official Site · UFMG · Medicine, Research, Health-Tech</p>
          <h1>Felipe de Carvalho Figueiredo</h1>
          <p className="lead">{siteConfig.tagline}</p>
          <div className="actions">
            <Link href="/research" className="btn primary">Research</Link>
            <Link href="/projects" className="btn">Projects</Link>
            <Link href="/contact" className="btn">Contact</Link>
          </div>
        </div>
        <aside className="portrait">
          <div>
            <strong>Professional portrait placeholder</strong>
            <p>Replace with: /public/images/felipe-portrait.jpg</p>
          </div>
        </aside>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h2>Current stage</h2>
          <p className="muted">
            Final-year medical student (internato) at UFMG, with clinical interests in anesthesiology, airway management, perioperative medicine, and critical patient care.
          </p>
        </article>
        <article className="card">
          <h2>International direction</h2>
          <p className="muted">
            Completed a clinical rotation in France and is interested in long-term clinical and research collaboration across Brazil, the United States, and Europe.
          </p>
        </article>
      </section>

      <section className="section grid-3">
        <article className="card"><h3>Research seriousness</h3><p className="muted">Strong focus on evidence synthesis methods and clinically relevant research questions.</p></article>
        <article className="card"><h3>Medicine + technology</h3><p className="muted">Builds product-oriented tools that support learning, workflow, and decision quality in clinical settings.</p></article>
        <article className="card"><h3>Editorial leadership</h3><p className="muted">Assistant Editor, Content & Technology @ NSDQ:AFYA.</p></article>
      </section>
    </>
  );
}
