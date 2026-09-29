import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { traineePerformance } from "../../data/assessments";
import { Card } from "../../components/ui/Card";
import { PALETTE, ChartCard, LineTrend, ColumnChart } from "../../components/charts/ChartKit";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import ProgressBar from "../../components/ui/ProgressBar";
import { Input, Select } from "../../components/ui/Input";

const columns = [
  { key: "n", label: "Trainee" },
  { key: "c", label: "Course" },
  { key: "p", label: "Completion" },
  { key: "s", label: "Score" },
  { key: "l", label: "Last Activity" },
  { key: "st", label: "Status" },
];

const participation = [
  { week: "W1", active: 210 }, { week: "W2", active: 245 }, { week: "W3", active: 260 },
  { week: "W4", active: 232 }, { week: "W5", active: 290 }, { week: "W6", active: 315 },
];

const toneFor = { "On Track": "green", "At Risk": "red", "Not Started": "gray" };

export default function TraineePerformance({ title = "Trainee Performance" }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const rows = useMemo(
    () => traineePerformance.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) && (status === "All" || r.status === status)),
    [q, status]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">{title}</h1>
        <p className="text-ink-500 mt-1.5">Monitor progress, scores and engagement across your trainees.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <ChartCard title="Average Score" subtitle="Top trainees, score (%)">
          <ColumnChart data={traineePerformance.slice(0, 5)} xKey="name" xTickFormatter={(n) => n.split(" ")[0]} yKey="score" name="Score" unit="%" color={PALETTE.indigo} height={210} maxBarSize={30} />
        </ChartCard>
        <ChartCard title="Completion Rate" subtitle="Top trainees, completion (%)">
          <ColumnChart data={traineePerformance.slice(0, 5)} xKey="name" xTickFormatter={(n) => n.split(" ")[0]} yKey="completion" name="Completion" unit="%" color={PALETTE.cyan} height={210} maxBarSize={30} />
        </ChartCard>
        <ChartCard title="Participation Trend" subtitle="Active trainees per week">
          <LineTrend data={participation} xKey="week" yKey="active" name="Active trainees" color={PALETTE.violet} height={210} />
        </ChartCard>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Input icon={Search} placeholder="Search trainees…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48">
            <option value="All">All Statuses</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Not Started</option>
          </Select>
        </div>
        <DataTable
          columns={columns}
          data={rows}
          renderRow={(r) => (
            <>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar initials={r.name.split(" ").map((n) => n[0]).join("")} size="sm" />
                  <span className="font-semibold text-ink-900">{r.name}</span>
                </div>
              </Td>
              <Td className="text-ink-600">{r.course}</Td>
              <Td className="min-w-[140px]"><ProgressBar value={r.completion} showLabel size="sm" /></Td>
              <Td className="font-semibold">{r.score}%</Td>
              <Td className="text-ink-500">{r.lastActivity}</Td>
              <Td><Badge tone={toneFor[r.status]}>{r.status}</Badge></Td>
            </>
          )}
        />
      </Card>
    </div>
  );
}
