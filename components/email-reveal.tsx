"use client";

import { ArrowIcon } from "./arrow-icon";

import { useEffect, useRef, useState } from "react";
const mailbox = [
  102, 101, 108, 105, 105, 112, 101, 46, 102, 105, 103, 117, 101, 105, 114, 101,
  100, 111,
];
const host = [104, 111, 116, 109, 97, 105, 108, 46, 99, 111, 109];
const address = `${String.fromCharCode(...mailbox)}@${String.fromCharCode(...host)}`;
export function EmailReveal({ locale = "en" }: { locale?: "en" | "pt-BR" }) {
  const t = (en: string, pt: string) => (locale === "en" ? en : pt);
  const [revealed, setRevealed] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const emailLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (revealed) emailLink.current?.focus();
  }, [revealed]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopyStatus(t("Email address copied.", "Endereço de email copiado."));
    } catch {
      setCopyStatus(
        t(
          "Copy unavailable. Select the email address to copy it.",
          "Cópia indisponível. Selecione o endereço de email para copiá-lo.",
        ),
      );
    }
  }
  return (
    <div className="email-reveal">
      {revealed ? (
        <>
          <a
            ref={emailLink}
            className="text-link text-link--large"
            href={`mailto:${address}`}
          >
            {address}
          </a>
          <br />
          <button type="button" onClick={copy}>
            {t("Copy email address", "Copiar endereço de email")}
          </button>
        </>
      ) : (
        <button
          className="text-link text-link--large email-button"
          type="button"
          onClick={() => setRevealed(true)}
        >
          {t("Reveal email address", "Mostrar endereço de email")}{" "}
          <ArrowIcon direction="diagonal" />
        </button>
      )}
      <p role="status">
        {copyStatus ||
          (revealed
            ? t(
                "Use a clear subject line and include relevant context or links.",
                "Use um assunto claro e inclua o contexto ou links relevantes.",
              )
            : "")}
      </p>
    </div>
  );
}
