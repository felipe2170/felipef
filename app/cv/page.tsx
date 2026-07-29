import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { pageMetadata } from "../../lib/seo";
import {
  cvDownloads,
  experiences,
  presentations,
  projects,
  researchExperience,
  researchOutputs,
  siteProfile,
  skillGroups,
  teachingService,
} from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Curriculum Vitae",
  description:
    "Curriculum vitae of Felipe de Carvalho Figueiredo: UFMG medical education, clinical and research experience, manuscripts, presentations, projects, teaching, service, and skills.",
  path: "/cv",
});

export default function CvPage() {
  return (
    <div className="page-frame inner-page cv-page">
      <Breadcrumbs items={[{ label: "Curriculum Vitae" }]} />

      <header className="page-intro page-intro--compact">
        <p className="kicker">Curriculum Vitae</p>
        <h1>{siteProfile.name}</h1>
        <p className="page-intro__dek">
          Final-year medical student at UFMG with clinical interests in
          anesthesiology and experience across evidence synthesis, cohort and
          preclinical research, medical education, and health technology.
        </p>
        <div className="cv-actions">
          <a className="text-link text-link--large" href={cvDownloads.pdf} download>
            Download CV (PDF) <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link" href={cvDownloads.docx} download>
            Original DOCX <span aria-hidden="true">↓</span>
          </a>
          <a
            className="text-link"
            href={siteProfile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <aside className="cv-facts" aria-label="Curriculum vitae summary">
        <dl>
          <div>
            <dt>Institution</dt>
            <dd>UFMG</dd>
          </div>
          <div>
            <dt>Expected graduation</dt>
            <dd>{siteProfile.expectedGraduation}</dd>
          </div>
          <div>
            <dt>Current role</dt>
            <dd>
              {siteProfile.currentRole.title}, {siteProfile.currentRole.organization}
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{siteProfile.location}</dd>
          </div>
        </dl>
      </aside>

      <div className="cv-document">
        <section className="cv-section">
          <header>
            <p>01</p>
            <h2>Education & clinical experience</h2>
          </header>
          <div className="cv-entries">
            {experiences.map((item) => (
              <article key={`${item.title}-${item.institution}`}>
                <p className="cv-entry__period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="cv-entry__institution">
                    {item.institution} · {item.place}
                  </p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <header>
            <p>02</p>
            <h2>Research experience</h2>
          </header>
          <div className="cv-entries">
            {researchExperience.map((item) => (
              <article key={`${item.institution}-${item.period}`}>
                <p className="cv-entry__period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="cv-entry__institution">
                    {item.institution} · {item.place}
                  </p>
                  <p>{item.description}</p>
                  {item.details ? (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section">
          <header>
            <p>03</p>
            <h2>Manuscripts under review</h2>
          </header>
          <ol className="cv-citations">
            {researchOutputs.map((item) => (
              <li key={item.title}>
                <p>
                  {item.authors}. <strong>{item.title}.</strong> {item.year}.{" "}
                  <span>{item.stage}.</span>
                </p>
                {item.registration ? <p>{item.registration}</p> : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section">
          <header>
            <p>04</p>
            <h2>Abstracts & presentations</h2>
          </header>
          <ol className="cv-citations">
            {presentations.map((item) => (
              <li key={item.title}>
                <p>
                  {item.authors}. <strong>{item.title}.</strong>{" "}
                  <em>{item.venue}</em>, {item.year}.
                </p>
                <p>{item.format}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section">
          <header>
            <p>05</p>
            <h2>Selected project</h2>
          </header>
          <div className="cv-entries">
            {projects
              .filter((project) => project.slug === "clinia")
              .map((project) => (
                <article key={project.slug}>
                  <p className="cv-entry__period">{project.stage}</p>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    {project.highlight ? <p>{project.highlight}</p> : null}
                    {project.registration ? <p>{project.registration}.</p> : null}
                    {project.url ? (
                      <a
                        className="text-link"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open-source project <span aria-hidden="true">↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="cv-section">
          <header>
            <p>06</p>
            <h2>Teaching & service</h2>
          </header>
          <div className="cv-entries">
            {teachingService.map((item) => (
              <article key={`${item.title}-${item.institution}`}>
                <p className="cv-entry__period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="cv-entry__institution">{item.institution}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section cv-section--skills">
          <header>
            <p>07</p>
            <h2>Skills & languages</h2>
          </header>
          <div className="cv-skills">
            {skillGroups.map((group) => (
              <section key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
