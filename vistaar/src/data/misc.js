export const certificates = [
  {
    id: "CC-2026-8841",
    title: "Foundations of Machine Learning",
    course: "Foundations of Machine Learning",
    trainee: "Aditi Rao",
    issued: "12 Aug 2026",
    credentialId: "CC-ML-8841-2026",
    status: "Issued",
  },
  {
    id: "CC-2026-7723",
    title: "Cybersecurity Essentials for Organizations",
    course: "Cybersecurity Essentials for Organizations",
    trainee: "Aditi Rao",
    issued: "2 Jun 2026",
    credentialId: "CC-CY-7723-2026",
    status: "Issued",
  },
  {
    id: "CC-2026-6690",
    title: "Professional Communication & Workplace Effectiveness",
    course: "Professional Communication & Workplace Effectiveness",
    trainee: "Aditi Rao",
    issued: "20 Mar 2026",
    credentialId: "CC-PD-6690-2026",
    status: "Issued",
  },
  {
    id: "CC-2026-9012",
    title: "Applied Data Analytics for Decision Making",
    course: "Applied Data Analytics for Decision Making",
    trainee: "Sameer Khan",
    issued: "—",
    credentialId: "—",
    status: "Pending",
  },
  {
    id: "CC-2025-4410",
    title: "Digital Transformation Strategy",
    course: "Digital Transformation Strategy",
    trainee: "Rahul Bhatt",
    issued: "14 Nov 2025",
    credentialId: "CC-DT-4410-2025",
    status: "Expiring Soon",
  },
];

export const notifications = [
  { id: 1, type: "assessment", title: "Assessment deadline approaching", detail: "\u201cMachine Learning Fundamentals Quiz\u201d is due in 3 days.", time: "2h ago", unread: true },
  { id: 2, type: "certificate", title: "Certificate issued", detail: "Your certificate for Cybersecurity Essentials is ready to download.", time: "1d ago", unread: true },
  { id: 3, type: "announcement", title: "New announcement from Admin", detail: "Platform maintenance scheduled for this weekend.", time: "2d ago", unread: true },
  { id: 4, type: "course", title: "New course available", detail: "\u201cDeep Learning with Neural Networks\u201d has just been published.", time: "3d ago", unread: false },
  { id: 5, type: "course", title: "Course update", detail: "A new module was added to Applied Data Analytics.", time: "5d ago", unread: false },
];

export const resources = [
  { id: "r-1", name: "Machine Learning — Week 1 Lecture Recording", type: "Video", size: "486 MB", uploaded: "3 Aug 2026", course: "Foundations of Machine Learning", visibility: "All Trainees" },
  { id: "r-2", name: "Data Analytics Slide Deck — Module 2", type: "Presentation", size: "12 MB", uploaded: "28 Jul 2026", course: "Applied Data Analytics", visibility: "Enrolled Only" },
  { id: "r-3", name: "Cybersecurity Case Study Compendium", type: "Document", size: "4.2 MB", uploaded: "15 Jul 2026", course: "Cybersecurity Essentials", visibility: "All Trainees" },
  { id: "r-4", name: "Leadership Frameworks Reference Sheet", type: "Reference", size: "1.1 MB", uploaded: "9 Jul 2026", course: "Strategic Leadership", visibility: "Enrolled Only" },
  { id: "r-5", name: "Python for ML — Practical Session Recording", type: "Video", size: "612 MB", uploaded: "2 Jul 2026", course: "Foundations of Machine Learning", visibility: "All Trainees" },
  { id: "r-6", name: "Digital Transformation Roadmap Template", type: "Document", size: "820 KB", uploaded: "20 Jun 2026", course: "Digital Transformation Strategy", visibility: "Enrolled Only" },
];

export const competencyMap = [
  {
    subject: "Artificial Intelligence",
    required: ["Machine Learning", "Deep Learning", "Python", "Data Analytics"],
    trainers: [
      { name: "Dr. Ananya Sharma", match: 95 },
      { name: "Karan Mehta", match: 71 },
      { name: "Priya Deshmukh", match: 58 },
    ],
  },
  {
    subject: "Cybersecurity",
    required: ["Network Security", "Risk Management", "Ethical Hacking", "Cloud Security"],
    trainers: [
      { name: "Rohan Verma", match: 97 },
      { name: "Karan Mehta", match: 62 },
    ],
  },
  {
    subject: "Leadership & Management",
    required: ["Strategic Leadership", "Change Management", "Communication", "Team Building"],
    trainers: [
      { name: "Dr. Meera Iyer", match: 96 },
      { name: "Priya Deshmukh", match: 74 },
    ],
  },
  {
    subject: "Sustainability",
    required: ["Renewable Energy", "Sustainable Design", "Environmental Systems"],
    trainers: [
      { name: "Arjun Nair", match: 93 },
      { name: "Karan Mehta", match: 48 },
    ],
  },
  {
    subject: "Digital Skills",
    required: ["Digital Strategy", "Process Automation", "Change Enablement"],
    trainers: [
      { name: "Priya Deshmukh", match: 92 },
      { name: "Dr. Ananya Sharma", match: 66 },
    ],
  },
];

export const competencyCategories = [
  "Technical Skills",
  "Management",
  "Leadership",
  "Digital Skills",
  "Sustainability",
  "AI & Data",
  "Communication",
];

export const announcements = [
  {
    id: "an-1",
    title: "Platform maintenance scheduled for this weekend",
    body: "VISTAAR will undergo scheduled maintenance on Saturday, 3 Oct, from 11:00 PM to 2:00 AM IST. Learning progress is saved automatically.",
    date: "24 Sep 2026",
    audience: "All Users",
  },
  {
    id: "an-2",
    title: "New course: Deep Learning with Neural Networks",
    body: "A new advanced AI course led by Dr. Ananya Sharma is now live in the catalog, covering neural network architectures and deployment.",
    date: "20 Sep 2026",
    audience: "Trainees",
  },
  {
    id: "an-3",
    title: "Q3 certification milestones announced",
    body: "Congratulations to the 340 learners who earned certifications this quarter across AI, Cybersecurity, and Leadership tracks.",
    date: "15 Sep 2026",
    audience: "All Users",
  },
];

export const recentActivity = [
  { id: 1, type: "enroll", text: "You enrolled in Deep Learning with Neural Networks", time: "2 hours ago" },
  { id: 2, type: "assessment", text: "Completed \u201cData Analytics Mid-Course Check\u201d — scored 84%", time: "1 day ago" },
  { id: 3, type: "certificate", text: "Earned certificate for Cybersecurity Essentials", time: "3 days ago" },
  { id: 4, type: "feedback", text: "Submitted feedback for Applied Data Analytics", time: "5 days ago" },
  { id: 5, type: "enroll", text: "You enrolled in Foundations of Machine Learning", time: "1 week ago" },
];

export const trainerActivity = [
  { id: 1, type: "enroll", text: "Rahul Bhatt enrolled in Foundations of Machine Learning", time: "1 hour ago" },
  { id: 2, type: "submission", text: "Sanya Malhotra submitted the Data Analytics assessment", time: "4 hours ago" },
  { id: 3, type: "feedback", text: "New feedback received on Foundations of Machine Learning (4.8★)", time: "1 day ago" },
  { id: 4, type: "completion", text: "Ishaan Gupta completed Module 3 of Foundations of Machine Learning", time: "2 days ago" },
];
