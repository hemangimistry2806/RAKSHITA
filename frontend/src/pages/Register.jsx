import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthVisual from "../components/auth/AuthVisual";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [offlineNotice, setOfflineNotice] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const res = await register(form);
    setLoading(false);
    if (res.ok) {
      if (res.offline) {
        setOfflineNotice(
          "Backend unavailable — created a temporary demo session so you can explore the app."
        );
        setTimeout(() => navigate("/dashboard", { replace: true }), 1200);
      } else {
        navigate("/dashboard", { replace: true });
      }
    } else {
      setError(res.error || "Unable to create account.");
    }
  };

  return (
    <div className="auth-shell">
      <AuthVisual />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <h2>Create your account</h2>
          <p className="auth-sub">Set up your RAKSHITA safety profile.</p>

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" className="input" placeholder="Hemangi" value={form.name} onChange={set("name")} required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" className="input" type="tel" placeholder="+91 …" value={form.phone} onChange={set("phone")} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" className="input" type="password" placeholder="At least 8 characters" value={form.password} onChange={set("password")} required />
            </div>

            {error && (
              <div className="badge red" style={{ marginBottom: 14, width: "100%", justifyContent: "center" }}>
                {error}
              </div>
            )}

            {offlineNotice && (
              <div className="badge amber" style={{ marginBottom: 14, width: "100%", justifyContent: "center" }}>
                {offlineNotice}
              </div>
            )}

            <Button type="submit" block size="lg" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="soft" style={{ textAlign: "center", marginTop: 22, fontSize: 14 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--cyan)" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
