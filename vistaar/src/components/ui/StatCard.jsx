import { CountUp } from "./Motion";

const tones = {
  indigo: { grad: "bg-grad-primary", glow: "shadow-[0_8px_20px_-6px_rgba(124,58,237,0.55)]" },
  teal: { grad: "bg-grad-teal", glow: "shadow-[0_8px_20px_-6px_rgba(34,211,238,0.55)]" },
  violet: { grad: "bg-grad-violet", glow: "shadow-[0_8px_20px_-6px_rgba(244,114,182,0.55)]" },
  amber: { grad: "bg-gradient-to-br from-amber-400 to-orange-400", glow: "shadow-[0_8px_20px_-6px_rgba(251,146,60,0.5)]" },
};

export default function StatCard({ icon: Icon, label, value, trend, tone = "indigo", className = "" }) {
  const t = tones[tone] || tones.indigo;
  return (
    <div className={`group glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift relative overflow-hidden ${className}`}>
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${t.grad} opacity-[0.08] group-hover:opacity-[0.16] transition-opacity`} />
      <div className="flex items-start justify-between relative">
        <div className={`w-11 h-11 rounded-2xl ${t.grad} ${t.glow} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
          <Icon size={20} className="text-white" strokeWidth={2.2} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${trend.startsWith("-") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>{trend}</span>
        )}
      </div>
      <p className="text-3xl font-grotesk font-bold text-ink-900 mt-4 tracking-tight relative"><CountUp value={value} /></p>
      <p className="text-sm text-ink-500 mt-0.5 relative">{label}</p>
    </div>
  );
}
