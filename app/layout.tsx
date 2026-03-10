import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://felipef.com"),
  title: {
    default: "Felipe de Carvalho Figueiredo | Medicine, Research, Health-Tech",
    template: "%s | Felipe de Carvalho Figueiredo",
  },
  description:
    "Felipe de Carvalho Figueiredo is a UFMG medical student focused on anesthesiology, clinical research, and health-tech projects.",
  applicationName: "Felipe de Carvalho Figueiredo",
  keywords: [
    "Felipe de Carvalho Figueiredo",
    "Felipe Figueiredo",
    "UFMG",
    "medical student",
    "anesthesiology",
    "clinical research",
    "health-tech",
    "Clinia",
    "Internato Suite",
  ],
  openGraph: {
    type: "website",
    url: "https://felipef.com",
    siteName: "Felipe de Carvalho Figueiredo",
    title: "Felipe de Carvalho Figueiredo | Medicine, Research, Health-Tech",
    description:
      "UFMG medical student focused on anesthesiology, clinical research, and health-tech projects.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe de Carvalho Figueiredo | Medicine, Research, Health-Tech",
    description:
      "UFMG medical student focused on anesthesiology, clinical research, and health-tech projects.",
  },
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg: #0b1020;
                --panel: #121933;
                --panel-2: #182140;
                --text: #e9eefc;
                --muted: #b8c1dd;
                --line: rgba(255, 255, 255, 0.12);
                --accent: #8fb4ff;
                --accent-2: #c6d7ff;
                --max: 1080px;
                --radius: 18px;
              }

              * { box-sizing: border-box; }
              html { scroll-behavior: smooth; }
              body {
                margin: 0;
                font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                background:
                  radial-gradient(circle at top left, rgba(143, 180, 255, 0.14), transparent 25%),
                  radial-gradient(circle at top right, rgba(198, 215, 255, 0.08), transparent 20%),
                  var(--bg);
                color: var(--text);
                line-height: 1.6;
              }

              a {
                color: var(--accent-2);
                text-decoration: none;
              }

              a:hover {
                text-decoration: underline;
              }

              .shell {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
              }

              .topbar {
                position: sticky;
                top: 0;
                z-index: 10;
                backdrop-filter: blur(10px);
                background: rgba(11, 16, 32, 0.82);
                border-bottom: 1px solid var(--line);
              }

              .topbar-inner,
              .content,
              .footer-inner {
                width: min(var(--max), calc(100% - 32px));
                margin: 0 auto;
              }

              .topbar-inner {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                padding: 16px 0;
              }

              .brand {
                font-weight: 700;
                letter-spacing: 0.01em;
                color: var(--text);
              }

              .nav {
                display: flex;
                flex-wrap: wrap;
                gap: 14px;
              }

              .nav a {
                color: var(--muted);
                font-weight: 500;
              }

              .nav a:hover {
                color: var(--text);
                text-decoration: none;
              }

              .content {
                width: min(var(--max), calc(100% - 32px));
                margin: 0 auto;
                padding: 48px 0 72px;
                flex: 1;
              }

              .hero {
                padding: 32px;
                border: 1px solid var(--line);
                border-radius: 28px;
                background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
              }

              .eyebrow {
                display: inline-block;
                margin-bottom: 12px;
                padding: 6px 10px;
                border-radius: 999px;
                background: rgba(143, 180, 255, 0.12);
                color: var(--accent-2);
                font-size: 0.88rem;
                font-weight: 600;
              }

              h1 {
                margin: 0 0 10px;
                font-size: clamp(2rem, 5vw, 3.7rem);
                line-height: 1.05;
                letter-spacing: -0.03em;
              }

              h2 {
                margin-top: 0;
                font-size: clamp(1.4rem, 3vw, 2rem);
                letter-spacing: -0.02em;
              }

              h3 {
                margin-top: 0;
                font-size: 1.1rem;
              }

              .lead {
                font-size: 1.1rem;
                color: var(--muted);
                max-width: 760px;
              }

              .actions {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-top: 24px;
              }

              .button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 12px 18px;
                border-radius: 999px;
                border: 1px solid var(--line);
                background: var(--panel);
                color: var(--text);
                font-weight: 600;
              }

              .button.primary {
                background: linear-gradient(180deg, #8fb4ff, #7ba4f8);
                color: #0b1020;
                border-color: transparent;
              }

              .section {
                margin-top: 28px;
                padding: 26px;
                border: 1px solid var(--line);
                border-radius: var(--radius);
                background: rgba(255, 255, 255, 0.025);
              }

              .grid {
                display: grid;
                gap: 18px;
                grid-template-columns: repeat(12, 1fr);
              }

              .card {
                grid-column: span 4;
                padding: 20px;
                border: 1px solid var(--line);
                border-radius: 16px;
                background: var(--panel);
              }

              .card.wide {
                grid-column: span 6;
              }

              .muted {
                color: var(--muted);
              }

              .list {
                margin: 0;
                padding-left: 20px;
              }

              .kicker {
                margin: 0 0 8px;
                color: var(--accent-2);
                font-size: 0.92rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
              }

              .footer {
                border-top: 1px solid var(--line);
              }

              .footer-inner {
                padding: 20px 0 40px;
                color: var(--muted);
                font-size: 0.95rem;
              }

              @media (max-width: 860px) {
                .card,
                .card.wide {
                  grid-column: span 12;
                }

                .topbar-inner {
                  align-items: flex-start;
                  flex-direction: column;
                }
              }
            `,
          }}
        />

        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand">
                Felipe de Carvalho Figueiredo
              </Link>

              <nav className="nav" aria-label="Primary navigation">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="content">{children}</main>

          <footer className="footer">
            <div className="footer-inner">
              © {new Date().getFullYear()} Felipe de Carvalho Figueiredo ·
              UFMG medical student · anesthesiology, clinical research, and
              health-tech
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}