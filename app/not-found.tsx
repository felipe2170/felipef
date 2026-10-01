import { ArrowIcon } from "../components/arrow-icon";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found page-frame">
      <p className="kicker">404 · Not found</p>
      <h1>This page is not part of the current profile.</h1>
      <p>
        The address may have changed, or the material may not yet be ready for
        publication.
      </p>
      <Link className="text-link text-link--large" href="/">
        Return to the profile <ArrowIcon direction="diagonal" />
      </Link>
    </section>
  );
}
