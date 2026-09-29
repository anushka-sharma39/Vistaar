import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children, size = "md", footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  // Portal to <body> so a transformed ancestor (page-enter animation) can't re-anchor `fixed`.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} max-h-[88vh] flex flex-col animate-slideUp`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 shrink-0">
          <h3 className="text-lg font-bold text-ink-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="focus-ring p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-ink-100 flex justify-end gap-3 shrink-0">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
