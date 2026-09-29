import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { useApp } from "../../context/AppContext";

const icons = { success: CheckCircle2, info: Info, warning: AlertTriangle };
const tones = {
  success: "border-emerald-200 text-emerald-700",
  info: "border-indigo-200 text-indigo-700",
  warning: "border-amber-200 text-amber-700",
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();
  if (!toasts?.length) return null;

  return (
    <div className="fixed top-[4.5rem] right-4 lg:right-6 z-[100] flex flex-col gap-2.5 w-[min(360px,90vw)]">
      {toasts.map((t) => {
        const Icon = icons[t.variant] || CheckCircle2;
        return (
          <div
            key={t.id}
            role="status"
            className={`animate-toastIn flex items-start gap-3 bg-white border ${tones[t.variant] || tones.success} rounded-xl shadow-lift px-4 py-3.5`}
          >
            <Icon size={18} className="mt-0.5 shrink-0" />
            <p className="text-sm text-ink-800 flex-1">{t.message}</p>
            <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="text-ink-300 hover:text-ink-600">
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
