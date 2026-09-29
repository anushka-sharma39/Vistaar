import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Clock, Users, BarChart3, CheckCircle2, PlayCircle, Lock, FileText, Download, ClipboardCheck } from "lucide-react";
import { getCourseById } from "../../data/courses";
import { getTrainerById } from "../../data/trainers";
import TrainerCard from "../../components/courses/TrainerCard";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import Tabs from "../../components/ui/Tabs";
import ProgressBar from "../../components/ui/ProgressBar";
import { Breadcrumb } from "../../components/ui/States";
import { StarRating } from "../../components/ui/Misc";
import { useApp } from "../../context/AppContext";
import { downloadResource } from "../../utils/download";
import { useAuth } from "../../context/AuthContext";
import { getCoursePricing, formatINR } from "../../data/pricing";

export default function CourseDetails() {
  const { id } = useParams();
  const course = getCourseById(id);
  const [tab, setTab] = useState("overview");
  const { isEnrolled, enrollInCourse, getEnrollment, showToast } = useApp();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!course) {
    return <div className="max-w-3xl mx-auto px-4 py-24 text-center text-ink-500">Course not found.</div>;
  }

  const trainer = getTrainerById(course.trainerId);
  const enrolled = isEnrolled(course.id);
  const enrollment = getEnrollment(course.id);
  const pricing = getCoursePricing(course);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/courses/${course.id}` } });
      return;
    }
    if (user.role !== "trainee") {
      showToast("Only trainee accounts can enroll in courses.", "info");
      return;
    }
    if (pricing.isPaid) {
      navigate(`/courses/${course.id}/checkout`);
      return;
    }
    enrollInCourse(course.id);
  };

  return (
    <div>
      <div className="bg-grad-midnight">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-16">
          <Breadcrumb items={[{ label: "Courses", to: "/courses" }, { label: course.title }]} />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="gray" className="bg-white/15 text-white border-white/20">{course.category}</Badge>
            <Badge tone="gray" className="bg-white/15 text-white border-white/20">{course.level}</Badge>
          </div>
          <h1 className="text-3xl lg:text-[2.6rem] font-extrabold tracking-tight text-white mt-4 max-w-3xl">{course.title}</h1>
          <p className="text-indigo-100 mt-3 max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-indigo-100 text-sm">
            <span className="flex items-center gap-1.5"><Star size={15} className="fill-amber-400 text-amber-400" /> {course.rating} ({course.reviews} reviews)</span>
            <span className="flex items-center gap-1.5"><Clock size={15} /> {course.duration}</span>
            <span className="flex items-center gap-1.5"><Users size={15} /> {course.students.toLocaleString()} enrolled</span>
            <span className="flex items-center gap-1.5"><BarChart3 size={15} /> {course.hours} hours</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8 pb-20 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="!bg-white">
            <Tabs
              tabs={[
                { label: "Overview", value: "overview" },
                { label: "Curriculum", value: "curriculum" },
                { label: "Resources", value: "resources" },
                { label: "Assessments", value: "assessments" },
                { label: "Reviews", value: "reviews" },
              ]}
              active={tab}
              onChange={setTab}
            />

            <div className="pt-6">
              {tab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-ink-900 mb-3">What you'll learn</h3>
                    <ul className="space-y-2.5">
                      {course.objectives.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <CheckCircle2 size={17} className="text-emerald-500 shrink-0 mt-0.5" /> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-ink-900 mb-3">Prerequisites</h3>
                    <ul className="space-y-1.5 text-sm text-ink-600 list-disc pl-5">
                      {course.prerequisites.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  {trainer && (
                    <div>
                      <h3 className="font-display font-bold text-ink-900 mb-3">About the trainer</h3>
                      <div className="max-w-md"><TrainerCard trainer={trainer} showBio /></div>
                    </div>
                  )}
                </div>
              )}

              {tab === "curriculum" && (
                <div className="space-y-3">
                  {course.modules.map((m, mi) => (
                    <div key={m.title} className="border border-ink-100 rounded-xl overflow-hidden">
                      <div className="bg-canvas px-4 py-3 font-semibold text-sm text-ink-800">{m.title}</div>
                      <div className="divide-y divide-ink-100/70">
                        {m.lessons.map((lesson, li) => {
                          const unlocked = enrolled || (mi === 0 && li === 0);
                          const done = enrollment?.completedLessons?.includes(lesson);
                          return (
                            <div key={lesson} className="flex items-center gap-3 px-4 py-3 text-sm">
                              {done ? (
                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                              ) : unlocked ? (
                                <PlayCircle size={16} className="text-indigo-500 shrink-0" />
                              ) : (
                                <Lock size={14} className="text-ink-300 shrink-0" />
                              )}
                              <span className={unlocked ? "text-ink-700" : "text-ink-400"}>{lesson}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "resources" && (
                <div className="space-y-3">
                  {["Course Slide Deck", "Reading Compendium", "Practice Dataset / Worksheet"].map((r) => (
                    <div key={r} className="flex items-center justify-between p-4 border border-ink-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-indigo-500" />
                        <span className="text-sm font-medium text-ink-800">{r}</span>
                      </div>
                      {enrolled ? (
                        <Button size="sm" variant="secondary" icon={Download} onClick={() => { downloadResource({ name: `${r} — ${course.title}`, course: course.title, type: "Document" }); showToast("Download started."); }}>Download</Button>
                      ) : (
                        <Lock size={14} className="text-ink-300" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tab === "assessments" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-ink-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ClipboardCheck size={18} className="text-amber-500" />
                      <div>
                        <p className="text-sm font-semibold text-ink-800">{course.title} — Final Assessment</p>
                        <p className="text-xs text-ink-500">10 questions · 15 minutes · Passing score 70%</p>
                      </div>
                    </div>
                    {enrolled ? (
                      <Link to="/trainee/assessments/a-01"><Button size="sm">Start</Button></Link>
                    ) : (
                      <Lock size={14} className="text-ink-300" />
                    )}
                  </div>
                </div>
              )}

              {tab === "reviews" && (
                <div className="space-y-5">
                  {[
                    { name: "Sameer Khan", rating: 5, text: "Extremely well structured. The case studies made the concepts click." },
                    { name: "Divya Menon", rating: 4, text: "Great pace and clarity, would have liked more practice exercises." },
                    { name: "Rahul Bhatt", rating: 5, text: "One of the best training programs I've completed on this platform." },
                  ].map((r) => (
                    <div key={r.name} className="flex gap-3">
                      <Avatar initials={r.name.split(" ").map((n) => n[0]).join("")} size="sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink-800">{r.name}</p>
                          <StarRating value={r.rating} size={12} />
                        </div>
                        <p className="text-sm text-ink-500 mt-1">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            {enrolled ? (
              <>
                {enrollment?.purchase && (
                  <div className="mb-4 flex items-center justify-between gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-2.5">
                    <Badge tone="green" icon={CheckCircle2}>Purchased</Badge>
                    <span className="text-xs text-emerald-800 font-mono truncate" title={enrollment.purchase.transactionId}>{enrollment.purchase.transactionId}</span>
                  </div>
                )}
                <p className="text-sm font-semibold text-ink-700 mb-2">Your progress</p>
                <ProgressBar value={enrollment?.progress || 0} showLabel size="lg" />
                <Link to={`/trainee/learn/${course.id}`}>
                  <Button className="w-full mt-5" size="lg">Continue Learning</Button>
                </Link>
              </>
            ) : (
              <>
                {pricing.isPaid ? (
                  <>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="font-display text-3xl font-extrabold text-ink-900">{formatINR(pricing.price)}</p>
                      <p className="text-base text-ink-400 line-through">{formatINR(pricing.original)}</p>
                      <Badge tone="green">{pricing.discountPct}% off</Badge>
                    </div>
                    <p className="text-xs text-ink-400 mb-4 mt-1">Inclusive of all taxes · One-time payment</p>
                    <Button className="w-full" size="lg" onClick={handleEnroll}>Buy Course</Button>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-500"><Lock size={12} className="text-emerald-600" /> 100% Secure Payment</p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-3xl font-extrabold text-ink-900">Free</p>
                    <p className="text-xs text-ink-400 mb-4">Institutional training program</p>
                    <Button className="w-full" size="lg" onClick={handleEnroll}>Enroll Now</Button>
                  </>
                )}
              </>
            )}
            <div className="space-y-3 mt-6 pt-6 border-t border-ink-100 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">Duration</span><span className="font-medium text-ink-800">{course.duration}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Total Hours</span><span className="font-medium text-ink-800">{course.hours}h</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Modules</span><span className="font-medium text-ink-800">{course.modulesCount}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Level</span><span className="font-medium text-ink-800">{course.level}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Students</span><span className="font-medium text-ink-800">{course.students.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Certificate</span><span className="font-medium text-ink-800">Yes</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
