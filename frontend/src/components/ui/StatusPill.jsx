export default function StatusPill({ label = "RAKSHITA ACTIVE", tone = "green" }) {
  return (
    <span className={`status-pill ${tone === "red" ? "red" : tone === "amber" ? "amber" : ""}`}>
      <span className="dot pulse" />
      {label}
    </span>
  );
}
