import { permanentRedirect } from "next/navigation";

export default async function LegacyBlogPostPage() {
  permanentRedirect("/notes");
}
