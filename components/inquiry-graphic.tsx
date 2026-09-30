/** Decorative vector artwork; the curves represent no patient or study data. */
export function InquiryGraphic({
  variant = "orbit",
}: {
  variant?: "orbit" | "flow";
}) {
  return (
    <svg
      className={`inquiry-graphic inquiry-graphic--${variant}`}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor">
        <circle cx="300" cy="300" r="236" strokeOpacity=".14" />
        <circle
          cx="300"
          cy="300"
          r="205"
          strokeOpacity=".12"
          strokeDasharray="2 7"
        />
        <path d="M300 40v520M40 300h520" strokeOpacity=".12" />
        {Array.from({ length: 38 }, (_, i) =>
          variant === "orbit" ? (
            <ellipse
              key={i}
              cx="300"
              cy="300"
              rx={68 + i * 3.6}
              ry={218 - i * 1.35}
              transform={`rotate(${i * 4.6 - 86} 300 300)`}
              strokeWidth=".8"
              strokeOpacity={0.12 + (i % 7) * 0.045}
            />
          ) : (
            <path
              key={i}
              d={`M${40 + i * 2} 480 C${140 + i * 4} ${50 + i * 3}, ${460 - i * 5} ${550 - i * 3}, ${560 - i * 2} 120`}
              strokeWidth="1"
              strokeOpacity={0.16 + (i % 5) * 0.07}
            />
          ),
        )}
        <circle cx="300" cy="64" r="5" fill="currentColor" stroke="none" />
        <circle cx="95.6" cy="418" r="5" fill="currentColor" stroke="none" />
        <circle cx="504.4" cy="418" r="5" fill="currentColor" stroke="none" />
        <path d="M291 300h18m-9-9v18" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
