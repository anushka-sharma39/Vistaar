import { useState } from "react";
import { Download } from "lucide-react";
import { LineTrend, ColumnChart } from "../../components/charts/ChartKit";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
import DataTable, { Td } from "../../components/ui/DataTable";
import { Input, Select } from "../../components/ui/Input";
import { useApp } from "../../context/AppContext";
import { courses } from "../../data/courses";
import { downloadCSV } from "../../utils/download";


const datasets = {
  participation: { label: "User Participation", key: "value", data: [{ m: "Apr", value: 320 }, { m: "May", value: 380 }, { m: "Jun", value: 445 }, { m: "Jul", value: 520 }, { m: "Aug", value: 610 }, { m: "Sep", value: 705 }], color: "#6366F1", type: "line" },
  courses: { label: "Course Performance", key: "value", data: courses.slice(0, 6).map((c) => ({ m: c.title.split(" ")[0], value: c.students })), color: "#3B82F6", type: "bar" },
  trainers: { label: "Trainer Performance", key: "value", data: [{ m: "Sharma", value: 4.9 }, { m: "Verma", value: 4.8 }, { m: "Iyer", value: 4.9 }, { m: "Nair", value: 4.7 }, { m: "Deshmukh", value: 4.8 }], color: "#EC4899", type: "bar" },
  assessments: { label: "Assessment Performance", key: "value", data: [{ m: "Apr", value: 71 }, { m: "May", value: 74 }, { m: "Jun", value: 76 }, { m: "Jul", value: 79 }, { m: "Aug", value: 82 }, { m: "Sep", value: 84 }], color: "#8B5CF6", type: "line" },
  certifications: { label: "Certification Statistics", key: "value", data: [{ m: "Apr", value: 90 }, { m: "May", value: 120 }, { m: "Jun", value: 150 }, { m: "Jul", value: 210 }, { m: "Aug", value: 260 }, { m: "Sep", value: 340 }], color: "#22D3EE", type: "bar" },
};

export function AdminReports() {
  const { showToast } = useApp();
  const [tab, setTab] = useState("participation");
  const d = datasets[tab];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Reports</h1>
          <p className="text-ink-500 mt-1.5">Analyze participation, performance and certification outcomes.</p>
        </div>
        <Button icon={Download} onClick={() => { downloadCSV(`${tab}-report.csv`, [["Period / Item", "Value"], ...d.data.map((x) => [x.m, x.value])]); showToast("Report exported as CSV."); }}>Export</Button>
      </div>

      <Card className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Input label="From" type="date" defaultValue="2026-04-01" />
        <Input label="To" type="date" defaultValue="2026-09-28" />
        <Select label="Course"><option>All Courses</option>{courses.slice(0, 6).map((c) => <option key={c.id}>{c.title}</option>)}</Select>
        <Select label="Role"><option>All Roles</option><option>Trainee</option><option>Trainer</option></Select>
      </Card>

      <Card>
        <Tabs tabs={Object.entries(datasets).map(([value, x]) => ({ value, label: x.label }))} active={tab} onChange={setTab} />
        <div className="pt-6">
          {d.type === "line" ? (
            <LineTrend key={tab} data={d.data} xKey="m" yKey="value" name={d.label} color={d.color} height={320} />
          ) : (
            <ColumnChart key={tab} data={d.data} xKey="m" yKey="value" name={d.label} color={d.color} height={320} maxBarSize={48} />
          )}
        </div>
      </Card>

      <Card>
        <p className="font-display font-bold text-ink-900 mb-3">{d.label} — Data</p>
        <DataTable
          columns={[{ key: "m", label: "Period / Item" }, { key: "v", label: "Value" }]}
          data={d.data.map((x, i) => ({ ...x, id: i }))}
          renderRow={(r) => (<><Td>{r.m}</Td><Td className="font-semibold">{r.value}</Td></>)}
        />
      </Card>
    </div>
  );
}

export function AdminSettings() {
  const { showToast } = useApp();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Settings</h1>
        <p className="text-ink-500 mt-1.5">Configure platform preferences.</p>
      </div>
      <Card className="space-y-4">
        <Input label="Organization Name" defaultValue="Capacity Building Directorate" />
        <Input label="Support Email" defaultValue="support@vistaar.gov" />
        <Select label="Default Certificate Validity"><option>2 years</option><option>3 years</option><option>Lifetime</option></Select>
        <label className="flex items-center gap-2.5 text-sm text-ink-700"><input type="checkbox" defaultChecked className="rounded border-ink-300 text-indigo-600" /> Require admin approval for new trainers</label>
        <label className="flex items-center gap-2.5 text-sm text-ink-700"><input type="checkbox" defaultChecked className="rounded border-ink-300 text-indigo-600" /> Send email notifications for announcements</label>
        <Button onClick={() => showToast("Settings saved.")}>Save Settings</Button>
      </Card>
    </div>
  );
}
