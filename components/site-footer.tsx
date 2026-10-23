import { ArrowIcon } from "@/components/arrow-icon";
import Link from "next/link";
import { siteProfile } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/research";
export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const pt = locale === "pt-BR";
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">{siteProfile.name}</p>
          <p>
            {pt ? "Estudante de medicina · UFMG" : "Medical student · UFMG"}
          </p>
        </div>
        <nav aria-label={pt ? "Navegação do rodapé" : "Footer navigation"}>
          <Link href={localizedPath("/cv", locale)}>CV</Link>
          <Link href={localizedPath("/contact", locale)}>
            {pt ? "Contato" : "Contact"}
          </Link>
          <a href={siteProfile.links.linkedin}>
            LinkedIn <ArrowIcon />
          </a>
          <a href="#top">
            {pt ? "Voltar ao início" : "Back to top"}{" "}
            <ArrowIcon direction="up" />
          </a>
        </nav>
        <p className="site-footer__legal">
          © 2026 · Belo Horizonte, {pt ? "Brasil" : "Brazil"}
        </p>
      </div>
    </footer>
  );
}
