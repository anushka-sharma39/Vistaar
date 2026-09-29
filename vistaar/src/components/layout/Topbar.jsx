import { Menu, Search, Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";
import Dropdown, { DropdownItem } from "../ui/Dropdown";
import NotificationPanel from "./NotificationPanel";
import CommandPalette from "./CommandPalette";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function Topbar({ onOpenMobile, title, notifPath }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/70 backdrop-blur-xl border-b border-ink-100 flex items-center gap-3 px-4 lg:px-6">
        <button onClick={onOpenMobile} className="lg:hidden text-ink-500 hover:text-ink-800" aria-label="Open menu">
          <Menu size={22} />
        </button>

        <h1 className="font-display font-bold text-ink-900 text-base lg:text-lg truncate">{title}</h1>

        <div className="flex-1" />

        <button
          onClick={() => setSearchOpen(true)}
          className="focus-ring hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-ink-100 text-ink-400 text-sm hover:border-indigo-200 hover:text-ink-600 transition-colors w-56"
        >
          <Search size={15} />
          <span>Search…</span>
          <kbd className="ml-auto text-[10px] font-semibold bg-ink-100 px-1.5 py-0.5 rounded">Ctrl K</kbd>
        </button>
        <button onClick={() => setSearchOpen(true)} className="sm:hidden text-ink-500" aria-label="Search">
          <Search size={20} />
        </button>

        <Dropdown
          trigger={() => (
            <button className="focus-ring relative p-2 rounded-xl text-ink-500 hover:bg-ink-100/70 hover:text-ink-800 transition-colors" aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
              )}
            </button>
          )}
        >
          <NotificationPanel basePath={notifPath} />
        </Dropdown>

        <Dropdown
          trigger={(open) => (
            <button className="focus-ring flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-ink-100/70 transition-colors">
              <Avatar initials={user?.avatar || "U"} size="sm" />
              <span className="hidden md:block text-sm font-medium text-ink-800 max-w-[120px] truncate">{user?.name}</span>
              <ChevronDown size={15} className={`hidden md:block text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          )}
        >
          <div className="w-52 glass-card shadow-lift py-2 overflow-hidden">
            <div className="px-3.5 py-2 border-b border-ink-100 mb-1">
              <p className="text-sm font-semibold text-ink-900 truncate">{user?.name}</p>
              <p className="text-xs text-ink-400 truncate">{user?.email}</p>
            </div>
            <DropdownItem icon={User} onClick={() => navigate(`/${user?.role}/profile`)}>
              My Profile
            </DropdownItem>
            <DropdownItem icon={Settings} onClick={() => navigate(user?.role === "admin" ? "/admin/settings" : `/${user?.role}/profile`)}>
              Settings
            </DropdownItem>
            <DropdownItem icon={LogOut} className="text-red-600" onClick={() => { logout(); navigate("/"); }}>
              Log Out
            </DropdownItem>
          </div>
        </Dropdown>
      </header>
      <CommandPalette key={String(searchOpen)} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
