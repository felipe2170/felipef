import { Contact } from "@/components/pages/contact";
import { essentialMetadata } from "@/lib/page-info";
export const metadata = essentialMetadata("contact");
export default function Page() {
  return <Contact />;
}
