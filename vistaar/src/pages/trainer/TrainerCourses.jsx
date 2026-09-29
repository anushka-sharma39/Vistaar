import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, Users, Layers, BookOpen } from "lucide-react";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { EmptyState, ConfirmationDialog } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";

export default function TrainerCourses() {
  const { showToast, trainerCourses: list, updateTrainerCourse, removeTrainerCourse } = useApp();
  const [toDelete, setToDelete] = useState(null);

  const togglePublish = (c) => {
    updateTrainerCourse(c.id, { published: !c.published });
    showToast(c.published ? "Course moved to drafts." : "Course published.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">My Courses</h1>
          <p className="text-ink-500 mt-1.5">Create, edit and publish your training programs.</p>
        </div>
        <Link to="/trainer/courses/create"><Button icon={Plus}>Create Course</Button></Link>
      </div>

      {list.length === 0 ? (
        <Card><EmptyState icon={BookOpen} title="No courses yet" message="Create your first course to start training."
          action={<Link to="/trainer/courses/create"><Button icon={Plus}>Create Course</Button></Link>} /></Card>
      ) : (
        <div className="grid gap-4">
          {list.map((c) => (
            <Card key={c.id} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-full md:w-20 h-20 rounded-xl bg-grad-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display font-bold text-ink-900">{c.title}</h3>
                  <Badge tone={c.published ? "green" : "amber"}>{c.published ? "Published" : "Draft"}</Badge>
                </div>
                <p className="text-sm text-ink-500 mt-1">{c.category} · {c.level}</p>
                <div className="flex items-center gap-4 text-xs text-ink-500 mt-2">
                  <span className="flex items-center gap-1"><Users size={13} /> {c.students} trainees</span>
                  <span className="flex items-center gap-1"><Layers size={13} /> {c.modulesCount} modules</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" icon={c.published ? EyeOff : Eye} onClick={() => togglePublish(c)}>
                  {c.published ? "Unpublish" : "Publish"}
                </Button>
                <Link to="/trainer/courses/create" state={{ course: c }}><Button size="sm" variant="secondary" icon={Pencil}>Edit</Button></Link>
                <Button size="sm" variant="ghost" className="text-red-600 hover:!bg-red-50" icon={Trash2} onClick={() => setToDelete(c)} aria-label="Delete" />
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmationDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => { removeTrainerCourse(toDelete.id); showToast("Course deleted.", "info"); }}
        title="Delete course?"
        message={`"${toDelete?.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
      />
    </div>
  );
}
