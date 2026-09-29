import { Star, BookOpen, CalendarDays, Landmark } from "lucide-react";

/* One colour theme per trainer: avatar, corner blob, job title and tag pills all share it. */
const themes = {
  violet: { avatar: "bg-[#E6E0FA] text-[#2B1F8C]", blob: "#ECE7FB", title: "text-[#4F35D6]", tag: "bg-[#EDE9FC] text-[#4433C4]" },
  blue:   { avatar: "bg-[#D9E8FA] text-[#173A7A]", blob: "#DDEBFB", title: "text-[#2563EB]", tag: "bg-[#E2EDFC] text-[#1D4ED8]" },
  pink:   { avatar: "bg-[#F8D9E5] text-[#7E1F55]", blob: "#F9E2EB", title: "text-[#B4276F]", tag: "bg-[#FAE2EB] text-[#9D1B5E]" },
  green:  { avatar: "bg-[#D4EEE4] text-[#0F5A48]", blob: "#DAF1E8", title: "text-[#12967E]", tag: "bg-[#DCF1E9] text-[#0F6F5E]" },
};

export default function TrainerCard({ trainer, showBio = false, className = "" }) {
  const t = themes[trainer.theme] || themes.violet;

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-[20px] border border-ink-100 bg-white/95 p-7 shadow-card
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {/* soft wavy corner accent */}
      <svg className="pointer-events-none absolute right-0 top-0 h-28 w-36" viewBox="0 0 144 112" fill={t.blob} aria-hidden>
        <path d="M34 0H144V112C128 98 116 84 100 62C84 40 62 20 34 0Z" />
      </svg>

      <div className="relative flex h-full flex-col">
        <div className={`flex h-[88px] w-[88px] items-center justify-center rounded-full font-serif text-[2rem] font-bold ${t.avatar}`}>
          {trainer.avatar}
        </div>

        <h3 className="mt-5 font-serif text-[1.65rem] font-bold leading-tight tracking-tight text-ink-900">{trainer.name}</h3>
        <p className={`mt-1.5 text-[15px] font-medium leading-snug ${t.title}`}>{trainer.title}</p>

        <p className="mt-3 flex items-center gap-2.5 text-sm text-ink-500">
          <Landmark size={20} strokeWidth={1.6} className="shrink-0 text-ink-400" />
          <span>{trainer.organization}</span>
        </p>

        {showBio && <p className="mt-4 text-sm leading-relaxed text-ink-500">{trainer.bio}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-100 pt-5 text-sm text-ink-600">
          <span className="flex items-center gap-1.5 font-semibold text-ink-800">
            <Star size={17} className="fill-amber-400 text-amber-400" /> {trainer.rating}
          </span>
          <span className="flex items-center gap-1.5"><BookOpen size={17} strokeWidth={1.6} className="text-ink-400" /> {trainer.courses} courses</span>
          <span className="flex items-center gap-1.5"><CalendarDays size={17} strokeWidth={1.6} className="text-ink-400" /> {trainer.experience}</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {trainer.expertise.slice(0, 3).map((s) => (
            <span key={s} className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${t.tag}`}>{s}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
