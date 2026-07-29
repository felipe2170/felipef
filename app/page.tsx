import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { SectionHeading } from "../components/section-heading";
import { pageMetadata } from "../lib/seo";
import {
  experiences,
  projects,
  researchInterests,
  siteProfile,
} from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${siteProfile.name} — Medical Student, Researcher & Health-Tech Builder`,
  description: siteProfile.description,
  path: "",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${siteProfile.name} — Academic profile`,
  url: siteProfile.url,
  dateModified: siteProfile.updatedAt,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    name: siteProfile.name,
    url: siteProfile.url,
    image: `${siteProfile.url}/images/felipe-portrait.jpg`,
    description: siteProfile.description,
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    affiliation: {
      "@type": siteProfile.affiliation.type,
      name: siteProfile.affiliation.name,
      alternateName: siteProfile.affiliation.shortName,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: siteProfile.currentRole.title,
      occupationLocation: {
        "@type": "Country",
        name: "Brazil",
      },
    },
    sameAs: [siteProfile.links.linkedin, siteProfile.links.github],
    knowsAbout: [
      "Medicine",
      "Anesthesiology",
      "Systematic reviews",
      "Pairwise meta-analysis",
      "Network meta-analysis",
      "Health technology",
    ],
  },
};

export default function HomePage() {
  const publishedExperiences = experiences.filter((item) => item.status === "published");
  const publishedInterests = researchInterests.filter((item) => item.status === "published");
  const publishedProjects = projects.filter((item) => item.status === "published");

  return (
    <>
      <JsonLd data={personJsonLd} />

      <section className="hero page-frame" aria-labelledby="profile-title">
        <div className="hero__identity">
          <p className="kicker">Academic profile · {siteProfile.location}</p>
          <h1 id="profile-title">{siteProfile.name}</h1>
          <p className="hero__statement">{siteProfile.headline}</p>
          <div className="hero__links" aria-label="Profile links">
            <Link className="text-link" href="/research">
              Research profile <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/projects">
              Selected projects <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="portrait-crop">
            <Image
              src="/images/felipe-portrait.jpg"
              alt="Felipe de Carvalho Figueiredo in a white coat"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 38vw"
            />
          </div>
          <figcaption>
            <span>{siteProfile.academicStatus}</span>
            <span>{siteProfile.affiliation.shortName}</span>
          </figcaption>
        </figure>

        <aside className="hero__folio" aria-label="Profile summary">
          <p>Focus</p>
          <ul>
            <li>Anesthesiology</li>
            <li>Evidence synthesis</li>
            <li>Health technology</li>
          </ul>
        </aside>
      </section>

      <section id="profile" className="editorial-section page-frame">
        <SectionHeading
          number="01"
          title="A clinical education shaped by questions."
          note="Profile"
        />
        <div className="editorial-section__content profile-copy">
          <p className="drop-cap">
            Felipe is a final-year medical student at the Universidade Federal de
            Minas Gerais, with graduation expected in December 2026. His work sits
            where attentive clinical training meets evidence synthesis and the
            design of useful systems.
          </p>
          <p>
            His principal clinical interest is anesthesiology, with related questions
            in pain, airway management, perioperative medicine, and critical care. In
            2026, he completed a 10-week clinical clerkship in Burn Anesthesia and
            Cardiothoracic Anesthesia at CHU Lille in France.
          </p>
          <p>
            Alongside medical training, Felipe works as an Assistant Editor and
            Healthcare Consultant at Afya, contributing to evidence-based educational
            content and the quality review of AI-generated clinical materials.
          </p>
          <p>
            He is pursuing the ECFMG pathway and is interested in rigorous research,
            mentorship, and long-term clinical-research connections in Brazil, the
            United States, and Europe.
          </p>
        </div>
        <aside className="margin-note">
          <span className="margin-note__rule" aria-hidden="true" />
          <p>
            The aim is simple: ask clinically useful questions, choose methods that
            fit them, and communicate the result with precision.
          </p>
        </aside>
      </section>

      <section className="editorial-section page-frame">
        <SectionHeading
          number="02"
          title="Areas of inquiry"
          note="Current interests"
        />
        <ol className="interest-index editorial-section__wide">
          {publishedInterests.map((interest, index) => (
            <li key={interest.name}>
              <span className="interest-index__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{interest.name}</h3>
              <p>{interest.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-section page-frame">
        <SectionHeading number="03" title="Trajectory" note="Clinical formation" />
        <div className="timeline editorial-section__wide">
          {publishedExperiences.map((experience) => (
            <article className="timeline__item" key={experience.title}>
              <p className="timeline__period">{experience.period}</p>
              <div>
                <h3>{experience.title}</h3>
                <p className="timeline__institution">
                  {experience.institution} · {experience.place}
                </p>
              </div>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section page-frame">
        <SectionHeading
          number="04"
          title="Two product directions"
          note="Selected projects"
        />
        <div className="project-preview-grid editorial-section__wide">
          {publishedProjects.map((project, index) => (
            <article className="project-preview" key={project.slug}>
              <div className={`project-preview__figure project-preview__figure--${index + 1}`} aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div />
              </div>
              <p className="project-meta">{project.stage} · Health technology</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.highlight ? (
                <p className="project-preview__highlight">{project.highlight}</p>
              ) : null}
              <Link className="text-link" href={`/projects#${project.slug}`}>
                Read the case note <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-statement page-frame">
        <p className="kicker">Research collaboration</p>
        <h2>
          Useful work begins with a well-framed question and a reliable collaborator.
        </h2>
        <Link className="text-link text-link--large" href="/contact">
          Contact Felipe <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
