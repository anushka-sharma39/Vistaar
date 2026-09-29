import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Check, GraduationCap, TrendingUp, Target } from "lucide-react";
import photo from "../../../assets/hero-photo.jpg";
import av1 from "../../../assets/av1.jpg";
import av2 from "../../../assets/av2.jpg";
import av3 from "../../../assets/av3.jpg";
import av4 from "../../../assets/av4.jpg";
import av5 from "../../../assets/av5.jpg";

const ease = [0.22, 1, 0.36, 1];
const rise = (d = 0) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: d, ease } });
const NAVY = "#14113C";
const VIOLET = "#8B6CF0";
const DEEP = "#4633B0";

function Leaf({ className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 170" fill="none" aria-hidden>
      <path d="M50 168C50 120 56 70 74 10" stroke="#7FA98A" strokeWidth="2" strokeLinecap="round" />
      {[[62, 22, -60], [56, 52, -150], [66, 62, -20], [58, 96, -160], [60, 106, -15], [54, 138, -150]].map(([x, y, r], i) => (
        <path key={i} d="M0 0C10 -14 30 -16 44 0C30 14 10 14 0 0Z" fill={i % 2 ? "#8DB597" : "#7FA98A"} transform={`translate(${x} ${y}) rotate(${r})`} />
      ))}
    </svg>
  );
}

