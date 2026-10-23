import { Software } from "@/components/pages/software";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("projects");
export default function Page() {
  return <Software />;
}
