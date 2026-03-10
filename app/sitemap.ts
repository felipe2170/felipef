import type { MetadataRoute } from "next";
import { allRoutes, siteConfig } from "../lib/site";
import { getAllPosts } from "../lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = allRoutes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
