import { Target, Eye, HeartHandshake } from "lucide-react";
import { CTASection } from "./sections/ShowcaseSections";
import booksImg from "../../assets/about-books.jpg";
import campusImg from "../../assets/about-campus.jpg";

const pillars = [
  { icon: Target, title: "Our Mission", desc: "To make high-quality capacity-building training accessible, structured and measurable across every department.", color: "#8B3DFF", tint: "#EFE7FF", blob: "tr" },
  { icon: Eye, title: "Our Vision", desc: "A workforce that continuously grows its capabilities to meet emerging technical and leadership demands.", color: "#2F7BFF", tint: "#E3EEFF", blob: "br" },
  { icon: HeartHandshake, title: "Our Approach", desc: "Combining expert-led training, competency mapping and rigorous assessment to close real skill gaps.", color: "#C026A3", tint: "#FBE3F3", blob: "tr" },
];

function Leaf({ className = "", flip = false, style }) {
  return (
    <svg aria-hidden viewBox="0 0 120 220" fill="none" stroke="#B9A6F5" strokeWidth="1.2" className={className} style={{ ...(flip ? { transform: "scaleX(-1)" } : {}), ...style }}>
      <path d="M60 215C58 160 62 100 70 20" />
      <path d="M62 170c-28-4-44-24-46-46 26 2 44 20 46 46Z" />
      <path d="M63 130c26-6 40-26 40-48-26 4-40 24-40 48Z" />
      <path d="M65 90c-24-4-38-22-40-42 24 2 38 18 40 42Z" />
      <path d="M68 55c18-6 28-20 28-36-18 4-28 16-28 36Z" />
    </svg>
  );
}

function Lotus({ className = "" }) {
  return (
    <svg aria-hidden viewBox="0 0 220 220" fill="none" stroke="#C9BBF7" strokeWidth="1.1" className={className}>
      <circle cx="110" cy="110" r="100" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
        <path key={a} d="M110 110C88 84 88 44 110 18c22 26 22 66 0 92Z" transform={`rotate(${a} 110 110)`} />
      ))}
      <circle cx="110" cy="110" r="22" />
    </svg>
  );
}

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        {/* decorative background */}
        <Leaf className="absolute -left-6 top-40 w-24 h-48 opacity-70 hidden md:block" />
        <div aria-hidden className="absolute -left-40 bottom-0 w-[520px] h-[520px] rounded-full hidden lg:block" style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.35), transparent 72%)" }} />
        <Lotus className="absolute -right-16 -top-6 w-64 h-64 opacity-60 hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-14 lg:pt-20 pb-6">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-indigo-500" />
                <span className="text-[13px] font-medium tracking-[0.3em] uppercase" style={{ color: "#3B4A8C" }}>About Vistaar</span>
                <span className="h-px w-16 bg-indigo-300" />
              </div>
              <h1 className="font-serif-display font-bold tracking-[-0.02em] leading-[1.08] text-4xl sm:text-5xl lg:text-[3.6rem] mt-6" style={{ color: "#0F1B4C" }}>
                Empowering Institutions,
                <br />
                <em className="font-medium text-indigo-500">Building Future-Ready Learners</em>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-[1.85]" style={{ color: "#5B6799" }}>
                Vistaar is a national-level digital learning and capacity-building platform, designed to help
                institutions upskill their workforce through structured, measurable, and role-aware training programs.
              </p>
            </div>

            {/* photo composition */}
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none" style={{ aspectRatio: "560 / 385" }}>
              {/* lavender arch behind */}
              <div aria-hidden className="absolute" style={{ left: "62%", top: "13%", width: "25%", height: "45%", background: "#DDD3FB", borderRadius: "999px 999px 0 0" }} />
              {/* arc line */}
              <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 560 385" fill="none">
                <path d="M30 120C50 40 120 8 200 8" stroke="#B9A6F5" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M340 376h90" stroke="#B9A6F5" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M510 200c30 40 40 100 20 176" stroke="#C9BBF7" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M20 128l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#A78BFA" />
              </svg>
              <Leaf className="absolute w-[13%] h-[42%] opacity-80" style={{ left: "-2%", top: "42%" }} />

              {/* big arch photo */}
              <div className="absolute overflow-hidden shadow-soft" style={{ left: "12.9%", top: "2.6%", width: "55.4%", height: "89.6%", borderRadius: "999px 999px 14px 14px" }}>
                <img src={booksImg} alt="Books labelled Skills, Leadership and Growth beside a laptop" className="w-full h-full object-cover" />
              </div>
              {/* small arch photo */}
              <div className="absolute bg-white shadow-soft" style={{ left: "59.8%", top: "46.2%", width: "34.8%", height: "50%", borderRadius: "999px 999px 10px 10px", padding: "3.6%" }}>
                <div className="w-full h-full overflow-hidden" style={{ borderRadius: "999px 999px 6px 6px" }}>
                  <img src={campusImg} alt="Institution campus at sunrise" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* mission / vision / approach */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-7 mt-12 lg:mt-14">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-[20px] bg-white/85 p-6 lg:p-7 pl-8 min-h-[280px] transition-all duration-300 hover:-translate-y-1"
                style={{ border: "1px solid rgba(124,58,237,0.07)", borderLeft: `4px solid ${p.color}`, boxShadow: "0 1px 2px rgba(11,16,32,0.04), 0 16px 36px -18px rgba(60,40,140,0.25)" }}
              >
                <div aria-hidden className="absolute rounded-full" style={{ width: 180, height: 180, background: p.tint, opacity: 0.7, ...(p.blob === "tr" ? { right: -50, top: -70 } : { right: -40, bottom: -80 }) }} />
                <div className="relative w-[68px] h-[68px] rounded-2xl flex items-center justify-center" style={{ background: p.tint, color: p.color }}>
                  <p.icon size={32} strokeWidth={1.7} />
                </div>
                <h3 className="relative font-serif-display font-bold text-[1.8rem] mt-5 leading-tight" style={{ color: "#0F1B4C" }}>{p.title}</h3>
                <p className="relative text-[17px] mt-2 leading-relaxed max-w-[26ch] sm:max-w-none" style={{ color: "#5B6799" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-ink-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif-display text-3xl lg:text-4xl font-bold" style={{ color: "#0F1B4C" }}>Built for institutional scale</h2>
            <p className="text-ink-500 mt-4 leading-relaxed">
              From onboarding a single department to running national training missions, Vistaar scales with
              role-based access, detailed analytics and a shared library of learning resources — so program leaders can
              track outcomes, not just enrollments.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "9", label: "Skill Categories" },
              { value: "50+", label: "Expert Trainers" },
              { value: "100+", label: "Live Courses" },
              { value: "97%", label: "Learner Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="bg-canvas border border-ink-100 rounded-2xl p-6 text-center">
                <p className="font-serif-display text-3xl font-bold text-indigo-700">{s.value}</p>
                <p className="text-xs text-ink-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
