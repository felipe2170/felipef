import { ArrowIcon } from "@/components/arrow-icon";
import { ResearchExplorer } from "@/components/research-explorer";
import { cases, getResearchRecords, type Locale } from "@/lib/research";
import { primaryStudies, researchContribution } from "@/lib/site";
import { Intro, SelectedCases, Invitation } from "./shared";
export function Research({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <div className="page-frame inner-page">
      <Intro
        locale={locale}
        kicker={t("Research", "Pesquisa")}
        title={t(
          "From a clinical question to a testable study.",
          "Da pergunta clínica ao estudo.",
        )}
      >
        <p>
          {t(
            "My work brings together evidence synthesis and retrospective clinical-data research in perioperative and critical care.",
            "Meu trabalho reúne síntese de evidências e pesquisa retrospectiva com dados clínicos em medicina perioperatória e terapia intensiva.",
          )}
        </p>
      </Intro>
      <nav
        className="on-this-page"
        aria-label={t("On this page", "Nesta página")}
      >
        <a href="#selected">
          {t("Selected studies", "Estudos selecionados")}{" "}
          <ArrowIcon direction="down" />
        </a>
        <a href="#research-library">
          {t("All work", "Todos os trabalhos")} <ArrowIcon direction="down" />
        </a>
        <a href="#primary-studies">
          {t("Primary research", "Pesquisa primária")}{" "}
          <ArrowIcon direction="down" />
        </a>
      </nav>
      <section id="selected" className="section-block">
        <h2>
          {t("Three questions, in detail.", "Três perguntas, em detalhe.")}
        </h2>
        <SelectedCases locale={locale} />
      </section>
      <section id="research-library" className="section-block">
        <p className="eyebrow">
          {t("The complete collection", "A coleção completa")}
        </p>
        <h2>{t("Studies and their outputs.", "Estudos e seus produtos.")}</h2>
        <p className="section-dek">
          {t(
            "Browse studies, manuscripts, and conference work. Manuscripts under review are not published articles; acceptance for presentation does not imply delivery.",
            "Explore estudos, manuscritos e trabalhos de congresso. Manuscritos em avaliação ainda não são artigos publicados; o aceite não significa que a apresentação já ocorreu.",
          )}
        </p>
        {locale === "pt-BR" && (
          <p className="fine-print">
            Títulos e citações científicas mantidos no idioma original.
          </p>
        )}
        <ResearchExplorer
          records={getResearchRecords(locale)}
          locale={locale}
        />
      </section>
      <section id="primary-studies" className="section-block prose-section">
        <p className="eyebrow">{t("Primary studies", "Estudos primários")}</p>
        <h2>
          {t("The work behind the models.", "O trabalho por trás dos modelos.")}
        </h2>
        {primaryStudies.map((s) => (
          <article key={s.id}>
            <h3>
              {locale === "en"
                ? s.shortTitle
                : s.id === "opioid-stewardship"
                  ? cases[2].title[locale]
                  : "Alertas de hipotensão após traumatismo cranioencefálico"}
            </h3>
            <p>
              {locale === "en"
                ? s.description
                : s.id === "opioid-stewardship"
                  ? "Estudo retrospectivo com MIMIC-IV/MIMIC-IV-Note. A validação está planejada; não há validação concluída ou benefício clínico demonstrado."
                  : "Estudo com MIMIC-IV sobre atraso de registro, frequência das observações e transportabilidade. Simulações de Monte Carlo em andamento."}
            </p>
            <details>
              <summary>
                {s.registration
                  ? t(
                      "Exact registered title (English)",
                      "Título registrado (inglês)",
                    )
                  : t(
                      "Full study title (English)",
                      "Título completo do estudo (inglês)",
                    )}
              </summary>
              <p lang="en">{s.title}</p>
            </details>
            {s.url && (
              <a className="text-link" href={s.url}>
                {s.registration} <ArrowIcon />
              </a>
            )}
          </article>
        ))}
      </section>
      <section className="methods-note">
        <p className="eyebrow">
          {t("Research experience", "Experiência em pesquisa")}
        </p>
        <h2>{t("A collaborative process.", "Um processo colaborativo.")}</h2>
        <p>
          {locale === "en"
            ? researchContribution
            : "Em revisões selecionadas como primeiro autor, participei da formulação da pergunta e do protocolo, busca e seleção da literatura, coordenação, redação e submissão. Análises estatísticas foram realizadas em R quando aplicável; todas as etapas das revisões envolveram pelo menos dois pesquisadores."}
        </p>
      </section>
      <Invitation locale={locale} />
    </div>
  );
}
