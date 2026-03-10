import type { Metadata } from "next";
import { siteConfig } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Felipe de Carvalho Figueiredo for research collaboration, mentoring, and residency-related networking.",
  alternates: { canonical: "https://felipef.com/contact" },
};

const emailAddress = `${siteConfig.emailUser}@${siteConfig.emailDomain}`;

export default function ContactPage() {
  return (
    <>
      <section className="section card">
        <p className="eyebrow">Contact</p>
        <h1>Research and professional contact</h1>
        <p className="muted">Felipe welcomes messages related to research collaboration, mentorship, and residency-related networking opportunities.</p>
      </section>

      <section className="section grid-2">
        <article className="card">
          <h2>Email</h2>
          <p className="muted">To reduce bot scraping, the address is displayed with minimal obfuscation:</p>
          <p><strong>{siteConfig.emailUser} [at] {siteConfig.emailDomain}</strong></p>
          <a className="btn" href={`mailto:${emailAddress}`}>Open email client</a>
        </article>
        <article className="card">
          <h2>LinkedIn</h2>
          <p className="muted">Professional networking and collaboration messages.</p>
          <a className="btn" href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn placeholder (replace URL)</a>
        </article>
      </section>
    </>
  );
}
