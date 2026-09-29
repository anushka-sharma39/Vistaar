export const demoAccounts = {
  trainee: {
    id: "u-tr-201",
    role: "trainee",
    name: "Aditi Rao",
    email: "aditi.rao@vistaar.gov",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    avatar: "AR",
    designation: "Program Associate",
    department: "Ministry of Digital Affairs",
    joined: "March 2024",
    about:
      "Program associate working on digital governance initiatives, building technical and leadership capabilities to support policy implementation teams.",
    qualifications: [
      { degree: "M.A. Public Policy", institute: "Jawaharlal Nehru University", year: "2021" },
      { degree: "B.A. Economics", institute: "Delhi University", year: "2019" },
    ],
    experience: [
      { role: "Program Associate", org: "Ministry of Digital Affairs", period: "2023 — Present" },
      { role: "Research Assistant", org: "Centre for Policy Research", period: "2021 — 2023" },
    ],
    skills: [
      { name: "Artificial Intelligence", level: "Advanced", value: 85 },
      { name: "Python", level: "Advanced", value: 80 },
      { name: "Data Analytics", level: "Intermediate", value: 65 },
      { name: "Leadership", level: "Intermediate", value: 60 },
      { name: "Public Communication", level: "Advanced", value: 78 },
    ],
    interests: ["Digital Governance", "AI Policy", "Sustainability", "Data Visualization", "Public Speaking"],
  },
  trainer: {
    id: "u-tn-101",
    role: "trainer",
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@vistaar.gov",
    phone: "+91 98111 22334",
    location: "Bengaluru, India",
    avatar: "AS",
    designation: "Principal Trainer, AI & Data Systems",
    department: "National Institute of Digital Learning",
    joined: "January 2019",
    about:
      "Dr. Sharma leads applied AI curricula for public-sector capacity building, translating research into practitioner-ready training used across national training programs.",
    qualifications: [
      { degree: "Ph.D. in Computer Science", institute: "IIT Delhi", year: "2015" },
      { degree: "M.Tech, Artificial Intelligence", institute: "IIT Bombay", year: "2011" },
    ],
    experience: [
      { role: "Principal Trainer", org: "National Institute of Digital Learning", period: "2019 — Present" },
      { role: "Data Science Lead", org: "TechGov Analytics", period: "2015 — 2019" },
    ],
    expertise: ["Machine Learning", "Deep Learning", "Python", "Data Analytics"],
    skills: [
      { name: "Machine Learning", level: "Expert", value: 95 },
      { name: "Python", level: "Expert", value: 92 },
      { name: "Curriculum Design", level: "Advanced", value: 84 },
      { name: "Public Speaking", level: "Advanced", value: 80 },
    ],
    certifications: ["Certified AI Practitioner", "Google Cloud ML Engineer"],
  },
  admin: {
    id: "u-ad-001",
    role: "admin",
    name: "Vikram Singh",
    email: "vikram.singh@vistaar.gov",
    phone: "+91 98220 11009",
    location: "New Delhi, India",
    avatar: "VS",
    designation: "Platform Administrator",
    department: "Capacity Building Directorate",
    joined: "August 2018",
  },
};

export const allUsers = [
  { id: "u-1001", name: "Aditi Rao", email: "aditi.rao@vistaar.gov", role: "trainee", registered: "2024-03-12", status: "Active", courses: 4 },
  { id: "u-1002", name: "Sameer Khan", email: "sameer.khan@vistaar.gov", role: "trainee", registered: "2024-04-02", status: "Active", courses: 2 },
  { id: "u-1003", name: "Neha Kapoor", email: "neha.kapoor@vistaar.gov", role: "trainee", registered: "2024-05-19", status: "Pending", courses: 0 },
  { id: "u-1004", name: "Rahul Bhatt", email: "rahul.bhatt@vistaar.gov", role: "trainee", registered: "2024-06-08", status: "Active", courses: 3 },
  { id: "u-1005", name: "Sanya Malhotra", email: "sanya.malhotra@vistaar.gov", role: "trainee", registered: "2024-06-21", status: "Suspended", courses: 1 },
  { id: "u-2001", name: "Dr. Ananya Sharma", email: "ananya.sharma@vistaar.gov", role: "trainer", registered: "2019-01-14", status: "Active", courses: 6 },
  { id: "u-2002", name: "Rohan Verma", email: "rohan.verma@vistaar.gov", role: "trainer", registered: "2020-02-20", status: "Active", courses: 5 },
  { id: "u-2003", name: "Dr. Meera Iyer", email: "meera.iyer@vistaar.gov", role: "trainer", registered: "2018-11-03", status: "Active", courses: 7 },
  { id: "u-2004", name: "Karan Mehta", email: "karan.mehta@vistaar.gov", role: "trainer", registered: "2022-09-10", status: "Pending", courses: 3 },
  { id: "u-1006", name: "Ishaan Gupta", email: "ishaan.gupta@vistaar.gov", role: "trainee", registered: "2024-07-02", status: "Active", courses: 2 },
  { id: "u-1007", name: "Divya Menon", email: "divya.menon@vistaar.gov", role: "trainee", registered: "2024-07-15", status: "Pending", courses: 0 },
];

export const pendingApprovals = allUsers.filter((u) => u.status === "Pending");
