import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { timeAgo } from "../../utils/format";

export default function MapPlaceholder({ location, label = "LIVE LOCATION" }) {
  const hasLocation = location && location.latitude != null && location.longitude != null;
  const accuracy = location?.accuracy != null ? location.accuracy.toFixed(1) : null;

  return (
    <div className="map-pan">
      <div className="map-legend">
        <Badge tone="red">▲ {label}</Badge>
        <Badge tone="cyan">GPS ACTIVE</Badge>
      </div>
      <div className="map-center">
        <div className="map-pin">
          <span>📍</span>
        </div>
        <span className="map-tag">
          <span className="dot pulse" />
          {hasLocation
            ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
            : "Acquiring accurate position…"}
        </span>
      </div>
      <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <span className="badge muted">◦ Map preview — placeholder</span>
        <span className="badge muted">
          {hasLocation ? `Accuracy ±${accuracy}m` : "No fix yet"}
          {location?.recordedAt ? ` · ${timeAgo(location.recordedAt)}` : ""}
        </span>
      </div>
    </div>
  );
}
