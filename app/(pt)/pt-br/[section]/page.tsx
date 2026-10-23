import { notFound } from "next/navigation";
import { About } from "@/components/pages/about";
import { Research } from "@/components/pages/research";
import { Software } from "@/components/pages/software";
import { Cv } from "@/components/pages/cv";
import { Contact } from "@/components/pages/contact";
import { essentialMetadata } from "@/lib/page-info";
const pages = {
  about: About,
  research: Research,
  projects: Software,
  cv: Cv,
  contact: Contact,
};
type Key = keyof typeof pages;
export const dynamicParams = true;
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!(section in pages)) return {};
  return essentialMetadata(section as Key, "pt-BR");
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!(section in pages)) notFound();
  const Component = pages[section as Key];
  return <Component locale="pt-BR" />;
}
