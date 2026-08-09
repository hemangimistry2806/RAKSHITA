import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatTime } from "../../utils/format";

export default function ActivityChart({ data = [] }) {
  const chartData = (data || []).map((r, i) => ({
    time: formatTime(r.recordedAt),
    steps: r.steps ?? 0
  }));

  return (
    <div style={{ height: 220, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: "#6b7686", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#6b7686", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
          <Tooltip
            contentStyle={{ background: "#10141c", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 13 }}
            labelStyle={{ color: "#aab4c3" }}
          />
          <Bar dataKey="steps" fill="#6366f1" radius={[6, 6, 0, 0]} name="Steps" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
