"use client";

import { useState } from "react";

const mailbox = [102, 101, 108, 105, 105, 112, 101, 46, 102, 105, 103, 117, 101, 105, 114, 101, 100, 111];
const host = [104, 111, 116, 109, 97, 105, 108, 46, 99, 111, 109];

function decode(values: number[]) {
  return values.map((value) => String.fromCharCode(value)).join("");
}

export function EmailReveal() {
  const [revealed, setRevealed] = useState(false);
  const address = revealed ? `${decode(mailbox)}@${decode(host)}` : "";

  if (revealed) {
    return (
      <div className="email-reveal" aria-live="polite">
        <a className="text-link text-link--large" href={`mailto:${address}`}>
          {address}
        </a>
        <p>Use a clear subject line and include relevant context or links.</p>
      </div>
    );
  }

  return (
    <button className="text-link text-link--large email-button" type="button" onClick={() => setRevealed(true)}>
      Reveal email address <span aria-hidden="true">↗</span>
    </button>
  );
}
