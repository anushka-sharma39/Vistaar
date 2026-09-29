import { useState } from "react";
import { getCourseById } from "../../data/courses";
import { useApp } from "../../context/AppContext";
import CourseCard from "../../components/courses/CourseCard";
import Tabs from "../../components/ui/Tabs";
import { EmptyState } from "../../components/ui/States";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function MyLearning() {
  const { enrollments } = useApp();
  const [tab, setTab] = useState("all");

  const withCourse = enrollments.map((e) => ({ ...e, course: getCourseById(e.courseId) })).filter((e) => e.course);
  const filtered =
    tab === "all" ? withCourse : tab === "progress" ? withCourse.filter((e) => e.status === "In Progress") : withCourse.filter((e) => e.status === "Completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">My Learning</h1>
        <p className="text-ink-500 mt-1.5">Track progress across all your enrolled courses.</p>
      </div>

      <Tabs
        tabs={[
          { label: `All (${withCourse.length})`, value: "all" },
          { label: "In Progress", value: "progress" },
          { label: "Completed", value: "completed" },
        ]}
        active={tab}
        onChange={setTab}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="Nothing here yet"
          message="Browse the course catalog to start learning."
          action={<Link to="/courses"><Button>Browse Catalog</Button></Link>}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e) => (
            <CourseCard key={e.courseId} course={e.course} enrolled progress={e.progress} />
          ))}
        </div>
      )}
    </div>
  );
}
