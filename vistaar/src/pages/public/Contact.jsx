import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";

const contacts = [
  { icon: Mail, label: "support@vistaar.gov" },
  { icon: Phone, label: "+91 11 4567 8900" },
  { icon: MapPin, label: "Capacity Building Directorate, New Delhi, India" },
];

const labelCls = "block text-[17px] font-bold mb-2.5";
const fieldCls =
  "focus-ring w-full rounded-2xl border bg-white px-5 text-base text-ink-800 placeholder:text-[#8B93B8] transition-colors focus:border-indigo-400";
const fieldStyle = { borderColor: "#E3E7F5" };

export default function Contact() {
  const { showToast } = useApp();

  const submit = (e) => {
    e.preventDefault();
    showToast("Your message has been sent. We'll get back to you shortly.");
    e.target.reset();
  };

  return (
    <div className="relative overflow-hidden">
      <div aria-hidden className="absolute -left-40 -bottom-40 w-[520px] h-[520px] rounded-full hidden lg:block" style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.35), transparent 72%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
        <div className="pt-2 lg:pt-4">
          <span className="block h-[3px] w-20 rounded-full" style={{ background: "linear-gradient(90deg,#7C3AED,#8B7CF6)" }} />
          <h1 className="font-serif-display font-bold tracking-[-0.02em] leading-[1.05] text-5xl lg:text-[4.2rem] mt-5" style={{ color: "#12206B" }}>
            Get in touch
          </h1>
          <p className="mt-5 text-xl leading-relaxed max-w-md" style={{ color: "#5B6799" }}>
            Questions about programs, partnerships, or platform access? Our team is happy to help.
          </p>

          <div className="mt-10 space-y-5">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-center gap-6">
                <div className="w-[76px] h-[76px] rounded-[22px] flex items-center justify-center shrink-0" style={{ background: "#EDE7FE" }}>
                  <c.icon size={30} strokeWidth={1.8} className="text-indigo-600" />
                </div>
                <p className="font-serif-display text-xl" style={{ color: "#12206B" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[28px] bg-white/90 p-7 lg:p-9 space-y-6" style={{ boxShadow: "0 1px 2px rgba(11,16,32,0.04), 0 24px 48px -24px rgba(60,40,140,0.22)" }}>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full-name" className={labelCls} style={{ color: "#12206B" }}>Full Name</label>
              <input id="full-name" required placeholder="Your name" className={`${fieldCls} h-14`} style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="email" className={labelCls} style={{ color: "#12206B" }}>Email</label>
              <input id="email" type="email" required placeholder="you@example.com" className={`${fieldCls} h-14`} style={fieldStyle} />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className={labelCls} style={{ color: "#12206B" }}>Subject</label>
            <input id="subject" required placeholder="How can we help?" className={`${fieldCls} h-14`} style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="message" className={labelCls} style={{ color: "#12206B" }}>Message</label>
            <textarea id="message" required rows={5} placeholder="Tell us more…" className={`${fieldCls} py-4 resize-y min-h-[150px]`} style={fieldStyle} />
          </div>
          <button
            type="submit"
            className="focus-ring inline-flex items-center justify-center gap-3 rounded-full px-9 h-[68px] font-serif-display font-semibold text-xl text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] w-full sm:w-auto"
            style={{ background: "linear-gradient(90deg,#6D3BF0 0%,#5B8DF5 60%,#4FC3F7 100%)", boxShadow: "0 14px 28px -12px rgba(109,59,240,0.6)" }}
          >
            <Send size={20} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
