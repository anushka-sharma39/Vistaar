import { Link } from "react-router-dom";
import { BookOpenCheck, Award, LineChart } from "lucide-react";
import Logo from "../../components/ui/Logo";
import ToastContainer from "../../components/ui/Toast";

const perks = [
  { icon: BookOpenCheck, text: "Structured courses from expert trainers" },
  { icon: Award, text: "Verifiable digital certificates" },
  { icon: LineChart, text: "Track skills and progress in one place" },
];

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex bg-canvas">
      <div className="hidden lg:flex lg:w-[44%] mesh-violet relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="absolute -bottom-40 -right-24 w-[26rem] h-[26rem] rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -right-8 w-[18rem] h-[18rem] rounded-full border border-white/10" />
        <Link to="/" className="relative w-fit"><Logo dark /></Link>

        <div className="relative max-w-md">
          <p className="eyebrow !text-teal-300 mb-5">Learn · Connect · Grow</p>
          <h2 className="text-[2rem] leading-[1.15] font-display font-extrabold !text-white">
            A shared language for skills and growth.
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3.5 text-indigo-100 text-sm">
                <span className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 backdrop-blur flex items-center justify-center shrink-0"><p.icon size={17} className="text-teal-300" /></span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative">
          <blockquote className="text-sm text-indigo-100/90 leading-relaxed border-l-2 border-teal-300/60 pl-4 max-w-sm">
            “Vistaar gave our entire department a shared language for skills and growth.”
          </blockquote>
          <figcaption className="text-xs text-indigo-200/70 mt-3 pl-4">Program Leader, Ministry of Digital Affairs</figcaption>
        </figure>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md page-enter">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/"><Logo /></Link>
          </div>
          <h1 className="text-[1.75rem] font-extrabold text-ink-900 text-center lg:text-left">{title}</h1>
          {subtitle && <p className="text-sm text-ink-500 mt-2 text-center lg:text-left">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center lg:text-left">{footer}</div>}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
