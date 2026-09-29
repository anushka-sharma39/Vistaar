import { Link } from "react-router-dom";
import { ArrowRight, Megaphone } from "lucide-react";
import { trainers } from "../../../data/trainers";
import { announcements } from "../../../data/misc";
export { FeaturedCoursesSection } from "./FeaturedCourses";
import TrainerCard from "../../../components/courses/TrainerCard";
import Button from "../../../components/ui/Button";
import { CountUp } from "../../../components/ui/Motion";

export function StatsSection() {
  const stats = [
    { value: "500+", label: "Learners" },
    { value: "50+", label: "Trainers" },
    { value: "100+", label: "Courses" },
    { value: "1,500+", label: "Certifications" },
  ];
  return (
    <section className="bg-grad-midnight relative overflow-hidden">
      <div className="absolute -top-24 left-1/4 w-72 h-72 rounded-full bg-[#8B5CF6]/25 blur-3xl animate-blob" aria-hidden />
      <div className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full bg-[#22D3EE]/20 blur-3xl animate-blob" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-grotesk text-4xl lg:text-5xl font-bold text-white tracking-tight"><CountUp value={s.value} /></p>
            <p className="text-indigo-200 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TrainerShowcaseSection() {
  const featured = trainers.slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">
            Expert faculty <span className="h-px w-14 bg-ink-300" aria-hidden />
          </p>
          <h2 className="mt-3 font-serif text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-ink-900">
            Learn from{" "}
            <em className="pr-1 italic bg-gradient-to-r from-[#4F35D6] to-[#8B6CF6] bg-clip-text text-transparent">expert trainers</em>
          </h2>
          <p className="text-ink-400 mt-4 text-xl">Practitioners with real institutional experience.</p>
        </div>
        <Link to="/trainers" className="focus-ring inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-7 py-3.5 text-[15px] font-semibold text-indigo-800 transition hover:border-indigo-300 hover:bg-white">
          Meet all trainers <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 items-stretch">
        {featured.map((t) => (
          <TrainerCard key={t.id} trainer={t} />
        ))}
      </div>
    </section>
  );
}

export function AnnouncementsStrip() {
  const latest = announcements[0];
  return (
    <div className="bg-indigo-50/70 border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center gap-3 text-sm">
        <Megaphone size={15} className="text-indigo-600 shrink-0" />
        <p className="text-indigo-800 truncate"><span className="font-semibold">{latest.title}.</span> {latest.body}</p>
      </div>
    </div>
  );
}

export function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-24">
      <div className="bg-grad-midnight rounded-3xl px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-[#22D3EE]/25 rounded-full blur-3xl animate-blob" />
        <h2 className="text-3xl lg:text-[2.6rem] font-extrabold tracking-tight text-white relative">Ready to build your capabilities?</h2>
        <p className="text-indigo-100 mt-3 max-w-lg mx-auto relative">
          Join hundreds of professionals strengthening their skills through Vistaar.
        </p>
        <div className="flex justify-center gap-4 mt-8 relative">
          <Link to="/signup">
            <Button variant="secondary" size="lg">Get Started Free</Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" size="lg" className="!border-white/40 !text-white hover:!bg-white/10">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
