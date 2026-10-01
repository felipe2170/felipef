import { ImageResponse } from "next/og";
import { siteProfile } from "../lib/site";

export const alt = `${siteProfile.name} — MD Candidate at UFMG`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          color: "#1e332c",
          background: "#f6f5ef",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #1e332c",
            paddingTop: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          <span>MD candidate · UFMG</span>
          <span style={{ color: "#315f4d" }}>
            Expected graduation · Dec 2026
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}
        >
          <span style={{ fontSize: 88, lineHeight: 0.95, letterSpacing: -4 }}>
            Felipe de Carvalho
          </span>
          <span style={{ fontSize: 88, lineHeight: 0.95, letterSpacing: -4 }}>
            Figueiredo
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: "2px solid #1e332c",
            paddingBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: 25,
          }}
        >
          <span style={{ maxWidth: 680 }}>
            Anesthesiology · Evidence synthesis · Health technology
          </span>
          <span>felipef.com ↗</span>
        </div>
      </div>
    ),
    size,
  );
}
