import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { SectionHeading } from "../../components/section-heading";
import { pageMetadata } from "../../lib/seo";
import { publications, researchInterests } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Research interests and evidence-synthesis methods pursued by Felipe de Carvalho Figueiredo, a medical student at UFMG.",
  path: "/research",
});

const methods = [
  {
    name: "Systematic reviews",
    description:
      "Transparent question formulation, reproducible searches, structured appraisal, and synthesis.",
  },
  {
    name: "Pairwise meta-analysis",
    description:
      "Quantitative synthesis for direct comparisons, with attention to heterogeneity and clinical interpretation.",
  },
  {
    name: "Network meta-analysis",
    description:
      "Comparative synthesis across treatment networks when the evidence structure and assumptions support it.",
  },
];

export default function ResearchPage() {
  const interests = researchInterests.filter((item) => item.status === "published");
  const publishedWork = publications.filter((item) => item.status === "published");

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Research" }]} />

      <header className="page-intro">
        <p className="kicker">Research</p>
        <h1>Evidence is most useful when the question comes first.</h1>
        <p className="page-intro__dek">
          Felipe’s research direction centers on clinically relevant questions,
          disciplined evidence synthesis, and conclusions that remain proportionate
          to the data.
        </p>
      </header>

      <section className="editorial-section">
        <SectionHeading number="01" title="Methods" note="Evidence synthesis" />
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
        <SectionHeading number="02" title="Clinical questions" note="Areas of interest" />
        <div className="research-interests editorial-section__wide">
          {interests.map((interest) => (
            <article key={interest.name}>
              <h2>{interest.name}</h2>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      {publishedWork.length > 0 ? (
        <section className="editorial-section">
          <SectionHeading number="03" title="Published work" note="Selected output" />
          <ol className="publication-list editorial-section__wide">
            {publishedWork.map((publication) => (
              <li key={publication.url}>
                <p>
                  {publication.authors.join(", ")}. “{publication.title}.”{" "}
                  {publication.year}.
                </p>
                <a href={publication.url}>View publication</a>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="collaboration-note">
        <p className="kicker">Collaboration fit</p>
        <div>
          <h2>Clear scope. Defensible methods. Consistent execution.</h2>
          <p>
            Felipe welcomes conversations about evidence-synthesis projects and
            clinically grounded research in anesthesiology-adjacent or critical-care
            topics.
          </p>
          <Link className="text-link text-link--large" href="/contact">
            Discuss a research question <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
