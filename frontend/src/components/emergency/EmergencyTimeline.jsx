import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { key: "detected", label: "Emergency detected" },
  { key: "location", label: "Location captured" },
  { key: "created", label: "Emergency event created" },
  { key: "notified", label: "Trusted contacts notified" },
  { key: "escalation", label: "Response escalation active" }
];

export default function EmergencyTimeline({ activeSteps = 0 }) {
  return (
    <div className="timeline">
      {steps.map((step, i) => {
        const done = i < activeSteps;
        const isActive = i === activeSteps;
        return (
          <motion.div
            key={step.key}
            className={`timeline-item ${done ? "done" : ""} ${isActive ? "active" : ""}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.35 }}
          >
            <div className="timeline-title">
              {done ? "✓" : isActive ? "●" : "○"} {step.label}
            </div>
            {isActive && (
              <motion.div className="timeline-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                In progress…
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
