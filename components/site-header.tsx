"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
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
          href="/"
          onClick={() => setMenuOpen(false)}
          aria-label="FF Felipe C. Figueiredo — home"
        >
          <span className="wordmark__monogram" aria-hidden="true">
            ff
          </span>
          <span className="wordmark__name">Felipe C. Figueiredo</span>
        </Link>

        <button
          ref={menuButton}
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
          ref={nav}
          id="primary-navigation"
          className="primary-nav"
          data-open={menuOpen ? "true" : "false"}
          aria-label="Primary navigation"
        >
          <div className="primary-nav__links">
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
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
              href={pathname === "/pt-br" ? "/" : "/pt-br"}
              onClick={() => setMenuOpen(false)}
              lang={pathname === "/pt-br" ? "en" : "pt-BR"}
              aria-label={
                pathname === "/pt-br" ? "Read in English" : "Ler em português"
              }
            >
              {pathname === "/pt-br" ? "EN" : "PT"}
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
