import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog / News",
  description:
    "Academic and professional updates from Felipe de Carvalho Figueiredo. Structured for long-term SEO and authority building.",
  alternates: { canonical: "https://felipef.com/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="section card">
        <p className="eyebrow">Blog / News</p>
        <h1>Academic and professional updates</h1>
        <p className="muted">This section is designed for publication updates, research reflections, and institutional milestones.</p>
      </section>

      <section className="section grid-2">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <p className="eyebrow">{post.date}</p>
            <h2>{post.title}</h2>
            <p className="muted">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="btn">Read entry</Link>
          </article>
        ))}
      </section>
    </>
  );
}
