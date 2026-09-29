import { NavLink } from "react-router-dom";

export default function MobileBottomNav({ items }) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-ink-100 flex items-stretch px-1 pb-[env(safe-area-inset-bottom,0px)]">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10.5px] font-medium ${
              isActive ? "text-indigo-700" : "text-ink-400"
            }`
          }
        >
          <item.icon size={19} strokeWidth={2.2} />
          <span className="truncate max-w-[56px]">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
