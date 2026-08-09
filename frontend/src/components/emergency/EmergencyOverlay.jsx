import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

// Full-screen red emergency countdown overlay shown right after a detection.
export default function EmergencyOverlay({ data, countdown, onSafe, onHelp }) {
  const { emergency, location, health } = data || {};

  return (
    <AnimatePresence>
      <motion.div
        className="emergency-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="emergency-card"
          initial={{ scale: 0.95, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <div className="flex-between">
            <div>
              <div className="badge red" style={{ fontSize: 13, marginBottom: 10 }}>
                ⚠️ POTENTIAL EMERGENCY DETECTED
              </div>
              <h2 style={{ fontSize: 24 }}>
                {emergency?.type ? emergency.type.replace(/_/g, " ") : "Impact event"} detected
              </h2>
              <p className="soft" style={{ margin: "6px 0 0" }}>
                {emergency?.triggerReason || "Abnormal safety signals received from your RAKSHITA band."}
              </p>
            </div>
          </div>

          <div className="countdown">{countdown}</div>
          <p className="soft" style={{ textAlign: "center", margin: 0 }}>
            Confirm your status before help is escalated.
          </p>

          <div className="emergency-data">
            <div className="emergency-row">
              <span className="k">❤️ Heart Rate</span>
              <span className="v">{health?.heartRate ?? emergency?.heartRate ?? "—"} BPM</span>
            </div>
            <div className="emergency-row">
              <span className="k">🫁 SpO₂</span>
              <span className="v">{health?.spo2 ?? emergency?.spo2 ?? "—"}%</span>
            </div>
            <div className="emergency-row">
              <span className="k">📍 Location</span>
              <span className="v">
                {location?.latitude !== undefined && location?.latitude !== null
                  ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                  : "Acquired"}
              </span>
            </div>
          </div>

          <div className="emergency-actions">
            <Button variant="success" size="lg" block onClick={onSafe}>
              ✓ I'M SAFE
            </Button>
            <Button variant="danger" size="lg" block onClick={onHelp}>
              🚨 SEND HELP
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
