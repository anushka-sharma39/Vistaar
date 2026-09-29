// Header illustration for a course card. Drawn on a 320x130 canvas; the art sits on the
// right so the category pill (bottom-left) never covers it.
const W = "#fff";

function Backdrop() {
  return (
    <>
      <g stroke={W} strokeWidth="1" opacity=".18" fill="none">
        <path d="M0 110L150 0M40 130L210 0M100 130L280 0M170 130L320 20" />
      </g>
      <circle cx="60" cy="30" r="46" fill={W} opacity=".10" />
      <circle cx="290" cy="112" r="40" fill={W} opacity=".10" />
      <g fill={W} opacity=".55">
        <circle cx="300" cy="20" r="2" />
        <circle cx="150" cy="18" r="1.6" />
        <circle cx="190" cy="118" r="1.8" />
      </g>
    </>
  );
}

const art = {
  pro: (
    <>
      <circle cx="168" cy="52" r="14" fill="#831843" opacity=".55" />
      <path d="M140 116c2-24 14-34 28-34s26 10 28 34z" fill="#831843" opacity=".55" />
      <rect x="205" y="84" width="84" height="34" rx="5" fill="#831843" opacity=".55" />
      <rect x="211" y="89" width="72" height="24" rx="3" fill={W} opacity=".35" />
      <rect x="230" y="14" width="56" height="40" rx="18" fill={W} opacity=".92" />
      <path d="M244 52l-6 12 16-8z" fill={W} opacity=".92" />
      <g fill="#DB2777"><circle cx="248" cy="34" r="4" /><circle cx="258" cy="34" r="4" /><circle cx="268" cy="34" r="4" /></g>
    </>
  ),
  cyber: (
    <>
      <path d="M236 10l46 16v34c0 26-20 44-46 54-26-10-46-28-46-54V26z" fill="#0F766E" opacity=".55" stroke={W} strokeWidth="4" strokeLinejoin="round" />
      <rect x="220" y="54" width="32" height="26" rx="5" fill={W} />
      <path d="M226 54v-8a10 10 0 0 1 20 0v8" fill="none" stroke={W} strokeWidth="4" />
      <circle cx="236" cy="66" r="3.5" fill="#0D9488" />
      <rect x="146" y="70" width="26" height="4" rx="2" fill={W} opacity=".4" />
      <rect x="146" y="80" width="40" height="4" rx="2" fill={W} opacity=".3" />
    </>
  ),
  leader: (
    <>
      <circle cx="236" cy="34" r="13" fill={W} opacity=".92" />
      <path d="M212 70c0-16 10-22 24-22s24 6 24 22z" fill={W} opacity=".92" />
      <circle cx="196" cy="84" r="10" fill={W} opacity=".55" />
      <path d="M178 112c0-12 8-17 18-17s18 5 18 17z" fill={W} opacity=".55" />
      <circle cx="276" cy="84" r="10" fill={W} opacity=".55" />
      <path d="M258 112c0-12 8-17 18-17s18 5 18 17z" fill={W} opacity=".55" />
      <path d="M270 40l22-22m0 0h-14m14 0v14" stroke="#F0ABFC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  data: (
    <>
      <g fill={W} opacity=".85">
        <rect x="176" y="84" width="16" height="30" rx="3" />
        <rect x="200" y="66" width="16" height="48" rx="3" />
        <rect x="224" y="46" width="16" height="68" rx="3" />
      </g>
      <circle cx="270" cy="50" r="22" fill={W} opacity=".2" stroke={W} strokeWidth="5" />
      <path d="M286 66l16 16" stroke={W} strokeWidth="7" strokeLinecap="round" />
      <path d="M258 54l8-8 8 6 8-10" stroke={W} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  ai: (
    <>
      <g stroke={W} strokeWidth="4" strokeLinecap="round" opacity=".8">
        <path d="M222 22v14M242 22v14M262 22v14M222 96v14M242 96v14M262 96v14M196 50h14M196 66h14M196 82h14M274 50h14M274 66h14M274 82h14" />
      </g>
      <rect x="210" y="36" width="64" height="60" rx="10" fill="#312E81" opacity=".6" stroke={W} strokeWidth="4" />
      <rect x="226" y="52" width="32" height="28" rx="6" fill={W} opacity=".9" />
      <g fill="#4338CA"><circle cx="236" cy="62" r="3" /><circle cx="248" cy="62" r="3" /><circle cx="242" cy="72" r="3" /></g>
    </>
  ),
  digital: (
    <>
      <path d="M200 96a20 20 0 0 1 2-40 28 28 0 0 1 54-6 24 24 0 0 1 4 46z" fill={W} opacity=".92" />
      <path d="M232 90V66m-10 10l10-11 10 11" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="282" cy="30" r="14" fill="none" stroke={W} strokeWidth="6" strokeDasharray="5 4" opacity=".85" />
      <circle cx="282" cy="30" r="5" fill={W} opacity=".85" />
      <rect x="170" y="100" width="70" height="8" rx="4" fill={W} opacity=".3" />
    </>
  ),
  smart: (
    <>
      <g stroke={W} strokeWidth="3" fill="none" opacity=".8" strokeLinecap="round">
        <path d="M190 100h30v-24h26M246 76v-30h30M220 100h60" />
      </g>
      <g fill={W}><circle cx="190" cy="100" r="6" /><circle cx="246" cy="46" r="6" /><circle cx="280" cy="100" r="6" /><circle cx="276" cy="46" r="6" opacity=".7" /></g>
      <rect x="226" y="60" width="40" height="30" rx="6" fill="#075985" opacity=".65" stroke={W} strokeWidth="3" />
      <path d="M236 22a24 24 0 0 1 34 0M242 30a15 15 0 0 1 22 0" stroke={W} strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="253" cy="38" r="3" fill={W} />
    </>
  ),
  green: (
    <>
      <path d="M198 108c-6-40 14-72 58-80 6 40-12 74-58 80z" fill={W} opacity=".9" />
      <path d="M204 104c14-24 28-40 46-60" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M262 112V60" stroke={W} strokeWidth="4" strokeLinecap="round" />
      <path d="M262 60l-4-28M262 60l24 14M262 60l-20 16" stroke={W} strokeWidth="4" strokeLinecap="round" opacity=".85" />
      <circle cx="262" cy="60" r="5" fill={W} />
    </>
  ),
  industry: (
    <>
      <circle cx="232" cy="62" r="34" fill="none" stroke={W} strokeWidth="12" strokeDasharray="10 9" opacity=".85" />
      <circle cx="232" cy="62" r="26" fill="#0F172A" opacity=".45" stroke={W} strokeWidth="5" />
      <circle cx="232" cy="62" r="9" fill={W} />
      <path d="M270 100l20-30 12 8" stroke={W} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".8" />
      <circle cx="304" cy="79" r="5" fill={W} opacity=".8" />
    </>
  ),
};

export default function CourseArt({ kind }) {
  return (
    <svg viewBox="0 0 320 130" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
      <Backdrop />
      {art[kind] || art.leader}
    </svg>
  );
}
