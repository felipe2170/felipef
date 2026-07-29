import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SectionHeading } from "../../components/section-heading";
import { pageMetadata } from "../../lib/seo";
import { experiences, siteProfile } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Felipe de Carvalho Figueiredo, a final-year UFMG medical student working across anesthesiology, clinical research, and health technology.",
  path: "/about",
});

export default function AboutPage() {
  const trajectory = experiences.filter((item) => item.status === "published");

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "About" }]} />

      <header className="page-intro">
        <p className="kicker">About Felipe</p>
        <h1>Clinical formation, evidence, and systems that make good work easier.</h1>
        <p className="page-intro__dek">
          Felipe de Carvalho Figueiredo is a Brazilian medical student at UFMG,
          graduating in December 2026. His direction combines anesthesiology-oriented
          clinical training with evidence synthesis and practical health technology.
        </p>
      </header>

      <section className="editorial-section">
        <SectionHeading number="01" title="A controlled trajectory" note="Profile" />
        <div className="editorial-section__content profile-copy">
          <p className="drop-cap">
            Medicine provides the clinical questions. Research offers disciplined
            ways to answer them. Product thinking helps translate the result into a
            workflow people can actually use.
          </p>
          <p>
            Felipe&apos;s principal clinical interest is anesthesiology, supported by
            interests in perioperative care, airway management, pain, critical care,
            and burn care. A 10-week clerkship at CHU Lille added focused experience
            in Burn Anesthesia and Cardiothoracic Anesthesia.
          </p>
          <p>
            At Afya, he works as an Assistant Editor and Healthcare Consultant,
            developing evidence-based educational content and reviewing AI-generated
            clinical material. He is pursuing the ECFMG pathway and remains interested
            in research mentorship and long-term collaboration in Brazil, the United
            States, and Europe.
          </p>
        </div>
        <aside className="margin-note">
          <span className="margin-note__rule" aria-hidden="true" />
          <p>
            The through-line is useful rigor: questions grounded in clinical reality,
            methods matched to the evidence, and communication designed for action.
          </p>
        </aside>
      </section>

      <section className="editorial-section">
        <SectionHeading number="02" title="Current trajectory" note="2022 — 2026" />
        <div className="timeline editorial-section__wide">
          {trajectory.map((experience) => (
            <article className="timeline__item" key={experience.title}>
              <p className="timeline__period">{experience.period}</p>
              <div>
                <h2>{experience.title}</h2>
                <p className="timeline__institution">
                  {experience.institution} · {experience.place}
                </p>
              </div>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-statement">
        <p className="kicker">Continue</p>
        <h2>Research methods and current work are documented in more detail.</h2>
        <Link className="text-link text-link--large" href="/research">
          View the research profile <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
