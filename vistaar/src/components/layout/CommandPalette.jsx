import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, GraduationCap, Users, ClipboardCheck, FolderOpen, X, CornerDownLeft } from "lucide-react";
import { courses } from "../../data/courses";
import { trainers } from "../../data/trainers";
import { assessments } from "../../data/assessments";
import { resources } from "../../data/misc";
import { useAuth } from "../../context/AuthContext";

export default function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "trainee";
  const assessPath = role === "admin" ? "/admin/assessments" : role === "trainer" ? "/trainer/assessments" : "/trainee/assessments";
  const resPath = role === "trainer" ? "/trainer/library" : role === "trainee" ? "/trainee/resources" : "/admin/courses";

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setQ(""); onClose(); } };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return null;
    return {
      courses: courses.filter((c) => c.title.toLowerCase().includes(term)).slice(0, 4),
      trainers: trainers.filter((t) => t.name.toLowerCase().includes(term)).slice(0, 3),
      assessments: assessments.filter((a) => a.title.toLowerCase().includes(term)).slice(0, 3),
      resources: resources.filter((r) => r.name.toLowerCase().includes(term)).slice(0, 3),
    };
  }, [q]);

  if (!open) return null;

  const go = (path) => {
    setQ("");
    navigate(path);
    onClose();
  };

  const hasResults = results && (results.courses.length || results.trainers.length || results.assessments.length || results.resources.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 animate-fadeIn">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-slideUp">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-100">
          <Search size={19} className="text-ink-400 shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, trainers, resources, assessments…"
            className="flex-1 outline-none text-sm text-ink-800 placeholder:text-ink-300"
          />
          <button onClick={onClose} className="text-ink-300 hover:text-ink-600" aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {!q && (
            <p className="text-xs text-ink-400 px-3 py-6 text-center">Start typing to search across the platform.</p>
          )}
          {q && !hasResults && <p className="text-sm text-ink-400 px-3 py-8 text-center">No results for "{q}"</p>}

          {results?.courses.length > 0 && (
            <div className="mb-1">
              <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide px-3 py-2">Courses</p>
              {results.courses.map((c) => (
                <button key={c.id} onClick={() => go(`/courses/${c.id}`)} className="focus-ring w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50/60 text-left">
                  <GraduationCap size={16} className="text-indigo-500 shrink-0" />
                  <span className="text-sm text-ink-800 truncate">{c.title}</span>
                </button>
              ))}
            </div>
          )}
          {results?.trainers.length > 0 && (
            <div className="mb-1">
              <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide px-3 py-2">Trainers</p>
              {results.trainers.map((t) => (
                <button key={t.id} onClick={() => go(`/trainers`)} className="focus-ring w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50/60 text-left">
                  <Users size={16} className="text-violet-500 shrink-0" />
                  <span className="text-sm text-ink-800 truncate">{t.name}</span>
                </button>
              ))}
            </div>
          )}
          {results?.assessments.length > 0 && (
            <div className="mb-1">
              <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide px-3 py-2">Assessments</p>
              {results.assessments.map((a) => (
                <button key={a.id} onClick={() => go(assessPath)} className="focus-ring w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50/60 text-left">
                  <ClipboardCheck size={16} className="text-amber-500 shrink-0" />
                  <span className="text-sm text-ink-800 truncate">{a.title}</span>
                </button>
              ))}
            </div>
          )}
          {results?.resources.length > 0 && (
            <div className="mb-1">
              <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide px-3 py-2">Resources</p>
              {results.resources.map((r) => (
                <button key={r.id} onClick={() => go(resPath)} className="focus-ring w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50/60 text-left">
                  <FolderOpen size={16} className="text-teal-500 shrink-0" />
                  <span className="text-sm text-ink-800 truncate">{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 px-5 py-2.5 border-t border-ink-100 text-[11px] text-ink-400">
          <CornerDownLeft size={12} /> to select <span className="mx-1.5">·</span> Esc to close
        </div>
      </div>
    </div>
  );
}
