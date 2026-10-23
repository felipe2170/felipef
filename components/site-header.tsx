"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localizedPath, type Locale } from "@/lib/locale";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Software" },
  { href: "/cv", label: "CV" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const pt = locale === "pt-BR";
  const pathname = usePathname();
  const labels = [
    "Sobre",
    "Pesquisa",
    "Software",
    "CV",
    "Textos (EN)",
    "Contato",
  ];
  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    const sync = () =>
      setQueryString(
        (window.location.pathname.endsWith("/research")
          ? window.location.search
          : "") + window.location.hash,
      );
    sync();
    window.addEventListener("research-query-change", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("research-query-change", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [pathname]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 961px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el instanceof HTMLElement);
    const inertBefore = background.map((el) => el.inert);
    document.body.style.overflow = "hidden";
    background.forEach((el) => {
      el.inert = true;
    });
    nav.current?.querySelector<HTMLElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          menuButton.current,
          ...Array.from(
            nav.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
          ),
        ].filter((el): el is HTMLElement => el !== null);
        const first = items[0],
          last = items[items.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !items.includes(document.activeElement as HTMLElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((el, i) => {
        el.inert = inertBefore[i];
      });
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          className="wordmark"
          href={localizedPath("/", locale)}
          onClick={() => setMenuOpen(false)}
          title={pt ? "Início" : "Home"}
        >
          <span className="wordmark__monogram" aria-hidden="true">
            ff
          </span>
          <span className="wordmark__name">Felipe C. Figueiredo</span>
        </Link>

        <div
          className="navigation-container"
          role={menuOpen ? "dialog" : undefined}
          aria-modal={menuOpen ? true : undefined}
          aria-label={
            menuOpen
              ? pt
                ? "Menu de navegação"
                : "Navigation menu"
              : undefined
          }
        >
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? (pt ? "Fechar" : "Close") : "Menu"}</span>
            <span className="menu-toggle__mark" aria-hidden="true" />
          </button>

          <nav
            ref={nav}
            id="primary-navigation"
            className="primary-nav"
            data-open={menuOpen ? "true" : "false"}
            aria-label={pt ? "Navegação principal" : "Primary navigation"}
          >
            <div className="primary-nav__links">
              {navigation.map((entry, index) => {
                const item = {
                  ...entry,
                  href:
                    entry.href === "/blog"
                      ? entry.href
                      : localizedPath(entry.href, locale),
                  label: pt ? labels[index] : entry.label,
                };
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setMenuOpen(false);
                      if (menuOpen && pathname === item.href) {
                        menuButton.current?.focus();
                      }
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="primary-nav__utility">
              <Link
                href={
                  (pt
                    ? pathname.replace(/^\/pt-br/, "") || "/"
                    : pathname.startsWith("/blog")
                      ? "/pt-br"
                      : localizedPath(pathname, "pt-BR")) + queryString
                }
                onClick={() => setMenuOpen(false)}
                lang={pt ? "en" : "pt-BR"}
                aria-label={pt ? "Read in English" : "Ler em português"}
              >
                {pt ? "EN" : "PT"}
              </Link>
              <ThemeToggle locale={locale} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
