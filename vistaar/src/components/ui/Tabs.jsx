export default function Tabs({ tabs, active, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-1 border-b border-ink-100 overflow-x-auto no-scrollbar ${className}`} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => onChange(tab.value)}
          className={`focus-ring relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors rounded-t-lg ${
            active === tab.value ? "text-indigo-700" : "text-ink-500 hover:text-ink-800"
          }`}
        >
          {tab.label}
          {active === tab.value && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-indigo-600 rounded-full" />}
        </button>
      ))}
    </div>
  );
}
