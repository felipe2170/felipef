import type { Metadata } from "next";
import { siteProfile } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale?: "en" | "pt-BR";
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  locale = "en",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = `${siteProfile.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages:
        path === "" || path === "/pt-br"
          ? {
              en: siteProfile.url,
              "pt-BR": `${siteProfile.url}/pt-br`,
              "x-default": siteProfile.url,
            }
          : undefined,
    },
    robots: noIndex
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
          url: "/opengraph-image",
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
      images: ["/opengraph-image"],
    },
  };
}
