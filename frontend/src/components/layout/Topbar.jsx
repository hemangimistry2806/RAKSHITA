import StatusPill from "../ui/StatusPill";

export default function Topbar({ title, subtitle, status = "active" }) {
  return (
    <div className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="topbar-actions">
        <StatusPill
          label={status === "active" ? "RAKSHITA ACTIVE" : status === "pending" ? "CHECK REQUIRED" : "RAKSHITA ACTIVE"}
          tone={status === "pending" ? "amber" : status === "emergency" ? "red" : "green"}
        />
      </div>
    </div>
  );
}
