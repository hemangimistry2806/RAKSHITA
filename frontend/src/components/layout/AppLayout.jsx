import { Sidebar } from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-col">
        <main className="main-content">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
