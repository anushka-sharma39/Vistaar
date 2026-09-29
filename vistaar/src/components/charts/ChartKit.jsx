import { useId } from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "../ui/Card";

/* Shared visual system for every chart in the app. */

export const PALETTE = {
  indigo: "#6366F1",
  violet: "#8B5CF6",
  blue: "#3B82F6",
  cyan: "#22D3EE",
  pink: "#F472B6",
  soft: "#DDD6FE",
};

export const GRID = { stroke: "#EEF0F8", strokeDasharray: "3 6", vertical: false };
export const CURSOR_BAR = { fill: "rgba(99,102,241,0.07)", radius: 8 };
export const CURSOR_LINE = { stroke: "#C7CAF0", strokeWidth: 1, strokeDasharray: "4 4" };
export const MARGIN = { top: 8, right: 12, left: 4, bottom: 0 };

/** Round an axis max up so 4 equal steps land on clean numbers (e.g. 315 -> 400, 1980 -> 2000). */
export const niceMax = (max) => {
  if (!max || max <= 0) return 1;
  if (max <= 10) return Math.ceil(max);
  const raw = max / 4;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  const step = [1, 2, 2.5, 5, 10].find((v) => n <= v) * pow;
  return step * 4;
};
const NICE_DOMAIN = [0, niceMax];

const tick = { fontSize: 12, fill: "#8189A8", fontFamily: "Inter, sans-serif" };
export const xAxisProps = { tick, axisLine: { stroke: "#E6EAF4" }, tickLine: false, tickMargin: 10, interval: "preserveStartEnd", minTickGap: 8 };
export const yAxisProps = { tick, axisLine: false, tickLine: false, tickMargin: 6, width: 52, tickCount: 5, allowDecimals: false };

/** Vertical gradient <defs> for bars and areas. Returns [id, defs]. */
export function useGradient(color, { from = 1, to = 0.55 } = {}) {
  const raw = useId().replace(/:/g, "");
  const id = `g${raw}`;
  const defs = (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={from} />
      <stop offset="100%" stopColor={color} stopOpacity={to} />
    </linearGradient>
  );
  return [id, defs];
}

export function ChartTooltip({ active, payload, label, unit = "", labelFormatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-ink-100 bg-white/95 backdrop-blur px-3.5 py-2.5 shadow-soft min-w-[130px]">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        {labelFormatter ? labelFormatter(label) : (payload[0]?.payload?.__label ?? label ?? payload[0]?.name)}
      </p>
      <div className="mt-1.5 space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 text-ink-500">
              <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload?.fill || p.stroke }} />
              {p.name}
            </span>
            <span className="font-display font-bold text-ink-900 tabular-nums">
              {typeof p.value === "number" ? p.value.toLocaleString() : p.value}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tooltip element preconfigured for recharts. */
export const tooltipProps = (unit = "", extra = {}) => ({
  content: <ChartTooltip unit={unit} {...extra} />,
  wrapperStyle: { outline: "none", zIndex: 20 },
  animationDuration: 150,
  ...extra.tooltip,
});

/** Consistent card wrapper: title, optional subtitle and headline value. */
export function ChartCard({ title, subtitle, value, delta, className = "", children, footer }) {
  return (
    <Card className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <p className="font-display font-bold text-ink-900 leading-tight">{title}</p>
          {subtitle && <p className="text-xs text-ink-400 mt-1">{subtitle}</p>}
        </div>
        {value !== undefined && (
          <div className="text-right shrink-0">
            <p className="font-display text-xl font-extrabold text-ink-900 leading-none tabular-nums">{value}</p>
            {delta && <p className="text-[11px] font-semibold text-emerald-600 mt-1">{delta}</p>}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-ink-100">{footer}</div>}
    </Card>
  );
}

/** Custom legend used under donut charts. */
export function LegendList({ items }) {
  return (
    <ul className="grid grid-cols-1 gap-2">
      {items.map((it) => (
        <li key={it.name} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-ink-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
            {it.name}
          </span>
          <span className="font-semibold text-ink-900 tabular-nums">{it.value}%</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Ready-made chart bodies (presentation only; data comes from the caller) ---------- */

export function AreaTrend({ data, xKey, yKey, name, color = PALETTE.indigo, height = 250, unit = "", domain }) {
  const [gid, defs] = useGradient(color, { from: 0.28, to: 0 });
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={MARGIN}>
        <defs>{defs}</defs>
        <CartesianGrid {...GRID} />
        <XAxis dataKey={xKey} {...xAxisProps} />
        <YAxis {...yAxisProps} domain={domain || NICE_DOMAIN} />
        <Tooltip {...tooltipProps(unit)} cursor={CURSOR_LINE} />
        <Area type="monotone" dataKey={yKey} name={name} stroke={color} strokeWidth={2.25} fill={`url(#${gid})`}
          dot={{ r: 3, fill: "#fff", stroke: color, strokeWidth: 2 }}
          activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineTrend({ data, xKey, yKey, name, color = PALETTE.violet, height = 250, unit = "", domain }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={MARGIN}>
        <CartesianGrid {...GRID} />
        <XAxis dataKey={xKey} {...xAxisProps} />
        <YAxis {...yAxisProps} domain={domain || NICE_DOMAIN} />
        <Tooltip {...tooltipProps(unit)} cursor={CURSOR_LINE} />
        <Line type="monotone" dataKey={yKey} name={name} stroke={color} strokeWidth={2.25}
          dot={{ r: 3.5, fill: "#fff", stroke: color, strokeWidth: 2 }}
          activeDot={{ r: 5.5, fill: color, stroke: "#fff", strokeWidth: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ColumnChart({ data, xKey, yKey, name, color = PALETTE.blue, height = 250, unit = "", maxBarSize = 40, xTickFormatter, domain }) {
  const [gid, defs] = useGradient(color, { from: 1, to: 0.6 });
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={MARGIN}>
        <defs>{defs}</defs>
        <CartesianGrid {...GRID} />
        <XAxis dataKey={xKey} {...xAxisProps} interval={0} tickFormatter={xTickFormatter} />
        <YAxis {...yAxisProps} domain={domain || NICE_DOMAIN} />
        <Tooltip {...tooltipProps(unit, { labelFormatter: undefined })} cursor={CURSOR_BAR} />
        <Bar dataKey={yKey} name={name} fill={`url(#${gid})`} radius={[8, 8, 3, 3]} maxBarSize={maxBarSize} />
      </BarChart>
    </ResponsiveContainer>
  );
}
