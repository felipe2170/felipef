import { Home } from "@/components/pages/home";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("home");
export default function Page() {
  return <Home />;
}
