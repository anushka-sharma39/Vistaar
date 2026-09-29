import { getCourseById } from "./courses";

/* Mock trainee assessment + role requirement. Swap `traineeSkillProfile`
   for API / assessment data later; everything below is derived from it. */
export const traineeSkillProfile = {
  targetRole: "Data & Digital Programme Lead",
  skills: [
    { skill: "Technical", trainee: 72, required: 90 },
    { skill: "Communication", trainee: 58, required: 80 },
    { skill: "Problem Solving", trainee: 65, required: 85 },
    { skill: "Leadership", trainee: 45, required: 70 },
    { skill: "Data Analysis", trainee: 50, required: 80 },
    { skill: "Teamwork", trainee: 78, required: 85 },
  ],
};

/* Skill -> catalog course. Extends the existing course model with pricing:
   price 0 = FREE, otherwise PREMIUM (₹500–₹1,000). */
export const courseRecommendations = {
  "Data Analysis": { courseId: "c-102", price: 799 },
  Communication: { courseId: "c-110", price: 599 },
  Leadership: { courseId: "c-104", price: 999 },
  "Problem Solving": { courseId: "c-112", price: 699 },
  Technical: { courseId: "c-105", price: 0 },
  Teamwork: { courseId: "c-106", price: 0 },
};

export const withGap = (skills) => skills.map((s) => ({ ...s, gap: Math.max(0, s.required - s.trainee) }));
export const rankGaps = (skills) => withGap(skills).sort((a, b) => b.gap - a.gap);
export const roleMatch = (skills) => Math.round((skills.reduce((n, s) => n + Math.min(s.trainee, s.required), 0) / skills.reduce((n, s) => n + s.required, 0)) * 100);

export function recommendCourses(skills, count = 3) {
  return rankGaps(skills)
    .filter((g) => g.gap > 0 && courseRecommendations[g.skill])
    .map((g) => {
      const { courseId, price } = courseRecommendations[g.skill];
      const course = getCourseById(courseId);
      return course && { course, price, skill: g.skill, gap: g.gap };
    })
    .filter(Boolean)
    .slice(0, count);
}
