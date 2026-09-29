import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { sampleQuiz } from "../../data/assessments";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { ConfirmationDialog } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";

export default function AssessmentTake() {
  const navigate = useNavigate();
  const { id } = useParams();
  const quiz = sampleQuiz;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [seconds, setSeconds] = useState(quiz.duration * 60);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { recordAssessment, showToast } = useApp();
  const submitted = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const q = quiz.questions[current];
  const answeredCount = Object.keys(answers).length;

  const submit = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;
    let score = 0;
    quiz.questions.forEach((qq) => {
      if (answers[qq.id] === qq.answer) score += 1;
    });
    const total = quiz.questions.length;
    const result = { score, total, timeTaken: quiz.duration * 60 - seconds, percentage: Math.round((score / total) * 100) };
    recordAssessment(id, result);
    navigate(`/trainee/assessments/${id}/result`, { state: result });
  }, [answers, id, navigate, quiz, recordAssessment, seconds]);

  // Auto-submit when the clock runs out.
  useEffect(() => {
    if (seconds === 0 && !submitted.current) {
      showToast("Time's up — your answers were submitted.", "info");
      submit();
    }
  }, [seconds, submit, showToast]);

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-lg text-ink-900">{quiz.title}</h1>
          <p className="text-sm text-ink-500">{quiz.course}</p>
        </div>
        <div className={`flex items-center gap-2 font-semibold px-4 py-2 rounded-xl tabular-nums ${seconds <= 60 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>
          <Clock size={16} /> {mm}:{ss}
        </div>
      </Card>

      <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
        <Card>
          <div className="flex items-center justify-between mb-5">
            <Badge tone="indigo">Question {current + 1} of {quiz.questions.length}</Badge>
            <button
              onClick={() => setMarked((m) => ({ ...m, [q.id]: !m[q.id] }))}
              className={`focus-ring flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                marked[q.id] ? "bg-amber-50 border-amber-200 text-amber-700" : "border-ink-100 text-ink-500 hover:border-amber-200"
              }`}
            >
              <Flag size={12} /> {marked[q.id] ? "Marked" : "Mark for review"}
            </button>
          </div>

          <p className="text-lg font-semibold text-ink-900 leading-snug">{q.text}</p>

          <div className="space-y-3 mt-6" role="radiogroup">
            {q.options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const selected = answers[q.id] === i;
              return (
                <button
                  key={opt}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className={`focus-ring w-full flex items-center gap-3.5 text-left px-4 py-3.5 rounded-xl border-2 transition-colors ${
                    selected ? "border-indigo-500 bg-indigo-50" : "border-ink-100 hover:border-indigo-200"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${selected ? "bg-indigo-600 text-white" : "bg-ink-100 text-ink-500"}`}>
                    {letter}
                  </span>
                  <span className="text-sm text-ink-800">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-100">
            <Button variant="secondary" icon={ChevronLeft} disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
              Previous
            </Button>
            {current === quiz.questions.length - 1 ? (
              <Button variant="primary" onClick={() => setConfirmOpen(true)}>Submit Assessment</Button>
            ) : (
              <Button variant="secondary" iconRight={ChevronRight} onClick={() => setCurrent((c) => c + 1)}>
                Next
              </Button>
            )}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-ink-800 mb-1">Progress</p>
          <p className="text-xs text-ink-500 mb-4">{answeredCount} of {quiz.questions.length} answered</p>
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((qq, i) => {
              const answered = answers[qq.id] !== undefined;
              const isCurrent = i === current;
              return (
                <button
                  key={qq.id}
                  onClick={() => setCurrent(i)}
                  className={`focus-ring w-9 h-9 rounded-lg text-xs font-semibold border transition-colors relative ${
                    isCurrent ? "border-indigo-600 bg-indigo-600 text-white" : answered ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-ink-100 text-ink-500"
                  }`}
                >
                  {i + 1}
                  {marked[qq.id] && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />}
                </button>
              );
            })}
          </div>
          <Button variant="primary" className="w-full mt-6" onClick={() => setConfirmOpen(true)}>
            Submit Assessment
          </Button>
        </Card>
      </div>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={submit}
        title="Submit Assessment?"
        message={`You've answered ${answeredCount} of ${quiz.questions.length} questions. Once submitted, you cannot change your answers.`}
        confirmLabel="Submit"
        variant="primary"
      />
    </div>
  );
}
