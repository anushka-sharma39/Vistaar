import { useState } from "react";
import { Search, FileText, Video, Presentation as PresentationIcon, BookMarked, Download } from "lucide-react";
import { resources } from "../../data/misc";
import { Input, Select } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";
import { downloadResource } from "../../utils/download";

const typeIcons = { Video: Video, Presentation: PresentationIcon, Document: FileText, Reference: BookMarked };

export default function TraineeResources() {
  const { showToast } = useApp();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");

  const filtered = resources.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) && (type === "All" || r.type === type));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Learning Resources</h1>
        <p className="text-ink-500 mt-1.5">Recordings, slide decks, and reference material shared by your trainers.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Input icon={Search} placeholder="Search resources…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        <Select value={type} onChange={(e) => setType(e.target.value)} className="sm:w-56">
          <option value="All">All Types</option>
          <option>Video</option>
          <option>Presentation</option>
          <option>Document</option>
          <option>Reference</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No resources found" />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((r) => {
            const Icon = typeIcons[r.type] || FileText;
            return (
              <Card key={r.id} hover className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon size={19} className="text-indigo-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900 leading-snug">{r.name}</p>
                  <p className="text-xs text-ink-400 mt-1">{r.course}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge tone="gray">{r.type}</Badge>
                    <span className="text-xs text-ink-400">{r.size}</span>
                    <span className="text-xs text-ink-400">· {r.uploaded}</span>
                  </div>
                </div>
                <Button size="icon" variant="secondary" aria-label={`Download ${r.name}`} onClick={() => { downloadResource(r); showToast("Download started."); }}><Download size={16} /></Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
