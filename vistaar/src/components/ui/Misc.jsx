import { Star } from "lucide-react";
import { useState } from "react";

export function StarRating({ value = 0, size = 14, readOnly = true, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5" role={readOnly ? undefined : "radiogroup"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onMouseEnter={() => !readOnly && setHover(i)}
          onMouseLeave={() => !readOnly && setHover(0)}
          onClick={() => !readOnly && onChange?.(i)}
          className={readOnly ? "cursor-default" : "focus-ring rounded"}
          aria-label={`${i} star`}
        >
          <Star
            size={size}
            className={(hover || value) >= i ? "fill-amber-400 text-amber-400" : "fill-ink-100 text-ink-100"}
          />
        </button>
      ))}
    </div>
  );
}

export function CircularProgress({ value = 0, size = 56, stroke = 5, tone = "#7C3AED", label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EDE9FE" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tone}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-ink-900">{label ?? `${value}%`}</span>
    </div>
  );
}
