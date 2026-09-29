import { certificateRegistry } from "../data/certificateRegistry";

/* Verification logic, kept out of the UI. To go live, replace the body of
   verifyCertificate with a fetch to your API — the return shape stays the same:
   { found: true, certificate } | { found: false } */
export const normalizeCertificateId = (raw) => String(raw ?? "").trim().replace(/\s+/g, "").toUpperCase();
export const verificationPath = (id) => `/trainee/certificate-verification?id=${encodeURIComponent(id)}`;

export async function verifyCertificate(rawId) {
  const id = normalizeCertificateId(rawId);
  if (!id) throw new Error("Please enter a Certificate ID.");
  await new Promise((r) => setTimeout(r, 500)); // stands in for network latency
  const certificate = certificateRegistry.find((c) => c.certificateId.toUpperCase() === id);
  return certificate ? { found: true, certificate } : { found: false };
}
