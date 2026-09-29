import { useState } from "react";
import { Select, Textarea } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { StarRating } from "../../components/ui/Misc";
import { courses } from "../../data/courses";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ratingFields = [
  { key: "overall", label: "Overall Rating" },
  { key: "quality", label: "Course Quality" },
  { key: "trainer", label: "Trainer Rating" },
  { key: "content", label: "Content Quality" },
  { key: "experience", label: "Learning Experience" },
];

export default function Feedback() {
  const [ratings, setRatings] = useState({});
  const { showToast } = useApp();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    showToast("Thank you! Your feedback has been submitted.");
    navigate("/trainee/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Course Feedback</h1>
        <p className="text-ink-500 mt-1.5">Your feedback helps us improve training quality across the platform.</p>
      </div>

      <Card>
        <form onSubmit={submit} className="space-y-6">
          <Select label="Select Course" required>
            {courses.slice(0, 6).map((c) => <option key={c.id}>{c.title}</option>)}
          </Select>

          <div className="space-y-4">
            {ratingFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-700">{f.label}</span>
                <StarRating
                  readOnly={false}
                  value={ratings[f.key] || 0}
                  onChange={(v) => setRatings((r) => ({ ...r, [f.key]: v }))}
                  size={20}
                />
              </div>
            ))}
          </div>

          <Textarea label="Written Feedback" rows={5} placeholder="Share your thoughts about the course…" required />

          <Button type="submit" size="lg" className="w-full">Submit Feedback</Button>
        </form>
      </Card>
    </div>
  );
}
