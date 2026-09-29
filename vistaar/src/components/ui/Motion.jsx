import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";

export function Reveal({ children, delay = 0, y = 18, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Animates numbers like "3,200", "84%", "86h", "1,500+" when scrolled into view
export function CountUp({ value, duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const str = String(value);
  const m = str.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !m) return;
    const c = animate(0, parseFloat(m[2].replace(/,/g, "")), { duration, ease: "easeOut", onUpdate: setN });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, str]);

  if (!m) return <span ref={ref}>{str}</span>;
  const dec = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const shown = m[2].includes(",") ? Math.round(n).toLocaleString("en-US") : n.toFixed(dec);
  return <span ref={ref}>{m[1]}{shown}{m[3]}</span>;
}
