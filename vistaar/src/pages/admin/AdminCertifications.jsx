import { useState } from "react";
import { Award, Clock, AlertTriangle, Eye, Download } from "lucide-react";
import { certificates } from "../../data/misc";
import StatCard from "../../components/ui/StatCard";
import { Card } from "../../components/ui/Card";
import DataTable, { Td } from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { CertificatePreview } from "../../components/dashboard/SharedCards";
import { useApp } from "../../context/AppContext";
import { downloadCertificate } from "../../utils/download";

const tone = { Issued: "green", Pending: "amber", "Expiring Soon": "red" };

export default function AdminCertifications() {
  const [preview, setPreview] = useState(null);
  const { showToast } = useApp();
  const save = async (c) => {
    try { await downloadCertificate(c); showToast("Certificate downloaded."); }
    catch (e) { console.error(e); showToast("Couldn't generate the PDF. Please try again."); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Certification Management</h1>
        <p className="text-ink-500 mt-1.5">Monitor issued, pending and expiring certificates.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Award} label="Certificates Issued" value="1,570" tone="teal" />
        <StatCard icon={Clock} label="Pending Certifications" value="42" tone="amber" />
        <StatCard icon={AlertTriangle} label="Expiring Soon" value="18" tone="violet" />
      </div>

      <Card>
        <DataTable
          columns={["Trainee", "Course", "Certificate ID", "Issue Date", "Status", "Actions"].map((l) => ({ key: l, label: l }))}
          data={certificates}
          renderRow={(c) => (
            <>
              <Td><span className="font-semibold text-ink-900">{c.trainee}</span></Td>
              <Td className="text-ink-600">{c.course}</Td>
              <Td className="text-ink-500">{c.credentialId}</Td>
              <Td className="text-ink-500">{c.issued}</Td>
              <Td><Badge tone={tone[c.status]}>{c.status}</Badge></Td>
              <Td>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" icon={Eye} onClick={() => setPreview(c)}>Preview</Button>
                  {c.status === "Issued" && <Button size="sm" variant="outline" icon={Download} onClick={() => save(c)}>Download Certificate</Button>}
                </div>
              </Td>
            </>
          )}
        />
      </Card>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="Certificate Preview" size="xl"
        footer={preview?.status === "Issued" && <Button icon={Download} onClick={() => save(preview)}>Download Certificate</Button>}>
        {preview && <CertificatePreview cert={preview} />}
      </Modal>
    </div>
  );
}
