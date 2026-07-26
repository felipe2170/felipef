import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false, follow: false },
};

export default function CvPage() {
  notFound();
}
