import Link from "next/link";
import { siteProfile } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">{siteProfile.name}</p>
          <p className="site-footer__meta">
            Medical student · {siteProfile.affiliation.shortName}
          </p>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link href="/pt-br" lang="pt-BR">
            Em português
          </Link>
          <a href={siteProfile.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#top">Back to top ↑</a>
        </nav>
        <p className="site-footer__legal">
          © {new Date().getFullYear()} · {siteProfile.location}
        </p>
      </div>
    </footer>
  );
}
