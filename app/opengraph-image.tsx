import { ImageResponse } from "next/og";
import { siteProfile } from "../lib/site";

export const alt = `${siteProfile.name} — Medical Student at UFMG`;
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
          color: "#181714",
          background: "#f2eee6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #181714",
            paddingTop: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          <span>Academic profile</span>
          <span style={{ color: "#823d32" }}>UFMG · Medicine</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 930 }}>
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
            borderBottom: "2px solid #181714",
            paddingBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontSize: 25,
          }}
        >
          <span style={{ maxWidth: 680 }}>
            Clinical medicine · Evidence synthesis · Health technology
          </span>
          <span>felipef.com ↗</span>
        </div>
      </div>
    ),
    size,
  );
}
