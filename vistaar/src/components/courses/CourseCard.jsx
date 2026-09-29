import { Link } from "react-router-dom";
import { Clock, Users, Star, Layers, User, ArrowRight, PlayCircle } from "lucide-react";
import CourseArt from "./CourseArt";
import { getCourseTheme } from "./courseTheme";

export default function CourseCard({ course, enrolled = false, progress = null }) {
  const t = getCourseTheme(course);
  const to = enrolled ? `/trainee/learn/${course.id}` : `/courses/${course.id}`;
  const ActionIcon = enrolled ? PlayCircle : ArrowRight;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[22px] bg-white border border-ink-100/70 shadow-[0_1px_2px_rgba(11,16,32,0.04),0_14px_30px_-16px_rgba(60,40,140,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-18px_rgba(60,40,140,0.38)]"
      style={{ "--c-accent": t.accent, "--c-ink": t.ink, "--c-tint": t.tint, "--c-tint-hover": t.tintHover }}
    >
      {/* coloured spine */}
      <span className="absolute inset-y-0 left-0 w-[6px]" style={{ background: `linear-gradient(180deg, ${t.from}, ${t.to})` }} aria-hidden="true" />

      {/* illustrated header + category pill straddling its bottom edge */}
      <div className="relative ml-[22px]">
        <Link to={`/courses/${course.id}`} tabIndex={-1} aria-hidden="true" className="relative block h-[126px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)` }}>
          <CourseArt kind={t.art} />
        </Link>
        <span
          className="absolute left-4 -bottom-3.5 z-10 inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium shadow-[0_4px_12px_-4px_rgba(11,16,32,0.25)]"
          style={{ color: t.ink }}
        >
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pl-[30px] pr-5 pt-8 pb-5">
        <Link to={`/courses/${course.id}`} className="focus-ring rounded">
          <h3 className="font-display font-bold text-[1.08rem] leading-snug text-ink-900 line-clamp-2 min-h-[2.7em] group-hover:text-[color:var(--c-ink)] transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 flex items-center gap-2 text-sm text-ink-500">
          <User size={16} className="shrink-0" /> {course.trainer}
        </p>

        <div className="mt-3 flex items-center gap-3.5 text-[13px] text-ink-500 whitespace-nowrap">
          <span className="flex items-center gap-1.5"><Clock size={15} /> {course.duration}</span>
          <span className="flex items-center gap-1.5"><Layers size={15} /> {course.modulesCount} modules</span>
          <span className="flex items-center gap-1.5"><Users size={15} /> {course.students.toLocaleString()}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={19} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-ink-900">{course.rating}</span>
            <span className="text-sm text-ink-400">({course.reviews})</span>
          </div>
          <span className="rounded-full px-3.5 py-1 text-[13px] font-medium" style={{ background: t.tintHover, color: t.ink }}>
            {course.level}
          </span>
        </div>

        {progress !== null && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-ink-500">Progress</span>
              <span className="font-semibold" style={{ color: t.ink }}>{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: t.accent }} />
            </div>
          </div>
        )}

        <div className="mt-auto pt-5">
        <Link
          to={to}
          className="focus-ring flex h-[52px] items-center justify-center gap-4 rounded-full text-[15px] font-semibold transition-colors bg-[color:var(--c-tint)] hover:bg-[color:var(--c-tint-hover)] text-[color:var(--c-ink)]"
        >
          <ActionIcon size={19} />
          {enrolled ? "Continue Learning" : "View Course"}
        </Link>
        </div>
      </div>
    </article>
  );
}
