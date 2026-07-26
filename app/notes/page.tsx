import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { formatNoteDate, getAllNotes } from "../../lib/notes";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Notes",
  description:
    "Occasional notes by Felipe de Carvalho Figueiredo on clinical research, evidence synthesis, and medical education.",
  path: "/notes",
});

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Notes" }]} />

      <header className="page-intro page-intro--compact">
        <p className="kicker">Notes</p>
        <h1>Short observations on questions worth pursuing.</h1>
        <p className="page-intro__dek">
          Occasional writing on evidence synthesis, medical education, and the
          decisions that shape useful research.
        </p>
      </header>

      <section className="notes-index" aria-label="Published notes">
        {notes.map((note, index) => (
          <article key={note.slug}>
            <p className="notes-index__number">{String(index + 1).padStart(2, "0")}</p>
            <div>
              <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
              <h2>
                <Link href={`/notes/${note.slug}`}>{note.title}</Link>
              </h2>
              <p>{note.summary}</p>
            </div>
            <Link
              className="notes-index__arrow"
              href={`/notes/${note.slug}`}
              aria-label={`Read ${note.title}`}
            >
              ↗
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
