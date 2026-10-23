import { ArrowIcon } from "@/components/arrow-icon";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, formatBlogDate } from "@/lib/blog";
import { cvDownloads, siteProfile, acceptedAbstracts } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/research";
import { JsonLd } from "@/components/json-ld";
import { CliniaWalkthrough } from "@/components/clinia-walkthrough";
import { SelectedCases, Invitation } from "./shared";
export async function Home({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  const path = (p: string) => localizedPath(p, locale);
  const posts = await getAllBlogPosts();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: siteProfile.url + path("/").replace(/\/$/, ""),
          inLanguage: locale,
          dateModified: siteProfile.updatedAt,
          mainEntity: {
            "@type": "Person",
            name: siteProfile.name,
            url: siteProfile.url,
            description: siteProfile.description,
            affiliation: {
              "@type": "CollegeOrUniversity",
              name: siteProfile.affiliation.name,
            },
            sameAs: Object.values(siteProfile.links),
          },
        }}
      />
      <div className="page-frame">
        <section className="portrait-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              {t("M.D. candidate · UFMG", "Estudante de medicina · UFMG")}
            </p>
            <h1>
              Felipe C.
              <br />
              <em>Figueiredo.</em>
            </h1>
            <p className="hero-direction">
              {t(
                "Clinical questions. Careful evidence. Useful tools.",
                "Perguntas clínicas. Evidências. Ferramentas úteis.",
              )}
            </p>
            <p className="hero-description">
              {t(
                "I’m a final-year medical student working across anesthesiology, evidence synthesis, and software for medical learning.",
                "Estou no último ano de medicina, desenvolvendo meu trabalho em anestesiologia, síntese de evidências e software para o aprendizado médico.",
              )}
            </p>
            <div className="hero-actions">
              <Link className="button-link" href={path("/research")}>
                {t("View research", "Ver pesquisa")} <ArrowIcon />
              </Link>
              <a className="text-link" href={cvDownloads.pdf} download>
                {t("Download CV", "Baixar CV")} (PDF
                {locale === "pt-BR" ? " · inglês" : ""}){" "}
                <ArrowIcon direction="down" />
              </a>
            </div>
            <p className="hero-meta">
              {t(
                "Belo Horizonte, Brazil · Graduation expected December 2026",
                "Belo Horizonte, Brasil · Formatura prevista para dezembro de 2026",
              )}
            </p>
          </div>
          <figure className="hero-portrait">
            <div className="portrait-crop">
              <Image
                src="/images/felipe-portrait.jpg"
                alt={t(
                  "Portrait of Felipe Figueiredo",
                  "Retrato de Felipe Figueiredo",
                )}
                width={1280}
                height={1920}
                sizes="(max-width: 600px) 112px, (max-width: 960px) 36vw, 380px"
                priority
              />
            </div>
            <figcaption>
              <span>01 / {t("In training", "Em formação")}</span>
              <p>
                {t(
                  "Medicine at UFMG. A direction in anesthesiology.",
                  "Medicina na UFMG. Um caminho na anestesiologia.",
                )}
              </p>
            </figcaption>
          </figure>
        </section>
        <section className="section-block selected-research">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">
                01 / {t("Selected research", "Pesquisa selecionada")}
              </p>
              <h2>
                {t(
                  "Questions I’m working on.",
                  "Perguntas em que estou trabalhando.",
                )}
              </h2>
            </div>
            <Link className="text-link" href={path("/research")}>
              {t("All research", "Todos os trabalhos")} <ArrowIcon />
            </Link>
          </div>
          <SelectedCases locale={locale} compact />
          <p className="research-update">
            {t(
              `${acceptedAbstracts.filter((o) => o.status === "published").length} abstracts accepted for presentation at SCCM Critical Care Congress 2027.`,
              `${acceptedAbstracts.filter((o) => o.status === "published").length} resumos aceitos para apresentação no SCCM Critical Care Congress 2027.`,
            )}{" "}
            <Link href={path("/research") + "?type=accepted#research-library"}>
              {t("View conference work", "Ver trabalhos de congresso")}{" "}
              <ArrowIcon />
            </Link>
          </p>
        </section>
        <section className="software-feature section-block">
          <div>
            <p className="eyebrow">02 / Software</p>
            <h2>
              {t(
                "A place for the work of learning.",
                "Um lugar para organizar o aprendizado.",
              )}
            </h2>
            <p>
              {t(
                "I built Clinia around a practical part of medical training: keeping clinical learning notes and case logs organized across internship rotations.",
                "Desenvolvi o Clinia para uma necessidade prática da formação médica: organizar anotações de aprendizado clínico e registros de casos ao longo do internato.",
              )}
            </p>
            <Link
              className="text-link"
              href={path("/projects") + "#walkthrough"}
            >
              {t("View the Clinia walkthrough", "Conheça o fluxo do Clinia")}{" "}
              <ArrowIcon />
            </Link>
          </div>
          <CliniaWalkthrough locale={locale} />
        </section>
        <section className="section-block">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">
                03 / {t("A clinical foundation", "Uma base clínica")}
              </p>
              <h2>
                {t(
                  "Training, research, and practice.",
                  "Formação, pesquisa e prática.",
                )}
              </h2>
            </div>
            <Link className="text-link" href={path("/about")}>
              {t("My background", "Minha trajetória")} <ArrowIcon />
            </Link>
          </div>
          <div className="trajectory">
            <article>
              <span>2026</span>
              <h3>CHU Lille</h3>
              <p>
                {t(
                  "Completed a 10-week clerkship in Burn Anesthesia and Cardiothoracic Anesthesia.",
                  "Estágio clínico de 10 semanas concluído em anestesia para queimados e anestesia cardiotorácica.",
                )}
              </p>
            </article>
            <article>
              <span>{t("January 2026–present", "Janeiro de 2026–atual")}</span>
              <h3>Afya</h3>
              <p>
                {t(
                  "Assistant Editor and Healthcare Consultant. Educational writing, language-model quality control, and clinical-AI development.",
                  "Editor assistente e consultor em saúde. Conteúdo educacional, controle de qualidade de modelo de linguagem e desenvolvimento de IA clínica.",
                )}
              </p>
            </article>
            <article>
              <span>
                {t("Expected December 2026", "Previsão: dezembro de 2026")}
              </span>
              <h3>UFMG</h3>
              <p>
                {t(
                  "Final-year medical student at the Federal University of Minas Gerais.",
                  "Estudante do último ano de medicina na Universidade Federal de Minas Gerais.",
                )}
              </p>
            </article>
          </div>
        </section>
        <section className="section-block">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">04 / {t("Writing", "Textos em inglês")}</p>
              <h2>
                {t("Notes from the work.", "Reflexões a partir do trabalho.")}
              </h2>
            </div>
            <Link className="text-link" href="/blog">
              {t("All writing", "Todos os textos (inglês)")} <ArrowIcon />
            </Link>
          </div>
          <div className="writing-list">
            {posts.map((p) => (
              <article key={p.slug}>
                <p className="eyebrow">
                  {formatBlogDate(p.date, locale)} · {p.readingMinutes} min
                </p>
                <h3 lang="en">
                  <Link href={"/blog/" + p.slug}>
                    {p.title} <ArrowIcon />
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
        <Invitation locale={locale} />
      </div>
    </>
  );
}
