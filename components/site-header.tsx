"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/", label: "Profile" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/notes", label: "Notes" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="FF Felipe C. Figueiredo — home">
          <span className="wordmark__monogram" aria-hidden="true">
            FF
          </span>
          <span className="wordmark__name">Felipe C. Figueiredo</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className="menu-toggle__mark" aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className="primary-nav"
          data-open={menuOpen ? "true" : "false"}
          aria-label="Primary navigation"
        >
          <div className="primary-nav__links">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="primary-nav__utility">
            <Link href="/pt-br" lang="pt-BR">
              PT
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
