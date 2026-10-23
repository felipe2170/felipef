import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import { EmailReveal } from "@/components/email-reveal";
import { cvDownloads, siteProfile } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/research";
import { Intro } from "./shared";
export function Contact({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <div className="page-frame inner-page">
      <Intro
        locale={locale}
        kicker={t("Contact", "Contato")}
        title={t(
          "A good first message can be brief.",
          "Uma primeira mensagem pode ser breve.",
        )}
      >
        <p>
          {t(
            "I welcome conversations about evidence synthesis, anesthesiology, medical education, and research methods. Tell me what you’re working on and why you’re reaching out.",
            "Podemos conversar sobre síntese de evidências, anestesiologia, educação médica e métodos de pesquisa. Conte em que você está trabalhando e o motivo do contato.",
          )}
        </p>
      </Intro>
      <section
        className="contact-ledger"
        aria-label={t("Contact options", "Formas de contato")}
      >
        <article>
          <span>01</span>
          <div>
            <h2>Email</h2>
            <p>
              {t(
                "For research questions and introductions.",
                "Para perguntas de pesquisa e contatos profissionais.",
              )}
            </p>
          </div>
          <EmailReveal locale={locale} />
        </article>
        <article>
          <span>02</span>
          <div>
            <h2>LinkedIn</h2>
            <p>
              {t(
                "Professional background and keeping in touch.",
                "Trajetória profissional e contato.",
              )}
            </p>
          </div>
          <a className="text-link" href={siteProfile.links.linkedin}>
            {t("View profile", "Ver perfil")} <ArrowIcon />
          </a>
        </article>
        <article>
          <span>03</span>
          <div>
            <h2>{t("CV & code", "Currículo e código")}</h2>
            <p>
              {t(
                "A closer look at my work.",
                "Um olhar mais próximo sobre meu trabalho.",
              )}
            </p>
          </div>
          <div className="link-stack">
            <a className="text-link" href={cvDownloads.pdf} download>
              {t("Download CV (PDF)", "Baixar CV (PDF · inglês)")}{" "}
              <ArrowIcon direction="down" />
            </a>
            <Link className="text-link" href={localizedPath("/cv", locale)}>
              {t("Read the web CV", "Ler currículo online")} <ArrowIcon />
            </Link>
            <a className="text-link" href={siteProfile.links.github}>
              GitHub <ArrowIcon />
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
