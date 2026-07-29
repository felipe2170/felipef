import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import type { BlogPost } from "./site";

const blogDirectory = path.join(process.cwd(), "content", "blog");

const postSchema = z.object({
  title: z.string().trim().min(8),
  summary: z.string().trim().min(30),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  language: z.enum(["en", "pt-BR"]).default("en"),
  status: z.enum(["draft", "published"]).default("published"),
  image: z.string().trim().optional(),
});

type ParsedPost = {
  slug: string;
  data: z.infer<typeof postSchema>;
  markdown: string;
  readingMinutes: number;
};

export type BlogPostSummary = BlogPost & {
  readingMinutes: number;
};

function assertSafeSlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid blog slug: ${slug}`);
  }
}

function estimateReadingMinutes(markdown: string) {
  const words = markdown
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function readPostFile(fileName: string): ParsedPost {
  const slug = fileName.replace(/\.md$/, "");
  assertSafeSlug(slug);

  const raw = fs.readFileSync(path.join(blogDirectory, fileName), "utf8");
  const parsed = matter(raw);
  const data = postSchema.parse(parsed.data);

  return {
    slug,
    data,
    markdown: parsed.content,
    readingMinutes: estimateReadingMinutes(parsed.content),
  };
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  if (!fs.existsSync(blogDirectory)) return [];

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
    .map(readPostFile)
    .filter(({ data }) => data.status === "published")
    .map(({ slug, data, readingMinutes }) => ({
      slug,
      ...data,
      readingMinutes,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPostBySlug(slug: string) {
  assertSafeSlug(slug);
  const filePath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const { data, markdown, readingMinutes } = readPostFile(`${slug}.md`);
  if (data.status !== "published") {
    throw new Error(`Blog post not published: ${slug}`);
  }

  const rendered = await marked.parse(markdown);
  const html = sanitizeHtml(rendered, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
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
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return { slug, ...data, html, readingMinutes };
}

export function formatBlogDate(
  date: string,
  locale: "en" | "pt-BR" = "en",
) {
  return new Intl.DateTimeFormat(locale === "pt-BR" ? "pt-BR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
