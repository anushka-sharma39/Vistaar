import {
  BrainCircuit,
  UsersRound,
  Target,
  ClipboardCheck,
  Award,
  BarChart3,
  Share2,
  ShieldCheck,
  UserPlus,
  Search,
  GraduationCap,
  FileBadge,
  ArrowRight,
} from "lucide-react";

const features = [
  { icon: BrainCircuit, title: "Smart Learning", desc: "Adaptive course paths that respond to a learner's pace and prior knowledge.", color: "#8B3DFF", tint: "#EFE7FF" },
  { icon: UsersRound, title: "Trainer Management", desc: "Onboard, assign and evaluate trainers across departments from one place.", color: "#2F7BFF", tint: "#E3EEFF" },
  { icon: Target, title: "Competency Mapping", desc: "Match required skills to the right trainers and training programs.", color: "#E6338A", tint: "#FFE1EF" },
  { icon: ClipboardCheck, title: "Assessments", desc: "Timed, auto-graded assessments with detailed performance breakdowns.", color: "#12A57F", tint: "#DFF6EE" },
  { icon: Award, title: "Certification", desc: "Issue verifiable digital certificates the moment a course is completed.", color: "#8B3DFF", tint: "#EFE7FF" },
  { icon: BarChart3, title: "Analytics", desc: "Organization-wide dashboards tracking growth, completion and impact.", color: "#0FA5D6", tint: "#DFF4FB" },
  { icon: Share2, title: "Knowledge Sharing", desc: "A shared library of recordings, decks and reference material.", color: "#F0533F", tint: "#FFE7E2" },
  { icon: ShieldCheck, title: "Secure Role-Based Access", desc: "Separate, permissioned experiences for trainees, trainers and admins.", color: "#4F5DF0", tint: "#E6E8FF" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-9 bg-indigo-500" />
          <span className="text-[13px] font-semibold tracking-[0.22em] uppercase text-indigo-600">Our Features</span>
          <span className="h-px w-9 bg-indigo-500" />
        </div>
        <h2 className="font-serif-display font-bold tracking-[-0.02em] leading-[1.02] text-4xl sm:text-5xl lg:text-[3.6rem] mt-5" style={{ color: "#0F1B4C" }}>
          Everything a capacity-building program <em className="text-indigo-500 font-medium">needs</em>
        </h2>
        <p className="mt-4 text-lg lg:text-xl" style={{ color: "#6B74A0" }}>
          One platform connecting learning, trainers, assessment and analytics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-[22px] bg-white/90 p-6 pl-7 min-h-[250px] transition-all duration-300 hover:-translate-y-1"
            style={{
              borderLeft: `4px solid ${f.color}`,
              boxShadow: "0 1px 2px rgba(11,16,32,0.04), 0 14px 32px -16px rgba(60,40,140,0.22)",
              border: "1px solid rgba(124,58,237,0.07)",
              borderLeftWidth: 4,
              borderLeftColor: f.color,
            }}
          >
            {/* soft blob, bottom-right */}
            <svg aria-hidden className="absolute -right-4 -bottom-4 w-40 h-28 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 160 110" fill="none">
              <path d="M160 110V30c-18-14-38-4-52 12-12 14-26 10-40 26-10 12-30 22-68 42h160z" fill={f.tint} opacity="0.9" />
            </svg>

            <div className="relative flex items-start justify-between">
              <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center" style={{ background: f.tint, color: f.color }}>
                <f.icon size={28} strokeWidth={1.8} />
              </div>
              <span className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: f.tint, color: f.color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="relative font-serif-display font-bold text-[1.35rem] mt-5 leading-tight" style={{ color: "#0F1B4C" }}>{f.title}</h3>
            <p className="relative text-[15px] mt-2 leading-relaxed" style={{ color: "#6B74A0" }}>{f.desc}</p>
            <span className="relative block h-[2px] w-9 mt-5 rounded-full transition-all duration-300 group-hover:w-14" style={{ background: f.color }} />
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { icon: UserPlus, title: "Create Profile", desc: "Set up your profile and share your skills, experience and location.", tone: "purple" },
  { icon: Search, title: "Discover Training", desc: "Explore relevant courses and get certified based on your skills and goals.", tone: "blue" },
  { icon: GraduationCap, title: "Learn & Practice", desc: "Access flexible, hands-on learning with expert guidance and real-world tasks.", tone: "purple" },
  { icon: ClipboardCheck, title: "Take Assessment", desc: "Showcase your skills with simple, practical assessments.", tone: "blue" },
  { icon: FileBadge, title: "Earn Certification", desc: "Receive a verified certificate and move forward with confidence.", tone: "purple" },
];

const stepTones = {
  purple: { bar: "#8B3DFF", icon: "linear-gradient(135deg,#C27BF2 0%,#7C3AED 100%)", pill: "#EFE7FF", pillText: "#7C3AED", blob: "#EFE7FF", card: "linear-gradient(160deg,#FBF8FF 0%,#F4EEFF 100%)", arrow: "linear-gradient(135deg,#B58BF5,#7C6CF0)" },
  blue: { bar: "#2F7BFF", icon: "linear-gradient(135deg,#4DB2FF 0%,#1E7BF0 100%)", pill: "#DDEEFF", pillText: "#1E7BF0", blob: "#DCEEFC", card: "linear-gradient(160deg,#F7FBFF 0%,#EDF6FF 100%)", arrow: "linear-gradient(135deg,#6C7CF5,#3E8DF5)" },
};

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -left-32 -bottom-24 w-[420px] h-[300px] rounded-full hidden lg:block" style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.35), transparent 72%)" }} />
      <div aria-hidden className="absolute -right-32 -top-20 w-[420px] h-[320px] rounded-full hidden lg:block" style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.30), transparent 72%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 lg:w-28 bg-indigo-400 hidden sm:block" />
            <span className="rounded-full px-7 py-2.5 text-[13px] font-semibold tracking-[0.35em] uppercase text-indigo-600" style={{ background: "#EDE7FE" }}>Simple Steps</span>
            <span className="h-px w-16 lg:w-28 bg-indigo-400 hidden sm:block" />
          </div>

          <div className="relative inline-block mt-6">
            <h2 className="font-serif-display font-bold tracking-[-0.03em] leading-none text-5xl sm:text-6xl lg:text-[5rem]" style={{ color: "#0F1B4C" }}>
              How it{" "}
              <span className="relative inline-block" style={{ backgroundImage: "linear-gradient(90deg,#8B3DFF,#B063F5)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                works
                <svg aria-hidden className="absolute left-[4%] -bottom-3 w-[92%] h-4" viewBox="0 0 200 16" fill="none" preserveAspectRatio="none">
                  <path d="M2 12C40 4 110 2 198 6" stroke="#8B3DFF" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <svg aria-hidden className="absolute -left-14 top-2 w-10 h-16 hidden md:block" viewBox="0 0 40 64" fill="none" stroke="#8B7CF6" strokeWidth="2.5" strokeLinecap="round">
              <path d="M30 8l-14-4M22 32l-18 4M26 56l-10-14" transform="translate(0 0)" />
            </svg>
            <svg aria-hidden className="absolute -right-14 top-0 w-10 h-14 hidden md:block" viewBox="0 0 40 56" fill="none" stroke="#8B7CF6" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10 4l12 14M14 26l22-6M10 44l16 8" />
            </svg>
          </div>

          <p className="mt-6 text-xl" style={{ color: "#5B6799" }}>Five steps from sign-up to certification.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-x-12 mt-14">
          {steps.map((st, i) => {
            const t = stepTones[st.tone];
            return (
              <div
                key={st.title}
                className="group relative rounded-[22px] p-6 pl-8 min-h-[330px] transition-all duration-300 hover:-translate-y-1"
                style={{ background: t.card, border: "1px solid rgba(124,58,237,0.10)", borderLeft: `6px solid ${t.bar}`, boxShadow: "0 1px 2px rgba(11,16,32,0.04), 0 18px 36px -20px rgba(60,40,140,0.30)" }}
              >
                <div className="absolute inset-0 rounded-[18px] overflow-hidden pointer-events-none">
                  <svg aria-hidden className="absolute right-0 bottom-0 w-full h-24" viewBox="0 0 200 90" preserveAspectRatio="none" fill="none">
                    <path d="M200 90V30c-30-6-60 12-90 30S50 84 0 90h200z" fill={t.blob} opacity="0.9" />
                  </svg>
                </div>

                <div className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: t.icon }}>
                  <st.icon size={28} strokeWidth={1.7} />
                </div>
                <span className="relative inline-block mt-5 rounded-full px-3.5 py-1 text-sm font-bold" style={{ background: t.pill, color: t.pillText }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-display font-bold text-[1.2rem] mt-3 leading-tight" style={{ color: "#0F1B4C" }}>{st.title}</h3>
                <p className="relative text-[15px] mt-3 leading-relaxed" style={{ color: "#6B74A0" }}>{st.desc}</p>

                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute z-10 hidden lg:flex items-center justify-center w-11 h-11 rounded-full text-white top-[45%] -right-[28px] border-[3px] border-white shadow-md"
                    style={{ background: t.arrow }}
                  >
                    <ArrowRight size={18} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "The competency mapping feature completely changed how we match trainers to departmental needs. It is precise and saves weeks of planning.",
    name: "Neha Kapoor",
    role: "L&D Manager, SAGE Skills Mission",
  },
  {
    quote: "As a trainer, I finally have one place to manage courses, assessments and trainees\u2019 performance without juggling five different tools.",
    name: "Rohan Verma",
    role: "Cybersecurity Trainer",
  },
  {
    quote: "I completed three certifications in six months. The learning player and progress tracking kept me motivated throughout.",
    name: "Ishaan Gupta",
    role: "Program Associate",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute -right-40 -top-40 w-[520px] h-[420px] rounded-full hidden lg:block" style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.28), transparent 72%)" }} />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <span className="block h-[3px] w-20 rounded-full" style={{ background: "linear-gradient(90deg,#7C3AED,#A78BFA)" }} />
        <h2 className="font-serif-display font-bold tracking-[-0.025em] leading-[1.05] text-4xl sm:text-5xl lg:text-[4.2rem] mt-5" style={{ color: "#0B0A2A" }}>
          Trusted by{" "}
          <span style={{ backgroundImage: "linear-gradient(90deg,#5B21B6,#8B5CF6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            learners and trainers
          </span>
        </h2>
        <p className="mt-3 text-xl" style={{ color: "#6B74A0" }}>Real feedback from across the platform.</p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-[26px] bg-white/95 p-8 lg:px-10" style={{ border: "1px solid rgba(124,58,237,0.08)", boxShadow: "0 1px 2px rgba(11,16,32,0.04), 0 18px 40px -22px rgba(60,40,140,0.22)" }}>
              <span aria-hidden className="font-serif-display font-bold text-7xl leading-none h-10 select-none" style={{ color: "#D9CFFA" }}>&ldquo;</span>
              <p className="flex-1 text-[19px] leading-[1.7] mt-3" style={{ color: "#2A3470" }}>&ldquo;{t.quote}&rdquo;</p>
              <span className="block h-[3px] w-16 rounded-full mt-6" style={{ background: "#7C3AED" }} />
              <div className="flex items-center gap-4 mt-5">
                <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center font-display font-bold text-xl shrink-0" style={{ background: "#EDE7FE", color: "#6D3BE8" }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-display font-bold text-lg" style={{ color: "#0F1B4C" }}>{t.name}</p>
                  <p className="text-[15px]" style={{ color: "#7F88B0" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
