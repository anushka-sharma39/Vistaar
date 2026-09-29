const palette = {
  indigo: "bg-gradient-to-br from-indigo-100 to-teal-100 text-indigo-700",
  teal: "bg-gradient-to-br from-teal-100 to-indigo-50 text-teal-700",
  violet: "bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700",
};

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-24 h-24 text-3xl",
};

export default function Avatar({ initials = "U", color = "indigo", size = "md", className = "", ring = false }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-display font-bold shrink-0 ${palette[color] || palette.indigo} ${sizes[size]} ${
        ring ? "ring-4 ring-white shadow-soft" : ""
      } ${className}`}
    >
      {initials}
    </div>
  );
}
