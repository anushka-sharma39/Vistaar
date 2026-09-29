import { useState } from "react";
import { BookOpen, Users, Star, CheckCircle2, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { courses as seed, categories } from "../../data/courses";
import StatCard from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { ConfirmationDialog } from "../../components/ui/States";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import { useApp } from "../../context/AppContext";

const columns = ["Course", "Trainer", "Category", "Students", "Rating", "Status", "Actions"].map((l) => ({ key: l, label: l }));

export default function AdminCourses() {
  const { showToast } = useApp();
  const [list, setList] = useState(seed.map((c, i) => ({ ...c, status: i === 6 ? "Pending" : i === 10 ? "Unpublished" : "Published" })));
  const [toDelete, setToDelete] = useState(null);
  const [edit, setEdit] = useState(null);

  const setStatus = (id, status, msg) => {
    setList((l) => l.map((c) => (c.id === id ? { ...c, status } : c)));
    showToast(msg);
  };
  const tone = { Published: "green", Pending: "amber", Unpublished: "gray" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Course Management</h1>
        <p className="text-ink-500 mt-1.5">Review, approve and publish courses across the platform.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Total Courses" value={list.length} tone="indigo" />
        <StatCard icon={CheckCircle2} label="Published" value={list.filter((c) => c.status === "Published").length} tone="teal" />
        <StatCard icon={Users} label="Total Enrollments" value={list.reduce((s, c) => s + c.students, 0).toLocaleString()} tone="violet" />
        <StatCard icon={Star} label="Avg. Rating" value="4.7" tone="amber" />
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={list}
          renderRow={(c) => (
            <>
              <Td><span className="font-semibold text-ink-900">{c.title}</span></Td>
              <Td className="text-ink-600">{c.trainer}</Td>
              <Td className="text-ink-500">{c.category}</Td>
              <Td>{c.students.toLocaleString()}</Td>
              <Td>{c.rating}</Td>
              <Td><Badge tone={tone[c.status]}>{c.status}</Badge></Td>
              <Td>
                <div className="flex gap-1">
                  {c.status === "Pending" && <Button size="sm" onClick={() => setStatus(c.id, "Published", "Course approved and published.")}>Approve</Button>}
                  {c.status === "Published" && <Button size="icon" variant="ghost" aria-label="Unpublish" onClick={() => setStatus(c.id, "Unpublished", "Course unpublished.")}><EyeOff size={15} /></Button>}
                  {c.status === "Unpublished" && <Button size="icon" variant="ghost" aria-label="Publish" onClick={() => setStatus(c.id, "Published", "Course published.")}><Eye size={15} /></Button>}
                  <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setEdit({ ...c })}><Pencil size={15} /></Button>
                  <Button size="icon" variant="ghost" className="text-red-600" aria-label="Delete" onClick={() => setToDelete(c)}><Trash2 size={15} /></Button>
                </div>
              </Td>
            </>
          )}
        />
      </Card>

      <Modal open={!!edit} onClose={() => setEdit(null)} title="Edit Course" size="sm"
        footer={<><Button variant="secondary" onClick={() => setEdit(null)}>Cancel</Button>
          <Button onClick={() => {
            if (!edit.title.trim()) return showToast("Title can't be empty.", "warning");
            setList((l) => l.map((c) => (c.id === edit.id ? edit : c)));
            showToast("Course updated.");
            setEdit(null);
          }}>Save</Button></>}>
        {edit && (
          <div className="space-y-4">
            <Input label="Title" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
            <Select label="Category" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Select label="Level" value={edit.level} onChange={(e) => setEdit({ ...edit, level: e.target.value })}>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </Select>
          </div>
        )}
      </Modal>

      <ConfirmationDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => { setList((l) => l.filter((c) => c.id !== toDelete.id)); showToast("Course deleted.", "info"); }}
        title="Delete course?"
        message={`"${toDelete?.title}" will be permanently removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}
