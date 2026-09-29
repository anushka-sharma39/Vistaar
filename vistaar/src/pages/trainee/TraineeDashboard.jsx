import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, ClipboardCheck, Award, Clock3, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { getCourseById, courses } from "../../data/courses";
import { recentActivity } from "../../data/misc";
import { upcomingAssessments } from "../../data/assessments";
import { recommendedCourseIds } from "../../data/enrollments";
import SkillGapRadar from "../../components/dashboard/SkillGapRadar";
import StatCard from "../../components/ui/StatCard";
import CourseCard from "../../components/courses/CourseCard";
import { AssessmentCard } from "../../components/dashboard/SharedCards";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/States";
import {
  UserPlus2,
  ClipboardCheck as CIcon,
  Award as AIcon,
  MessageSquare,
} from "lucide-react";

const activityIcons = { enroll: UserPlus2, assessment: CIcon, certificate: AIcon, feedback: MessageSquare };

export default function TraineeDashboard() {
  const { user } = useAuth();
  const { enrollments, assessmentResults } = useApp();

  const inProgress = enrollments.filter((e) => e.status === "In Progress");
  const completed = enrollments.filter((e) => e.status === "Completed");
  const recommended = recommendedCourseIds.map(getCourseById).filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Good morning, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-ink-500 mt-1.5">Continue your learning journey and build your professional capabilities.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={BookOpen} label="Enrolled Courses" value={enrollments.length} tone="indigo" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed.length} tone="teal" trend="+2 this month" />
        <StatCard icon={ClipboardCheck} label="Assessments Due" value={upcomingAssessments.filter((a) => !assessmentResults[a.id]).length} tone="amber" />
        <StatCard icon={Award} label="Certificates" value={3} tone="violet" />
        <StatCard icon={Clock3} label="Learning Hours" value="86h" tone="indigo" />
      </div>

      <SkillGapRadar />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-ink-900">Continue Learning</h2>
              <Link to="/trainee/my-learning" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            {inProgress.length === 0 ? (
              <EmptyState title="No courses in progress" message="Enroll in a course from the catalog to get started." />
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {inProgress.slice(0, 2).map((e) => {
                  const course = getCourseById(e.courseId);
                  if (!course) return null;
                  return <CourseCard key={e.courseId} course={course} enrolled progress={e.progress} />;
                })}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={17} className="text-violet-500" />
              <h2 className="font-display font-bold text-lg text-ink-900">Recommended for You</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommended.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-display font-bold text-lg text-ink-900 mb-4">Upcoming Assessments</h2>
            <div className="space-y-4">
              {upcomingAssessments.slice(0, 2).map((a) => <AssessmentCard key={a.id} assessment={a} />)}
            </div>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink-900 mb-4">Recent Activity</h2>
            <Card>
              <div className="space-y-5">
                {recentActivity.map((a, i) => {
                  const Icon = activityIcons[a.type] || UserPlus2;
                  return (
                    <div key={a.id} className="flex gap-3 relative">
                      {i < recentActivity.length - 1 && <span className="absolute left-[15px] top-8 bottom-[-20px] w-px bg-ink-100" />}
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 z-10">
                        <Icon size={14} className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-700 leading-snug">{a.text}</p>
                        <p className="text-xs text-ink-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </section>

          <section>
            <h2 className="font-display font-bold text-lg text-ink-900 mb-4">Achievements</h2>
            <Card>
              <div className="grid grid-cols-3 gap-3">
                {["ML", "CY", "PD"].map((b) => (
                  <div key={b} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-2xl bg-grad-violet flex items-center justify-center text-white font-display font-bold shadow-lift">
                      {b}
                    </div>
                    <Badge tone="violet">Certified</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
