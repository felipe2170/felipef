import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/research";
import { Intro, Invitation } from "./shared";
export function About({ locale = "en" }: { locale?: Locale }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  return (
    <div className="page-frame inner-page">
      <Intro
        locale={locale}
        kicker={t("About", "Sobre")}
        title={t(
          "Medicine, with room to ask better questions.",
          "Medicina, com espaço para boas perguntas.",
        )}
      >
        <p>
          {t(
            "I’m Felipe, a final-year medical student at UFMG in Belo Horizonte. I expect to graduate in December 2026.",
            "Sou Felipe, estudante do último ano de medicina na UFMG, em Belo Horizonte. Minha formatura está prevista para dezembro de 2026.",
          )}
        </p>
      </Intro>
      <div className="about-layout">
        <aside className="identity-note">
          <p className="eyebrow">{t("My direction", "Meu caminho")}</p>
          <p>
            {t(
              "Anesthesiology. Perioperative medicine. Critical care.",
              "Anestesiologia. Medicina perioperatória. Terapia intensiva.",
            )}
          </p>
          <Link className="text-link" href={localizedPath("/cv", locale)}>
            {t("Full curriculum vitae", "Currículo completo")} <ArrowIcon />
          </Link>
        </aside>
        <div className="prose">
          <h2>{t("A clinical foundation", "Uma base clínica")}</h2>
          <p>
            {t(
              "My principal clinical interest is anesthesiology. In 2026, I completed a 10-week clerkship at CHU Lille in France, in Burn Anesthesia and Cardiothoracic Anesthesia. This clinical training sits alongside my medical education at UFMG.",
              "Meu principal interesse clínico é a anestesiologia. Em 2026, concluí um estágio de 10 semanas no CHU Lille, na França, em anestesia para queimados e anestesia cardiotorácica. Essa experiência clínica complementa minha formação médica na UFMG.",
            )}
          </p>
          <h2>
            {t(
              "From the laboratory to evidence synthesis",
              "Do laboratório à síntese de evidências",
            )}
          </h2>
          <p>
            {t(
              "At UFMG’s Hypertension Lab in 2022, I worked with preclinical cardiovascular experiments and physiological data. In 2024, at Instituto Alfa de Gastroenterology, I coordinated recruitment and informed consent and handled biospecimens for a prospective microbiome cohort of liver transplant recipients.",
              "No Laboratório de Hipertensão da UFMG, em 2022, trabalhei com experimentos cardiovasculares pré-clínicos e dados fisiológicos. Em 2024, no Instituto Alfa de Gastroenterologia, coordenei recrutamento e consentimento informado e trabalhei com amostras biológicas em uma coorte prospectiva de microbioma de receptores de transplante hepático.",
            )}
          </p>
          <p>
            {t(
              "My current research includes systematic reviews, meta-analyses, and retrospective clinical-data studies. I’m interested in questions that make a clinical decision clearer, and in methods that keep the limits of the evidence visible.",
              "Minha pesquisa atual inclui revisões sistemáticas, metanálises e estudos retrospectivos com dados clínicos. Interesso-me por perguntas que esclareçam decisões clínicas e por métodos que tornem visíveis os limites das evidências.",
            )}
          </p>
          <h2>{t("Teaching and building", "Ensinar e construir")}</h2>
          <p>
            {t(
              "As a Systemic Anatomy student tutor in 2022, I designed weekly review sessions and supervised cadaveric dissection for 16 medical students. My student volunteer work with Caminhos do Trabalho and the Brazilian Red Cross in 2025–2026 included health education and community outreach.",
              "Como monitor de Anatomia Sistêmica em 2022, organizei revisões semanais e supervisionei dissecação cadavérica para uma turma de 16 estudantes. Meu voluntariado como estudante no Caminhos do Trabalho e na Cruz Vermelha Brasileira, em 2025–2026, incluiu educação em saúde e ações comunitárias.",
            )}
          </p>
          <p>
            {t(
              "Since January 2026, I have worked as an Assistant Editor and Healthcare Consultant at Afya, writing educational content, reviewing language-model outputs, and contributing to a clinical-AI tool. I also develop Clinia, a tool for organizing learning notes and case-log workflows during internship rotations.",
              "Desde janeiro de 2026, trabalho como editor assistente e consultor em saúde na Afya, produzindo conteúdo educacional, revisando respostas de um modelo de linguagem e contribuindo para uma ferramenta de IA clínica. Também desenvolvo o Clinia, uma ferramenta para organizar anotações de aprendizado e registros de casos durante o internato.",
            )}
          </p>
          <Link className="text-link" href={localizedPath("/research", locale)}>
            {t("Explore the research", "Conheça a pesquisa")} <ArrowIcon />
          </Link>
        </div>
      </div>
      <Invitation locale={locale} />
    </div>
  );
}
