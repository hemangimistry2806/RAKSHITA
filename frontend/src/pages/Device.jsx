import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import useDashboardData from "../hooks/useDashboardData";
import { timeAgo } from "../utils/format";

// Live clock for the band screen
function LiveClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return time;
}

export default function Device() {
  const { devices, loading, error, reload } = useDashboardData();
  const device = devices[0] || null;
  const connected = device?.connectionStatus === "CONNECTED";

  const sensors = [
    { label: "Heart Rate", on: true },
    { label: "SpO₂", on: true },
    { label: "Accelerometer", on: true },
    { label: "Activity", on: true },
    { label: "GPS", on: connected }
  ];

  return (
    <AppLayout>
      <Topbar title="RAKSHITA Band" subtitle="Your wearable safety device." />

      {loading ? (
        <div className="grid-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : error && !device ? (
        <ErrorState title="Unable to load device" message={error} onRetry={reload} />
      ) : (
        <div className="grid-2 panel">
          <Card>
            <div className="card-head">
              <div className="card-title">⌚ RAKSHITA BAND</div>
              <Badge tone={connected ? "green" : "amber"}>
                {connected ? "● Connected" : "Offline"}
              </Badge>
            </div>
            <div className="device-visual">
              <div className="band">
                <div className="band-screen">
                  <div className="band-time">{LiveClock()}</div>
                  <div className="soft" style={{ fontSize: 12 }}>
                    {connected ? "● Active" : "● Offline"}
                  </div>
                </div>
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                {device?.deviceName || "RAKSHITA Band"}
              </div>
            </div>
          </Card>

          <Card>
            <div className="card-title mb-16">🔋 Device Status</div>
            <div className="sensor-list">
              <div className="sensor-row">
                <span className="k">Battery</span>
                <span className="v" style={{ fontWeight: 700 }}>
                  {device?.batteryLevel ?? 87}%
                </span>
              </div>
              <div className="sensor-row">
                <span className="k">Last synchronized</span>
                <span className="v">{timeAgo(device?.lastSeenAt)}</span>
              </div>
              <div className="sensor-row">
                <span className="k">Identifier</span>
                <span className="v">{device?.deviceIdentifier || "RAKSHITA-DEMO-001"}</span>
              </div>
            </div>

            <div className="card-title mt-24 mb-16">Sensors</div>
            <div className="sensor-list">
              {sensors.map((s) => (
                <div className="sensor-row" key={s.label}>
                  <span className="k">{s.label}</span>
                  <span className="v" style={{ color: s.on ? "var(--green)" : "var(--text-muted)" }}>
                    {s.on ? "✓ On" : "◦ Off"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
