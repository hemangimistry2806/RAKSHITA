import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthVisual from "../components/auth/AuthVisual";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [offlineNotice, setOfflineNotice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(form);
    setLoading(false);
    if (res.ok) {
      if (res.offline) {
        setOfflineNotice(
          "Backend unavailable — signed in with a temporary demo session so you can explore the app."
        );
        setTimeout(() => navigate(from, { replace: true }), 1200);
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(res.error || "Unable to sign in.");
    }
  };

  const fillDemo = () => setForm({ email: "demo@rakshita.local", password: "DemoPass123!" });

  return (
    <div className="auth-shell">
      <AuthVisual />
      <div className="auth-form-wrap">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="auth-sub">Sign in to your RAKSHITA safety dashboard.</p>

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="input"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {offlineNotice && (
              <div className="badge amber" style={{ marginBottom: 14, width: "100%", justifyContent: "center" }}>
                {offlineNotice}
              </div>
            )}

            {error && (
              <div className="badge red" style={{ marginBottom: 14, width: "100%", justifyContent: "center" }}>
                {error}
              </div>
            )}

            <Button type="submit" block size="lg" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <button onClick={fillDemo} className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 14 }}>
            Use demo account
          </button>

          <div className="demo-box">
            Demo credentials
            <br />
            <code>demo@rakshita.local</code> / <code>DemoPass123!</code>
          </div>

          <p className="soft" style={{ textAlign: "center", marginTop: 22, fontSize: 14 }}>
            New to RAKSHITA?{" "}
            <Link to="/register" style={{ color: "var(--cyan)" }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
