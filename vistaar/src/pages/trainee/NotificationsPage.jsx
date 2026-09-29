import { BookOpen, ClipboardCheck, Award, Megaphone, GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/States";

const icons = { course: BookOpen, assessment: ClipboardCheck, certificate: Award, announcement: Megaphone };
const tones = {
  course: "bg-indigo-50 text-indigo-600",
  assessment: "bg-amber-50 text-amber-600",
  certificate: "bg-teal-50 text-teal-600",
  announcement: "bg-violet-50 text-violet-600",
};

export default function NotificationsPage() {
  const { notifs, markAllRead, markRead } = useApp();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Notifications</h1>
          <p className="text-ink-500 mt-1.5">Stay up to date with courses, assessments and announcements.</p>
        </div>
        <Button variant="secondary" onClick={markAllRead}>Mark all read</Button>
      </div>

      {notifs.length === 0 ? (
        <EmptyState title="You're all caught up" />
      ) : (
        <div className="space-y-3">
          {notifs.map((n) => {
            const Icon = icons[n.type] || GraduationCap;
            return (
              <Card key={n.id} onClick={() => markRead(n.id)} className={`flex gap-4 cursor-pointer ${n.unread ? "border-indigo-200 bg-indigo-50/30" : ""}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tones[n.type] || tones.course}`}>
                  <Icon size={19} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink-800">{n.title}</p>
                  <p className="text-sm text-ink-500 mt-0.5">{n.detail}</p>
                  <p className="text-xs text-ink-400 mt-1.5">{n.time}</p>
                </div>
                {n.unread && <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
