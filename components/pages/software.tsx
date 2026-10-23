import { ArrowIcon } from "@/components/arrow-icon";
import { CliniaWalkthrough } from "@/components/clinia-walkthrough";
import type { Locale } from "@/lib/research";
import { Intro, Invitation } from "./shared";
export function Software({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <div className="page-frame inner-page">
      <Intro
        locale={locale}
        kicker="Software"
        title={t(
          "Tools for the work of learning.",
          "Ferramentas para o aprendizado.",
        )}
      >
        <p>
          {t(
            "I build software around practical tasks in medical education. Clinia brings notes and case-log workflows into one student workspace.",
            "Desenvolvo software para tarefas práticas da educação médica. O Clinia reúne anotações e registros de casos em um espaço para o estudante.",
          )}
        </p>
      </Intro>
      <section id="clinia" className="software-intro">
        <div>
          <p className="eyebrow">{t("Medical education", "Educação médica")}</p>
          <h2>Clinia</h2>
          <p>
            {t(
              "Clinical rotations generate questions to revisit, cases to discuss, and experiences to document. Clinia organizes clinical notes and case logs across internship rotations.",
              "O internato gera perguntas para retomar, casos para discutir e experiências para documentar. O Clinia organiza anotações clínicas e registros de casos entre os rodízios.",
            )}
          </p>
          <div className="hero-actions">
            <a className="button-link" href="#walkthrough">
              {t("View walkthrough", "Ver fluxo ilustrativo")}{" "}
              <ArrowIcon direction="down" />
            </a>
            <a
              className="text-link"
              href="https://github.com/felipe2170/Clinia"
            >
              {t("View source", "Ver código")} <ArrowIcon />
            </a>
          </div>
        </div>
        <dl className="software-spec">
          <div>
            <dt>{t("My role", "Minha participação")}</dt>
            <dd>
              {t(
                "Clinical workflow, product structure, and implementation.",
                "Fluxo de aprendizado clínico, estrutura do produto e implementação.",
              )}
            </dd>
          </div>
          <div>
            <dt>{t("Implementation", "Implementação")}</dt>
            <dd>React · TypeScript · Vite · Material UI</dd>
          </div>
          <div>
            <dt>{t("Software registration", "Registro de software")}</dt>
            <dd>BR512025003190-4</dd>
          </div>
          <div>
            <dt>{t("Explore", "Conheça")}</dt>
            <dd>
              {t(
                "Source code and an illustrative workflow are available here.",
                "O código e um fluxo ilustrativo estão disponíveis aqui.",
              )}
            </dd>
          </div>
        </dl>
      </section>
      <section id="walkthrough" className="section-block">
        <h2>
          {t(
            "From a rotation to a learning record.",
            "Do rodízio ao registro de aprendizado.",
          )}
        </h2>
        <CliniaWalkthrough locale={locale} />
      </section>
      <section className="prose-section section-block">
        <h2>
          {t(
            "Designed around a student’s task.",
            "Pensado para a tarefa do estudante.",
          )}
        </h2>
        <p>
          {t(
            "The intended use is educational organization: connect a note to its rotation, record a question, and return to it later. The example above uses no patient information.",
            "A finalidade é a organização educacional: relacionar uma anotação ao rodízio, registrar uma pergunta e retomá-la depois. O exemplo acima não contém informações de pacientes.",
          )}
        </p>
        <p>
          {t(
            "This portfolio describes the student learning workflow. It does not establish clinical validation, educational effectiveness, or regulatory approval.",
            "Este portfólio descreve o fluxo de aprendizado do estudante. Não estabelece validação clínica, eficácia educacional ou aprovação regulatória.",
          )}
        </p>
      </section>
      <Invitation locale={locale} />
    </div>
  );
}
