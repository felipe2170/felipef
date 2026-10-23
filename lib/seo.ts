import type { Metadata } from "next";
import { siteProfile } from "./site";
const essentials = ["", "/about", "/research", "/projects", "/cv", "/contact"];
export function pageMetadata({
  title,
  description,
  path,
  locale = "en",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  locale?: "en" | "pt-BR";
  noIndex?: boolean;
}): Metadata {
  const canonical = siteProfile.url + path;
  const english = path.replace(/^\/pt-br/, "");
  const localized = essentials.includes(english);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localized
        ? {
            en: siteProfile.url + english,
            "pt-BR": siteProfile.url + "/pt-br" + english,
            "x-default": siteProfile.url + english,
          }
        : undefined,
    },
    robots:
      noIndex ||
      process.env.VERCEL_ENV === "preview" ||
      process.env.SITE_NOINDEX === "1"
        ? { index: false, follow: false }
        : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteProfile.name,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      images: [
        {
          url: siteProfile.url + "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteProfile.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteProfile.url + "/opengraph-image"],
    },
  };
}
