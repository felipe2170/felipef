import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { EmailReveal } from "../../components/email-reveal";
import { pageMetadata } from "../../lib/seo";
import { siteProfile } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Felipe de Carvalho Figueiredo about research collaboration, mentorship, and professional networking.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="page-frame inner-page contact-page">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <header className="page-intro">
        <p className="kicker">Contact</p>
        <h1>A good first message can be brief.</h1>
        <p className="page-intro__dek">
          Felipe welcomes thoughtful messages from physicians, researchers, mentors,
          and peers. A sentence about the context and the reason for reaching out is
          enough to begin.
        </p>
      </header>

      <section className="contact-ledger" aria-labelledby="contact-options">
        <h2 id="contact-options" className="sr-only">
          Contact options
        </h2>
        <article>
          <p className="contact-ledger__index">01</p>
          <div>
            <h3>Email</h3>
            <p>Best for research questions, introductions, and detailed context.</p>
          </div>
          <EmailReveal />
        </article>
        <article>
          <p className="contact-ledger__index">02</p>
          <div>
            <h3>LinkedIn</h3>
            <p>Best for professional introductions and keeping in touch.</p>
          </div>
          <a
            className="text-link text-link--large"
            href={siteProfile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            View profile <span aria-hidden="true">↗</span>
          </a>
        </article>
      </section>

      <aside className="contact-context">
        <p className="kicker">Particularly relevant</p>
        <ul>
          <li>Evidence-synthesis collaboration</li>
          <li>Research mentorship</li>
          <li>Anesthesiology and critical-care questions</li>
          <li>International clinical-research networking</li>
        </ul>
      </aside>
    </div>
  );
}
