import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resumo em Português",
  description:
    "Resumo em português do perfil de Felipe de Carvalho Figueiredo, estudante de medicina da UFMG com foco em anestesiologia, pesquisa e health-tech.",
  alternates: { canonical: "https://felipef.com/pt-br" },
};

export default function PortuguesePage() {
  return (
    <section className="section card">
      <p className="eyebrow">Português</p>
      <h1>Resumo profissional</h1>
      <p className="muted">Felipe de Carvalho Figueiredo é estudante de medicina da UFMG, em internato, com foco em anestesiologia, pesquisa clínica e tecnologia aplicada à saúde.</p>
      <p className="muted">Tem interesse em revisões sistemáticas, metanálise pareada e network meta-analysis, com foco em dor, via aérea, paciente crítico e queimados.</p>
      <p className="muted">Projetos selecionados: Internato Suite e Bayesian Triage Assistant. Contato principal por e-mail e LinkedIn na página de contato.</p>
      <p className="muted">Palavras-chave: Felipe de Carvalho Figueiredo médico, Felipe Figueiredo UFMG, pesquisa médica UFMG, anestesiologia Brasil.</p>
    </section>
  );
}
