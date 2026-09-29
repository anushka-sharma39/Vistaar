const tones = {
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  teal: "bg-teal-50 text-teal-700 border-teal-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  red: "bg-red-50 text-red-600 border-red-100",
  gray: "bg-ink-100/70 text-ink-600 border-ink-100",
};

export default function Badge({ children, tone = "indigo", icon: Icon, className = "", dot = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${tones[tone] || tones.gray} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${tones[tone]?.includes("text-") ? "" : ""} bg-current`} />}
      {Icon && <Icon size={12} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
