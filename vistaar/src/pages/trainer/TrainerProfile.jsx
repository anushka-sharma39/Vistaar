import { useState } from "react";
import { MapPin, Mail, Pencil, GraduationCap, Briefcase, BadgeCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { Card } from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import { Input, Textarea } from "../../components/ui/Input";

export default function TrainerProfile() {
  const { user, updateUser } = useAuth();
  const { showToast } = useApp();
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: user.name, designation: user.designation, about: user.about });

  const save = () => {
    updateUser({ ...form, avatar: form.name.split(" ").filter((n) => !n.endsWith(".")).map((n) => n[0]).join("").slice(0, 2).toUpperCase() || user.avatar });
    setEditOpen(false);
    showToast("Profile updated.");
  };

  return (
    <div className="space-y-6">
      <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar initials={user.avatar} size="xl" ring />
        <div className="flex-1">
          <h1 className="text-2xl font-display font-extrabold text-ink-900">{user.name}</h1>
          <p className="text-indigo-600 font-medium">{user.designation}</p>
          <p className="text-sm text-ink-500 mt-1">{user.department}</p>
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
            <h2 className="font-display font-bold text-ink-900 mb-3">Biography</h2>
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
            <h2 className="font-display font-bold text-ink-900 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-indigo-600" /> Experience</h2>
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
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-3">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">{user.expertise.map((e) => <Badge key={e} tone="indigo">{e}</Badge>)}</div>
          </Card>
          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-4">Skills</h2>
            <div className="space-y-4">
              {user.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-ink-700">{s.name}</span><span className="text-xs text-ink-400">{s.level}</span></div>
                  <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.value}%` }} /></div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="font-display font-bold text-ink-900 mb-3">Certifications</h2>
            <div className="space-y-2.5">
              {user.certifications.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-ink-700"><BadgeCheck size={16} className="text-teal-600" /> {c}</div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile"
        footer={<><Button variant="secondary" onClick={() => setEditOpen(false)}>Cancel</Button><Button onClick={save}>Save Changes</Button></>}>
        <div className="space-y-4">
          <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          <Textarea label="Biography" rows={5} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
