import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeToggle } from "../components/theme-toggle";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Felipe de Carvalho Figueiredo | Medical Student | UFMG",
    template: "%s | Felipe de Carvalho Figueiredo",
  },
  description:
    "Official website of Felipe de Carvalho Figueiredo, a Brazilian medical student at UFMG focused on anesthesiology, clinical research, and health technology.",
  keywords: [
    "Felipe de Carvalho Figueiredo",
    "Felipe Figueiredo UFMG",
    "Felipe de Carvalho Figueiredo Médico",
    "Felipe Figueiredo Médico",
    "Dr Felipe Figueiredo",
    "Felipe Figueiredo Doutor",
    "Felipe Figueiredo anesthesiology",
    "felipedcfigueiredo",
    "Felipe Figueiredo medicina",
    "Felipe Figueiredo saúde",
    "Felipe Figueiredo health-tech",
    "Felipe Figueiredo ECFMG",
    "Felipe Figueiredo consultas",
    "médico UFMG",
    "pesquisa médica",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Felipe de Carvalho Figueiredo | Medical Student | UFMG",
    description:
      "Brazilian medical student focused on anesthesiology, research, and health-tech, pursuing the ECFMG pathway.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe de Carvalho Figueiredo | Medical Student | UFMG",
    description:
      "Official website of Felipe de Carvalho Figueiredo (UFMG): research, projects, CV, and collaboration contact.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: siteConfig.url },
};

const navItems = [
  ["/", "Home"],
  ["/about", "About"],
  ["/research", "Research"],
  ["/projects", "Projects"],
  ["/cv", "CV"],
  ["/blog", "Blog / News"],
  ["/contact", "Contact"],
  ["/pt-br", "Português"],
] as const;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="container navline">
              <Link href="/" className="brand">
                Felipe C. Figueiredo
              </Link>
              <nav className="nav" aria-label="Main navigation">
                {navItems.map(([href, label]) => (
                  <Link href={href} key={href}>
                    {label}
                  </Link>
                ))}
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="container">
              © {new Date().getFullYear()} Felipe de Carvalho Figueiredo · UFMG · Pursuing ECFMG Certification.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
