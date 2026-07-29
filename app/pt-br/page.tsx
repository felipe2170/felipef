import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../../components/json-ld";
import { pageMetadata } from "../../lib/seo";
import { projects, siteProfile } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Perfil em português",
  description:
    "Perfil de Felipe de Carvalho Figueiredo, estudante de medicina da UFMG com interesses em anestesiologia, pesquisa clínica e tecnologia em saúde.",
  path: "/pt-br",
  locale: "pt-BR",
});

const portugueseProfileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `Perfil de ${siteProfile.name} em português`,
  url: `${siteProfile.url}/pt-br`,
  inLanguage: "pt-BR",
  mainEntity: {
    "@type": "Person",
    name: siteProfile.name,
    url: siteProfile.url,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: siteProfile.affiliation.name,
      alternateName: siteProfile.affiliation.shortName,
    },
  },
};

export default function PortuguesePage() {
  return (
    <div className="page-frame inner-page portuguese-page" lang="pt-BR">
      <JsonLd data={portugueseProfileJsonLd} />
      <nav className="breadcrumbs" aria-label="Navegação estrutural">
        <ol>
          <li>
            <Link href="/">Perfil em inglês</Link>
          </li>
          <li>
            <span aria-current="page">Português</span>
          </li>
        </ol>
      </nav>

      <header className="page-intro">
        <p className="kicker">Perfil em português</p>
        <h1>Felipe de Carvalho Figueiredo</h1>
        <p className="page-intro__dek">
          Estudante de medicina da UFMG em fase final do internato, com formatura
          prevista para dezembro de 2026 e atuação em anestesiologia, síntese de
          evidências e tecnologia aplicada à saúde.
        </p>
      </header>

      <section className="portuguese-profile">
        <div>
          <p className="kicker">Formação e interesses</p>
          <p>
            Felipe desenvolve sua formação clínica na Universidade Federal de Minas
            Gerais, com atenção especial à anestesiologia, medicina perioperatória,
            manejo de vias aéreas, dor e cuidado ao paciente crítico.
          </p>
          <p>
            Em 2026, concluiu um estágio clínico de 10 semanas no CHU Lille, na
            França, com atividades em anestesia para pacientes queimados e anestesia
            cardiotorácica. Seus trabalhos atuais incluem revisões sistemáticas,
            metanálise pareada, metanálise em rede e revisão de evidências clínicas.
          </p>
          <p>
            Também atua como Assistant Editor e Healthcare Consultant na Afya,
            contribuindo para conteúdo educacional baseado em evidências e para a
            revisão de materiais clínicos gerados por inteligência artificial.
          </p>
        </div>
        <aside>
          <p className="kicker">Em síntese</p>
          <dl>
            <div>
              <dt>Instituição</dt>
              <dd>UFMG</dd>
            </div>
            <div>
              <dt>Etapa</dt>
              <dd>Internato · conclusão em dez. 2026</dd>
            </div>
            <div>
              <dt>Direção clínica</dt>
              <dd>Anestesiologia</dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>Belo Horizonte, MG</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="portuguese-projects">
        <p className="kicker">Projetos selecionados</p>
        {projects
          .filter((project) => project.status === "published")
          .map((project) => (
            <article key={project.slug}>
              <h2>{project.title}</h2>
              <p>
                {project.slug === "clinia"
                  ? "Aplicação web de código aberto para organizar anotações clínicas e registros de casos durante o internato."
                  : "Exploração educacional sobre probabilidade, incerteza e raciocínio de triagem."}
              </p>
              <span>
                {project.stage === "active" ? "Projeto ativo" : "Projeto conceitual"}
              </span>
            </article>
          ))}
      </section>

      <section className="closing-statement">
        <p className="kicker">Contato profissional</p>
        <h2>Aberto a conversas sobre pesquisa, mentoria e colaboração acadêmica.</h2>
        <Link className="text-link text-link--large" href="/contact">
          Ver formas de contato <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
