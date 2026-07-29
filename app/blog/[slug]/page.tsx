import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { JsonLd } from "../../../components/json-ld";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
} from "../../../lib/blog";
import { pageMetadata } from "../../../lib/seo";
import { siteProfile } from "../../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);
    return pageMetadata({
      title: post.title,
      description: post.summary,
      path: `/blog/${slug}`,
      locale: post.language,
    });
  } catch {
    return { robots: { index: false, follow: false } };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const post = await getBlogPostBySlug(slug);
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: post.language,
      mainEntityOfPage: `${siteProfile.url}/blog/${post.slug}`,
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
        <Breadcrumbs
          items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        />

        <article className="note-article">
          <header>
            <p className="kicker">Blog · {post.readingMinutes} min read</p>
            <h1>{post.title}</h1>
            <p className="note-article__summary">{post.summary}</p>
            <time dateTime={post.date}>
              {formatBlogDate(post.date, post.language)}
            </time>
          </header>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
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
