import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import MetricCard from "../components/dashboard/MetricCard";
import HeartRateChart from "../components/charts/HeartRateChart";
import Spo2Chart from "../components/charts/Spo2Chart";
import ActivityChart from "../components/charts/ActivityChart";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import useDashboardData from "../hooks/useDashboardData";
import { heartRateStatus, spo2Status } from "../utils/format";

export default function Health() {
  const { health, readings, loading, error, reload } = useDashboardData();

  const hrTrend = readings.filter((r) => r.heartRate != null).map((r) => r.heartRate).slice(-12);
  const spTrend = readings.filter((r) => r.spo2 != null).map((r) => r.spo2).slice(-12);
  const stepTrend = readings.filter((r) => r.steps != null).map((r) => r.steps).slice(-12);

  const hr = heartRateStatus(health?.heartRate);
  const sp = spo2Status(health?.spo2);

  return (
    <AppLayout>
      <Topbar title="Health & Activity" subtitle="Real-time wellness signals from your RAKSHITA band." />

      {loading ? (
        <div className="metric-grid">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState title="Unable to load health data" message={error} onRetry={reload} />
      ) : (
        <>
          <motion.div
            className="metric-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.06 }}
          >
            <MetricCard icon="❤️" iconTone="cyan" label="Heart Rate" value={health?.heartRate ?? "—"} unit="BPM" trend={hr} sparkData={hrTrend} color="#22d3ee" />
            <MetricCard icon="🫁" iconTone="green" label="SpO₂" value={health?.spo2 ?? "—"} unit="%" trend={sp} sparkData={spTrend} color="#22c55e" />
            <MetricCard icon="🚶" iconTone="blue" label="Steps" value={health?.steps != null ? health.steps.toLocaleString() : "—"} trend={{ label: "Today", tone: "normal" }} sparkData={stepTrend} color="#6366f1" />
          </motion.div>

          <div className="panel">
            <Card title="❤️ Heart Rate" icon="">
              <HeartRateChart data={readings} />
            </Card>
          </div>

          <div className="grid-2 panel">
            <Card title="🫁 SpO₂" icon="">
              <Spo2Chart data={readings} />
            </Card>
            <Card title="🚶 Activity" icon="">
              <ActivityChart data={readings} />
            </Card>
          </div>
        </>
      )}
    </AppLayout>
  );
}
