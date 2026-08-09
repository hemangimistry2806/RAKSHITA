// Shared formatting and status helpers used across the UI.

export const formatTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export const timeAgo = (iso) => {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 5) return "just now";
  if (sec < 60) return `${sec} sec ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} days ago`;
};

export const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

export const heartRateStatus = (hr) => {
  if (hr == null) return { label: "—", tone: "muted" };
  if (hr > 130 || hr < 45) return { label: "Abnormal", tone: "critical" };
  if (hr > 100 || hr < 60) return { label: "Elevated", tone: "warn" };
  return { label: "Normal", tone: "normal" };
};

export const spo2Status = (spo2) => {
  if (spo2 == null) return { label: "—", tone: "muted" };
  if (spo2 < 92) return { label: "Low", tone: "critical" };
  if (spo2 < 95) return { label: "Watch", tone: "warn" };
  return { label: "Normal", tone: "normal" };
};

export const severityLabel = (severity) => (severity || "UNKNOWN").replace(/_/g, " ");

export const statusLabel = (status) => (status || "UNKNOWN").replace(/_/g, " ");

export const typeLabel = (type) => (type || "UNKNOWN").replace(/_/g, " ");

export const statusTone = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("resolved") || s.includes("safe") || s.includes("detected")) return "green";
  if (s.includes("cancel") || s.includes("cancelled")) return "muted";
  if (s.includes("escalat")) return "red";
  if (s.includes("pending") || s.includes("active")) return "amber";
  return "cyan";
};

export const severityTone = (severity = "") => {
  const s = severity.toLowerCase();
  if (s === "critical") return "red";
  if (s === "high") return "amber";
  if (s === "medium") return "cyan";
  return "green";
};

export const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
