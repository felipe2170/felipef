import { Cv } from "@/components/pages/cv";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("cv");
export default function Page() {
  return <Cv />;
}
