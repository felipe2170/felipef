import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `https://felipef.com/blog/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return (
      <article className="section card post">
        <p className="eyebrow">{post.date}</p>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    );
  } catch {
    notFound();
  }
}
