export function ArrowIcon({
  direction = "diagonal",
}: {
  direction?: "diagonal" | "right" | "down" | "up";
}) {
  return (
    <svg
      className={`arrow-icon arrow-icon--${direction}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
