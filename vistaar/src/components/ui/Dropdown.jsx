import { useEffect, useRef, useState } from "react";

export default function Dropdown({ trigger, children, align = "right", panelClassName = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger(open)}</div>
      {open && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 z-40 animate-slideUp ${panelClassName}`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ icon: Icon, children, className = "", ...props }) {
  return (
    <button
      className={`focus-ring w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-ink-700 hover:bg-ink-100/70 transition-colors text-left ${className}`}
      {...props}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
