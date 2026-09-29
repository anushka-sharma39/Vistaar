import { NavLink } from "react-router-dom";
import { ChevronsLeft, X } from "lucide-react";
import Logo from "../ui/Logo";

export default function Sidebar({ items, collapsed, onToggleCollapse, mobileOpen, onCloseMobile, roleLabel }) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-[1px] lg:hidden" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-50 lg:z-0 bg-white/80 backdrop-blur-xl border-r border-ink-100 flex flex-col shrink-0 transition-all duration-200
        ${collapsed ? "lg:w-[76px]" : "lg:w-64"} w-64
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-ink-100 shrink-0">
          <div className={collapsed ? "lg:hidden" : "flex flex-col gap-1"}>
            <Logo size="sm" />
          </div>
          {collapsed && <div className="hidden lg:flex w-full justify-center"><Logo size="sm" withText={false} /></div>}
          <button onClick={onCloseMobile} className="lg:hidden text-ink-400 hover:text-ink-700" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label={`${roleLabel} navigation`}>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `focus-ring group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-[inset_0_0_0_1px_rgba(124,58,237,0.14)] before:content-[''] before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-[3px] before:rounded-full before:bg-grad-primary"
                    : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
                } ${collapsed ? "lg:justify-center" : ""}`
              }
              title={collapsed ? item.label : undefined}
            >
              {() => (
                <>
                  <item.icon size={18} strokeWidth={2.1} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <p className={`px-6 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-300 ${collapsed ? "lg:hidden" : ""}`}>{roleLabel} workspace</p>
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center gap-2 px-3 py-3 mx-3 mb-3 rounded-xl text-ink-400 hover:text-ink-700 hover:bg-ink-100/70 text-sm font-medium border-t border-ink-100 pt-4"
        >
          <ChevronsLeft size={17} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && "Collapse"}
        </button>
      </aside>
    </>
  );
}
