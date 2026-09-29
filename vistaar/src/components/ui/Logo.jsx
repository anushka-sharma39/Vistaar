import fullLogo from "../../assets/vistaar-logo.png";
import emblem from "../../assets/vistaar-emblem.png";

// Vistaar logo. The full logo already contains the "विस्तार" wordmark.
// `withText={false}` shows the emblem only (used by the collapsed sidebar).
// `dark` places the logo on a cream tile so it stays legible on dark backgrounds.
export default function Logo({ size = "md", withText = true, dark = false }) {
  const h = { sm: 44, md: 56, lg: 72 }[size] || 56;
  const img = withText ? (
    <img src={fullLogo} alt="Vistaar" style={{ height: h }} className="w-auto block" draggable={false} />
  ) : (
    <img src={emblem} alt="Vistaar" style={{ height: Math.round(h * 0.6) }} className="w-auto block" draggable={false} />
  );
  return (
    <div
      className={`select-none inline-flex items-center ${
        dark ? "bg-[#FEF9ED] rounded-2xl px-3 py-1.5 shadow-sm" : ""
      }`}
    >
      {img}
    </div>
  );
}
