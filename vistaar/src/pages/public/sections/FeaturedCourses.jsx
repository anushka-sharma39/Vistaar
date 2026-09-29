import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock, Layers, Users, Star, Cpu, BarChart3, Settings, User } from "lucide-react";
import { courses } from "../../../data/courses";

/* ---------- per-category look ---------- */
const themes = {
  ai: {
    icon: Cpu,
    banner: "linear-gradient(135deg,#1E1B4B 0%,#4338CA 55%,#7C3AED 100%)",
    solid: "linear-gradient(90deg,#6366F1 0%,#8B5CF6 50%,#D946EF 100%)",
    glow: "0 14px 26px -12px rgba(139,92,246,.75)",
    ink: "#4F46E5",
    border: "#A5B4FC",
    badge: "bg-indigo-100 text-indigo-700",
    pill: "text-indigo-700",
  },
  data: {
    icon: BarChart3,
    banner: "linear-gradient(135deg,#0F766E 0%,#14B8A6 55%,#22D3EE 100%)",
    solid: "linear-gradient(90deg,#0D9488 0%,#14B8A6 100%)",
    glow: "0 14px 26px -12px rgba(13,148,136,.7)",
    ink: "#0F766E",
    border: "#2DD4BF",
    badge: "bg-teal-100 text-teal-700",
    pill: "text-teal-700",
  },
  digital: {
    icon: Settings,
    banner: "linear-gradient(135deg,#9D174D 0%,#DB2777 55%,#A21CAF 100%)",
    solid: "linear-gradient(90deg,#DB2777 0%,#E040A0 55%,#C026D3 100%)",
    glow: "0 14px 26px -12px rgba(219,39,119,.7)",
    ink: "#BE185D",
    border: "#F9A8D4",
    badge: "bg-violet-100 text-violet-700",
    pill: "text-violet-700",
  },
  leadership: {
    icon: User,
    banner: "linear-gradient(135deg,#5B21B6 0%,#7C3AED 50%,#C084FC 100%)",
    solid: "linear-gradient(90deg,#6D28D9 0%,#8B5CF6 100%)",
    glow: "0 14px 26px -12px rgba(109,40,217,.7)",
    ink: "#4F46E5",
    border: "#A5B4FC",
    badge: "bg-indigo-100 text-indigo-700",
    pill: "text-indigo-700",
  },
};
const byCategory = { "Artificial Intelligence": "ai", "Data Science": "data", "Digital Transformation": "digital", Leadership: "leadership" };
const byColor = { indigo: "ai", teal: "data", violet: "digital" };
const themeKey = (c) => byCategory[c.category] || byColor[c.color] || "ai";

/* ---------- banner illustrations (simple SVG) ---------- */
function Illustration({ kind }) {
  const common = { viewBox: "0 0 300 176", className: "absolute inset-0 w-full h-full", "aria-hidden": true, preserveAspectRatio: "xMaxYMid slice" };
  if (kind === "ai")
    return (
      <svg {...common}>
        <g opacity=".35" fill="#A5B4FC"><rect x="120" y="30" width="46" height="60" rx="4" /><rect x="262" y="70" width="40" height="52" rx="4" /></g>
        <polygon points="205,150 250,128 205,106 160,128" fill="#1E3A8A" stroke="#22D3EE" strokeWidth="2" />
        <polygon points="205,140 232,127 205,114 178,127" fill="#38BDF8" opacity=".9" />
        <g stroke="#22D3EE" strokeWidth="1.5" opacity=".7"><path d="M160 128h-18M250 128h18M205 150v14M182 138l-10 10M228 138l10 10" /></g>
        <path d="M172 62c-10-16 8-32 24-24 8-12 30-8 32 8 14 2 18 20 6 28 4 14-12 24-24 16-10 8-28 2-26-12-10-2-14-10-12-16z" fill="#C4B5FD" opacity=".85" stroke="#EDE9FE" strokeWidth="2" />
        <g stroke="#6D28D9" strokeWidth="1.6" fill="none" opacity=".8"><path d="M184 50c8 6 8 14 0 20M204 42c-6 10-2 18 8 22M222 52c-8 6-8 14 2 22" /></g>
        <path d="M205 92v14" stroke="#22D3EE" strokeWidth="2" />
      </svg>
    );
  if (kind === "data")
    return (
      <svg {...common}>
        <rect x="120" y="60" width="90" height="62" rx="6" fill="#0F766E" opacity=".55" />
        <g fill="#99F6E4">{[18, 28, 38, 48].map((h, i) => <rect key={i} x={132 + i * 16} y={116 - h} width="10" height={h} rx="2" opacity={0.6 + i * 0.1} />)}</g>
        <path d="M128 108l24-14 18 8 32-30" stroke="#FDE68A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="216" y="70" width="70" height="52" rx="6" fill="#0E7490" stroke="#67E8F9" strokeWidth="1.5" />
        <circle cx="251" cy="96" r="18" fill="#FDE68A" /><path d="M251 96V78a18 18 0 0 1 16 26z" fill="#F59E0B" />
        <path d="M200 136h100l-10 12H210z" fill="#0B4F5C" opacity=".8" />
      </svg>
    );
  if (kind === "digital")
    return (
      <svg {...common}>
        <rect x="128" y="50" width="34" height="34" rx="8" fill="#F472B6" opacity=".9" /><circle cx="145" cy="67" r="9" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="4 3" />
        <path d="M196 62h84l14 62H182z" fill="#6D28D9" stroke="#DDD6FE" strokeWidth="1.5" opacity=".95" />
        <path d="M172 130h140l-8 14H180z" fill="#3B0764" opacity=".8" />
        <path d="M212 108a14 14 0 0 1 2-28 20 20 0 0 1 38 4 12 12 0 0 1 0 24z" fill="#F5F3FF" />
        <g stroke="#E879F9" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M226 104V90m-6 6l6-7 6 7M244 104V94m-5 5l5-6 5 6" /></g>
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M0 176V120l40-28 30 22 40-46 40 40 30-20 50 30 70-20v98z" fill="#5B21B6" opacity=".5" />
      <path d="M150 176l50-92 40 56 30-24 30 60z" fill="#4C1D95" opacity=".85" />
      <path d="M212 90l-4-22" stroke="#EDE9FE" strokeWidth="2" /><path d="M212 68l26 7-26 8z" fill="#F0ABFC" />
      <g fill="#1E1B4B"><circle cx="232" cy="88" r="5" /><rect x="228" y="94" width="8" height="24" rx="3" /><circle cx="208" cy="108" r="4" /><rect x="205" y="113" width="7" height="20" rx="3" /><circle cx="186" cy="124" r="4" /><rect x="183" y="129" width="7" height="20" rx="3" /></g>
    </svg>
  );
}

