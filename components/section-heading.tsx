import type { ReactNode } from "react";

export function SectionHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: ReactNode;
  note?: string;
}) {
  return (
    <header className="section-heading">
      <p className="section-heading__number" aria-hidden="true">
        {number}
      </p>
      <h2>{title}</h2>
      {note ? <p className="section-heading__note">{note}</p> : null}
    </header>
  );
}
