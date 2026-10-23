import type { Locale } from "@/lib/research";
export function CliniaWalkthrough({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <figure className="walkthrough">
      <div className="walkthrough-top">
        <span className="clinia-wordmark">
          clinia<span> / </span>
        </span>
        <span>{t("A student’s workspace", "Um espaço para o internato")}</span>
      </div>
      <ol className="workflow-steps">
        <li>
          <span>01 / {t("Rotation", "Rodízio")}</span>
          <strong>{t("Anesthesiology", "Anestesiologia")}</strong>
          <p>
            {t(
              "Keep learning organized by placement.",
              "Organize o aprendizado por estágio.",
            )}
          </p>
        </li>
        <li>
          <span>02 / {t("Learning note", "Anotação de aprendizado")}</span>
          <strong>
            {t("A question to revisit", "Uma pergunta para retomar")}
          </strong>
          <p>
            {t(
              "What should I read before the next case discussion?",
              "O que devo ler antes da próxima discussão de caso?",
            )}
          </p>
        </li>
        <li>
          <span>03 / {t("Case log", "Registro de casos")}</span>
          <strong>
            {t("Connect the experience", "Relacione a experiência")}
          </strong>
          <p>
            {t(
              "Record a learning topic for later reflection.",
              "Registre um tema de aprendizado para reflexão posterior.",
            )}
          </p>
        </li>
      </ol>
      <figcaption>
        {t(
          "Illustrative workflow · synthetic entries. This is an explanation of the intended workflow, not a screenshot or live demo.",
          "Fluxo ilustrativo · exemplos fictícios. Esta é uma explicação do fluxo proposto, não uma captura do aplicativo nem uma demonstração ao vivo.",
        )}
      </figcaption>
    </figure>
  );
}
