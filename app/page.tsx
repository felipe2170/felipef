import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Felipe de Carvalho Figueiredo",
  description:
    "Homepage of Felipe de Carvalho Figueiredo, a UFMG medical student focused on anesthesiology, clinical research, and health-tech projects.",
  alternates: {
    canonical: "https://felipef.com",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Felipe de Carvalho Figueiredo",
    alternateName: [
      "Felipe Figueiredo",
      "felipe2170",
      "felipedcfigueiredo",
      "FelipeF",
    ],
    url: "https://felipef.com",
    jobTitle: "Medical student",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Federal de Minas Gerais",
    },
    sameAs: [
      "https://github.com/felipe2170",
      "https://www.instagram.com/felipedcfigueiredo/",
      "https://medium.com/@felipedcfigueiredo",
    ],
    knowsAbout: [
      "Anesthesiology",
      "Clinical research",
      "Evidence synthesis",
      "Health technology",
      "Medical education",
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section className="hero">
        <div className="eyebrow">Medicine · Research · Health-Tech</div>
        <h1>Felipe de Carvalho Figueiredo</h1>
        <p className="lead">
          I am a UFMG medical student focused on anesthesiology, clinical
          research, evidence synthesis, and health-tech projects. My work sits
          at the intersection of medicine, scientific rigor, and practical
          software for clinical education and workflow.
        </p>

        <div className="actions">
          <a className="button primary" href="/about">
            Learn more
          </a>
          <a className="button" href="/projects">
            View projects
          </a>
          <a className="button" href="/research">
            Research focus
          </a>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Overview</p>
        <div className="grid">
          <article className="card">
            <h3>Clinical focus</h3>
            <p className="muted">
              My main medical interests include anesthesiology, perioperative
              care, airway management, and critical care.
            </p>
          </article>

          <article className="card">
            <h3>Research focus</h3>
            <p className="muted">
              I work with systematic reviews, meta-analysis, reproducible
              methods, and clinically relevant questions in medicine.
            </p>
          </article>

          <article className="card">
            <h3>Technology focus</h3>
            <p className="muted">
              I build and prototype tools for medical education, ward workflow,
              and digital health.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Selected public footprint</p>
        <div className="grid">
          <article className="card wide">
            <h3>GitHub</h3>
            <p className="muted">
              Public code, project repositories, and technical work.
            </p>
            <a href="https://github.com/felipe2170" target="_blank" rel="noreferrer">
              github.com/felipe2170
            </a>
          </article>

          <article className="card wide">
            <h3>Public profiles</h3>
            <p className="muted">
              Other public identity signals currently associated with this site.
            </p>
            <ul className="list">
              <li>
                <a
                  href="https://www.instagram.com/felipedcfigueiredo/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram: @felipedcfigueiredo
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@felipedcfigueiredo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Medium: @felipedcfigueiredo
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Keywords</p>
        <p className="muted">
          Felipe de Carvalho Figueiredo, Felipe Figueiredo, UFMG, medical
          student, anesthesiology, clinical research, meta-analysis, health-tech,
          Clinia, Internato Suite.
        </p>
      </section>
    </>
  );
}