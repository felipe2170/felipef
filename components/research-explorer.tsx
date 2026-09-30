"use client";

import { ArrowIcon } from "./arrow-icon";

import { useMemo, useState } from "react";
import type { Presentation, ResearchOutput } from "../lib/site";

type Filter =
  | "All work"
  | "Manuscripts"
  | "Accepted posters"
  | "Submitted abstracts"
  | "Past presentations";
const filters: Filter[] = [
  "All work",
  "Manuscripts",
  "Accepted posters",
  "Submitted abstracts",
  "Past presentations",
];
type Entry = {
  title: string;
  authors: string;
  year: number;
  category: Filter;
  stage: string;
  detail: string;
  registration?: string;
};

export function ResearchExplorer({
  manuscripts,
  presentations,
  submissions,
}: {
  manuscripts: ResearchOutput[];
  presentations: Presentation[];
  submissions: Presentation[];
}) {
  const [filter, setFilter] = useState<Filter>("All work");
  const [query, setQuery] = useState("");
  const entries = useMemo<Entry[]>(
    () => [
      ...manuscripts.map((m) => ({
        ...m,
        category: "Manuscripts" as Filter,
        detail: [
          m.methods,
          m.journal
            ? `${m.stage === "Under review" ? "Under review at" : "Prepared for submission to"} ${m.journal}`
            : null,
        ]
          .filter(Boolean)
          .join(" · "),
      })),
      ...presentations.map((p) => ({
        ...p,
        category: (p.format === "Accepted digital poster"
          ? "Accepted posters"
          : "Past presentations") as Filter,
        stage: p.format,
        detail: p.venue,
      })),
      ...submissions.map((p) => ({
        ...p,
        category: "Submitted abstracts" as Filter,
        stage: p.format,
        detail: p.venue,
      })),
    ],
    [manuscripts, presentations, submissions],
  );
  const visible = entries.filter(
    (e) =>
      (filter === "All work" || e.category === filter) &&
      `${e.title} ${e.authors} ${e.detail} ${e.registration ?? ""} ${e.stage}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <div className="research-explorer">
      <div className="research-toolbar">
        <div
          className="research-filters"
          role="group"
          aria-label="Filter research by type"
        >
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="research-search">
          <span>Search research</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Topic, author, or registration…"
          />
        </label>
      </div>
      <div className="research-results-meta">
        <p aria-live="polite" aria-atomic="true">
          {visible.length} {visible.length === 1 ? "entry" : "entries"}
          {filter !== "All work"
            ? ` · ${filter.toLowerCase()}`
            : " · manuscripts and conference work"}
        </p>
        {(query || filter !== "All work") && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All work");
            }}
          >
            Clear filters <ArrowIcon direction="diagonal" />
          </button>
        )}
      </div>
      {visible.length ? (
        <ol className="research-records">
          {visible.map((e, i) => (
            <li key={`${e.category}-${e.title}`}>
              <span className="research-record__number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="record-topline">
                  <span
                    className={`status-tag ${e.category === "Accepted posters" ? "status-tag--accepted" : ""}`}
                  >
                    {e.stage}
                  </span>
                  <span>{e.year}</span>
                </div>
                <h3>{e.title}</h3>
                <p className="record-authors">{e.authors}.</p>
                <p>{e.detail}</p>
                {e.registration && (
                  <p className="record-registration">{e.registration}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="research-empty">
          <h3>No matching work.</h3>
          <p>Try a broader topic or clear the filters to see all entries.</p>
          <button
            className="button-link"
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All work");
            }}
          >
            Show all research
          </button>
        </div>
      )}
    </div>
  );
}
