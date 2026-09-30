import { ArrowIcon } from "../../components/arrow-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { ResearchExplorer } from "../../components/research-explorer";
import { InquiryGraphic } from "../../components/inquiry-graphic";
import { pageMetadata } from "../../lib/seo";
import {
  primaryStudies,
  presentations,
  researchExperience,
  researchOutputs,
  researchContribution,
  submittedAbstracts,
} from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Ongoing primary studies, manuscripts, accepted posters, and submitted abstracts by Felipe de Carvalho Figueiredo. Research stages are stated explicitly.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Research" }]} />
      <header className="page-intro research-intro">
        <p className="kicker">Research & methods</p>
        <h1>
          Clinical questions.
          <br />
          <em>Explicit uncertainty.</em>
        </h1>
        <p className="page-intro__dek">
          My current work brings together evidence synthesis and retrospective
          clinical-data research in perioperative and critical care.
        </p>
      </header>
      <nav className="on-this-page" aria-label="On this page">
        <span>Explore</span>
        <a href="#primary-studies">Primary studies ↓</a>
        <a href="#research-library">Manuscripts & conferences ↓</a>
        <a href="#research-background">Experience ↓</a>
      </nav>
      <section
        id="primary-studies"
        className="research-primary"
        aria-labelledby="primary-title"
      >
        <div className="section-title-row">
          <h2 id="primary-title">
            Primary research <em>in progress.</em>
          </h2>
          <p className="fine-print">Status from the September 2026 CV.</p>
        </div>
        <div className="primary-study-grid">
          {primaryStudies
            .filter((s) => s.status === "published")
            .map((s, i) => (
              <article key={s.title}>
                <div className="primary-study-art">
                  <InquiryGraphic variant={i === 0 ? "flow" : "orbit"} />
                  <span>0{i + 1} / MIMIC-IV</span>
                </div>
                <div className="primary-study-copy">
                  <p className="eyebrow">{s.stage}</p>
                  <h3>{s.shortTitle}</h3>
                  <p>{s.description}</p>
                  <details>
                    <summary>Full study title</summary>
                    <p>{s.title}</p>
                  </details>
                  {s.url && (
                    <a
                      href={s.url}
                      className="text-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.registration} <ArrowIcon direction="diagonal" />
                    </a>
                  )}
                </div>
              </article>
            ))}
        </div>
      </section>
      <section
        id="research-library"
        className="research-library"
        aria-labelledby="library-title"
      >
        <div className="section-label">
          <span>02</span>
          <p>Research library</p>
        </div>
        <h2 id="library-title">
          Work, with its <em>current status.</em>
        </h2>
        <p className="library-context">
          Manuscripts under review are not published articles. Poster acceptance
          does not imply that a presentation has taken place. Submitted
          abstracts remain pending a decision.
        </p>
        <ResearchExplorer
          manuscripts={researchOutputs.filter((x) => x.status === "published")}
          presentations={presentations.filter((x) => x.status === "published")}
          submissions={submittedAbstracts.filter(
            (x) => x.status === "published",
          )}
        />
      </section>
      <section className="methods-note">
        <p className="eyebrow">Contribution & methods</p>
        <h2>Accountable at every stage.</h2>
        <p>{researchContribution}</p>
      </section>
      <section
        id="research-background"
        className="home-section"
        aria-labelledby="background-title"
      >
        <div className="section-label">
          <span>03</span>
          <p>Research experience</p>
        </div>
        <h2 id="background-title">
          From the laboratory <em>to the cohort.</em>
        </h2>
        <div className="research-experience">
          {researchExperience
            .filter((x) => x.status === "published")
            .map((item) => (
              <article key={item.institution}>
                <header>
                  <p>{item.period}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.institution}</p>
                  </div>
                </header>
                <p>{item.description}</p>
                <ul>
                  {item.details?.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      </section>
      <section className="invitation">
        <p className="eyebrow">Research collaboration</p>
        <h2>
          What question
          <br />
          <em>are you working on?</em>
        </h2>
        <Link href="/contact" className="button-link">
          Start a conversation <ArrowIcon direction="diagonal" />
        </Link>
      </section>
    </div>
  );
}
