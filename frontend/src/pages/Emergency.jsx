import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import EmergencyOverlay from "../components/emergency/EmergencyOverlay";
import EmergencyTimeline from "../components/emergency/EmergencyTimeline";
import MapPlaceholder from "../components/location/MapPlaceholder";
import useEmergencyFlow from "../hooks/useEmergencyFlow";
import { severityTone, severityLabel, typeLabel } from "../utils/format";

export default function Emergency() {
  const flow = useEmergencyFlow();
  const [simType, setSimType] = useState("ACCIDENT");

  const simOptions = [
    { value: "ACCIDENT", label: "Accident / Impact" },
    { value: "LOW_SPO2", label: "Low SpO₂" },
    { value: "ABNORMAL_HEART_RATE", label: "Abnormal Heart Rate" },
    { value: "COMBINED_EMERGENCY", label: "Combined Emergency" }
  ];

  const { phase, result, countdown, timelineStep } = flow;

  const showOverlay = phase === "countdown" || phase === "countdown-expired";

  return (
    <AppLayout>
      <Topbar
        title="Emergency Center"
        subtitle={
          phase === "help" || phase === "timeline" || phase === "done"
            ? "Response workflow in progress."
            : "System monitoring is active."
        }
        status={phase === "help" || phase === "timeline" ? "emergency" : "active"}
      />

      {/* Emergency overlay (countdown state) */}
      {showOverlay && (
        <EmergencyOverlay
          data={result}
          countdown={countdown}
          onSafe={() => {
            flow.markSafe();
            flow.startTimeline();
          }}
          onHelp={() => {
            flow.sendHelp();
            flow.startTimeline();
          }}
        />
      )}

      {/* Normal state */}
      {phase === "idle" && (
        <div className="panel">
          <Card className="mt-16" style={{ textAlign: "center", padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
            <h2 style={{ fontSize: 24, marginBottom: 8 }}>You are protected</h2>
            <p className="soft" style={{ margin: "0 auto", maxWidth: 420 }}>
              No active emergency events. RAKSHITA is continuously monitoring your safety signals
              and location.
            </p>
            <div className="row" style={{ justifyContent: "center", marginTop: 26, gap: 12 }}>
              <label className="soft" style={{ fontWeight: 600 }}>
                Scenario
              </label>
              <select
                className="input"
                style={{ width: 220 }}
                value={simType}
                onChange={(e) => setSimType(e.target.value)}
              >
                {simOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <Button size="lg" onClick={flow.openConfirm}>
                ⚠️ Simulate Emergency
              </Button>
            </div>
            <p className="muted" style={{ fontSize: 12.5, marginTop: 16 }}>
              Hackathon demo feature — creates a prototype emergency event and mock alerts only.
            </p>
          </Card>
        </div>
      )}

      {/* Confirmation modal */}
      <Modal
        open={phase === "confirm"}
        onClose={flow.closeConfirm}
        title="⚠️ Simulate Emergency?"
        description="This will create a demo emergency event and trigger the RAKSHITA response workflow."
        actions={
          <>
            <Button variant="ghost" onClick={flow.closeConfirm}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => flow.runSimulation(simType)}>
              Continue
            </Button>
          </>
        }
      />

      {/* Detecting state */}
      {phase === "detecting" && (
        <div className="state">
          <div className="spinner" />
          <div className="state-title">Detecting potential emergency…</div>
          <div className="state-desc">Capturing location, heart rate, and SpO₂ signals.</div>
        </div>
      )}

      {/* Safe state */}
      {phase === "safe" && (
        <div className="state">
          <div className="state-icon">✅</div>
          <div className="state-title">You're safe. No help sent.</div>
          <div className="state-desc">
            The simulated emergency event was acknowledged. RAKSHITA will continue monitoring.
          </div>
          <Button variant="ghost" onClick={flow.reset}>
            Back to Emergency Center
          </Button>
        </div>
      )}

      {/* Help state — show timeline */}
      {(phase === "help" || phase === "timeline" || phase === "done") && (
        <div className="panel">
          <Card>
            <div className="card-head">
              <div className="card-title">🚨 Emergency Response</div>
              <Badge tone="red">
                {result?.emergency ? `${severityLabel(result.emergency.severity)} severity` : "Escalating"}
              </Badge>
            </div>

            <div className="grid-main" style={{ marginTop: 8 }}>
              <div>
                <div className="card-title mb-16">Response timeline</div>
                <EmergencyTimeline activeSteps={timelineStep} />
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <div className="card-title mb-16">📍 Location</div>
                  <MapPlaceholder location={result?.location} />
                </div>
                <div>
                  <div className="card-title mb-16">Live signals</div>
                  <div className="emergency-data" style={{ margin: 0 }}>
                    <div className="emergency-row">
                      <span className="k">❤️ Heart Rate</span>
                      <span className="v">{result?.latestHealth?.heartRate ?? result?.emergency?.heartRate ?? "—"} BPM</span>
                    </div>
                    <div className="emergency-row">
                      <span className="k">🫁 SpO₂</span>
                      <span className="v">{result?.latestHealth?.spo2 ?? result?.emergency?.spo2 ?? "—"}%</span>
                    </div>
                    <div className="emergency-row">
                      <span className="k">Type</span>
                      <span className="v">{result?.emergency ? typeLabel(result.emergency.type) : "—"}</span>
                    </div>
                    <div className="emergency-row">
                      <span className="k">Alerts created</span>
                      <span className="v">{result?.alertsCreated ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {phase === "done" && (
              <div className="flex-between" style={{ marginTop: 24 }}>
                <div className="soft">
                  ✓ Emergency response complete in prototype workflow.
                </div>
                <Button variant="ghost" onClick={flow.reset}>
                  Reset
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
