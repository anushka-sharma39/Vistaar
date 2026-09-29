import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Trainers", to: "/trainers" },
  { label: "Features", to: "/#features" },
  { label: "Contact", to: "/contact" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const paper = useLocation().pathname === "/";
  const { user } = useAuth();
  const dash = user ? `/${user.role}/dashboard` : null;

  return (
    <header className="nav-times sticky top-3 z-50 px-3 lg:px-6">
      <div className={`max-w-7xl mx-auto rounded-2xl ${paper ? "bg-[#FAF7F0]/80 backdrop-blur-md border border-transparent" : "border border-white/70 bg-white/70 backdrop-blur-xl shadow-soft"}`}>
        <div className="h-16 flex items-center gap-4 px-4 lg:px-5">
          <Link to="/" className="focus-ring rounded-lg"><Logo /></Link>
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `focus-ring px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    paper
                      ? `font-serif-display text-base ${isActive && !l.to.includes("#") ? "text-indigo-700 underline decoration-2 decoration-indigo-500 underline-offset-8" : "text-ink-600 hover:text-indigo-700"}`
                      : `rounded-full ${isActive && !l.to.includes("#") ? "bg-indigo-50 text-indigo-700" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"}`
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex-1" />
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <Button onClick={() => navigate(dash)}>Go to Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>Log In</Button>
                <Button className={paper ? "!rounded-full !bg-none !bg-[#DCD4FA] !text-ink-900 !shadow-none font-serif-display !text-base" : ""} onClick={() => navigate("/signup")}>Get Started</Button>
              </>
            )}
          </div>
          <button className="lg:hidden p-2 rounded-xl text-ink-700 hover:bg-ink-50" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden border-t border-ink-100 px-4 py-4 space-y-1 animate-slideUp">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-ink-700 hover:bg-indigo-50 hover:text-indigo-700">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3">
              {user ? (
                <Button className="flex-1" onClick={() => { setOpen(false); navigate(dash); }}>Go to Dashboard</Button>
              ) : (
                <>
                  <Button variant="secondary" className="flex-1" onClick={() => { setOpen(false); navigate("/login"); }}>Log In</Button>
                  <Button className="flex-1" onClick={() => { setOpen(false); navigate("/signup"); }}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
