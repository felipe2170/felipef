import Link from "next/link";
import { JsonLd } from "./json-ld";
import { siteProfile } from "../lib/site";

type Breadcrumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const allItems = [{ label: "Profile", href: "/" }, ...items];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteProfile.url}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {allItems.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={index === allItems.length - 1 ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
