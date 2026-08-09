import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import MetricCard from "../components/dashboard/MetricCard";
import MapPlaceholder from "../components/location/MapPlaceholder";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import useDashboardData from "../hooks/useDashboardData";
import { useAuth } from "../context/AuthContext";
import { greeting, timeAgo, heartRateStatus, spo2Status } from "../utils/format";

export default function Dashboard() {
  const { user } = useAuth();
  const { health, readings, location, devices, loading, error, reload, offline } = useDashboardData();

  const firstName = (user?.name || "there").split(" ")[0];
  const hr = heartRateStatus(health?.heartRate);
  const sp = spo2Status(health?.spo2);
  const battery = devices[0]?.batteryLevel ?? 87;
  const deviceConnected = devices[0]?.connectionStatus === "CONNECTED";

  const hrTrend = readings.filter((r) => r.heartRate != null).map((r) => r.heartRate).slice(-12);
  const spTrend = readings.filter((r) => r.spo2 != null).map((r) => r.spo2).slice(-12);
  const stepTrend = readings.filter((r) => r.steps != null).map((r) => r.steps).slice(-12);

  return (
    <AppLayout>
      <Topbar
        title={`${greeting()}, ${firstName} 👋`}
        subtitle="Your safety system is active."
      />

      {offline && (
        <div className="badge amber" style={{ marginBottom: 16 }}>
          ◦ Offline demo mode — showing sample data
        </div>
      )}

      {loading ? (
        <div className="metric-grid">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState title="Unable to load dashboard" message={error} onRetry={reload} />
      ) : (
        <>
          <motion.div
            className="metric-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.06 }}
          >
            <MetricCard
              icon="❤️"
              iconTone="cyan"
              label="Heart Rate"
              value={health?.heartRate ?? "—"}
              unit="BPM"
              trend={hr}
              sparkData={hrTrend}
              color="#22d3ee"
            />
            <MetricCard
              icon="🫁"
              iconTone="green"
              label="SpO₂"
              value={health?.spo2 ?? "—"}
              unit="%"
              trend={sp}
              sparkData={spTrend}
              color="#22c55e"
            />
            <MetricCard
              icon="🚶"
              iconTone="blue"
              label="Steps"
              value={health?.steps != null ? health.steps.toLocaleString() : "—"}
              unit=""
              trend={{ label: "Today", tone: "normal" }}
              sparkData={stepTrend}
              color="#6366f1"
            />
            <MetricCard
              icon="🔋"
              iconTone="amber"
              label="Device"
              value={battery ?? "—"}
              unit="%"
              trend={{
                label: deviceConnected ? "Connected" : "Disconnected",
                tone: deviceConnected ? "normal" : "warn"
              }}
            />
          </motion.div>

          <div className="grid-main hero-pane">
            <div className="card">
              <div className="card-head">
                <div className="card-title">📍 Live Location</div>
                <Badge tone="green">Protected</Badge>
              </div>
              <MapPlaceholder location={location} />
              <div className="soft" style={{ marginTop: 12, fontSize: 13 }}>
                Last updated {timeAgo(location?.recordedAt)}
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="card-title">🛡️ Safety Status</div>
                <Badge tone="green">Active</Badge>
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                <div className="live-row">
                  <span className="k">Heart Rate</span>
                  <span className="v">{health?.heartRate ?? "—"} BPM</span>
                </div>
                <div className="live-row">
                  <span className="k">SpO₂</span>
                  <span className="v">{health?.spo2 ?? "—"}%</span>
                </div>
                <div className="live-row">
                  <span className="k">Device</span>
                  <span className="v">{deviceConnected ? "Connected" : "Disconnected"}</span>
                </div>
                <div className="live-row">
                  <span className="k">Battery</span>
                  <span className="v">{battery}%</span>
                </div>
              </div>
              <Link to="/emergency" style={{ display: "block", marginTop: 18 }}>
                <Button variant="ghost" block>
                  Open Emergency Center
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
}
