import { SIGNATURES } from "./certificateSignatures";
import LOGO_URL from "../assets/vistaar-logo.png?inline";

/* Vistaar "Certificate of Completion" template.
 * One SVG (1536 x 1024) is the single source of truth: it is shown in the
 * preview and converted to vector PDF, so the two always match. */

export const CERT_W = 1536;
export const CERT_H = 1024;
export const ORG = "Vistaar";

export const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NAVY = "#0B1B5C";
const INK = "#1E2A78";
const INDIGO = "#5B5BF0";

const star = (cx, cy, r, fill) =>
  `<path d="M${cx},${cy - r} C${cx + r * 0.12},${cy - r * 0.12} ${cx + r * 0.12},${cy - r * 0.12} ${cx + r},${cy} C${cx + r * 0.12},${cy + r * 0.12} ${cx + r * 0.12},${cy + r * 0.12} ${cx},${cy + r} C${cx - r * 0.12},${cy + r * 0.12} ${cx - r * 0.12},${cy + r * 0.12} ${cx - r},${cy} C${cx - r * 0.12},${cy - r * 0.12} ${cx - r * 0.12},${cy - r * 0.12} ${cx},${cy - r} Z" fill="${fill}"/>`;

// Simple line icons drawn on a 24-unit grid, scaled to `s` px, centred at (cx, cy).
const icon = (kind, cx, cy, s = 30) => {
  const k = s / 24;
  const g = (inner) => `<g transform="translate(${cx - s / 2} ${cy - s / 2}) scale(${k})" fill="none" stroke="${INDIGO}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  if (kind === "book")
    return g('<path d="M12 6.5C10 4.8 7 4 3.5 4.3V18.5C7 18.2 10 19 12 20.7C14 19 17 18.2 20.5 18.5V4.3C17 4 14 4.8 12 6.5Z"/><path d="M12 6.5V20.7"/>');
  if (kind === "id")
    return g('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><circle cx="8.5" cy="10.5" r="2"/><path d="M5.3 16C5.8 14.4 7 13.7 8.5 13.7C10 13.7 11.2 14.4 11.7 16"/><path d="M14.5 9.5H18.5M14.5 13H18.5"/>');
  return g('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10H21M8 3V7M16 3V7"/><path d="M8 14H8.01M12 14H12.01M16 14H16.01M8 17.5H8.01M12 17.5H12.01" stroke-width="2.6"/>');
};

// Shrink long strings so they never overflow their slot.
const fit = (text, base, maxWidth, perChar) => Math.min(base, Math.floor(maxWidth / (Math.max(String(text).length, 1) * perChar)));

export function certificateSvg({ name, course, courseId, certId, issued }) {
  const nameSize = fit(name, 112, 760, 0.42);
  const courseSize = fit(course, 40, 1120, 0.62);
  const sigBlock = (cx, label, sig) => `
    <path d="${sig}" fill="${NAVY}" fill-rule="evenodd"/>
    <line x1="${cx - 100}" y1="879" x2="${cx + 100}" y2="879" stroke="#5B6CF0" stroke-width="1.6"/>
    <text x="${cx}" y="911" text-anchor="middle" font-family="CertSans" font-weight="700" font-size="19" fill="${NAVY}">${label}</text>
    <text x="${cx}" y="938" text-anchor="middle" font-family="CertSans" font-size="18" fill="${INDIGO}">${ORG}</text>`;
  const info = (x, ic, label, labelW, value) => `
    <circle cx="${x}" cy="649" r="33" fill="${ic === "id" ? "#DBE7FE" : "#E4DDFB"}"/>
    ${icon(ic, x, 649, 31)}
    <text x="${x + 53}" y="643" textLength="${labelW}" lengthAdjust="spacing" font-family="CertSans" font-size="16" fill="${INDIGO}">${label}</text>
    <text x="${x + 53}" y="677" font-family="CertSans" font-size="24" fill="${NAVY}">${esc(value)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CERT_W} ${CERT_H}" width="${CERT_W}" height="${CERT_H}">
  <defs>
    <linearGradient id="cc-wave-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#60A5FA"/></linearGradient>
    <linearGradient id="cc-wave-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#93C5FD"/><stop offset="1" stop-color="#C4B5FD"/></linearGradient>
    <linearGradient id="cc-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3B82F6"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient>
  </defs>
  <rect width="${CERT_W}" height="${CERT_H}" fill="#F6F5F1"/>

  <!-- top-left waves -->
  <path d="M0,0 L400,0 C350,55 270,84 190,90 C100,98 30,160 0,282 Z" fill="url(#cc-wave-b)"/>
  <path d="M0,0 L372,0 C320,48 240,74 165,76 C80,80 18,130 0,215 Z" fill="url(#cc-wave-a)"/>
  <path d="M0,0 L210,0 C170,30 110,48 60,58 C25,66 8,90 0,120 Z" fill="#8B7CF8" fill-opacity="0.6"/>
  <!-- bottom-right waves -->
  <path d="M1536,1024 L1100,1024 C1160,985 1250,975 1330,960 C1420,943 1500,860 1536,672 Z" fill="url(#cc-wave-b)"/>
  <path d="M1536,1024 L1180,1024 C1240,995 1320,990 1395,972 C1470,955 1520,900 1536,790 Z" fill="url(#cc-wave-a)"/>
  <path d="M1536,1024 L1330,1024 C1370,1000 1440,990 1490,960 C1520,940 1532,915 1536,880 Z" fill="#6D5DF6" fill-opacity="0.7"/>

  <!-- frame -->
  <g stroke="#5B6CF0" stroke-width="1.8" fill="none">
    <path d="M44,44 H1492 V468"/><path d="M1492,562 V978 H44 V468"/><path d="M44,375 V44"/>
  </g>
  <g fill="#6366F1">
    <circle cx="43" cy="405" r="5"/><circle cx="43" cy="427" r="5"/><circle cx="43" cy="449" r="5" fill="#8B5CF6"/>
    <circle cx="1491" cy="495" r="5"/><circle cx="1491" cy="517" r="5"/><circle cx="1491" cy="539" r="5" fill="#8B5CF6"/>
  </g>
  ${star(44, 44, 18, INDIGO)}
  ${star(1492, 978, 18, INDIGO)}

  <!-- logo -->
  <image href="${LOGO_URL}" x="92" y="62" width="229" height="155" preserveAspectRatio="xMidYMid meet"/>

  <!-- tagline -->
  <text x="1257" y="111" font-family="CertSerif" font-style="italic" font-size="23" fill="${NAVY}">Better Skills.</text>
  <text x="1257" y="141" font-family="CertSerif" font-style="italic" font-size="23" fill="${NAVY}">A Brighter Tomorrow.</text>
  <line x1="1257" y1="161" x2="1318" y2="161" stroke="#5B6CF0" stroke-width="2"/>

  <!-- heading -->
  <text x="768" y="252" text-anchor="middle" font-family="CertSerif" font-weight="700" font-size="104" fill="${NAVY}">CERTIFICATE</text>
  <line x1="382" y1="294" x2="515" y2="294" stroke="#5B6CF0" stroke-width="1.8"/>
  <line x1="1020" y1="294" x2="1155" y2="294" stroke="#5B6CF0" stroke-width="1.8"/>
  <text x="551" y="306" textLength="439" lengthAdjust="spacing" font-family="CertSans" font-weight="700" font-size="36" fill="${NAVY}">OF COMPLETION</text>
  <text x="594" y="357" textLength="344" lengthAdjust="spacing" font-family="CertSans" font-size="20" fill="${INK}">THIS IS TO CERTIFY THAT</text>

  <!-- recipient -->
  <text x="768" y="452" text-anchor="middle" font-family="CertScript" font-size="${nameSize}" fill="${NAVY}">${esc(name)}</text>
  <line x1="381" y1="480" x2="745" y2="480" stroke="#5B6CF0" stroke-width="1.6"/>
  <line x1="792" y1="480" x2="1155" y2="480" stroke="#5B6CF0" stroke-width="1.6"/>
  ${star(768, 480, 17, INDIGO)}
  <text x="768" y="535" text-anchor="middle" font-family="CertSans" font-size="26" fill="${INK}">has successfully completed the course</text>
  <text x="768" y="578" text-anchor="middle" font-family="CertSans" font-weight="700" font-size="${courseSize}" fill="${NAVY}">${esc(course)}</text>

  <!-- meta row -->
  ${info(342, "book", "COURSE ID", 101, courseId)}
  <line x1="585" y1="622" x2="585" y2="682" stroke="#5B6CF0" stroke-width="1.4"/>
  ${info(664, "id", "CERTIFICATE ID", 145, certId)}
  <line x1="960" y1="622" x2="960" y2="682" stroke="#5B6CF0" stroke-width="1.4"/>
  ${info(1045, "cal", "ISSUE DATE", 107, issued)}

  <text x="771" y="744" text-anchor="middle" font-family="CertSans" font-size="19.5" fill="${INK}">This certificate acknowledges your dedication, hard work and commitment</text>
  <text x="771" y="772" text-anchor="middle" font-family="CertSans" font-size="19.5" fill="${INK}">to building a better future through learning.</text>

  <!-- signatures -->
  ${sigBlock(420, "Head - Courses", SIGNATURES.head)}
  <line x1="592" y1="845" x2="592" y2="930" stroke="#5B6CF0" stroke-width="1.2"/>
  ${sigBlock(763, "Founder &amp; CEO", SIGNATURES.ceo)}
  <line x1="930" y1="845" x2="930" y2="930" stroke="#5B6CF0" stroke-width="1.2"/>
  ${sigBlock(1098, "Trainer", SIGNATURES.trainer)}

  <g transform="translate(1352 835) rotate(-24)" fill="${INDIGO}" font-family="CertScript" font-size="44" text-anchor="middle">
    <text x="0" y="-36">Learn</text><text x="10" y="4">Build</text><text x="20" y="44">Grow</text>
  </g>
</svg>`;
}
