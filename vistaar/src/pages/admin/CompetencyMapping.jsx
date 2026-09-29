import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { competencyMap, competencyCategories } from "../../data/misc";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { Select } from "../../components/ui/Input";
import { CircularProgress } from "../../components/ui/Misc";

const matchTone = (m) => (m >= 90 ? "#10B981" : m >= 70 ? "#7C3AED" : "#F59E0B");

export default function CompetencyMapping() {
  const [category, setCategory] = useState("All");
  const [subject, setSubject] = useState("All");
  const [experience, setExperience] = useState("All");
  const [certification, setCertification] = useState("All");

  const list = useMemo(
    () => competencyMap.filter((c) => subject === "All" || c.subject === subject),
    [subject]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Competency Mapping</h1>
        <p className="text-ink-500 mt-1.5">Map subjects to required competencies and find the best-matched trainers.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...competencyCategories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`focus-ring px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === c ? "bg-indigo-700 text-white border-indigo-700" : "bg-white border-ink-100 text-ink-600 hover:border-indigo-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <Card className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="All">All Subjects</option>
          {competencyMap.map((c) => <option key={c.subject}>{c.subject}</option>)}
        </Select>
        <Select label="Skill"><option>Any Skill</option><option>Python</option><option>Leadership</option><option>Network Security</option></Select>
        <Select label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="All">Any Experience</option><option>5+ years</option><option>10+ years</option>
        </Select>
        <Select label="Certification" value={certification} onChange={(e) => setCertification(e.target.value)}>
          <option value="All">Any Certification</option><option>Certified</option><option>Not Certified</option>
        </Select>
      </Card>

      <div className="space-y-5">
        {list.map((c) => (
          <Card key={c.subject}>
            <div className="grid lg:grid-cols-[1fr_auto_1.4fr] gap-6 items-center">
              <div>
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide">Subject</p>
                <h3 className="font-display font-bold text-xl text-ink-900 mt-1">{c.subject}</h3>
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mt-4 mb-2">Required Competencies</p>
                <div className="flex flex-wrap gap-2">
                  {c.required.map((r) => <Badge key={r} tone="violet">{r}</Badge>)}
                </div>
              </div>

              <ArrowRight size={22} className="text-indigo-300 hidden lg:block" />

              <div>
                <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">Matching Trainers</p>
                <div className="space-y-3">
                  {c.trainers.map((t) => (
                    <div key={t.name} className="flex items-center gap-3 bg-canvas rounded-xl px-3 py-2.5 border border-ink-100">
                      <Avatar initials={t.name.replace("Dr. ", "").split(" ").map((n) => n[0]).join("")} size="sm" />
                      <span className="flex-1 text-sm font-medium text-ink-800">{t.name}</span>
                      <CircularProgress value={t.match} size={46} stroke={4} tone={matchTone(t.match)} label={`${t.match}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
