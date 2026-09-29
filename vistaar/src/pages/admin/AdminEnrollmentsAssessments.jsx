import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "../../components/ui/Card";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import { Input, Select } from "../../components/ui/Input";
import { assessments } from "../../data/assessments";

const enrollments = [
  { id: 1, trainee: "Aditi Rao", course: "Foundations of Machine Learning", date: "2026-08-02", progress: 68, status: "Active" },
  { id: 2, trainee: "Sameer Khan", course: "Cybersecurity Essentials", date: "2026-07-18", progress: 45, status: "Active" },
  { id: 3, trainee: "Rahul Bhatt", course: "Applied Data Analytics", date: "2026-06-11", progress: 100, status: "Completed" },
  { id: 4, trainee: "Ishaan Gupta", course: "Strategic Leadership", date: "2026-09-01", progress: 22, status: "Active" },
  { id: 5, trainee: "Divya Menon", course: "Deep Learning with Neural Networks", date: "2026-09-10", progress: 5, status: "Active" },
  { id: 6, trainee: "Sanya Malhotra", course: "Digital Transformation Strategy", date: "2026-05-20", progress: 12, status: "Dropped" },
];
const tone = { Active: "indigo", Completed: "green", Dropped: "red" };

export function AdminEnrollments() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const rows = useMemo(() => enrollments.filter((e) => (e.trainee + e.course).toLowerCase().includes(q.toLowerCase()) && (status === "All" || e.status === status)), [q, status]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Enrollments</h1>
        <p className="text-ink-500 mt-1.5">Track course enrollments across the organization.</p>
      </div>
      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Input icon={Search} placeholder="Search trainee or course…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-44">
            <option value="All">All Statuses</option><option>Active</option><option>Completed</option><option>Dropped</option>
          </Select>
        </div>
        <DataTable
          columns={["Trainee", "Course", "Enrolled", "Progress", "Status"].map((l) => ({ key: l, label: l }))}
          data={rows}
          renderRow={(e) => (
            <>
              <Td><span className="font-semibold text-ink-900">{e.trainee}</span></Td>
              <Td className="text-ink-600">{e.course}</Td>
              <Td className="text-ink-500">{e.date}</Td>
              <Td className="min-w-[140px]"><ProgressBar value={e.progress} showLabel size="sm" /></Td>
              <Td><Badge tone={tone[e.status]}>{e.status}</Badge></Td>
            </>
          )}
        />
      </Card>
    </div>
  );
}

export function AdminAssessments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Assessments</h1>
        <p className="text-ink-500 mt-1.5">Platform-wide assessment overview and performance.</p>
      </div>
      <Card>
        <DataTable
          columns={["Assessment", "Course", "Questions", "Pass Mark", "Attempts", "Status"].map((l) => ({ key: l, label: l }))}
          data={assessments}
          renderRow={(a) => (
            <>
              <Td><span className="font-semibold text-ink-900">{a.title}</span></Td>
              <Td className="text-ink-600">{a.course}</Td>
              <Td>{a.questions}</Td>
              <Td>{a.passingScore}%</Td>
              <Td>{a.attempts.toLocaleString()}</Td>
              <Td><Badge tone={a.status === "Published" ? "green" : "amber"}>{a.status}</Badge></Td>
            </>
          )}
        />
      </Card>
    </div>
  );
}
