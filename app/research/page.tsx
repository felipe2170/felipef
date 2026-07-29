import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SectionHeading } from "../../components/section-heading";
import { pageMetadata } from "../../lib/seo";
import {
  presentations,
  researchExperience,
  researchInterests,
  researchOutputs,
} from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Research experience, manuscripts under review, conference work, and evidence-synthesis methods pursued by Felipe de Carvalho Figueiredo at UFMG.",
  path: "/research",
});

const methods = [
  {
    name: "Systematic reviews",
    description:
      "Question formulation, reproducible searches, structured appraisal, risk-of-bias assessment, GRADE, and transparent synthesis.",
  },
  {
    name: "Pairwise meta-analysis",
    description:
      "Quantitative synthesis for direct comparisons, with attention to heterogeneity, sensitivity analysis, and clinical interpretation.",
  },
  {
    name: "Network meta-analysis",
    description:
      "Comparative synthesis across treatment networks when the evidence structure and assumptions make indirect comparison defensible.",
  },
];

export default function ResearchPage() {
  const outputs = researchOutputs.filter((item) => item.status === "published");
  const conferenceWork = presentations.filter(
    (item) => item.status === "published",
  );
  const experience = researchExperience.filter(
    (item) => item.status === "published",
  );
  const interests = researchInterests.filter(
    (item) => item.status === "published",
  );

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Research" }]} />

      <header className="page-intro">
        <p className="kicker">Research</p>
        <h1>Evidence is most useful when the question comes first.</h1>
        <p className="page-intro__dek">
          Felipe&apos;s current work spans systematic reviews, pairwise and network
          meta-analysis, clinical evidence reviews, and earlier laboratory and cohort
          research at UFMG.
        </p>
      </header>

      <section className="editorial-section">
        <SectionHeading
          number="01"
          title="Current manuscripts"
          note="Under review"
        />
        <ol className="research-output-list editorial-section__wide">
          {outputs.map((output, index) => (
            <li key={output.title}>
              <div className="research-output-list__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{output.stage}</span>
              </div>
              <div>
                <h2>{output.title}</h2>
                <p className="research-output-list__authors">
                  {output.authors}. {output.year}.
                </p>
                <div className="research-output-list__tags">
                  {output.methods ? <span>{output.methods}</span> : null}
                  {output.registration ? <span>{output.registration}</span> : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-section">
        <SectionHeading number="02" title="Methods" note="Evidence synthesis" />
        <div className="methods-table editorial-section__wide">
          {methods.map((method, index) => (
            <article key={method.name}>
              <p>{String(index + 1).padStart(2, "0")}</p>
              <h2>{method.name}</h2>
              <p>{method.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <SectionHeading
          number="03"
          title="Research experience"
          note="UFMG"
        />
        <div className="research-experience editorial-section__wide">
          {experience.map((item) => (
            <article key={`${item.institution}-${item.period}`}>
              <header>
                <p>{item.period}</p>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.institution}</p>
                </div>
              </header>
              <p>{item.description}</p>
              {item.details ? (
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <SectionHeading
          number="04"
          title="Abstracts & presentations"
          note="Selected"
        />
        <ol className="presentation-list editorial-section__wide">
          {conferenceWork.map((item) => (
            <li key={item.title}>
              <p className="presentation-list__year">{item.year}</p>
              <div>
                <p className="project-meta">{item.format}</p>
                <h2>{item.title}</h2>
                <p>
                  {item.authors}. <em>{item.venue}</em>.
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-section">
        <SectionHeading
          number="05"
          title="Clinical questions"
          note="Areas of interest"
        />
        <div className="research-interests editorial-section__wide">
          {interests.map((interest) => (
            <article key={interest.name}>
              <h2>{interest.name}</h2>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="collaboration-note">
        <p className="kicker">Collaboration fit</p>
        <div>
          <h2>Clear scope. Defensible methods. Consistent execution.</h2>
          <p>
            Felipe welcomes conversations about evidence-synthesis projects and
            clinically grounded research in anesthesiology, perioperative medicine,
            critical care, and adjacent fields.
          </p>
          <Link className="text-link text-link--large" href="/contact">
            Discuss a research question <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
