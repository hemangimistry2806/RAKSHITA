export default function AuthVisual() {
  return (
    <div className="auth-visual">
      <div className="brand" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 40 }}>
        <div className="brand-mark">🛡️</div>
        <div>
          <div className="brand-name">RAKSHITA</div>
          <div className="brand-sub">Wear · Detect · Protect</div>
        </div>
      </div>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, maxWidth: 440 }}>
        Your safety, <span style={{ background: "var(--gradient)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>always on.</span>
      </h1>
      <p className="soft" style={{ maxWidth: 420, fontSize: 16, marginTop: 16 }}>
        A premium wearable safety system that detects potential emergencies and instantly connects
        you with the people who matter.
      </p>
      <div className="card" style={{ marginTop: 40, maxWidth: 380 }}>
        <div className="live-status-head">
          <span className="dot pulse" /> System monitoring live
        </div>
        <div className="live-row">
          <span className="k">Heart Rate</span>
          <span className="v">72 BPM</span>
        </div>
        <div className="live-row">
          <span className="k">SpO₂</span>
          <span className="v">98%</span>
        </div>
        <div className="live-row">
          <span className="k">Device</span>
          <span className="v">Connected</span>
        </div>
      </div>
    </div>
  );
}
