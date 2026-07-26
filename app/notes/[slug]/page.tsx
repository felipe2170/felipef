import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { JsonLd } from "../../../components/json-ld";
import { formatNoteDate, getAllNotes, getNoteBySlug } from "../../../lib/notes";
import { pageMetadata } from "../../../lib/seo";
import { siteProfile } from "../../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const note = await getNoteBySlug(slug);
    return pageMetadata({
      title: note.title,
      description: note.summary,
      path: `/notes/${slug}`,
      locale: note.language,
    });
  } catch {
    return { robots: { index: false, follow: false } };
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  try {
    const note = await getNoteBySlug(slug);
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: note.title,
      description: note.summary,
      datePublished: note.date,
      dateModified: note.date,
      inLanguage: note.language,
      mainEntityOfPage: `${siteProfile.url}/notes/${note.slug}`,
      author: {
        "@type": "Person",
        name: siteProfile.name,
        url: siteProfile.url,
      },
      publisher: {
        "@type": "Person",
        name: siteProfile.name,
        url: siteProfile.url,
      },
    };

    return (
      <div className="page-frame inner-page">
        <JsonLd data={articleJsonLd} />
        <Breadcrumbs items={[{ label: "Notes", href: "/notes" }, { label: note.title }]} />

        <article className="note-article">
          <header>
            <p className="kicker">Note · Evidence synthesis</p>
            <h1>{note.title}</h1>
            <p className="note-article__summary">{note.summary}</p>
            <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          </header>
          <div className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
          <footer>
            <p>
              Written by <strong>{siteProfile.name}</strong>, medical student at{" "}
              {siteProfile.affiliation.shortName}.
            </p>
          </footer>
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