const STACK = [
  { t: "LEARN", c: "#DCD0FA", Icon: GraduationCap, r: -3, x: 0 },
  { t: "GROW", c: "#CBD7F5", Icon: TrendingUp, r: 2, x: 2 },
  { t: "ACHIEVE", c: "#CFE3D2", Icon: Target, r: -3, x: 4 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden -mt-[76px] pt-[76px]" style={{ background: "#FBF8F2" }}>
      {/* soft background shapes */}
      <div className="absolute -left-24 -top-32 w-[380px] h-[300px] rounded-[50%] blur-[2px] pointer-events-none" style={{ background: "#ECE6FB" }} aria-hidden />
      <div className="absolute -right-28 top-10 w-[300px] h-[300px] rounded-[45%] pointer-events-none hidden lg:block" style={{ background: "#F0EBFC" }} aria-hidden />
      <div className="absolute -right-24 -bottom-24 w-[300px] h-[260px] rounded-[50%] pointer-events-none hidden lg:block" style={{ background: "#F1ECFC" }} aria-hidden />
      <Leaf className="absolute -left-4 bottom-2 w-24 h-40 hidden lg:block rotate-[8deg]" />

      <div className="relative max-w-[1600px] mx-auto px-5 lg:px-[6.6%] pt-12 pb-16 lg:pt-14 lg:pb-14 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center">
        {/* Copy */}
        <div>
          <motion.h1 {...rise(0)} className="font-serif-display font-bold tracking-[-0.025em] leading-[1.06] text-[2.8rem] sm:text-6xl lg:text-[4.4rem]" style={{ color: NAVY }}>
            Build Skills.
            <span className="block italic" style={{ color: VIOLET }}>Empower People.</span>
            Strengthen
            <span className="block">Organizations.</span>
          </motion.h1>

          <motion.p {...rise(0.12)} className="font-sans text-[1.15rem] mt-8 max-w-[31rem] leading-[1.6]" style={{ color: "#6E6D97" }}>
            A centralized digital platform for learning, training, competency development and organizational capacity building.
          </motion.p>

          <motion.div {...rise(0.2)} className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/courses" className="focus-ring group inline-flex items-center gap-3 rounded-full px-9 py-4 font-sans font-medium text-[1.05rem] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]" style={{ background: DEEP, boxShadow: "0 12px 24px -10px rgba(70,51,176,.6)" }}>
              Explore Courses <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/signup" className="focus-ring group inline-flex items-center gap-3 rounded-full px-8 py-4 font-sans font-semibold text-[1.05rem] bg-transparent transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97]" style={{ color: DEEP, border: "1px solid #C9BCF3" }}>
              <PlayCircle size={24} strokeWidth={1.5} /> Get Started
            </Link>
          </motion.div>

          <motion.div {...rise(0.28)} className="flex items-center gap-5 mt-12">
            <div className="flex -space-x-2.5">
              {[av1, av2, av3, av4, av5].map((a, i) => <img key={i} src={a} alt="" width="52" height="52" className="w-[52px] h-[52px] rounded-full object-cover ring-2 ring-white shadow-sm" />)}
            </div>
            <div className="w-px h-12" style={{ background: "#D9D3EE" }} aria-hidden />
            <div>
              <p className="font-sans font-semibold text-lg leading-tight" style={{ color: DEEP }}>500+ learners</p>
              <p className="font-sans text-[0.95rem] mt-1 leading-tight" style={{ color: "#8C8BAE" }}>already building skills</p>
            </div>
          </motion.div>
        </div>

        {/* Collage: sizes use container-width units so it scales as one piece */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease }} className="relative mx-auto w-full max-w-[720px] aspect-[740/700]" style={{ containerType: "inline-size" }}>
          {/* photo frame */}
          <figure className="absolute bg-white rotate-[-3deg]" style={{ left: "2%", top: "6.5%", width: "83%", height: "66%", padding: "2.4cqw", borderRadius: "1.2cqw", boxShadow: "0 24px 50px -24px rgba(30,27,75,.35)" }}>
            <img src={photo} alt="Four learners gathered around a laptop, smiling" className="w-full h-full object-cover" style={{ borderRadius: ".5cqw", objectPosition: "50% 35%" }} />
          </figure>

          {/* sticky note */}
          <div className="absolute rotate-[3deg]" style={{ left: "61.5%", top: "2%", width: "37%", height: "20%", background: "#DDD1FB", boxShadow: "0 10px 22px -12px rgba(76,29,149,.35)", borderRadius: ".4cqw" }}>
            <span className="absolute -top-[2.4cqw] left-[24%] w-[28%] h-[3.6cqw] rotate-[-1deg]" style={{ background: "#B9A5F2", opacity: 0.85 }} aria-hidden />
            <p className="font-hand text-[#2A2358] absolute inset-0 flex items-center px-[7%] leading-[1.25]" style={{ fontSize: "4.1cqw" }}>
              <span>Better Skills<br />Brighter Futures <span className="align-middle">☺</span></span>
            </p>
          </div>

          {/* checklist */}
          <div className="absolute rotate-[-6deg] bg-white" style={{ left: "0.5%", top: "71%", width: "45%", height: "26%", borderRadius: "1cqw", boxShadow: "0 14px 28px -16px rgba(30,27,75,.35)", border: "1px solid #EEEAF8", backgroundImage: "linear-gradient(rgba(140,130,200,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(140,130,200,.13) 1px, transparent 1px)", backgroundSize: "2.6cqw 2.6cqw" }}>
            <ul className="font-hand absolute inset-0 flex flex-col justify-center gap-[1.2cqw] px-[6%]" style={{ fontSize: "3.6cqw", color: "#2A2358" }}>
              {["Learn new skills", "Gain confidence", "Build your future"].map((t) => (
                <li key={t} className="flex items-center gap-[2.4cqw]">
                  <span className="grid place-items-center shrink-0 rounded-[3px] border-[1.5px]" style={{ width: "2.8cqw", height: "2.8cqw", borderColor: DEEP, color: DEEP }} aria-hidden><Check strokeWidth={3} style={{ width: "2cqw", height: "2cqw" }} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* plant */}
          <Leaf className="absolute hidden sm:block" style={{ left: "85%", top: "44%", width: "14%", transform: "rotate(6deg)" }} />

          {/* LEARN / GROW / ACHIEVE */}
          <div className="absolute flex flex-col" style={{ left: "62%", top: "71%", width: "33%", gap: ".6cqw" }} aria-hidden>
            {STACK.map(({ t, c, Icon, r, x }) => (
              <div key={t} className="flex items-center font-hand tracking-wider" style={{ height: "7.6cqw", marginLeft: `${x}cqw`, paddingLeft: "3.2cqw", gap: "2.4cqw", fontSize: "3.6cqw", background: c, color: "#4B4A7A", borderRadius: "3.8cqw", transform: `rotate(${r}deg)`, boxShadow: "0 8px 16px -10px rgba(30,27,75,.35)" }}>
                <Icon strokeWidth={1.8} style={{ width: "4.2cqw", height: "4.2cqw" }} />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
