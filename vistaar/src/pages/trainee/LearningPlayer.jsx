import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PlayCircle, PauseCircle, CheckCircle2, ChevronLeft, ChevronRight, FileText, Download, StickyNote } from "lucide-react";
import { getCourseById } from "../../data/courses";
import { useApp } from "../../context/AppContext";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";
import { Breadcrumb } from "../../components/ui/States";
import { Textarea } from "../../components/ui/Input";
import { downloadResource } from "../../utils/download";

export default function LearningPlayer() {
  const { id } = useParams();
  const course = getCourseById(id);
  const { getEnrollment, markLessonComplete, showToast } = useApp();
  const [notes, setNotes] = useState({});
  const [playing, setPlaying] = useState(false);

  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((m, mi) => m.lessons.map((l, li) => ({ module: m.title, title: l, mi, li })));
  }, [course]);

  const enrollment = getEnrollment(id);
  const firstIncomplete = allLessons.findIndex((l) => !enrollment?.completedLessons?.includes(l.title));
  const [activeIdx, setActiveIdx] = useState(firstIncomplete === -1 ? 0 : firstIncomplete);

  if (!course || !enrollment) {
    return (
      <div className="py-24 text-center text-ink-500 space-y-4">
        <p>{course ? "You're not enrolled in this course yet." : "Course not found."}</p>
        <Link to={course ? `/courses/${course.id}` : "/courses"}><Button>{course ? "View course" : "Browse catalog"}</Button></Link>
      </div>
    );
  }
  if (!allLessons.length) return <div className="py-24 text-center text-ink-500">This course has no lessons yet.</div>;

  const totalLessons = allLessons.length;
  const active = allLessons[activeIdx];
  const isDone = enrollment?.completedLessons?.includes(active.title);

  const handleComplete = () => {
    markLessonComplete(course.id, active.title, totalLessons);
    showToast("Lesson marked as complete.");
    setPlaying(false);
    if (activeIdx < allLessons.length - 1) setActiveIdx(activeIdx + 1);
  };

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "My Learning", to: "/trainee/my-learning" }, { label: course.title }]} />

      <div className="grid lg:grid-cols-[260px_1fr_260px] gap-6 items-start">
        {/* Modules sidebar */}
        <Card className="lg:sticky lg:top-24 max-h-[75vh] overflow-y-auto" padded={false}>
          <div className="p-4 border-b border-ink-100">
            <p className="font-display font-bold text-ink-900 text-sm">{course.title}</p>
          </div>
          {course.modules.map((m, mi) => (
            <div key={m.title}>
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide px-4 pt-3 pb-1">{m.title}</p>
              {m.lessons.map((lesson, li) => {
                const idx = allLessons.findIndex((l) => l.mi === mi && l.li === li);
                const done = enrollment?.completedLessons?.includes(lesson);
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={lesson}
                    onClick={() => { setActiveIdx(idx); setPlaying(false); }}
                    className={`focus-ring w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${
                      isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-ink-600 hover:bg-ink-100/60"
                    }`}
                  >
                    {done ? <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> : <PlayCircle size={15} className="text-ink-300 shrink-0" />}
                    <span className="truncate">{lesson}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </Card>

        {/* Main player */}
        <div className="space-y-5">
          <div className="aspect-video bg-ink-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grad-primary opacity-30" />
            <button onClick={() => setPlaying((p) => !p)} className="focus-ring relative w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center hover:bg-white/25 transition-colors" aria-label={playing ? "Pause video" : "Play video"}>
              {playing ? <PauseCircle size={40} className="text-white" /> : <PlayCircle size={40} className="text-white" />}
            </button>
            <p className="absolute bottom-4 left-5 right-5 text-xs text-white/80 truncate">{playing ? "Now playing (demo) — " : "Click to play — "}{active.title}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{active.module}</p>
            <h2 className="text-xl font-display font-bold text-ink-900 mt-1">{active.title}</h2>
            <p className="text-sm text-ink-500 mt-2 leading-relaxed">
              This lesson walks through core concepts with applied examples, building toward the module's practical session and assessment.
            </p>
          </div>

          <Card>
            <p className="text-sm font-semibold text-ink-800 mb-3">Learning Resources</p>
            <div className="space-y-2">
              {["Lesson Slide Deck", "Supplementary Reading"].map((r) => (
                <div key={r} className="flex items-center justify-between p-3 border border-ink-100 rounded-xl">
                  <span className="flex items-center gap-2.5 text-sm text-ink-700"><FileText size={16} className="text-indigo-500" /> {r}</span>
                  <button aria-label={`Download ${r}`} onClick={() => { downloadResource({ name: `${r} — ${active.title}`, course: course.title, type: "Document" }); showToast("Download started."); }} className="focus-ring p-1.5 rounded-lg text-ink-400 hover:text-indigo-600 hover:bg-indigo-50"><Download size={15} /></button>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <Button variant="secondary" icon={ChevronLeft} disabled={activeIdx === 0} onClick={() => setActiveIdx((i) => i - 1)}>
              Previous
            </Button>
            <Button variant={isDone ? "secondary" : "primary"} onClick={handleComplete} disabled={isDone}>
              {isDone ? "Completed" : "Mark as Complete"}
            </Button>
            <Button
              variant="secondary"
              iconRight={ChevronRight}
              disabled={activeIdx === allLessons.length - 1}
              onClick={() => setActiveIdx((i) => i + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Progress + Notes */}
        <div className="space-y-5 lg:sticky lg:top-24">
          <Card>
            <p className="text-sm font-semibold text-ink-800 mb-3">Course Progress</p>
            <ProgressBar value={enrollment?.progress || 0} showLabel size="lg" />
            <div className="mt-4 space-y-2 text-xs text-ink-500">
              {course.modules.map((m) => {
                const doneCount = m.lessons.filter((l) => enrollment?.completedLessons?.includes(l)).length;
                return (
                  <div key={m.title} className="flex justify-between">
                    <span className="truncate mr-2">{m.title}</span>
                    <span className="font-medium text-ink-700 shrink-0">{doneCount}/{m.lessons.length}</span>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-ink-800 mb-3 flex items-center gap-2"><StickyNote size={15} /> My Notes</p>
            <Textarea rows={6} placeholder="Jot down notes for this lesson…" value={notes[active.title] || ""} onChange={(e) => setNotes((n) => ({ ...n, [active.title]: e.target.value }))} />
          </Card>
        </div>
      </div>
    </div>
  );
}
