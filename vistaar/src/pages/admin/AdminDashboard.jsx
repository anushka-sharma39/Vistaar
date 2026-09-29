import { Users, GraduationCap, Presentation, BookOpen, ListChecks, Award, ClipboardCheck } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import StatCard from "../../components/ui/StatCard";
import { PALETTE, tooltipProps, ChartCard, LegendList, AreaTrend, LineTrend, ColumnChart } from "../../components/charts/ChartKit";

const userGrowth = [
  { m: "Apr", users: 320 }, { m: "May", users: 380 }, { m: "Jun", users: 445 },
  { m: "Jul", users: 520 }, { m: "Aug", users: 610 }, { m: "Sep", users: 705 },
];
const enrollByCourse = [
  { name: "Cyber", v: 1980 }, { name: "Leadership", v: 1560 }, { name: "Data", v: 1204 },
  { name: "ML", v: 842 }, { name: "Digital", v: 678 },
];
const completion = [
  { name: "Completed", value: 62 }, { name: "In Progress", value: 27 }, { name: "Not Started", value: 11 },
];
const assessScores = [
  { m: "Apr", avg: 71 }, { m: "May", avg: 74 }, { m: "Jun", avg: 76 },
  { m: "Jul", avg: 79 }, { m: "Aug", avg: 82 }, { m: "Sep", avg: 84 },
];
const certs = [
  { m: "Apr", c: 90 }, { m: "May", c: 120 }, { m: "Jun", c: 150 },
  { m: "Jul", c: 210 }, { m: "Aug", c: 260 }, { m: "Sep", c: 340 },
];
const COLORS = [PALETTE.indigo, PALETTE.cyan, "#DDD6FE"];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Platform Overview</h1>
        <p className="text-ink-500 mt-1.5">Organization-wide learning activity and outcomes.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard icon={Users} label="Total Users" value="705" tone="indigo" trend="+15%" />
        <StatCard icon={GraduationCap} label="Trainees" value="652" tone="teal" />
        <StatCard icon={Presentation} label="Trainers" value="53" tone="violet" />
        <StatCard icon={BookOpen} label="Courses" value="112" tone="indigo" />
        <StatCard icon={ListChecks} label="Enrollments" value="8,940" tone="teal" trend="+9%" />
        <StatCard icon={Award} label="Certifications" value="1,570" tone="violet" />
        <StatCard icon={ClipboardCheck} label="Assessments" value="286" tone="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="User Growth" subtitle="Registered users, Apr – Sep" value={userGrowth.at(-1).users.toLocaleString()}>
          <AreaTrend data={userGrowth} xKey="m" yKey="users" name="Users" color={PALETTE.indigo} height={260} />
        </ChartCard>
        <ChartCard title="Course Enrollments" subtitle="Enrollments by course">
          <ColumnChart data={enrollByCourse} xKey="name" yKey="v" name="Enrollments" color={PALETTE.blue} height={260} maxBarSize={44} />
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard title="Course Completion" subtitle="Share of enrollments">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full">
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie data={completion} dataKey="value" nameKey="name" innerRadius={60} outerRadius={84} paddingAngle={3} cornerRadius={6} stroke="none">
                    {completion.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip {...tooltipProps("%")} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-extrabold text-ink-900 leading-none">{completion[0].value}%</span>
                <span className="text-[11px] text-ink-400 mt-1">Completed</span>
              </div>
            </div>
            <div className="w-full"><LegendList items={completion.map((c, i) => ({ ...c, color: COLORS[i] }))} /></div>
          </div>
        </ChartCard>
        <ChartCard title="Assessment Performance" subtitle="Average score (%)" value={`${assessScores.at(-1).avg}%`} delta={`+${assessScores.at(-1).avg - assessScores[0].avg} pts since ${assessScores[0].m}`}>
          <LineTrend data={assessScores} xKey="m" yKey="avg" name="Avg score" unit="%" color={PALETTE.violet} height={250} domain={[60, 100]} />
        </ChartCard>
        <ChartCard title="Certifications Issued" subtitle="Per month">
          <ColumnChart data={certs} xKey="m" yKey="c" name="Certificates" color={PALETTE.violet} height={250} maxBarSize={30} />
        </ChartCard>
      </div>

      <ChartCard title="Monthly Participation" subtitle="Active learners per month">
        <AreaTrend data={userGrowth} xKey="m" yKey="users" name="Active learners" color={PALETTE.cyan} height={230} />
      </ChartCard>
    </div>
  );
}
