import type { MetadataRoute } from "next";
import { siteProfile } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api"],
    },
    sitemap: `${siteProfile.url}/sitemap.xml`,
    host: siteProfile.url,
  };
}
