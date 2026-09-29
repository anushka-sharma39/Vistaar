import { certificates } from "./misc";
import { courses } from "./courses";

/* Certificate registry — the single source the verifier reads from.
   Replace this module (or the service that calls it) with an API later.
   Records are derived from the existing issued certificates so IDs on
   downloaded certificates verify here, plus a few sample records that
   exercise the other statuses. `status` always comes from the record. */
const fromIssued = certificates
  .filter((c) => c.status === "Issued" && c.credentialId && c.credentialId !== "—")
  .map((c) => {
    const course = courses.find((x) => x.title === (c.course || c.title));
    return {
      certificateId: c.credentialId,
      recipientName: c.trainee,
      courseName: c.title,
      skill: course?.category ?? "—",
      issuedBy: "Vistaar",
      trainer: course?.trainer ?? null,
      issueDate: c.issued,
      completionDate: null,
      duration: course?.duration ?? null,
      certificateType: "Course Completion",
      status: "Valid",
    };
  });

const samples = [
  { certificateId: "VIS-2026-8F42K9", recipientName: "Aarav Sharma", courseName: "Python for Data Analysis", skill: "Data Analysis", issuedBy: "Vistaar Learning", trainer: null, issueDate: "15 August 2026", completionDate: "14 August 2026", duration: "8 weeks", certificateType: "Course Completion", status: "Valid" },
  { certificateId: "VIS-2025-3C71QD", recipientName: "Meera Nair", courseName: "Cybersecurity Essentials for Organizations", skill: "Cybersecurity", issuedBy: "Vistaar Learning", trainer: null, issueDate: "3 March 2025", completionDate: "1 March 2025", duration: "5 weeks", certificateType: "Course Completion", status: "Expired" },
  { certificateId: "VIS-2026-5R08LM", recipientName: "Rohan Verma", courseName: "Leadership Essentials", skill: "Leadership", issuedBy: "Vistaar Learning", trainer: null, issueDate: "9 May 2026", completionDate: "8 May 2026", duration: "6 weeks", certificateType: "Course Completion", status: "Revoked" },
];

export const certificateRegistry = [...fromIssued, ...samples];
