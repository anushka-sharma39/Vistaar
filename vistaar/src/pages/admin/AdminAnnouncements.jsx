import { useState } from "react";
import { Megaphone, Send } from "lucide-react";
import { announcements as seed } from "../../data/misc";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Input, Select, Textarea } from "../../components/ui/Input";
import { useApp } from "../../context/AppContext";

export default function AdminAnnouncements() {
  const { showToast } = useApp();
  const [list, setList] = useState(seed);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState("Announcement");
  const [audience, setAudience] = useState("All Users");

  const publish = (e) => {
    e.preventDefault();
    setList((l) => [{ id: `an-${Date.now()}`, title, body, date: "28 Sep 2026", audience, type }, ...l]);
    setTitle(""); setBody("");
    showToast(`${type} published.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Announcements &amp; Content</h1>
        <p className="text-ink-500 mt-1.5">Publish announcements, achievements and new learning content. Recent items appear on the homepage.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <form onSubmit={publish} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Announcement</option><option>Notification</option><option>Achievement</option><option>New Course</option><option>New Learning Content</option>
              </Select>
              <Select label="Audience" value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option>All Users</option><option>Trainees</option><option>Trainers</option>
              </Select>
            </div>
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement headline" required />
            <Textarea label="Message" rows={6} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your announcement…" required />
            <Button type="submit" icon={Send}>Publish</Button>
          </form>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <p className="font-display font-bold text-ink-900">Published</p>
          {list.map((a) => (
            <Card key={a.id}>
              <div className="flex items-center gap-2 mb-2">
                <Megaphone size={14} className="text-violet-500" />
                <Badge tone="violet">{a.type || "Announcement"}</Badge>
                <span className="text-xs text-ink-400 ml-auto">{a.date}</span>
              </div>
              <p className="font-semibold text-sm text-ink-900">{a.title}</p>
              <p className="text-xs text-ink-500 mt-1 leading-relaxed line-clamp-3">{a.body}</p>
              <p className="text-[11px] text-ink-400 mt-2">Audience: {a.audience}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
