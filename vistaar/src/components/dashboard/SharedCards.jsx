import { useMemo, useState } from "react";
import { Award, Download, Eye, Clock, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Card } from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useApp } from "../../context/AppContext";
import { downloadCertificate, certificateFields } from "../../utils/download";
import { certificateSvg } from "../../utils/certificateTemplate";

export function CertificatePreview({ cert }) {
  const svg = useMemo(() => certificateSvg(certificateFields(cert)), [cert]);
  return (
    <div
      role="img"
      aria-label={`Certificate of completion for ${cert.trainee}: ${cert.title}`}
      className="overflow-hidden rounded-xl border border-ink-100 shadow-card [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export function CertificateCard({ cert }) {
  const { showToast } = useApp();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const handleDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await downloadCertificate(cert);
      showToast("Certificate downloaded.");
    } catch (e) {
      console.error(e);
      showToast("Couldn't generate the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  const toneMap = { Issued: "green", Pending: "amber", "Expiring Soon": "red" };
  const issued = cert.status === "Issued";

  return (
    <>
      <Card hover className="relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-grad-violet rounded-full opacity-10" />
        <div className="flex items-start justify-between relative">
          <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
            <Award size={20} className="text-violet-600" />
          </div>
          <Badge tone={toneMap[cert.status] || "gray"}>{cert.status}</Badge>
        </div>
        <h3 className="font-display font-bold text-ink-900 mt-4 leading-snug">{cert.title}</h3>
        <p className="text-xs text-ink-400 mt-2">Credential ID: {cert.credentialId}</p>
        <p className="text-xs text-ink-400">Issued: {cert.issued}</p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button size="sm" variant="secondary" icon={Eye} className="sm:flex-1" disabled={!issued} onClick={() => setOpen(true)}>
            View
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Download}
            className="sm:flex-[2]"
            disabled={!issued || busy}
            onClick={handleDownload}
          >
            {busy ? "Preparing…" : "Download Certificate"}
          </Button>
          {issued && cert.credentialId && (
            <Link to={`/trainee/certificate-verification?id=${encodeURIComponent(cert.credentialId)}`} className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 py-2">
              <ShieldCheck size={15} /> Verify
            </Link>
          )}
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Certificate" size="xl"
        footer={<Button icon={Download} disabled={busy} onClick={handleDownload}>{busy ? "Preparing…" : "Download Certificate"}</Button>}>
        <CertificatePreview cert={cert} />
      </Modal>
    </>
  );
}

export function AssessmentCard({ assessment }) {
  const { assessmentResults } = useApp();
  const result = assessmentResults[assessment.id];
  const status = result ? "Completed" : assessment.status;
  const toneMap = { "Not Started": "gray", "In Progress": "amber", Completed: "green" };

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
          <ClipboardCheck size={20} className="text-amber-600" />
        </div>
        <Badge tone={toneMap[status] || "gray"}>{status}</Badge>
      </div>
      <h3 className="font-display font-bold text-ink-900 mt-4 leading-snug">{assessment.title}</h3>
      <p className="text-sm text-ink-500 mt-1">{assessment.course}</p>
      <div className="flex items-center gap-4 text-xs text-ink-500 mt-3">
        <span>{assessment.questions} Questions</span>
        <span className="flex items-center gap-1"><Clock size={12} /> Due {assessment.deadline}</span>
      </div>
      {result && (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-3">
          <CheckCircle2 size={14} /> Last score: {result.percentage}%
        </p>
      )}
      <Link
        to={result ? `/trainee/assessments/${assessment.id}/result` : `/trainee/assessments/${assessment.id}`}
        state={result || undefined}
        className="focus-ring mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-700 text-white hover:bg-indigo-800 transition-colors"
      >
        {result ? "View Result" : status === "Not Started" ? "Start Assessment" : "Continue"} <ArrowRight size={15} />
      </Link>
    </Card>
  );
}
