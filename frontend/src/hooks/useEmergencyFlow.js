import { useCallback, useEffect, useRef, useState } from "react";
import { emergencyApi } from "../api/emergency";

// Handles the full emergency simulation state machine:
// idle -> confirm -> detecting -> countdown -> (safe | help) -> timeline -> done
export default function useEmergencyFlow() {
  const [phase, setPhase] = useState("idle"); // idle | confirm | detecting | countdown | safe | help | timeline | done
  const [result, setResult] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [timelineStep, setTimelineStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const openConfirm = () => {
    setError("");
    setPhase("confirm");
  };

  const closeConfirm = () => {
    if (phase === "confirm") setPhase("idle");
  };

  const runSimulation = async (type = "ACCIDENT") => {
    setPhase("detecting");
    setError("");

    let data;
    try {
      const res = await emergencyApi.simulate({
        type,
        impactDetected: true,
        userResponded: false
      });
      data = res;
    } catch {
      // Offline fallback so the hackathon demo always works
      const now = new Date().toISOString();
      data = {
        emergency: {
          id: "demo-ev-" + Date.now(),
          type,
          severity: "HIGH",
          status: "PENDING_CONFIRMATION",
          triggerReason: "impact signal detected (demo)",
          heartRate: 52,
          spo2: 89,
          latitude: 23.0225,
          longitude: 72.5714,
          detectedAt: now
        },
        location: { latitude: 23.0225, longitude: 72.5714, accuracy: 12.5, recordedAt: now },
        latestHealth: { heartRate: 52, spo2: 89, steps: 1240, recordedAt: now },
        alertsCreated: 2
      };
    }

    setResult(data);
    setPhase("countdown");
    setCountdown(10);

    // Countdown; if it reaches 0, auto-escalate to help
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          setPhase("countdown-expired");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const markSafe = () => {
    clearTimer();
    setPhase("safe");
  };

  const sendHelp = async () => {
    clearTimer();
    setPhase("help");
    // Automatically escalate the event in the backend if reachable
    try {
      if (result?.emergency?.id) {
        await emergencyApi.escalate(result.emergency.id);
      }
    } catch {
      /* offline demo */
    }
  };

  const startTimeline = () => {
    setPhase("timeline");
    setTimelineStep(0);
    // Animate 5 timeline steps
    setTimeout(() => setTimelineStep(1), 400);
    setTimeout(() => setTimelineStep(2), 900);
    setTimeout(() => setTimelineStep(3), 1500);
    setTimeout(() => setTimelineStep(4), 2200);
    setTimeout(() => setTimelineStep(5), 3000);
    setTimeout(() => setPhase("done"), 3600);
  };

  const reset = () => {
    clearTimer();
    setResult(null);
    setPhase("idle");
    setCountdown(10);
    setTimelineStep(0);
    setError("");
  };

  return {
    phase,
    result,
    countdown,
    timelineStep,
    busy,
    error,
    openConfirm,
    closeConfirm,
    runSimulation,
    markSafe,
    sendHelp,
    startTimeline,
    reset
  };
}
