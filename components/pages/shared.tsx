import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import { cases, localizedPath, type Locale } from "@/lib/research";
import { researchOutputs, primaryStudies } from "@/lib/site";
export function Intro({
  locale,
  title,
  kicker,
  children,
}: {
  locale: Locale;
  title: string;
  kicker: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-intro">
      <nav
        className="breadcrumbs"
        aria-label={locale === "en" ? "Breadcrumb" : "Navegação estrutural"}
      >
        <Link href={localizedPath("/", locale)}>
          {locale === "en" ? "Home" : "Início"}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{kicker}</span>
      </nav>
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      {children && <div className="page-intro__dek">{children}</div>}
    </header>
  );
}
export function SelectedCases({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <div className={compact ? "case-previews" : "case-studies"}>
      {cases
        .filter((c) =>
          [
            ...researchOutputs.map((o) => ({
              id: o.studyId,
              status: o.status,
            })),
            ...primaryStudies,
          ].some((s) => s.id === c.id && s.status === "published"),
        )
        .map((c, i) => {
          const manuscript = researchOutputs.find((o) => o.studyId === c.id);
          return (
            <article
              className="study-case"
              id={compact ? undefined : c.id}
              key={c.id}
            >
              <div className="case-index">
                <span>0{i + 1}</span>
                <p>{c.topic[locale]}</p>
              </div>
              <div className="case-copy">
                <p className="eyebrow">
                  {manuscript
                    ? t("Manuscript under review", "Manuscrito em avaliação")
                    : t(
                        "Primary study in progress",
                        "Estudo primário em andamento",
                      )}
                </p>
                <h3>
                  {compact ? (
                    <Link
                      href={`${localizedPath("/research", locale)}#${c.id}`}
                    >
                      {c.title[locale]} <ArrowIcon />
                    </Link>
                  ) : (
                    c.title[locale]
                  )}
                </h3>
                <p>{c.question[locale]}</p>
                {!compact && (
                  <>
                    <dl className="case-facts">
                      <div>
                        <dt>{t("Design / data", "Desenho / dados")}</dt>
                        <dd>{c.design[locale]}</dd>
                      </div>
                      <div>
                        <dt>{t("My involvement", "Minha participação")}</dt>
                        <dd>{c.contribution[locale]}</dd>
                      </div>
                      <div>
                        <dt>{t("Stage", "Etapa")}</dt>
                        <dd>
                          {manuscript
                            ? t("Under review", "Em avaliação") +
                              (manuscript.journal
                                ? ` · ${manuscript.journal}`
                                : "")
                            : t(
                                "Cohort definition and extraction in progress",
                                "Definição e extração da coorte em andamento",
                              )}
                          <span className="case-date">
                            {t("Status documented", "Situação documentada")}:{" "}
                            {c.date}
                          </span>
                        </dd>
                      </div>
                    </dl>
                    <p>{c.detail[locale]}</p>
                    <a className="text-link" href={c.url}>
                      {t("View registration", "Ver registro")} ·{" "}
                      {c.registration} <ArrowIcon />
                    </a>
                    {manuscript && (
                      <p className="related-output">
                        <a
                          href={`${localizedPath("/research", locale)}#record-${manuscript.id}`}
                        >
                          {t("Manuscript citation", "Citação do manuscrito")}{" "}
                          <ArrowIcon direction="down" />
                        </a>
                      </p>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
    </div>
  );
}
export function Invitation({ locale }: { locale: Locale }) {
  return (
    <section className="invitation">
      <p className="eyebrow">
        {locale === "en"
          ? "Research · Learning · Collaboration"
          : "Pesquisa · Aprendizado · Colaboração"}
      </p>
      <h2>
        {locale === "en"
          ? "A conversation starts with a question."
          : "Uma conversa começa com uma pergunta."}
      </h2>
      <Link className="button-link" href={localizedPath("/contact", locale)}>
        {locale === "en" ? "Get in touch" : "Entre em contato"} <ArrowIcon />
      </Link>
    </section>
  );
}
