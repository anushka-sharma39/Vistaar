import { useState } from "react";
import { MapPin, Mail, Pencil, GraduationCap, Briefcase, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import Modal from "../../components/ui/Modal";
import { Input, Textarea } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { certificates } from "../../data/misc";
import { CertificateCard } from "../../components/dashboard/SharedCards";

export default function TraineeProfile() {
  const { user, updateUser } = useAuth();
  const { showToast } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: user.name, designation: user.designation, location: user.location, about: user.about });
  const save = () => {
    if (!form.name.trim()) return showToast("Name can't be empty.", "warning");
    updateUser({ ...form, avatar: form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() });
    setEditOpen(false);
    showToast("Profile updated.");
  };
  const mine = certificates.filter((c) => c.trainee === "Aditi Rao");

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar initials={user.avatar} size="xl" ring />
        <div className="flex-1">
          <h1 className="text-2xl font-display font-extrabold text-ink-900">{user.name}</h1>
          <p className="text-indigo-600 font-medium">{user.designation}</p>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ink-500">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {user.location}</span>
            <span className="flex items-center gap-1.5"><Mail size={14} /> {user.email}</span>
          </div>
        </div>
        <Button variant="secondary" icon={Pencil} onClick={() => setEditOpen(true)}>Edit Profile</Button>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-3">About Me</h2>
            <p className="text-sm text-ink-600 leading-relaxed">{user.about}</p>
          </Card>

          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2"><GraduationCap size={18} className="text-indigo-600" /> Qualifications</h2>
            <div className="space-y-4">
              {user.qualifications.map((q, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-ink-800">{q.degree}</p>
                    <p className="text-xs text-ink-400">{q.institute} · {q.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> Work Experience</h2>
            <div className="space-y-5">
              {user.experience.map((e, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-indigo-100">
                  <span className="absolute -left-[7px] top-0.5 w-3 h-3 rounded-full bg-indigo-500" />
                  <p className="text-sm font-semibold text-ink-800">{e.role}</p>
                  <p className="text-xs text-ink-500">{e.org}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{e.period}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2"><Award size={18} className="text-indigo-600" /> Certificates</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {mine.map((c) => <CertificateCard key={c.id} cert={c} />)}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4">Skills</h2>
            <div className="space-y-4">
              {user.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-ink-700">{s.name}</span>
                    <Badge tone={s.level === "Advanced" ? "indigo" : "teal"}>{s.level}</Badge>
                  </div>
                  <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((i) => <Badge key={i} tone="violet">{i}</Badge>)}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile"
        footer={<><Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button><Button onClick={save}>Save changes</Button></>}>
        <div className="space-y-4">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Textarea label="About" rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
