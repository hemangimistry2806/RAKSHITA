import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import MapPlaceholder from "../components/location/MapPlaceholder";
import { SkeletonCard } from "../components/ui/Spinner";
import ErrorState from "../components/ui/ErrorState";
import useDashboardData from "../hooks/useDashboardData";
import { timeAgo } from "../utils/format";

export default function Location() {
  const { location, loading, error, reload } = useDashboardData();

  const hasLocation = location && location.latitude != null && location.longitude != null;

  return (
    <AppLayout>
      <Topbar title="Live Location" subtitle="Your current position and GPS status." />

      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <ErrorState title="Unable to load location" message={error} onRetry={reload} />
      ) : (
        <div className="panel">
          <Card>
            <div className="card-head">
              <div className="card-title">📍 Live Location</div>
              <Badge tone="green">Protected</Badge>
            </div>
            <MapPlaceholder location={location} />
            <div className="grid-2 mt-24">
              <div className="live-row">
                <span className="k">GPS Status</span>
                <span className="v">
                  <span className="dot pulse" style={{ display: "inline-block", marginRight: 6 }} />
                  {hasLocation ? "Active — fix acquired" : "Waiting for fix"}
                </span>
              </div>
              <div className="live-row">
                <span className="k">Last updated</span>
                <span className="v">{timeAgo(location?.recordedAt)}</span>
              </div>
              <div className="live-row">
                <span className="k">Latitude</span>
                <span className="v">{hasLocation ? location.latitude.toFixed(6) : "—"}</span>
              </div>
              <div className="live-row">
                <span className="k">Longitude</span>
                <span className="v">{hasLocation ? location.longitude.toFixed(6) : "—"}</span>
              </div>
              <div className="live-row">
                <span className="k">Accuracy</span>
                <span className="v">{location?.accuracy != null ? `±${location.accuracy.toFixed(1)}m` : "—"}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
