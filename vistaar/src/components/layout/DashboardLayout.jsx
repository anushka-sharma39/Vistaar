import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileBottomNav from "./MobileBottomNav";
import ToastContainer from "../ui/Toast";
import { useApp } from "../../context/AppContext";

export default function DashboardLayout({ navItems, roleLabel, title, notifPath }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();
  const bottomNavItems = navItems.slice(0, 5);
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        items={navItems}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        roleLabel={roleLabel}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMobile={() => setMobileOpen(true)} title={title} notifPath={notifPath} />
        <main className="flex-1 p-4 lg:p-8 pb-24 lg:pb-8 max-w-[1400px] w-full mx-auto">
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileBottomNav items={bottomNavItems} />
      <ToastContainer />
    </div>
  );
}
