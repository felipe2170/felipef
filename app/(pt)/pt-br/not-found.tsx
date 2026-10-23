import Link from "next/link";
export default function NotFound() {
  return (
    <section className="not-found page-frame">
      <p className="eyebrow">404 · Página não encontrada</p>
      <h1>Esta página não faz parte do perfil atual.</h1>
      <p>O endereço pode ter mudado.</p>
      <Link className="text-link" href="/pt-br">
        Voltar ao perfil
      </Link>
    </section>
  );
}
