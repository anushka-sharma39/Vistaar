import { useMemo, useState } from "react";
import { Search, Eye, Check, X, Pencil, Ban } from "lucide-react";
import { allUsers } from "../../data/users";
import { Card } from "../../components/ui/Card";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import { ConfirmationDialog, Pagination } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";

const columns = ["User", "Email", "Role", "Registered", "Status", "Courses", "Actions"].map((l) => ({ key: l, label: l }));
const tone = { Active: "green", Pending: "amber", Suspended: "red" };
const PAGE = 6;

export default function AdminUsers() {
  const { showToast } = useApp();
  const [users, setUsers] = useState(allUsers);
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [action, setAction] = useState(null); // {type, user}
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const t = tab === "all" || (tab === "pending" ? u.status === "Pending" : u.role === tab);
      return t && (u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));
    });
  }, [users, tab, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const rows = filtered.slice((page - 1) * PAGE, page * PAGE);

  const apply = () => {
    const { type, user } = action;
    const status = { approve: "Active", reject: "Suspended", suspend: "Suspended" }[type];
    setUsers((all) => all.map((u) => (u.id === user.id ? { ...u, status } : u)));
    showToast(`${user.name} ${type === "approve" ? "approved" : type === "reject" ? "rejected" : "suspended"}.`);
  };

  const saveEdit = () => {
    if (!editUser.name.trim() || !editUser.email.includes("@")) return showToast("Enter a valid name and email.", "warning");
    setUsers((all) => all.map((u) => (u.id === editUser.id ? editUser : u)));
    showToast(`${editUser.name} updated.`);
    setEditUser(null);
  };

  const copy = { approve: "Approve", reject: "Reject", suspend: "Suspend" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">User Management</h1>
        <p className="text-ink-500 mt-1.5">Manage trainees, trainers and pending approvals.</p>
      </div>

      <Card>
        <Tabs
          tabs={[
            { label: "All Users", value: "all" },
            { label: "Trainees", value: "trainee" },
            { label: "Trainers", value: "trainer" },
            { label: `Pending Approvals (${users.filter((u) => u.status === "Pending").length})`, value: "pending" },
          ]}
          active={tab}
          onChange={(t) => { setTab(t); setPage(1); }}
        />
        <div className="my-5 max-w-sm">
          <Input icon={Search} placeholder="Search users…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        </div>
        <DataTable
          columns={columns}
          data={rows}
          renderRow={(u) => (
            <>
              <Td><div className="flex items-center gap-3"><Avatar initials={u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)} size="sm" /><span className="font-semibold text-ink-900">{u.name}</span></div></Td>
              <Td className="text-ink-500">{u.email}</Td>
              <Td><Badge tone={u.role === "trainer" ? "violet" : "indigo"}>{u.role}</Badge></Td>
              <Td className="text-ink-500">{u.registered}</Td>
              <Td><Badge tone={tone[u.status]}>{u.status}</Badge></Td>
              <Td>{u.courses}</Td>
              <Td>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" aria-label="View" onClick={() => setViewUser(u)}><Eye size={15} /></Button>
                  {u.status === "Pending" && (
                    <>
                      <Button size="icon" variant="ghost" className="text-emerald-600" aria-label="Approve" onClick={() => setAction({ type: "approve", user: u })}><Check size={15} /></Button>
                      <Button size="icon" variant="ghost" className="text-red-600" aria-label="Reject" onClick={() => setAction({ type: "reject", user: u })}><X size={15} /></Button>
                    </>
                  )}
                  <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => setEditUser({ ...u })}><Pencil size={15} /></Button>
                  {u.status === "Active" && <Button size="icon" variant="ghost" className="text-red-600" aria-label="Suspend" onClick={() => setAction({ type: "suspend", user: u })}><Ban size={15} /></Button>}
                </div>
              </Td>
            </>
          )}
        />
        <Pagination page={page} totalPages={pages} onChange={setPage} />
      </Card>

      <ConfirmationDialog
        open={!!action}
        onClose={() => setAction(null)}
        onConfirm={apply}
        title={action ? `${copy[action.type]} user?` : ""}
        message={action ? `Are you sure you want to ${action.type} ${action.user.name}?` : ""}
        confirmLabel={action ? copy[action.type] : "Confirm"}
        variant={action?.type === "approve" ? "primary" : "danger"}
      />

      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Edit User" size="sm"
        footer={<><Button variant="secondary" onClick={() => setEditUser(null)}>Cancel</Button><Button onClick={saveEdit}>Save</Button></>}>
        {editUser && (
          <div className="space-y-4">
            <Input label="Name" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
            <Input label="Email" type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
            <Select label="Role" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
              <option value="trainee">trainee</option><option value="trainer">trainer</option>
            </Select>
            <Select label="Status" value={editUser.status} onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}>
              <option>Active</option><option>Pending</option><option>Suspended</option>
            </Select>
          </div>
        )}
      </Modal>

      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="User Details" size="sm">
        {viewUser && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><Avatar initials={viewUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2)} size="lg" /><div><p className="font-semibold text-ink-900">{viewUser.name}</p><p className="text-ink-500">{viewUser.email}</p></div></div>
            <div className="flex justify-between"><span className="text-ink-500">Role</span><span className="capitalize">{viewUser.role}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Registered</span><span>{viewUser.registered}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Status</span><Badge tone={tone[viewUser.status]}>{viewUser.status}</Badge></div>
            <div className="flex justify-between"><span className="text-ink-500">Courses</span><span>{viewUser.courses}</span></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
