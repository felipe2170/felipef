import { ArrowIcon } from "../components/arrow-icon";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { InquiryGraphic } from "../components/inquiry-graphic";
import { getAllBlogPosts, formatBlogDate } from "../lib/blog";
import { pageMetadata } from "../lib/seo";
import { siteProfile, primaryStudies, experiences } from "../lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "MD candidate · Research & health technology",
    description: siteProfile.description,
    path: "",
  }),
  title: { absolute: `${siteProfile.name} — MD Candidate at UFMG` },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${siteProfile.name} — Academic profile`,
  url: siteProfile.url,
  dateModified: siteProfile.updatedAt,
  inLanguage: "en",
  mainEntity: {
    "@type": "Person",
    name: siteProfile.name,
    url: siteProfile.url,
    image: `${siteProfile.url}/images/felipe-portrait.jpg`,
    description: siteProfile.description,
    affiliation: {
      "@type": siteProfile.affiliation.type,
      name: siteProfile.affiliation.name,
      alternateName: "UFMG",
    },
    sameAs: [siteProfile.links.linkedin, siteProfile.links.github],
    knowsAbout: ["Anesthesiology", "Evidence synthesis", "Health technology"],
  },
};

export default async function HomePage() {
  const posts = (await getAllBlogPosts()).slice(0, 3);
  return (
    <>
      <JsonLd data={personJsonLd} />
      <section
        className="profile-hero page-frame"
        aria-labelledby="profile-title"
      >
        <div className="profile-hero__copy">
          <p className="eyebrow">
            <span className="status-dot" /> MD candidate · UFMG · Class of 2026
          </p>
          <h1 id="profile-title">
            Felipe{" "}
            <span>
              Figueiredo<span className="name-period">.</span>
            </span>
          </h1>
          <p className="profile-hero__line">
            Clinical questions.
            <br />
            <em>Careful evidence.</em> Useful tools.
          </p>
          <p className="profile-hero__description">
            I’m a final-year medical student in Brazil, developing my work in
            anesthesiology, clinical research, and health technology.
          </p>
          <div className="hero-actions">
            <Link href="/research" className="button-link">
              Explore my research <ArrowIcon direction="diagonal" />
            </Link>
            <Link href="/cv" className="secondary-link">
              View curriculum vitae <ArrowIcon direction="right" />
            </Link>
          </div>
          <div className="hero-location">
            <span aria-hidden="true">◎</span> Belo Horizonte, Brazil{" "}
            <span className="hero-location__separator">/</span> Open to research
            conversations
          </div>
        </div>
        <div className="hero-atlas">
          <div className="hero-atlas__top">
            <span>A practice of inquiry</span>
            <span>01 — 03</span>
          </div>
          <InquiryGraphic />
          <span className="atlas-label atlas-label--one">
            Clinical medicine
          </span>
          <span className="atlas-label atlas-label--two">Evidence</span>
          <span className="atlas-label atlas-label--three">Technology</span>
          <div className="atlas-identity">
            <div className="atlas-portrait">
              <Image
                src="/images/felipe-portrait.jpg"
                alt="Portrait of Felipe Figueiredo"
                fill
                sizes="108px"
                priority
              />
            </div>
            <div>
              <p>Felipe de Carvalho Figueiredo</p>
              <span>
                Medical student, UFMG
                <br />
                Expected graduation · December 2026
              </span>
            </div>
            <span className="atlas-identity__mark">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </section>

      <nav
        className="profile-wayfinding page-frame"
        aria-label="Explore this profile"
      >
        <Link href="/about">
          <span>01 / Background</span>
          <strong>Meet Felipe</strong>
          <ArrowIcon direction="diagonal" />
        </Link>
        <Link href="/research">
          <span>02 / Current work</span>
          <strong>Research & methods</strong>
          <ArrowIcon direction="diagonal" />
        </Link>
        <Link href="/projects">
          <span>03 / In practice</span>
          <strong>Tools for medical training</strong>
          <ArrowIcon direction="diagonal" />
        </Link>
      </nav>

      <section
        className="home-section page-frame"
        aria-labelledby="approach-title"
      >
        <div className="section-label">
          <span>01</span>
          <p>Clinical direction</p>
        </div>
        <div className="approach-layout">
          <h2 id="approach-title">
            Good questions connect
            <br />
            <em>
              medicine, research,
              <br />
              and useful software.
            </em>
          </h2>
          <div className="approach-copy">
            <p>
              My principal clinical interest is anesthesiology. I’m interested
              in how evidence can inform decisions in perioperative and critical
              care, and how technology can support the people making them.
            </p>
            <p>
              My experience spans preclinical cardiovascular research, a
              transplant microbiome cohort, evidence synthesis, and a 10-week
              clinical clerkship at CHU Lille in France.
            </p>
            <Link className="text-link" href="/about">
              More about my background <ArrowIcon direction="diagonal" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="research-feature"
        aria-labelledby="current-research-title"
      >
        <div className="page-frame">
          <div className="section-label">
            <span>02</span>
            <p>Research in progress</p>
          </div>
          <div className="section-title-row">
            <h2 id="current-research-title">
              From a clinical question
              <br />
              <em>to a testable study.</em>
            </h2>
            <Link className="text-link" href="/research">
              Browse all research <ArrowIcon direction="diagonal" />
            </Link>
          </div>
          <div className="study-preview-grid">
            {primaryStudies
              .filter((s) => s.status === "published")
              .map((study, i) => (
                <article className="study-preview" key={study.shortTitle}>
                  <div className="study-preview__head">
                    <span>Study 0{i + 1}</span>
                    <span>MIMIC-IV · Ongoing</span>
                  </div>
                  <div className="study-line-art" aria-hidden="true">
                    <InquiryGraphic variant={i === 0 ? "flow" : "orbit"} />
                  </div>
                  <h3>{study.shortTitle}</h3>
                  <p>{study.stage}.</p>
                  <Link
                    className="text-link"
                    href={`/research#primary-studies`}
                  >
                    Study scope & status <ArrowIcon direction="diagonal" />
                  </Link>
                </article>
              ))}
          </div>
          <p className="research-feature__note">
            These studies are ongoing. Protocol registration and planned
            validation do not establish clinical effectiveness.
          </p>
        </div>
      </section>

      <section
        className="home-section page-frame"
        aria-labelledby="trajectory-title"
      >
        <div className="section-label">
          <span>03</span>
          <p>Training & experience</p>
        </div>
        <div className="section-title-row">
          <h2 id="trajectory-title">
            A clinical foundation.
            <br />
            <em>A broader perspective.</em>
          </h2>
          <Link className="text-link" href="/cv">
            Full experience & credentials <ArrowIcon direction="diagonal" />
          </Link>
        </div>
        <div className="experience-ledger">
          {experiences
            .filter((x) => x.status === "published")
            .map((item, i) => (
              <article key={item.title}>
                <span className="experience-ledger__index">0{i + 1}</span>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.title}</p>
                </div>
                <p>{item.description}</p>
                <span className="experience-ledger__date">{item.period}</span>
              </article>
            ))}
        </div>
      </section>

      <section
        className="tool-feature page-frame"
        aria-labelledby="clinia-title"
      >
        <div className="tool-feature__visual" aria-hidden="true">
          <div className="clinia-symbol">
            c<span>+</span>
          </div>
          <p>CLINIA</p>
          <span>A place for the work of learning.</span>
          <div className="tool-grid" />
        </div>
        <div className="tool-feature__copy">
          <p className="eyebrow">Open-source project · Medical education</p>
          <h2 id="clinia-title">
            Less friction.
            <br />
            <em>More room to learn.</em>
          </h2>
          <p>
            Clinia organizes clinical notes and case-log workflows during
            medical internship rotations. The September CV reports approximately
            200 users across multiple Brazilian medical schools.
          </p>
          <p className="fine-print">
            Educational workflow software. No clinical validation or
            patient-care benefit is claimed.
          </p>
          <Link href="/projects#clinia" className="text-link">
            Explore Clinia <ArrowIcon direction="diagonal" />
          </Link>
        </div>
      </section>

      <section
        className="home-section page-frame"
        aria-labelledby="writing-title"
      >
        <div className="section-label">
          <span>04</span>
          <p>From the notebook</p>
        </div>
        <div className="section-title-row">
          <h2 id="writing-title">
            Ideas worth
            <br />
            <em>working through.</em>
          </h2>
          <Link className="text-link" href="/blog">
            All writing <ArrowIcon direction="diagonal" />
          </Link>
        </div>
        <div className="writing-grid">
          {posts.map((post, i) => (
            <article key={post.slug}>
              <div
                className={`notebook-art notebook-art--${i}`}
                aria-hidden="true"
              >
                <InquiryGraphic variant={i === 1 ? "flow" : "orbit"} />
                <span>Field note / 0{i + 1}</span>
              </div>
              <p className="eyebrow">
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time> ·{" "}
                {post.readingMinutes} min
              </p>
              <h3>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                  <ArrowIcon />
                </Link>
              </h3>
              <p>{post.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="invitation page-frame">
        <p className="eyebrow">Research · Mentorship · Collaboration</p>
        <h2>
          A useful conversation
          <br />
          starts with <em>a question.</em>
        </h2>
        <Link className="button-link" href="/contact">
          Get in touch <ArrowIcon direction="diagonal" />
        </Link>
        <svg
          className="invitation__asterisk"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M100 30v43"
              transform={`rotate(${i * 30} 100 100)`}
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </section>
    </>
  );
}
