import { certificates } from "../../data/misc";
import { CertificateCard } from "../../components/dashboard/SharedCards";

export default function TraineeCertificates() {
  const mine = certificates.filter((c) => c.trainee === "Aditi Rao");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Certificates</h1>
        <p className="text-ink-500 mt-1.5">Certificates earned through completed training programs.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mine.map((c) => <CertificateCard key={c.id} cert={c} />)}
      </div>
    </div>
  );
}
