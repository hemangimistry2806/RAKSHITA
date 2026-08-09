import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const liveData = [
  { k: "Heart Rate", v: "72 BPM" },
  { k: "SpO₂", v: "98%" },
  { k: "Location", v: "Protected" },
  { k: "Device", v: "Connected" }
];

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-top">
        <Link to="/" className="brand">
          <div className="brand-mark">🛡️</div>
          <div>
            <div className="brand-name">RAKSHITA</div>
            <div className="brand-sub">Wear · Detect · Protect</div>
          </div>
        </Link>
        <div className="landing-nav">
          <Link to="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="landing-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="hero-badge">
            <span className="dot pulse" /> Wearable Safety Intelligence
          </div>
          <h1 className="hero-title">
            Wear.
            <br />
            <span className="grad">Detect.</span>
            <br />
            Protect.
          </h1>
          <p className="hero-tagline">RAKSHITA — a smarter safety companion.</p>
          <p className="hero-desc">
            RAKSHITA detects potential emergencies, shares your location, and connects you with
            trusted people when every second matters.
          </p>
          <div className="hero-actions">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg">
                Explore RAKSHITA
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="bracelet-wrap">
            <div className="bracelet-ring" />
            <div className="bracelet-inner">
              <div style={{ fontSize: 34 }}>⌚</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>RAKSHITA</div>
              <div className="soft" style={{ fontSize: 12.5 }}>
                Sensing · 24/7
              </div>
            </div>
            <div className="live-status">
              <div className="live-status-head">
                <span className="dot pulse" /> RAKSHITA ACTIVE
              </div>
              {liveData.map((row) => (
                <div className="live-row" key={row.k}>
                  <span className="k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
