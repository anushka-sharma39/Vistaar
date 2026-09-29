import { ChevronDown } from "lucide-react";

export function Input({ label, icon: Icon, error, className = "", id, variant, ...props }) {
  const soft = variant === "soft";
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon size={soft ? 18 : 17} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${soft ? "text-indigo-600" : "text-ink-300"}`} />}
        <input
          id={inputId}
          className={`focus-ring w-full rounded-xl border ${
            error ? "border-red-300" : soft ? "border-indigo-200/80 hover:border-indigo-300" : "border-ink-100"
          } bg-white ${soft ? "py-3" : "py-2.5"} ${Icon ? (soft ? "pl-11" : "pl-10") : "pl-3.5"} pr-3.5 text-sm text-ink-800 ${soft ? "placeholder:text-indigo-400" : "placeholder:text-ink-300"} transition-colors focus:border-indigo-400`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export function Select({ label, className = "", id, children, icon: Icon, variant, ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const soft = variant === "soft";
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-600" />}
        <select
          id={selectId}
          className={
            soft
              ? "focus-ring w-full appearance-none cursor-pointer rounded-xl border border-indigo-200/80 bg-white py-3 pl-11 pr-10 text-sm font-medium text-indigo-900 transition-colors hover:border-indigo-300 focus:border-indigo-400"
              : "focus-ring w-full rounded-xl border border-ink-100 bg-white py-2.5 px-3.5 text-sm text-ink-800 transition-colors focus:border-indigo-400"
          }
          {...props}
        >
          {children}
        </select>
        {soft && <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-indigo-700" />}
      </div>
    </div>
  );
}

export function Textarea({ label, className = "", id, ...props }) {
  const taId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      {label && (
        <label htmlFor={taId} className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={taId}
        className="focus-ring w-full rounded-xl border border-ink-100 bg-white py-2.5 px-3.5 text-sm text-ink-800 placeholder:text-ink-300 transition-colors focus:border-indigo-400 resize-none"
        {...props}
      />
    </div>
  );
}
