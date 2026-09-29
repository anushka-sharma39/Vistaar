import { BookOpen, ClipboardCheck, Award, Megaphone, GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

const icons = {
  course: BookOpen,
  assessment: ClipboardCheck,
  certificate: Award,
  announcement: Megaphone,
};

const tones = {
  course: "bg-indigo-50 text-indigo-600",
  assessment: "bg-amber-50 text-amber-600",
  certificate: "bg-teal-50 text-teal-600",
  announcement: "bg-violet-50 text-violet-600",
};

export default function NotificationPanel({ basePath = "/trainee/notifications" }) {
  const { notifs, markAllRead, markRead } = useApp();

  return (
    <div className="w-[340px] glass-card shadow-lift overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-ink-100">
        <p className="font-bold text-ink-900 text-sm">Notifications</p>
        <button onClick={markAllRead} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
          Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifs.map((n) => {
          const Icon = icons[n.type] || GraduationCap;
          return (
            <button key={n.id} onClick={() => markRead(n.id)} className={`w-full text-left flex gap-3 px-4 py-3 border-b border-ink-100/70 last:border-0 hover:bg-indigo-50/60 transition-colors ${n.unread ? "bg-indigo-50/40" : ""}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${tones[n.type] || tones.course}`}>
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-800 leading-snug">{n.title}</p>
                <p className="text-xs text-ink-500 mt-0.5 line-clamp-2">{n.detail}</p>
                <p className="text-[11px] text-ink-300 mt-1">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1.5" />}
            </button>
          );
        })}
      </div>
      <Link to={basePath} className="block text-center py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50/60 transition-colors">
        View all notifications
      </Link>
    </div>
  );
}
