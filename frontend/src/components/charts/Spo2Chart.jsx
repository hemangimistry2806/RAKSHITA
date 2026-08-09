import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatTime } from "../../utils/format";

export default function Spo2Chart({ data = [] }) {
  const chartData = data.map((r) => ({
    time: formatTime(r.recordedAt),
    spo2: r.spo2
  }));

  return (
    <div style={{ height: 220, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="spo2-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" tick={{ fill: "#6b7686", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[80, 100]} tick={{ fill: "#6b7686", fontSize: 11 }} axisLine={false} tickLine={false} width={34} />
          <Tooltip
            contentStyle={{ background: "#10141c", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 13 }}
            labelStyle={{ color: "#aab4c3" }}
          />
          <Area type="monotone" dataKey="spo2" stroke="#22c55e" strokeWidth={2.5} fill="url(#spo2-grad)" name="SpO₂" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
