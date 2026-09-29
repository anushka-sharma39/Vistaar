import { useState } from "react";
import { Plus, Eye, Pencil, BarChart3, Copy, Trash2, ClipboardList, X } from "lucide-react";
import { assessments as seed } from "../../data/assessments";
import { courses } from "../../data/courses";
import { Card } from "../../components/ui/Card";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import ProgressBar from "../../components/ui/ProgressBar";
import { Input, Select, Textarea } from "../../components/ui/Input";
import { ConfirmationDialog } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";

const columns = [
  { key: "a", label: "Assessment" },
  { key: "c", label: "Course" },
  { key: "q", label: "Questions" },
  { key: "d", label: "Deadline" },
  { key: "at", label: "Attempts" },
  { key: "s", label: "Status" },
  { key: "x", label: "Actions" },
];

const blank = () => ({
  id: null, title: "", course: courses[0].title, deadline: "", duration: 15, passingScore: 70,
  questionList: [{ text: "", type: "MCQ" }],
});

export default function TrainerAssessments() {
  const { showToast } = useApp();
  const [list, setList] = useState(seed);
  const [editor, setEditor] = useState(null); // form state when create/edit modal is open
  const [viewing, setViewing] = useState(null);
  const [results, setResults] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const duplicate = (a) => {
    setList((l) => [...l, { ...a, id: `a-${Date.now()}`, title: `${a.title} (Copy)`, status: "Draft", attempts: 0 }]);
    showToast("Assessment duplicated.");
  };

  const openEdit = (a) =>
    setEditor({
      id: a.id, title: a.title, course: a.course, deadline: a.deadline, duration: a.duration ?? 15, passingScore: a.passingScore ?? 70,
      questionList: Array.from({ length: Math.max(1, a.questions) }, () => ({ text: "", type: "MCQ" })).slice(0, 3),
      total: a.questions, status: a.status,
    });

  const save = (status) => {
    if (!editor.title.trim()) return showToast("Give the assessment a title first.", "warning");
    const filled = editor.questionList.filter((q) => q.text.trim()).length;
    const questions = editor.id ? Math.max(editor.total || 0, filled) : filled || editor.questionList.length;
    const payload = {
      title: editor.title.trim(), course: editor.course, deadline: editor.deadline || "TBD",
      duration: Number(editor.duration) || 15, passingScore: Number(editor.passingScore) || 70, questions, status,
    };
    if (editor.id) {
      setList((l) => l.map((a) => (a.id === editor.id ? { ...a, ...payload } : a)));
      showToast("Assessment updated.");
    } else {
      setList((l) => [{ id: `a-${Date.now()}`, attempts: 0, ...payload }, ...l]);
      showToast(status === "Published" ? "Assessment published." : "Saved as draft.");
    }
    setEditor(null);
  };

  const setQ = (i, patch) =>
    setEditor((e) => ({ ...e, questionList: e.questionList.map((q, qi) => (qi === i ? { ...q, ...patch } : q)) }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Assessments</h1>
          <p className="text-ink-500 mt-1.5">Create questionnaires and monitor trainee attempts.</p>
        </div>
        <Button icon={Plus} onClick={() => setEditor(blank())}>Create Assessment</Button>
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={list}
          renderRow={(a) => (
            <>
              <Td><span className="font-semibold text-ink-900">{a.title}</span></Td>
              <Td className="text-ink-600">{a.course}</Td>
              <Td>{a.questions}</Td>
              <Td>{a.deadline}</Td>
              <Td>{a.attempts}</Td>
              <Td><Badge tone={a.status === "Published" ? "green" : "amber"}>{a.status}</Badge></Td>
              <Td>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" aria-label="View" onClick={() => setViewing(a)}><Eye size={15} /></Button>
                  <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => openEdit(a)}><Pencil size={15} /></Button>
                  <Button size="icon" variant="ghost" aria-label="Results" onClick={() => setResults(a)}><BarChart3 size={15} /></Button>
                  <Button size="icon" variant="ghost" aria-label="Duplicate" onClick={() => duplicate(a)}><Copy size={15} /></Button>
                  <Button size="icon" variant="ghost" className="text-red-600" aria-label="Delete" onClick={() => setToDelete(a)}><Trash2 size={15} /></Button>
                </div>
              </Td>
            </>
          )}
        />
      </Card>

      {/* Create / edit */}
      <Modal
        open={!!editor}
        onClose={() => setEditor(null)}
        title={editor?.id ? "Edit Assessment" : "Create Assessment"}
        size="lg"
        footer={
          editor && (
            <>
              <Button variant="secondary" onClick={() => save(editor.id ? editor.status : "Draft")}>{editor.id ? "Save changes" : "Save as Draft"}</Button>
              {!editor.id && <Button onClick={() => save("Published")}>Publish</Button>}
            </>
          )
        }
      >
        {editor && (
          <div className="space-y-4">
            <Input label="Assessment Title" placeholder="e.g. Module 2 Quiz" value={editor.title} onChange={(e) => setEditor({ ...editor, title: e.target.value })} />
            <Select label="Course" value={editor.course} onChange={(e) => setEditor({ ...editor, course: e.target.value })}>
              {courses.slice(0, 8).map((c) => <option key={c.id}>{c.title}</option>)}
            </Select>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="Deadline" type="date" value={/^\d{4}-/.test(editor.deadline) ? editor.deadline : ""} onChange={(e) => setEditor({ ...editor, deadline: e.target.value })} />
              <Input label="Duration (min)" type="number" min={1} value={editor.duration} onChange={(e) => setEditor({ ...editor, duration: e.target.value })} />
              <Input label="Passing Score (%)" type="number" min={1} max={100} value={editor.passingScore} onChange={(e) => setEditor({ ...editor, passingScore: e.target.value })} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink-800 flex items-center gap-2"><ClipboardList size={15} /> Questions</p>
                <Button size="sm" variant="secondary" icon={Plus} onClick={() => setEditor((e) => ({ ...e, questionList: [...e.questionList, { text: "", type: "MCQ" }] }))}>Add Question</Button>
              </div>
              {editor.questionList.map((q, i) => (
                <div key={i} className="border border-ink-100 rounded-xl p-3 grid sm:grid-cols-[1fr_150px_auto] gap-3 items-start">
                  <Textarea rows={2} placeholder={`Question ${i + 1}`} value={q.text} onChange={(e) => setQ(i, { text: e.target.value })} />
                  <Select value={q.type} onChange={(e) => setQ(i, { type: e.target.value })}><option>MCQ</option><option>True/False</option><option>Multiple choice</option></Select>
                  <Button size="icon" variant="ghost" aria-label="Remove question" disabled={editor.questionList.length === 1}
                    onClick={() => setEditor((e) => ({ ...e, questionList: e.questionList.filter((_, qi) => qi !== i) }))}><X size={15} /></Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* View */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title={viewing?.title || ""} size="sm">
        {viewing && (
          <div className="space-y-3 text-sm">
            {[["Course", viewing.course], ["Questions", viewing.questions], ["Duration", `${viewing.duration ?? 15} min`], ["Passing score", `${viewing.passingScore ?? 70}%`], ["Deadline", viewing.deadline], ["Attempts", viewing.attempts]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4"><span className="text-ink-500">{k}</span><span className="text-ink-900 font-medium text-right">{v}</span></div>
            ))}
            <div className="flex justify-between"><span className="text-ink-500">Status</span><Badge tone={viewing.status === "Published" ? "green" : "amber"}>{viewing.status}</Badge></div>
          </div>
        )}
      </Modal>

      {/* Results */}
      <Modal open={!!results} onClose={() => setResults(null)} title={`Results — ${results?.title || ""}`} size="sm">
        {results && (() => {
          const seedN = [...results.id].reduce((n, ch) => n + ch.charCodeAt(0), 0);
          const avg = 62 + (seedN % 28);
          const pass = Math.min(98, avg + 6);
          return (
            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-indigo-50 p-4"><p className="text-2xl font-extrabold text-indigo-700">{results.attempts}</p><p className="text-xs text-ink-500 mt-1">Attempts</p></div>
                <div className="rounded-xl bg-emerald-50 p-4"><p className="text-2xl font-extrabold text-emerald-700">{avg}%</p><p className="text-xs text-ink-500 mt-1">Average score</p></div>
              </div>
              <div><p className="text-xs text-ink-500 mb-1.5">Pass rate</p><ProgressBar value={pass} showLabel labelText={`${pass}% of attempts passed`} /></div>
              {results.attempts === 0 && <p className="text-xs text-ink-400">No attempts yet — figures are illustrative.</p>}
            </div>
          );
        })()}
      </Modal>

      <ConfirmationDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => { setList((l) => l.filter((x) => x.id !== toDelete.id)); showToast("Assessment deleted.", "info"); }}
        title="Delete assessment?"
        message={`"${toDelete?.title}" and all attempts will be removed.`}
        confirmLabel="Delete"
      />
    </div>
  );
}
