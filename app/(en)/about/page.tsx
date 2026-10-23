import { About } from "@/components/pages/about";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("about");
export default function Page() {
  return <About />;
}
