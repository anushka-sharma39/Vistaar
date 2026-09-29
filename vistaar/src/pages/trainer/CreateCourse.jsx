import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, ImagePlus, X } from "lucide-react";
import { categories } from "../../data/courses";
import { Input, Select, Textarea } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export default function CreateCourse() {
  const { showToast, addTrainerCourse, updateTrainerCourse } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const editing = useLocation().state?.course || null;

  const [form, setForm] = useState({
    title: editing?.title || "",
    description: editing?.description || "",
    category: editing?.category || categories[0],
    level: editing?.level || "Beginner",
    duration: editing?.duration || "",
    objectives: editing?.objectives?.join("\n") || "",
    prerequisites: editing?.prerequisites?.join("\n") || "",
  });
  const [modules, setModules] = useState(
    editing?.modules?.length
      ? editing.modules.map((m) => ({ title: m.title, lessons: [...m.lessons] }))
      : [{ title: "Module 1", lessons: ["Introduction"] }]
  );
  const [thumb, setThumb] = useState(null);
  const [files, setFiles] = useState([]);
  const thumbRef = useRef(null);
  const fileRef = useRef(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const addModule = () => setModules((m) => [...m, { title: `Module ${m.length + 1}`, lessons: [] }]);
  const removeModule = (mi) => setModules((m) => m.filter((_, i) => i !== mi));
  const addLesson = (mi) =>
    setModules((m) => m.map((mod, i) => (i === mi ? { ...mod, lessons: [...mod.lessons, `Lesson ${mod.lessons.length + 1}`] } : mod)));
  const renameLesson = (mi, li, v) =>
    setModules((m) => m.map((mod, i) => (i === mi ? { ...mod, lessons: mod.lessons.map((l, j) => (j === li ? v : l)) } : mod)));
  const removeLesson = (mi, li) =>
    setModules((m) => m.map((mod, i) => (i === mi ? { ...mod, lessons: mod.lessons.filter((_, j) => j !== li) } : mod)));

  const pickThumb = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setThumb(r.result);
    r.readAsDataURL(f);
  };

  const submit = (e) => {
    e.preventDefault();
    const cleanModules = modules
      .map((m) => ({ title: m.title.trim() || "Untitled module", lessons: m.lessons.map((l) => l.trim()).filter(Boolean) }))
      .filter((m) => m.lessons.length);
    if (!cleanModules.length) return showToast("Add at least one lesson to a module.", "warning");
    const lines = (t) => t.split("\n").map((x) => x.trim()).filter(Boolean);
    const payload = {
      title: form.title.trim(), description: form.description.trim(), category: form.category, level: form.level,
      duration: form.duration.trim() || "4 weeks", objectives: lines(form.objectives), prerequisites: lines(form.prerequisites),
      modules: cleanModules, modulesCount: cleanModules.length,
    };
    if (editing) {
      updateTrainerCourse(editing.id, payload);
      showToast("Course updated.");
    } else {
      addTrainerCourse({
        id: `c-${Date.now()}`, trainerId: "tr-01", trainer: user?.name || "You", hours: 12, students: 0, rating: 0, reviews: 0,
        color: "indigo", published: false, ...payload,
      });
      showToast("Course saved as a draft. Publish it from My Courses.");
    }
    navigate("/trainer/courses");
  };

  return (
    <form onSubmit={submit} className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">{editing ? "Edit Course" : "Create Course"}</h1>
        <p className="text-ink-500 mt-1.5">Define course details, structure the curriculum and upload resources.</p>
      </div>

      <Card className="space-y-5">
        <h2 className="font-display font-bold text-ink-900">Course Details</h2>
        <Input label="Course Title" placeholder="e.g. Foundations of Machine Learning" required value={form.title} onChange={set("title")} />
        <Textarea label="Description" rows={4} placeholder="Describe what this course covers…" required value={form.description} onChange={set("description")} />
        <div className="grid sm:grid-cols-3 gap-4">
          <Select label="Category" value={form.category} onChange={set("category")}>{categories.map((c) => <option key={c}>{c}</option>)}</Select>
          <Select label="Level" value={form.level} onChange={set("level")}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select>
          <Input label="Duration" placeholder="e.g. 6 weeks" value={form.duration} onChange={set("duration")} />
        </div>
        <Textarea label="Learning Objectives" rows={3} placeholder="One objective per line" value={form.objectives} onChange={set("objectives")} />
        <Textarea label="Prerequisites" rows={2} placeholder="One per line, e.g. Basic Python" value={form.prerequisites} onChange={set("prerequisites")} />
        <div>
          <p className="text-sm font-medium text-ink-700 mb-1.5">Thumbnail</p>
          <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={pickThumb} />
          {thumb ? (
            <div className="relative w-full max-w-xs">
              <img src={thumb} alt="Course thumbnail preview" className="rounded-xl border border-ink-100 w-full h-40 object-cover" />
              <button type="button" onClick={() => setThumb(null)} aria-label="Remove thumbnail" className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-card hover:bg-white"><X size={14} /></button>
            </div>
          ) : (
            <button type="button" onClick={() => thumbRef.current?.click()} className="focus-ring w-full border-2 border-dashed border-ink-100 rounded-xl p-8 flex flex-col items-center text-ink-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
              <ImagePlus size={26} />
              <p className="text-sm mt-2">Click to upload an image</p>
            </button>
          )}
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-ink-900">Curriculum</h2>
          <Button type="button" size="sm" variant="secondary" icon={Plus} onClick={addModule}>Add Module</Button>
        </div>
        {modules.map((m, mi) => (
          <div key={mi} className="border border-ink-100 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Input aria-label="Module title" value={m.title} onChange={(e) => setModules((all) => all.map((x, i) => (i === mi ? { ...x, title: e.target.value } : x)))} className="flex-1" />
              <Button type="button" size="icon" variant="ghost" className="text-red-600" onClick={() => removeModule(mi)} aria-label="Remove module" disabled={modules.length === 1}><Trash2 size={16} /></Button>
            </div>
            <ul className="space-y-2 pl-2">
              {m.lessons.map((l, li) => (
                <li key={li} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <input aria-label="Lesson title" value={l} onChange={(e) => renameLesson(mi, li, e.target.value)} className="focus-ring flex-1 text-sm text-ink-700 bg-transparent border-b border-transparent hover:border-ink-100 focus:border-indigo-300 py-1" />
                  <button type="button" aria-label="Remove lesson" onClick={() => removeLesson(mi, li)} className="text-ink-300 hover:text-red-500"><X size={14} /></button>
                </li>
              ))}
            </ul>
            <Button type="button" size="sm" variant="ghost" icon={Plus} onClick={() => addLesson(mi)}>Add Lesson</Button>
          </div>
        ))}
      </Card>

      <Card>
        <h2 className="font-display font-bold text-ink-900 mb-4">Resources</h2>
        <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => setFiles((f) => [...f, ...Array.from(e.target.files || [])])} />
        <button type="button" onClick={() => fileRef.current?.click()} className="focus-ring w-full border-2 border-dashed border-ink-100 rounded-xl p-8 flex flex-col items-center text-ink-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
          <Upload size={26} />
          <p className="text-sm mt-2">Upload slide decks, documents, or recordings</p>
        </button>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm bg-canvas rounded-lg px-3 py-2">
                <span className="truncate text-ink-700">{f.name}</span>
                <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles((all) => all.filter((_, j) => j !== i))} className="text-ink-300 hover:text-red-500"><X size={14} /></button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => navigate("/trainer/courses")}>Cancel</Button>
        <Button type="submit">{editing ? "Save Changes" : "Save Course"}</Button>
      </div>
    </form>
  );
}
