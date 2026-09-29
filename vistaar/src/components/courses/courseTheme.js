// Per-category look for every course card (catalog, dashboard, My Learning).
// from/to = header gradient, accent = left stripe + button text, tint = soft fills.
const themes = {
  "Professional Development": { art: "pro", from: "#F472B6", to: "#DB2777", accent: "#DB2777", ink: "#BE185D", tint: "#FDF2F8", tintHover: "#FCE7F3" },
  Cybersecurity: { art: "cyber", from: "#2DD4BF", to: "#0E7490", accent: "#0D9488", ink: "#0F766E", tint: "#ECFEFF", tintHover: "#CFFAFE" },
  Leadership: { art: "leader", from: "#8B5CF6", to: "#5B21B6", accent: "#6D28D9", ink: "#5B21B6", tint: "#F5F3FF", tintHover: "#EDE9FE" },
  "Data Science": { art: "data", from: "#38BDF8", to: "#1D4ED8", accent: "#2563EB", ink: "#1D4ED8", tint: "#EFF6FF", tintHover: "#DBEAFE" },
  "Artificial Intelligence": { art: "ai", from: "#818CF8", to: "#4338CA", accent: "#4F46E5", ink: "#4338CA", tint: "#EEF2FF", tintHover: "#E0E7FF" },
  "Digital Transformation": { art: "digital", from: "#FBBF24", to: "#EA580C", accent: "#EA580C", ink: "#C2410C", tint: "#FFF7ED", tintHover: "#FFEDD5" },
  "Smart Systems": { art: "smart", from: "#22D3EE", to: "#0369A1", accent: "#0891B2", ink: "#0E7490", tint: "#ECFEFF", tintHover: "#CFFAFE" },
  "Sustainable Engineering": { art: "green", from: "#4ADE80", to: "#047857", accent: "#059669", ink: "#047857", tint: "#ECFDF5", tintHover: "#D1FAE5" },
  "Industry 5.0": { art: "industry", from: "#94A3B8", to: "#1E293B", accent: "#475569", ink: "#334155", tint: "#F1F5F9", tintHover: "#E2E8F0" },
};

export function getCourseTheme(course) {
  return themes[course.category] || themes.Leadership;
}
