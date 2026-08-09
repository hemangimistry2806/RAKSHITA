import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icons from "./icons";
import { initials } from "../../utils/format";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: icons.dashboard },
  { to: "/health", label: "Health", icon: icons.health },
  { to: "/location", label: "Location", icon: icons.location },
  { to: "/emergency", label: "Emergency", icon: icons.emergency },
  { to: "/contacts", label: "Contacts", icon: icons.contacts },
  { to: "/device", label: "Device", icon: icons.device },
  { to: "/history", label: "History", icon: icons.history },
  { to: "/settings", label: "Settings", icon: icons.settings }
];

export function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <div className="brand-mark">🛡️</div>
        <div>
          <div className="brand-name">RAKSHITA</div>
          <div className="brand-sub">Wear · Detect · Protect</div>
        </div>
      </Link>

      <nav className="nav">
        <div className="nav-label">Safety Suite</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{initials(user?.name || "U")}</div>
          <div className="user-meta">
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-status">
              <span className="dot pulse" />
              Connected
            </div>
          </div>
          <button className="icon-btn" onClick={logout} title="Log out" style={{ marginLeft: "auto" }}>
            {icons.logout}
          </button>
        </div>
      </div>
    </aside>
  );
}
