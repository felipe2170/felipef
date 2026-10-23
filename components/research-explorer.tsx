"use client";
import { ArrowIcon } from "@/components/arrow-icon";

import { useEffect, useState } from "react";
import type { Locale, ResearchRecord } from "@/lib/research";
const filters = [
  "all",
  "studies",
  "manuscripts",
  "accepted",
  "presented",
] as const;
type Filter = (typeof filters)[number];
const labels = {
  en: [
    "All work",
    "Studies",
    "Manuscripts",
    "Accepted conference outputs",
    "Past presentations",
  ],
  "pt-BR": [
    "Todos os trabalhos",
    "Estudos",
    "Manuscritos",
    "Trabalhos aceitos em congressos",
    "Apresentações realizadas",
  ],
};
export function ResearchExplorer({
  records,
  locale = "en",
}: {
  records: ResearchRecord[];
  locale?: Locale;
}) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const f = params.get("type");
      setFilter(filters.includes(f as Filter) ? (f as Filter) : "all");
      setQuery(params.get("q") ?? "");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function update(q: string, f: Filter, replace = false) {
    setQuery(q);
    setFilter(f);
    const url = new URL(window.location.href);
    q ? url.searchParams.set("q", q) : url.searchParams.delete("q");
    f === "all"
      ? url.searchParams.delete("type")
      : url.searchParams.set("type", f);
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
    window.dispatchEvent(new Event("research-query-change"));
  }
  const visible = records.filter(
    (r) =>
      (filter === "all" || r.kind === filter) &&
      `${r.title} ${r.authors ?? ""} ${r.detail} ${r.registration ?? ""} ${r.stage} ${r.tags}`
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .includes(
          query
            .trim()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase(),
        ),
  );
  return (
    <div className="research-explorer">
      <div className="research-toolbar">
        <label className="research-search">
          <span>{t("Search research", "Buscar trabalhos")}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => update(e.target.value, filter, true)}
            placeholder={t(
              "Topic, author or registration…",
              "Tema, autor ou registro…",
            )}
          />
        </label>
        <div
          className="research-filters"
          role="group"
          aria-label={t(
            "Filter research by type",
            "Filtrar trabalhos por tipo",
          )}
        >
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => update(query, f)}
            >
              {labels[locale][i]}
            </button>
          ))}
        </div>
      </div>
      <div className="research-results-meta">
        <p role="status" aria-atomic="true">
          {visible.length}{" "}
          {t(
            visible.length === 1
              ? "record · studies and outputs"
              : "records · studies and outputs",
            visible.length === 1
              ? "registro · estudos e produtos de pesquisa"
              : "registros · estudos e produtos de pesquisa",
          )}
        </p>
        {(query || filter !== "all") && (
          <button type="button" onClick={() => update("", "all")}>
            {t("Clear filters", "Limpar filtros")} <ArrowIcon />
          </button>
        )}
      </div>
      {visible.length ? (
        <ol className="research-records">
          {visible.map((r, i) => (
            <li key={r.id} id={`record-${r.id}`}>
              <span className="research-record__number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="record-topline">
                  <span className="status-tag">{r.stage}</span>
                  {r.year && <span>{r.year}</span>}
                  <span>{labels[locale][filters.indexOf(r.kind)]}</span>
                </div>
                <h3 lang={r.kind === "studies" ? locale : "en"}>
                  <a
                    href={`#record-${r.id}`}
                    aria-label={t("Link to: ", "Link para: ") + r.title}
                  >
                    {r.title}
                  </a>
                </h3>
                {r.authors && (
                  <p className="record-authors">
                    {r.authors.replace(/\.$/, "")}.
                  </p>
                )}
                <p>{r.detail}</p>
                {r.url && (
                  <a className="text-link" href={r.url}>
                    {r.registration} <ArrowIcon />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="research-empty">
          <h3>{t("No matching work.", "Nenhum trabalho encontrado.")}</h3>
          <p>
            {t(
              "Try a broader topic or clear the filters.",
              "Tente um tema mais amplo ou limpe os filtros.",
            )}
          </p>
          <button
            type="button"
            className="button-link"
            onClick={() => update("", "all")}
          >
            {t("Show all research", "Mostrar todos os trabalhos")}
          </button>
        </div>
      )}
    </div>
  );
}
