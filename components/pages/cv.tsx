import { ArrowIcon } from "@/components/arrow-icon";
import {
  acceptedAbstracts as allAcceptedAbstracts,
  cvDownloads,
  presentations as allPresentations,
  researchOutputs as allResearchOutputs,
  siteProfile,
} from "@/lib/site";
import { getResearchRecords, stageText, type Locale } from "@/lib/research";
import { history, skills } from "@/lib/history";
import { Intro } from "./shared";
const researchOutputs = allResearchOutputs.filter(
  (o) => o.status === "published",
);
const acceptedAbstracts = allAcceptedAbstracts.filter(
  (o) => o.status === "published",
);
const presentations = allPresentations.filter((o) => o.status === "published");
export function Cv({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  const entries = history(locale);
  const studyRecords = getResearchRecords(locale).filter(
    (r) => r.kind === "studies",
  );
  return (
    <div className="page-frame inner-page cv-page">
      <Intro
        locale={locale}
        kicker={t("Curriculum vitae", "Currículo")}
        title={siteProfile.name}
      >
        <p>
          {t(
            "M.D. candidate at UFMG · Expected graduation December 2026",
            "Estudante de medicina na UFMG · Formatura prevista para dezembro de 2026",
          )}
        </p>
      </Intro>
      <div className="cv-actions">
        <a className="button-link" href={cvDownloads.pdf} download>
          {t("Download CV (PDF)", "Baixar CV (PDF · inglês)")}{" "}
          <ArrowIcon direction="down" />
        </a>
        <a className="text-link" href={cvDownloads.docx} download>
          {t("Original DOCX", "DOCX original · inglês")}{" "}
          <ArrowIcon direction="down" />
        </a>
        <p>
          {t(
            "October 21, 2026 CV · Downloads in English",
            "CV de 21 de outubro de 2026 · Downloads em inglês",
          )}
        </p>
      </div>
      <nav
        className="on-this-page"
        aria-label={t("CV sections", "Seções do currículo")}
      >
        <a href="#education">
          {t("Education", "Formação")} <ArrowIcon direction="down" />
        </a>
        <a href="#manuscripts">
          {t("Manuscripts", "Manuscritos")} <ArrowIcon direction="down" />
        </a>
        <a href="#conferences">
          {t("Conferences", "Congressos")} <ArrowIcon direction="down" />
        </a>
        <a href="#skills">
          {t("Skills", "Habilidades")} <ArrowIcon direction="down" />
        </a>
      </nav>
      <div className="cv-document">
        {[
          [
            t(
              "Education & clinical training",
              "Formação e experiência clínica",
            ),
            "education",
            entries.slice(0, 2),
          ],
          [
            t(
              "Research & professional experience",
              "Pesquisa e experiência profissional",
            ),
            "experience",
            entries.slice(2, 5),
          ],
          [
            t("Teaching & service", "Ensino e voluntariado"),
            "service",
            entries.slice(5),
          ],
        ].map(([title, id, items]) => (
          <section className="cv-section" id={id as string} key={id as string}>
            <h2>{title as string}</h2>
            <div className="cv-entries">
              {(items as typeof entries).map((e) => (
                <article key={e.institution + e.title}>
                  <p className="cv-entry__period">{e.period}</p>
                  <div>
                    <h3>{e.title}</h3>
                    <p className="cv-entry__institution">
                      {e.institution} · {e.place}
                    </p>
                    <p>{e.description}</p>
                    {e.details && (
                      <ul>
                        {e.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <section className="cv-section" id="manuscripts">
          <h2>
            {t("Manuscripts under review", "Manuscritos em avaliação")}{" "}
            <span className="count">{researchOutputs.length}</span>
          </h2>
          <ol className="cv-citations">
            {researchOutputs.map((o) => (
              <li key={o.id}>
                {o.authors && <p>{o.authors.replace(/\.$/, "")}.</p>}
                <h3 lang="en">{o.title}</h3>
                <p>
                  {o.year} · {stageText(o.stage, locale)}
                  {o.journal && ` · ${o.journal}`}
                </p>
                {o.registration && (
                  <a
                    href={`https://www.crd.york.ac.uk/PROSPERO/view/${o.registration.replace("PROSPERO ", "")}`}
                  >
                    {o.registration} <ArrowIcon />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>
        <section className="cv-section" id="conferences">
          <h2>
            {t(
              "Accepted for presentation · SCCM 2027",
              "Aceitos para apresentação · SCCM 2027",
            )}{" "}
            <span className="count">{acceptedAbstracts.length}</span>
          </h2>
          <ol className="cv-citations">
            {acceptedAbstracts.map((o) => (
              <li key={o.id}>
                {o.authors && <p>{o.authors.replace(/\.$/, "")}.</p>}
                <h3 lang="en">{o.title}</h3>
                <p>
                  {o.venue} · {o.year} · {stageText(o.format, locale)}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="cv-section">
          <h2>{t("Other conference work", "Outros trabalhos de congresso")}</h2>
          <ol className="cv-citations">
            {presentations.map((o) => (
              <li key={o.id}>
                <p>{o.authors?.replace(/\.$/, "")}.</p>
                <h3 lang="en">{o.title}</h3>
                <p>
                  {o.venue} · {o.year} · {stageText(o.format, locale)}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="cv-section" id="primary">
          <h2>{t("Additional research", "Outras pesquisas")}</h2>
          <div className="cv-citations">
            {studyRecords.map((s) => (
              <article key={s.id}>
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
                {s.url && (
                  <a href={s.url}>
                    {s.registration} <ArrowIcon />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <section className="cv-section">
          <h2>Software</h2>
          <div className="cv-citations">
            <h3>Clinia</h3>
            <p>
              {t(
                "Application for organizing clinical notes and student case-log workflows during medical internship rotations.",
                "Aplicação para organizar anotações clínicas e registros de casos durante o internato médico.",
              )}
            </p>
            <p>
              {t(
                "Brazilian software registration",
                "Registro de software no Brasil",
              )}
              : BR512025003190-4
            </p>
            <a href="https://github.com/felipe2170/Clinia">
              {t("View source", "Ver código")} <ArrowIcon />
            </a>
          </div>
        </section>
        <section className="cv-section" id="skills">
          <h2>{t("Skills & languages", "Habilidades e idiomas")}</h2>
          <div className="cv-skills">
            {skills(locale).map((group) => (
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
