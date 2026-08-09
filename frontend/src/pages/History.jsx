import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import useDashboardData from "../hooks/useDashboardData";
import { formatDate, formatTime, statusLabel, statusTone, severityTone, typeLabel, severityLabel } from "../utils/format";

export default function History() {
  const { events, loading, error, reload } = useDashboardData();
  const list = events || [];

  return (
    <AppLayout>
      <Topbar title="Emergency History" subtitle="A record of potential emergency events." />

      <div className="panel">
        {loading ? (
          <SkeletonCard />
        ) : error && !list.length ? (
          <ErrorState title="Unable to load history" message={error} onRetry={reload} />
        ) : list.length === 0 ? (
          <EmptyState
            icon="🗂️"
            title="No emergency events yet"
            description="Potential emergency events detected by your RAKSHITA band will appear here."
          />
        ) : (
          <Card>
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((ev) => (
                    <tr key={ev.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{formatDate(ev.detectedAt)}</div>
                        <div className="muted" style={{ fontSize: 12.5 }}>
                          {formatTime(ev.detectedAt)}
                        </div>
                      </td>
                      <td>
                        <Badge tone="cyan">{typeLabel(ev.type)}</Badge>
                      </td>
                      <td>
                        <Badge tone={severityTone(ev.severity)}>{severityLabel(ev.severity)}</Badge>
                      </td>
                      <td>
                        <Badge tone={statusTone(ev.status)}>{statusLabel(ev.status)}</Badge>
                      </td>
                      <td className="soft" style={{ fontSize: 13.5 }}>
                        {ev.triggerReason || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
