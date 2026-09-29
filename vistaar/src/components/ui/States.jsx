import { Inbox, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";

export function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
        <Icon size={28} className="text-indigo-400" />
      </div>
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      {message && <p className="text-sm text-ink-500 mt-1.5 max-w-sm">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ rows = 3 }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 rounded-2xl bg-ink-100/70 animate-pulse" />
      ))}
    </div>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-500 mb-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="text-ink-300" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-indigo-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="focus-ring p-2 rounded-lg border border-ink-100 text-ink-500 hover:text-indigo-700 hover:border-indigo-200 disabled:opacity-40 disabled:hover:text-ink-500"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          aria-current={page === i + 1 ? "page" : undefined}
          className={`focus-ring w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            page === i + 1 ? "bg-indigo-700 text-white" : "text-ink-600 hover:bg-ink-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="focus-ring p-2 rounded-lg border border-ink-100 text-ink-500 hover:text-indigo-700 hover:border-indigo-200 disabled:opacity-40 disabled:hover:text-ink-500"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export function ConfirmationDialog({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", variant = "danger" }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-ink-600">{message}</p>
    </Modal>
  );
}
