const SIMULATION_DEFAULTS = {
  ACCIDENT: { impactDetected: true, userResponded: false },
  LOW_SPO2: { impactDetected: false, userResponded: false },
  ABNORMAL_HEART_RATE: { impactDetected: false, userResponded: false },
  COMBINED_EMERGENCY: { impactDetected: true, userResponded: false }
};

const evaluateEmergency = ({ type, latestHealth, impactDetected, userResponded, triggerReason }) => {
  const defaults = SIMULATION_DEFAULTS[type] || {};
  const impact = impactDetected ?? defaults.impactDetected ?? false;
  const responded = userResponded ?? defaults.userResponded ?? true;
  const heartRate = latestHealth?.heartRate;
  const spo2 = latestHealth?.spo2;

  const lowSpo2Signal = typeof spo2 === "number" && spo2 < 92;
  const abnormalHeartSignal = typeof heartRate === "number" && (heartRate > 130 || heartRate < 45);
  const multipleSignals = [impact, lowSpo2Signal, abnormalHeartSignal, !responded].filter(Boolean).length;

  let severity = "LOW";
  let status = "PENDING_CONFIRMATION";

  if (type === "COMBINED_EMERGENCY" || multipleSignals >= 3) severity = "CRITICAL";
  else if ((impact && !responded) || (lowSpo2Signal && abnormalHeartSignal)) severity = "HIGH";
  else if (impact || lowSpo2Signal || abnormalHeartSignal || !responded) severity = "MEDIUM";

  if (severity === "LOW") status = "DETECTED";

  const reasons = [];
  if (triggerReason) reasons.push(triggerReason);
  if (impact) reasons.push("impact signal detected");
  if (lowSpo2Signal) reasons.push("prototype SpO2 threshold signal");
  if (abnormalHeartSignal) reasons.push("prototype heart-rate threshold signal");
  if (!responded) reasons.push("user did not respond in simulation");

  return {
    severity,
    status,
    triggerReason: reasons.length
      ? reasons.join("; ")
      : "manual prototype simulation; no medical diagnosis inferred"
  };
};

module.exports = { evaluateEmergency };
