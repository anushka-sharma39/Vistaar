import { upcomingAssessments } from "../../data/assessments";
import { AssessmentCard } from "../../components/dashboard/SharedCards";

export default function TraineeAssessments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Assessments</h1>
        <p className="text-ink-500 mt-1.5">Complete assessments to validate your learning and earn certification.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingAssessments.map((a) => <AssessmentCard key={a.id} assessment={a} />)}
      </div>
    </div>
  );
}
