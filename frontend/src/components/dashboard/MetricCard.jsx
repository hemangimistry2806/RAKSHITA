import Card from "../ui/Card";
import Sparkline from "../charts/Sparkline";
import { heartRateStatus, spo2Status } from "../../utils/format";

const toneClass = {
  normal: "normal",
  warn: "warn",
  critical: "critical",
  muted: "muted"
};

export default function MetricCard({ icon, iconTone = "cyan", label, value, unit, status, trend, sparkData, color }) {
  return (
    <Card hover className="metric-card">
      <div className={`metric-icon ${iconTone}`}>{icon}</div>
      <div>
        <div className="metric-value">
          {value}
          {unit && <span style={{ fontSize: 16, color: "var(--text-muted)", fontWeight: 600 }}> {unit}</span>}
        </div>
        <div className="metric-label">{label}</div>
      </div>
      {trend && (
        <div className={`metric-status ${toneClass[trend.tone] || "muted"}`}>
          {trend.label}
        </div>
      )}
      {sparkData && sparkData.length > 0 && (
        <Sparkline data={sparkData} color={color} dataKey={label.replace(/\s/g, "-")} />
      )}
    </Card>
  );
}

export { heartRateStatus, spo2Status };
