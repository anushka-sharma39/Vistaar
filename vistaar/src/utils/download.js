import { courses } from "../data/courses";
import { certificateSvg, CERT_H, CERT_W, ORG } from "./certificateTemplate";

// Small helpers so "Download" buttons actually produce a file in this demo.
export function downloadBlob(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function downloadResource(res) {
  const body = [
    res.name,
    "=".repeat(Math.min(60, res.name.length)),
    "",
    `Course:  ${res.course || "—"}`,
    `Type:    ${res.type || "Document"}`,
    `Size:    ${res.size || "—"}`,
    "",
    "This is a demo placeholder for the real resource file.",
    "Vistaar — Learn. Connect. Grow.",
  ].join("\n");
  downloadBlob(`${slug(res.name)}.txt`, body);
}

export const certificateFilename = (name) =>
  `Certificate_${String(name || "Trainee").trim().replace(/[^A-Za-z0-9]+/g, "_").replace(/^_+|_+$/g, "")}.pdf`;

// Maps an existing certificate record onto the fields the template shows.
// Nothing is invented: Course ID comes from the matching course, if there is one.
export function certificateFields(cert, trainee) {
  const match = courses.find((c) => c.title === (cert.course || cert.title));
  return {
    name: trainee || cert.trainee,
    course: cert.title || cert.course,
    courseId: match ? String(match.id).toUpperCase() : "—",
    certId: cert.credentialId,
    issued: cert.issued,
  };
}

const toBase64 = (buf) => {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};

// Same font files the on-screen preview uses (see @font-face in index.css).
async function registerFonts(doc) {
  const [sans, sansBold, serifBold, serifItalic, script] = await Promise.all([
    import("../assets/fonts/Sans-Regular.ttf?url"),
    import("../assets/fonts/Sans-Bold.ttf?url"),
    import("../assets/fonts/Serif-Bold.ttf?url"),
    import("../assets/fonts/Serif-Italic.ttf?url"),
    import("../assets/fonts/Script.ttf?url"),
  ]);
  const files = [
    [sans.default, "CertSans", "normal"],
    [sansBold.default, "CertSans", "bold"],
    [serifBold.default, "CertSerif", "bold"],
    [serifItalic.default, "CertSerif", "italic"],
    [script.default, "CertScript", "normal"],
  ];
  await Promise.all(files.map(async ([url, family, style], i) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Font failed to load: ${url}`);
    const file = `cert-font-${i}.ttf`;
    doc.addFileToVFS(file, toBase64(await res.arrayBuffer()));
    doc.addFont(file, family, style);
  }));
}

// Converts the exact same SVG shown in the preview into a vector PDF (3:2, 297 x 198 mm).
// jsPDF + svg2pdf load on demand so they stay out of the main bundle.
export async function downloadCertificate(cert, trainee) {
  const fields = certificateFields(cert, trainee);
  const [{ jsPDF }, { svg2pdf }] = await Promise.all([import("jspdf"), import("svg2pdf.js")]);
  const W = 842, H = (842 * CERT_H) / CERT_W;
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: [W, H], compress: true });
  await registerFonts(doc);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:-99999px;top:0;width:1536px;height:1024px;pointer-events:none;";
  host.innerHTML = certificateSvg(fields);
  document.body.appendChild(host);
  try {
    await svg2pdf(host.firstElementChild, doc, { x: 0, y: 0, width: W, height: H });
  } finally {
    host.remove();
  }
  doc.setProperties({
    title: `Certificate of Completion - ${fields.course}`,
    author: ORG,
    subject: `Certificate of Completion for ${fields.name}`,
  });
  doc.save(certificateFilename(fields.name));
}

export function downloadCSV(filename, rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  downloadBlob(filename, rows.map((r) => r.map(esc).join(",")).join("\n"), "text/csv");
}
