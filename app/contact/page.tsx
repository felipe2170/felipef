import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact and public profile links for Felipe de Carvalho Figueiredo.",
  alternates: {
    canonical: "https://felipef.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">Contact</div>
        <h1>Contact</h1>
        <p className="lead">
          For collaborations, research discussions, or project-related contact,
          the public links below are the best starting points.
        </p>
      </section>

      <section className="section">
        <div className="grid">
          <article className="card">
            <h3>GitHub</h3>
            <p className="muted">Code, repositories, and technical work.</p>
            <a
              href="https://github.com/felipe2170"
              target="_blank"
              rel="noreferrer"
            >
              github.com/felipe2170
            </a>
          </article>

          <article className="card">
            <h3>Instagram</h3>
            <p className="muted">Public identity handle.</p>
            <a
              href="https://www.instagram.com/felipedcfigueiredo/"
              target="_blank"
              rel="noreferrer"
            >
              @felipedcfigueiredo
            </a>
          </article>

          <article className="card">
            <h3>Medium</h3>
            <p className="muted">Public writing archive.</p>
            <a
              href="https://medium.com/@felipedcfigueiredo"
              target="_blank"
              rel="noreferrer"
            >
              medium.com/@felipedcfigueiredo
            </a>
          </article>
        </div>
      </section>

      <section className="section">
        <p className="kicker">Note</p>
        <p className="muted">
          This page is intentionally simple and indexable so that search engines
          can connect the site with the rest of the public identity footprint
          associated with Felipe de Carvalho Figueiredo.
        </p>
      </section>
    </>
  );
}