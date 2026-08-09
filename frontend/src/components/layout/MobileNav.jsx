import { NavLink } from "react-router-dom";
import icons from "./icons";

const mobItems = [
  { to: "/dashboard", label: "Home", icon: icons.dashboard },
  { to: "/health", label: "Health", icon: icons.health },
  { to: "/location", label: "Location", icon: icons.location },
  { to: "/emergency", label: "SOS", icon: icons.emergency },
  { to: "/contacts", label: "Contacts", icon: icons.contacts }
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      {mobItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="mi">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