/* ---------- card ---------- */
function FeaturedCard({ course, index }) {
  const key = themeKey(course);
  const t = themes[key];
  const Icon = t.icon;
  const filled = index % 2 === 0;
  return (
    <article className="group bg-white rounded-3xl border border-white shadow-[0_22px_44px_-22px_rgba(76,29,149,0.35)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-20px_rgba(124,58,237,0.45)] transition-all duration-300 overflow-hidden flex flex-col">
      <Link to={`/courses/${course.id}`} className="relative block h-44 overflow-hidden" style={{ background: t.banner }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, rgba(255,255,255,.55), transparent 45%)" }} />
        <Illustration kind={key} />
        <span className={`absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5 text-sm font-medium ${t.pill}`}>
          <Icon size={15} /> {course.category}
        </span>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/courses/${course.id}`}>
          <h3 className="font-serif-display text-[1.4rem] font-bold leading-[1.15] text-ink-900 min-h-[2.4em] group-hover:text-indigo-700 transition-colors">{course.title}</h3>
        </Link>
        <p className="text-ink-500 mt-2">{course.trainer}</p>

        <div className="flex items-center gap-4 text-sm text-ink-500 mt-4">
          <span className="flex items-center gap-1.5"><Clock size={16} /> {course.duration}</span>
          <span className="flex items-center gap-1.5"><Layers size={16} /> {course.modulesCount} modules</span>
          <span className="flex items-center gap-1.5"><Users size={16} /> {course.students.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5">
            <Star size={17} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-ink-800">{course.rating}</span>
            <span className="text-ink-400">({course.reviews})</span>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-medium ${t.badge}`}>{course.level}</span>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="focus-ring relative mt-5 flex items-center justify-center h-14 rounded-2xl font-semibold text-[15px] transition-transform duration-200 hover:scale-[1.02]"
          style={filled ? { background: t.solid, color: "#fff", boxShadow: t.glow } : { color: t.ink, border: `1.5px solid ${t.border}`, background: "#fff" }}
        >
          View Course <ChevronRight size={16} className="ml-0.5" />
          <ArrowRight size={16} className="absolute right-5 opacity-70" />
        </Link>
      </div>
    </article>
  );
}

/* ---------- section ---------- */
export function FeaturedCoursesSection() {
  const featured = courses.slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F7FF] to-[#F3F1FF]">
      {/* soft background shapes */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-indigo-100/70 blur-2xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 w-[460px] h-[300px] rounded-[50%] bg-indigo-100/70 blur-2xl" aria-hidden />
      <svg className="absolute right-0 bottom-0 w-64 h-40 text-indigo-300 hidden lg:block" viewBox="0 0 260 160" fill="none" aria-hidden>
        <path d="M20 160C60 80 150 60 200 90c30 18 16 50-8 40s-8-40 68-30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-24">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-start gap-3">
              <h2 className="font-serif-display text-[2.6rem] lg:text-[3.6rem] font-bold tracking-tight leading-[1.05] text-ink-900">
                Featured{" "}
                <span style={{ backgroundImage: "linear-gradient(90deg,#6D28D9 0%,#C026D3 60%,#DB2777 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>courses</span>
              </h2>
              <svg width="34" height="46" viewBox="0 0 34 46" className="text-indigo-500 mt-2 hidden sm:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M22 4l8-3M24 20h9M22 36l7 5" />
              </svg>
            </div>
            <p className="text-ink-500 text-lg mt-2">Popular training programs across the platform.</p>
          </div>
          <Link to="/courses" className="focus-ring group inline-flex items-center gap-3 text-indigo-700 font-semibold">
            Browse all courses
            <span className="grid place-items-center w-12 h-12 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {featured.map((c, i) => (
            <FeaturedCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
