import { useMemo, useRef, useState } from "react";
import { Search, Upload, Download, FileText, Video, Presentation as PresentationIcon, BookMarked, FolderOpen } from "lucide-react";
import { resources } from "../../data/misc";
import { Input, Select } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Tabs from "../../components/ui/Tabs";
import { EmptyState } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";
import { downloadResource } from "../../utils/download";

const typeIcons = { Video, Presentation: PresentationIcon, Document: FileText, Reference: BookMarked };
const tabs = [
  { label: "All", value: "All" },
  { label: "Recorded Lectures", value: "Video" },
  { label: "Presentations", value: "Presentation" },
  { label: "Documents", value: "Document" },
  { label: "Reference Materials", value: "Reference" },
];

export default function TrainerLibrary() {
  const { showToast } = useApp();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [sort, setSort] = useState("recent");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [items, setItems] = useState(resources);
  const [form, setForm] = useState({ name: "", type: "Video", visibility: "All Trainees", file: null });
  const fileRef = useRef(null);

  const upload = () => {
    const name = form.name.trim() || form.file?.name;
    if (!name) return showToast("Add a name or choose a file first.", "warning");
    const size = form.file ? `${Math.max(1, Math.round(form.file.size / 1024))} KB` : "—";
    setItems((l) => [{ id: `r-${Date.now()}`, name, type: form.type, size, uploaded: "28 Sep 2026", course: "Unassigned", visibility: form.visibility }, ...l]);
    setForm({ name: "", type: "Video", visibility: "All Trainees", file: null });
    setUploadOpen(false);
    showToast("Resource uploaded.");
  };

  const list = useMemo(() => {
    let l = items.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) && (tab === "All" || r.type === tab));
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [items, q, tab, sort]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Trainer Library</h1>
          <p className="text-ink-500 mt-1.5">Manage lectures, presentations, study materials and references.</p>
        </div>
        <Button icon={Upload} onClick={() => setUploadOpen(true)}>Upload Resource</Button>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input icon={Search} placeholder="Search library…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        <Select value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-52">
          <option value="recent">Sort: Most Recent</option>
          <option value="name">Sort: Name</option>
        </Select>
      </div>

      {list.length === 0 ? (
        <EmptyState icon={FolderOpen} title="No resources found" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((r) => {
            const Icon = typeIcons[r.type] || FileText;
            return (
              <Card key={r.id} hover>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon size={19} className="text-indigo-600" />
                  </div>
                  <Badge tone={r.visibility === "All Trainees" ? "teal" : "gray"}>{r.visibility}</Badge>
                </div>
                <p className="font-semibold text-ink-900 text-sm mt-4 leading-snug">{r.name}</p>
                <p className="text-xs text-ink-400 mt-1">{r.course}</p>
                <div className="flex items-center gap-3 text-xs text-ink-500 mt-3">
                  <span>{r.type}</span><span>{r.size}</span><span>{r.uploaded}</span>
                </div>
                <Button size="sm" variant="secondary" icon={Download} className="w-full mt-4" onClick={() => { downloadResource(r); showToast("Download started."); }}>Download</Button>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload Resource"
        footer={
          <>
            <Button variant="secondary" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button onClick={upload}>Upload</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Resource Name" placeholder="e.g. Week 4 Lecture Slides" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Video</option><option>Presentation</option><option>Document</option><option>Reference</option></Select>
          <Select label="Visibility" value={form.visibility} onChange={(e) => setForm({ ...form, visibility: e.target.value })}><option>All Trainees</option><option>Enrolled Only</option></Select>
          <input ref={fileRef} type="file" className="hidden" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} />
          <button type="button" onClick={() => fileRef.current?.click()} className="focus-ring w-full border-2 border-dashed border-ink-100 hover:border-indigo-300 rounded-xl p-8 flex flex-col items-center text-ink-400 transition-colors">
            <Upload size={24} /><p className="text-sm mt-2">{form.file ? form.file.name : "Click to choose a file"}</p>
          </button>
        </div>
      </Modal>
    </div>
  );
}
