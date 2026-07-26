import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import type { Note } from "./site";

const notesDirectory = path.join(process.cwd(), "content", "notes");

const noteSchema = z.object({
  title: z.string().trim().min(8),
  summary: z.string().trim().min(30),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  language: z.enum(["en", "pt-BR"]),
  status: z.enum(["draft", "published"]),
  image: z.string().trim().optional(),
});

function assertSafeSlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid note slug: ${slug}`);
  }
}

function readNoteFile(fileName: string) {
  const slug = fileName.replace(/\.md$/, "");
  assertSafeSlug(slug);

  const raw = fs.readFileSync(path.join(notesDirectory, fileName), "utf8");
  const parsed = matter(raw);
  const data = noteSchema.parse(parsed.data);

  return { slug, data, markdown: parsed.content };
}

export async function getAllNotes(): Promise<Note[]> {
  if (!fs.existsSync(notesDirectory)) return [];

  return fs
    .readdirSync(notesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map(readNoteFile)
    .filter(({ data }) => data.status === "published")
    .map(({ slug, data }) => ({ slug, ...data }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNoteBySlug(slug: string) {
  assertSafeSlug(slug);
  const filePath = path.join(notesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Note not found: ${slug}`);
  }

  const { data, markdown } = readNoteFile(`${slug}.md`);
  if (data.status !== "published") {
    throw new Error(`Note not published: ${slug}`);
  }

  const rendered = await marked.parse(markdown);
  const html = sanitizeHtml(rendered, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "strong",
      "em",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "code",
      "pre",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return { slug, ...data, html };
}

export function formatNoteDate(date: string, locale: "en" | "pt-BR" = "en") {
  return new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
