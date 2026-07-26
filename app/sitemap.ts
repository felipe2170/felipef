import type { MetadataRoute } from "next";
import { getAllNotes } from "../lib/notes";
import { publicRoutes, siteProfile } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = publicRoutes.map((route, index) => ({
    url: `${siteProfile.url}${route}`,
    lastModified: siteProfile.updatedAt,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: index === 0 ? 1 : route === "/pt-br" ? 0.7 : 0.8,
  }));

  const notes = await getAllNotes();
  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${siteProfile.url}/notes/${note.slug}`,
    lastModified: note.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...noteRoutes];
}
