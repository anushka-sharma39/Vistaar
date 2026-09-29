const tones = { indigo: "bg-grad-primary", teal: "bg-grad-teal", violet: "bg-grad-violet", green: "bg-emerald-500", amber: "bg-amber-500" };

export default function ProgressBar({ value = 0, tone = "indigo", size = "md", showLabel = false, labelText, className = "" }) {
  const h = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  return (
    <div className={className}>
      <div className={`w-full ${h} bg-indigo-50 rounded-full overflow-hidden`}>
        <div className={`${h} ${tones[tone] || tones.indigo} rounded-full transition-[width] duration-700 ease-out`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      {showLabel && <p className="text-xs text-ink-500 mt-1 font-medium">{labelText ?? `${value}% complete`}</p>}
    </div>
  );
}
