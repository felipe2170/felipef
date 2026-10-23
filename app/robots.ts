import type { MetadataRoute } from "next";
import { siteProfile } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.VERCEL_ENV === "preview" ||
      process.env.SITE_NOINDEX === "1"
        ? { disallow: "/" }
        : { allow: "/", disallow: ["/api"] }),
    },
    sitemap: `${siteProfile.url}/sitemap.xml`,
    host: siteProfile.url,
  };
}
