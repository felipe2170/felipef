import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { formatBlogDate, getAllBlogPosts } from "../../lib/blog";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Research notes and professional updates by Felipe de Carvalho Figueiredo on evidence synthesis, anesthesiology, medical education, and health technology.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="page-frame inner-page">
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <header className="page-intro page-intro--compact">
        <p className="kicker">Blog & updates</p>
        <h1>Notes on evidence, clinical questions, and useful systems.</h1>
        <p className="page-intro__dek">
          Occasional academic and professional writing on evidence synthesis,
          anesthesiology-oriented questions, medical education, and health
          technology.
        </p>
      </header>

      {posts.length > 0 ? (
        <section className="notes-index blog-index" aria-label="Published posts">
          {posts.map((post, index) => (
            <article key={post.slug}>
              <p className="notes-index__number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="blog-index__meta">
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min read</span>
                </p>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.summary}</p>
              </div>
              <Link
                className="notes-index__arrow"
                href={`/blog/${post.slug}`}
                aria-label={`Read ${post.title}`}
              >
                ↗
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <p className="kicker">In preparation</p>
          <h2>The first post is being prepared.</h2>
          <p>Published Markdown files added to the blog folder will appear here.</p>
        </section>
      )}
    </div>
  );
}
