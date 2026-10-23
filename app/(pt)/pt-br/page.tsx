import { Home } from "@/components/pages/home";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("home", "pt-BR");
export default function Page() {
  return <Home locale="pt-BR" />;
}
