import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { pageMetadata } from "../../lib/seo";
import { projects } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected health-technology projects by Felipe de Carvalho Figueiredo, including Clinia and an educational Bayesian triage concept.",
  path: "/projects",
});

export default function ProjectsPage() {
  const publishedProjects = projects.filter((project) => project.status === "published");

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Projects" }]} />

      <header className="page-intro">
        <p className="kicker">Selected projects</p>
        <h1>Clinical context, translated into restrained product ideas.</h1>
        <p className="page-intro__dek">
          These projects explore how software can reduce workflow friction or make
          clinical reasoning more explicit. Each is presented with its current stage
          and limits.
        </p>
      </header>

      <div className="case-studies">
        {publishedProjects.map((project, index) => (
          <article className="case-study" id={project.slug} key={project.slug}>
            <header className="case-study__header">
              <p className="case-study__number">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <p className="project-meta">{project.stage} · Case note</p>
                <h2>{project.title}</h2>
                <p className="case-study__summary">{project.summary}</p>
              </div>
            </header>

            <div className={`concept-figure concept-figure--${index + 1}`} aria-hidden="true">
              <div className="concept-figure__axis" />
              <span>{project.title}</span>
              <div className="concept-figure__signal">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="case-study__body">
              <section>
                <p className="case-study__label">01 / Problem</p>
                <p>{project.problem}</p>
              </section>
              <section>
                <p className="case-study__label">02 / Direction</p>
                <p>{project.direction}</p>
              </section>
              <section>
                <p className="case-study__label">03 / Role</p>
                <p>{project.role}</p>
              </section>
              {project.highlight || project.registration ? (
                <section>
                  <p className="case-study__label">04 / Current signal</p>
                  {project.highlight ? <p>{project.highlight}</p> : null}
                  {project.registration ? <p>{project.registration}.</p> : null}
                  {project.url ? (
                    <a
                      className="text-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View the open-source project <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </section>
              ) : null}
              <aside>
                <p className="case-study__label">Scope note</p>
                <p>{project.limitation}</p>
              </aside>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
