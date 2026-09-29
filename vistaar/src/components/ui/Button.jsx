import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-grad-primary text-white shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_8px_20px_-8px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 hover:shadow-lift hover:brightness-110 disabled:opacity-50 disabled:hover:translate-y-0",
  gradient: "bg-grad-primary text-white shadow-glow hover:-translate-y-0.5 hover:shadow-lift hover:brightness-110 disabled:opacity-50",
  secondary: "bg-white/80 text-ink-800 border border-ink-100 hover:border-indigo-300 hover:text-indigo-700 hover:-translate-y-0.5 hover:shadow-soft disabled:opacity-50",
  ghost: "text-ink-600 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50",
  danger: "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 disabled:opacity-50",
  outline: "border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:-translate-y-0.5 disabled:opacity-50",
};
const sizes = {
  sm: "px-3.5 py-2 text-sm rounded-xl gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2",
  icon: "p-2 rounded-xl",
};

export default function Button({ children, variant = "primary", size = "md", icon: Icon, iconRight: IconRight, loading = false, className = "", ...props }) {
  return (
    <button
      className={`focus-ring group inline-flex items-center justify-center font-semibold transition-all duration-200 whitespace-nowrap disabled:cursor-not-allowed active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : (
        <>
          {Icon && <Icon size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:scale-110" />}
          {children}
          {IconRight && <IconRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
        </>
      )}
    </button>
  );
}
