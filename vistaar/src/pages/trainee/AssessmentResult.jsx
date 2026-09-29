import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Award, RotateCcw, CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import { sampleQuiz } from "../../data/assessments";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { CircularProgress } from "../../components/ui/Misc";

export default function AssessmentResult() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const score = state?.score ?? 8;
  const total = state?.total ?? sampleQuiz.questions.length;
  const timeTaken = state?.timeTaken ?? 620;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= sampleQuiz.passingScore;
  const mm = Math.floor(timeTaken / 60);
  const ss = timeTaken % 60;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="text-center py-10">
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${passed ? "bg-emerald-50" : "bg-red-50"}`}>
          <Award size={30} className={passed ? "text-emerald-600" : "text-red-500"} />
        </div>
        <h1 className="text-2xl font-display font-extrabold text-ink-900 mt-5">
          {passed ? "Congratulations, you passed!" : "Assessment not passed"}
        </h1>
        <p className="text-ink-500 mt-2">{sampleQuiz.title}</p>

        <div className="flex justify-center mt-8">
          <CircularProgress value={percentage} size={130} stroke={9} tone={passed ? "#10B981" : "#EF4444"} label={`${percentage}%`} />
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
          <div>
            <p className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-lg"><CheckCircle2 size={17} /> {score}</p>
            <p className="text-xs text-ink-400 mt-1">Correct</p>
          </div>
          <div>
            <p className="flex items-center justify-center gap-1.5 text-red-500 font-bold text-lg"><XCircle size={17} /> {total - score}</p>
            <p className="text-xs text-ink-400 mt-1">Incorrect</p>
          </div>
          <div>
            <p className="flex items-center justify-center gap-1.5 text-ink-700 font-bold text-lg"><Clock size={17} /> {mm}m {ss}s</p>
            <p className="text-xs text-ink-400 mt-1">Time Taken</p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          <Button variant="secondary" icon={RotateCcw} onClick={() => navigate(`/trainee/assessments/${id}`)}>
            Retake Assessment
          </Button>
          <Button iconRight={ArrowRight} onClick={() => navigate("/trainee/assessments")}>
            Back to Assessments
          </Button>
        </div>
      </Card>
    </div>
  );
}
