import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, XCircle, Clock, Award, Eye, Download, RotateCcw, Lock } from "lucide-react";
import { Card } from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { CertificatePreview } from "../../components/dashboard/SharedCards";
import { useApp } from "../../context/AppContext";
import { downloadCertificate } from "../../utils/download";
import { verifyCertificate, normalizeCertificateId } from "../../services/certificateService";

const STATUS = {
  Valid: { tone: "green", icon: CheckCircle2, title: "Certificate Verified", label: "✓ Valid Certificate", note: "This certificate has been successfully verified against Vistaar's records.", box: "bg-emerald-50 text-emerald-700" },
  Expired: { tone: "amber", icon: Clock, title: "Certificate Expired", label: "Expired", note: "This certificate is authentic but is no longer within its validity period.", box: "bg-amber-50 text-amber-600" },
  Revoked: { tone: "red", icon: AlertTriangle, title: "Certificate Revoked", label: "⚠ Certificate Revoked", note: "This certificate was issued by Vistaar but has since been revoked and is no longer valid.", box: "bg-red-50 text-red-600" },
  "Pending Verification": { tone: "gray", icon: Clock, title: "Verification Pending", label: "Pending Verification", note: "This certificate is awaiting final verification by Vistaar.", box: "bg-ink-100 text-ink-600" },
};

const Field = ({ label, children }) => (
  <div><p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{label}</p><p className="text-ink-900 font-medium mt-1">{children}</p></div>
);

export default function CertificateVerification() {
  const [params, setParams] = useSearchParams();
  const { showToast } = useApp();
  const [input, setInput] = useState(params.get("id") ?? "");
  const [state, setState] = useState({ phase: "idle" }); // idle | loading | found | notfound | error
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const runId = useRef(0);

  const run = async (raw) => {
    const id = normalizeCertificateId(raw);
    if (!id) return setState({ phase: "error", message: "Please enter a Certificate ID." });
    const mine = ++runId.current;
    setState({ phase: "loading" });
    try {
      const res = await verifyCertificate(id);
      if (mine !== runId.current) return;
      setState(res.found ? { phase: "found", cert: res.certificate } : { phase: "notfound" });
    } catch (e) {
      if (mine === runId.current) setState({ phase: "error", message: e.message || "Verification failed. Please try again." });
    }
  };

  // Direct verification: /trainee/certificate-verification?id=...
  const urlId = params.get("id");
  useEffect(() => { if (urlId) { setInput(urlId); run(urlId); } /* eslint-disable-next-line */ }, [urlId]);

  const submit = (e) => { e?.preventDefault(); setParams(input.trim() ? { id: normalizeCertificateId(input) } : {}, { replace: true }); if (normalizeCertificateId(input) === normalizeCertificateId(urlId)) run(input); };
  const reset = () => { setState({ phase: "idle" }); setInput(""); setParams({}, { replace: true }); };

  const cert = state.cert;
  const s = cert && (STATUS[cert.status] || STATUS["Pending Verification"]);
  const asRecord = cert && { trainee: cert.recipientName, title: cert.courseName, course: cert.courseName, credentialId: cert.certificateId, issued: cert.issueDate };
  const download = async () => {
    setBusy(true);
    try { await downloadCertificate(asRecord); showToast("Certificate downloaded."); }
    catch { showToast("Couldn't generate the PDF. Please try again."); }
    finally { setBusy(false); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center pt-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center"><ShieldCheck size={26} className="text-indigo-600" /></div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900 mt-4">Verify a Certificate</h1>
        <p className="text-ink-500 mt-1.5">Verify the authenticity of a Vistaar learning or training certificate.</p>
      </div>

      <Card>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Input label="Certificate ID" icon={Search} value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. VIS-2026-8F42K9" autoComplete="off" spellCheck={false} error={state.phase === "error" ? state.message : undefined} />
          <Button type="submit" className="w-full" loading={state.phase === "loading"}>Verify Certificate</Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-ink-400"><Lock size={12} /> Secure credential verification</p>
        </form>
      </Card>

      {state.phase === "notfound" && (
        <Card className="animate-slideUp">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><XCircle size={20} className="text-red-500" /></div>
            <div>
              <h2 className="font-display font-bold text-ink-900">Certificate Not Found</h2>
              <p className="text-sm text-ink-500 mt-1">We couldn't find a certificate associated with this ID.</p>
              <p className="text-sm text-ink-600 font-medium mt-3">Please check:</p>
              <ul className="text-sm text-ink-500 mt-1 list-disc pl-5 space-y-0.5">
                <li>Certificate ID is entered correctly</li><li>There are no unnecessary spaces</li><li>The certificate was issued through Vistaar</li>
              </ul>
              <Button variant="secondary" size="sm" icon={RotateCcw} className="mt-4" onClick={reset}>Try Again</Button>
            </div>
          </div>
        </Card>
      )}

      {state.phase === "found" && (
        <Card className="animate-slideUp relative overflow-hidden" padded={false}>
          <div className={`flex items-start gap-3 p-5 ${s.box}`}>
            <s.icon size={24} className="shrink-0 mt-0.5" />
            <div><h2 className="font-display font-bold text-lg leading-tight">{s.title}</h2><p className="text-sm opacity-90 mt-1">{s.note}</p></div>
          </div>
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3 pb-5 border-b border-ink-100">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center"><Award size={20} className="text-violet-600" /></div>
              <div className="min-w-0"><p className="font-display font-bold text-ink-900 leading-snug">{cert.courseName}</p><p className="text-xs text-ink-400">{cert.certificateType}</p></div>
              <Badge tone={s.tone} className="ml-auto shrink-0">{s.label}</Badge>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5 mt-5">
              <Field label="Certificate ID"><span className="font-mono text-sm">{cert.certificateId}</span></Field>
              <Field label="Recipient">{cert.recipientName}</Field>
              <Field label="Skill / Competency">{cert.skill}</Field>
              <Field label="Issued By">{cert.issuedBy}</Field>
              {cert.trainer && <Field label="Trainer">{cert.trainer}</Field>}
              <Field label="Issue Date">{cert.issueDate}</Field>
              {cert.completionDate && <Field label="Completion Date">{cert.completionDate}</Field>}
              {cert.duration && <Field label="Duration">{cert.duration}</Field>}
              <Field label="Status">{s.label}</Field>
            </div>
            {cert.status === "Valid" && (
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button variant="secondary" icon={Eye} className="sm:flex-1" onClick={() => setOpen(true)}>View Certificate</Button>
                <Button icon={Download} className="sm:flex-1" disabled={busy} onClick={download}>{busy ? "Preparing…" : "Download Certificate"}</Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {cert && <Modal open={open} onClose={() => setOpen(false)} title="Certificate" size="xl" footer={<Button icon={Download} disabled={busy} onClick={download}>{busy ? "Preparing…" : "Download Certificate"}</Button>}><CertificatePreview cert={asRecord} /></Modal>}
    </div>
  );
}
