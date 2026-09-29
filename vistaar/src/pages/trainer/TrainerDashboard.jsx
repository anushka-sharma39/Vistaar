import { BookOpen, Users, ClipboardCheck, TrendingUp, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import { PALETTE, ChartCard, AreaTrend, ColumnChart } from "../../components/charts/ChartKit";
import { trainerActivity } from "../../data/misc";
import { UserPlus2, ClipboardCheck as CIcon, MessageSquare, CheckCircle2 } from "lucide-react";

const enrollmentTrend = [
  { month: "Apr", enrollments: 120 },
  { month: "May", enrollments: 168 },
  { month: "Jun", enrollments: 190 },
  { month: "Jul", enrollments: 230 },
  { month: "Aug", enrollments: 275 },
  { month: "Sep", enrollments: 312 },
];

const assessmentPerf = [
  { course: "ML Foundations", avg: 82 },
  { course: "Deep Learning", avg: 76 },
  { course: "Data Analytics", avg: 88 },
];

const activityIcons = { enroll: UserPlus2, submission: CIcon, feedback: MessageSquare, completion: CheckCircle2 };

export default function TrainerDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Welcome back, Dr. {user?.name?.split(" ").slice(-1)[0]}</h1>
        <p className="text-ink-500 mt-1.5">Here's how your training programs are performing.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={BookOpen} label="Active Courses" value="6" tone="indigo" />
        <StatCard icon={Users} label="Total Trainees" value="3,200" tone="teal" trend="+8%" />
        <StatCard icon={ClipboardCheck} label="Assessments" value="12" tone="amber" />
        <StatCard icon={TrendingUp} label="Completion Rate" value="84%" tone="violet" trend="+3%" />
        <StatCard icon={Star} label="Average Score" value="86%" tone="indigo" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Enrollment Trend" subtitle="New enrollments per month" value={enrollmentTrend.at(-1).enrollments.toLocaleString()}>
          <AreaTrend data={enrollmentTrend} xKey="month" yKey="enrollments" name="Enrollments" color={PALETTE.indigo} height={260} />
        </ChartCard>
        <ChartCard title="Assessment Performance by Course" subtitle="Average score (%)">
          <ColumnChart data={assessmentPerf} xKey="course" yKey="avg" name="Avg score" unit="%" color={PALETTE.blue} height={260} maxBarSize={48} domain={[0, 100]} />
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard className="lg:col-span-2" title="Monthly Participation" subtitle="Participants per month">
          <ColumnChart data={enrollmentTrend} xKey="month" yKey="enrollments" name="Participants" color={PALETTE.violet} height={230} maxBarSize={40} />
        </ChartCard>

        <Card>
          <p className="font-display font-bold text-ink-900 mb-4">Recent Activity</p>
          <div className="space-y-5">
            {trainerActivity.map((a) => {
              const Icon = activityIcons[a.type] || UserPlus2;
              return (
                <div key={a.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-ink-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
