import { Link } from "react-router-dom";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";
import { Target, Star, Clock3, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { PALETTE } from "../charts/ChartKit";
import { traineeSkillProfile, rankGaps, roleMatch, recommendCourses } from "../../data/skillGap";

export default function SkillGapRadar({ profile = traineeSkillProfile }) {
  const { skills, targetRole } = profile;
  const gaps = rankGaps(skills).slice(0, 3);
  const picks = recommendCourses(skills, 3);

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-lg text-ink-900">Skill Gap Radar</h2>
            <p className="text-sm text-ink-500 mt-1">See where you stand for your target role: <span className="font-medium text-ink-700">{targetRole}</span></p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-2xl font-extrabold text-indigo-700 leading-none tabular-nums">{roleMatch(skills)}%</p>
            <p className="text-[11px] font-semibold text-ink-400 mt-1">Match</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mt-4 items-center">
          <div className="h-[300px] sm:h-[340px]" role="img" aria-label="Radar chart comparing your skill levels with the role requirement">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skills} outerRadius="72%">
                <PolarGrid stroke="#E6EAF4" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#5B6486", fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Role Requirement" dataKey="required" stroke={PALETTE.pink} fill={PALETTE.pink} fillOpacity={0.12} strokeDasharray="5 4" strokeWidth={2} />
                <Radar name="Your Level" dataKey="trainee" stroke={PALETTE.violet} fill={PALETTE.violet} fillOpacity={0.35} strokeWidth={2.5} />
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #E6EAF4", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="font-display font-bold text-ink-900 mb-3">Your biggest gaps</p>
            <div className="space-y-4">
              {gaps.map((g) => (
                <div key={g.skill}>
                  <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-ink-700">{g.skill}</span><Badge tone={g.gap >= 25 ? "red" : "amber"}>{g.gap}% gap</Badge></div>
                  <div className="h-2 rounded-full bg-ink-100 overflow-hidden"><div className="h-full rounded-full bg-grad-violet transition-all duration-700" style={{ width: `${Math.min(100, g.gap * 2.5)}%` }} /></div>
                </div>
              ))}
            </div>
            <a href="#learning-path"><Button className="mt-6 w-full sm:w-auto" iconRight={ArrowRight}>Close Your Skill Gaps</Button></a>
          </div>
        </div>
      </Card>

      <section id="learning-path" className="scroll-mt-24">
        <div className="flex items-center gap-2"><Target size={18} className="text-violet-500" /><h2 className="font-display font-bold text-lg text-ink-900">Your Recommended Learning Path</h2></div>
        <p className="text-sm text-ink-500 mt-1 mb-4">You should do these {picks.length} courses</p>
        <div className="grid md:grid-cols-3 gap-5">
          {picks.map(({ course, price, skill, gap }, i) => (
            <Card key={course.id} hover className="flex flex-col">
              <div className="flex items-start justify-between">
                <span className="font-display text-2xl font-extrabold text-indigo-200 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {price === 0 ? <Badge tone="green">FREE</Badge> : <Badge tone="violet" icon={Sparkles}>PREMIUM</Badge>}
              </div>
              <h3 className="font-display font-bold text-ink-900 mt-3 leading-snug">{course.title}</h3>
              <p className="text-xs font-semibold text-indigo-700 mt-1.5">Improves {skill} · {gap}% gap</p>
              <p className="text-sm text-ink-500 mt-2 line-clamp-2">{course.description}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500 mt-3">
                <span>{course.level}</span>
                <span className="flex items-center gap-1"><Star size={12} className="text-amber-500 fill-amber-400" />{course.rating}</span>
                <span className="flex items-center gap-1"><Clock3 size={12} />{course.duration}</span>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4">
                <div>
                  <p className="font-display text-xl font-extrabold text-ink-900 tabular-nums">{price === 0 ? "₹0" : `₹${price.toLocaleString("en-IN")}`}</p>
                  {price > 0 && <p className="text-[10px] uppercase tracking-wider text-ink-400">Premium Learning</p>}
                </div>
                <Link to={`/courses/${course.id}`}><Button size="sm" variant="secondary" iconRight={ArrowRight}>View Course</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
