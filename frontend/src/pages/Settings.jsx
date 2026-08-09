import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Topbar from "../components/layout/Topbar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || ""
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout>
      <Topbar title="Settings" subtitle="Manage your profile and safety preferences." />

      <div className="grid-main panel">
        <Card title="👤 Profile" icon="">
          <form onSubmit={save}>
            <div className="field">
              <label>Full name</label>
              <input className="input" value={form.name} onChange={set("name")} />
            </div>
            <div className="field">
              <label>Email</label>
              <input className="input" value={form.email} onChange={set("email")} disabled />
            </div>
            <div className="field">
              <label>Phone</label>
              <input className="input" value={form.phone} onChange={set("phone")} />
            </div>
            <Button type="submit">
              {saved ? "✓ Saved" : "Save Changes"}
            </Button>
          </form>
        </Card>

        <div style={{ display: "grid", gap: 18 }}>
          <Card title="🔒 Emergency Protocol" icon="">
            <div className="live-row">
              <span className="k">Auto-escalation</span>
              <Badge tone="green">Enabled</Badge>
            </div>
            <div className="live-row">
              <span className="k">SMS alerts</span>
              <Badge tone="cyan">Mock enabled</Badge>
            </div>
            <div className="live-row">
              <span className="k">GPS sharing</span>
              <Badge tone="green">Active</Badge>
            </div>
          </Card>

          <Card title="ℹ️ About" icon="">
            <p className="soft" style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
              RAKSHITA is an 8-hour hackathon prototype. It is not a certified medical device and
              does not provide medical diagnoses.
            </p>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
