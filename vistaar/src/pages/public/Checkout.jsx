import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, BadgeCheck, Building2, CheckCircle2, ChevronDown, Clock, CreditCard, Lock, RefreshCw,
  ShieldCheck, Smartphone, User, XCircle, AlertCircle, Loader2, Landmark, Copy,
} from "lucide-react";
import { getCourseById } from "../../data/courses";
import { getCoursePricing, formatINR } from "../../data/pricing";
import { getCourseTheme } from "../../components/courses/courseTheme";
import CourseArt from "../../components/courses/CourseArt";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Breadcrumb } from "../../components/ui/States";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

/* ------------------------------------------------------------------ */
/* Simulation only — no gateway is contacted and nothing sensitive is  */
/* stored. Outcomes are deterministic so every state can be demoed:    */
/*   Card  : number ending 0002 is declined                            */
/*   UPI   : an ID containing "fail" is declined                       */
/*   NetBanking : "Cancel" on the simulated bank page fails            */
/* ------------------------------------------------------------------ */

const METHODS = [
  { id: "upi", label: "UPI", hint: "Google Pay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay, Amex", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", hint: "All major Indian banks", icon: Landmark },
];

const UPI_APPS = [
  { id: "gpay", label: "Google Pay", short: "G", color: "#4285F4", handles: ["@okhdfcbank", "@okicici", "@oksbi"] },
  { id: "phonepe", label: "PhonePe", short: "Pe", color: "#5F259F", handles: ["@ybl", "@ibl", "@axl"] },
  { id: "paytm", label: "Paytm", short: "P", color: "#00B9F1", handles: ["@paytm", "@ptyes", "@pthdfc"] },
];

const BANKS = [
  "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank",
  "Bank of Baroda", "Canara Bank", "Union Bank of India", "Yes Bank", "IndusInd Bank", "IDFC FIRST Bank",
  "Bank of India", "Indian Bank", "Federal Bank",
];
const POPULAR_BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];

/* ---------------------------- validators --------------------------- */

const luhn = (digits) => {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (alt) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const cardBrand = (digits) => {
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^(60|65|81|82|508)/.test(digits)) return "RuPay";
  return null;
};

const formatCardNumber = (raw) => {
  const d = raw.replace(/\D/g, "").slice(0, 19);
  if (/^3[47]/.test(d)) {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  }
  return d.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (raw, prev) => {
  let d = raw.replace(/\D/g, "").slice(0, 4);
  if (d.length === 1 && Number(d) > 1) d = `0${d}`;
  if (d.length >= 3) return `${d.slice(0, 2)}/${d.slice(2)}`;
  // keep the slash if the user just typed the 2nd digit (but let backspace remove it)
  if (d.length === 2 && raw.length >= (prev?.length || 0)) return `${d}/`;
  return d;
};

function validateCard({ number, name, expiry, cvv }) {
  const e = {};
  const digits = number.replace(/\D/g, "");
  const brand = cardBrand(digits);
  if (!digits) e.number = "Enter your card number.";
  else if (digits.length < 13 || (brand === "Amex" && digits.length !== 15)) e.number = "Card number looks incomplete.";
  else if (!luhn(digits)) e.number = "This card number isn't valid. Please check and try again.";

  if (!name.trim()) e.name = "Enter the name printed on your card.";
  else if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name.trim())) e.name = "Use letters only (e.g. Aditi Rao).";

  const m = /^(\d{2})\/(\d{2})$/.exec(expiry);
  if (!expiry) e.expiry = "Enter the expiry date.";
  else if (!m) e.expiry = "Use the MM/YY format.";
  else {
    const mm = Number(m[1]);
    const yy = 2000 + Number(m[2]);
    const now = new Date();
    if (mm < 1 || mm > 12) e.expiry = "Month must be between 01 and 12.";
    else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1)) e.expiry = "This card has expired.";
    else if (yy > now.getFullYear() + 20) e.expiry = "Expiry year looks too far ahead.";
  }

  const cvvLen = brand === "Amex" ? 4 : 3;
  if (!cvv) e.cvv = "Enter the CVV.";
  else if (!/^\d+$/.test(cvv) || cvv.length !== cvvLen) e.cvv = `CVV must be ${cvvLen} digits.`;
  return e;
}

const UPI_RE = /^[a-zA-Z0-9._-]{2,64}@[a-zA-Z]{2,32}$/;
function validateUpi(id) {
  const v = id.trim();
  if (!v) return "Enter your UPI ID (e.g. name@okhdfcbank).";
  if (!v.includes("@")) return "A UPI ID needs an @handle, like name@ybl.";
  if (!UPI_RE.test(v)) return "This UPI ID doesn't look right. Check for typos or spaces.";
  return "";
}

const newTxnId = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VST${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${rand}`;
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------ pieces ----------------------------- */

function Field({ label, error, hint, children, htmlFor, right }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-700">{label}</label>
        {right}
      </div>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600"><AlertCircle size={13} className="mt-px shrink-0" />{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}

const inputCls = (err) =>
  `focus-ring w-full rounded-xl border ${err ? "border-red-300 bg-red-50/30" : "border-ink-100 hover:border-indigo-200"} bg-white py-3 px-3.5 text-sm text-ink-800 placeholder:text-ink-300 transition-colors focus:border-indigo-400`;

function SecureNote({ className = "" }) {
  return (
    <p className={`flex items-center justify-center gap-1.5 text-xs text-ink-500 ${className}`}>
      <Lock size={13} className="text-emerald-600" /> 100% Secure Payment · 256-bit encrypted
    </p>
  );
}

function PayButton({ amount, disabled, onClick, label }) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={disabled} onClick={onClick} icon={Lock}>
      {label || `Pay ${formatINR(amount)}`}
    </Button>
  );
}

function OrderSummary({ course, pricing, theme, locked }) {
  return (
    <Card className="!p-0 overflow-hidden lg:sticky lg:top-24">
      <div className="relative h-[112px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.to} 100%)` }}>
        <CourseArt kind={theme.art} />
      </div>
      <div className="p-5 sm:p-6">
        <Badge tone="indigo">{course.category}</Badge>
        <h2 className="mt-2.5 font-display font-bold text-lg leading-snug text-ink-900">{course.title}</h2>
        <div className="mt-3 space-y-1.5 text-sm text-ink-500">
          <p className="flex items-center gap-2"><User size={15} className="shrink-0" /> {course.trainer}</p>
          <p className="flex items-center gap-2"><Clock size={15} className="shrink-0" /> {course.duration} · {course.hours} hours</p>
        </div>

        <dl className="mt-5 pt-5 border-t border-ink-100 space-y-2.5 text-sm">
          <div className="flex justify-between"><dt className="text-ink-500">Original price</dt><dd className="text-ink-700 line-through decoration-ink-300">{formatINR(pricing.original)}</dd></div>
          {pricing.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-500 flex items-center gap-2">Discount <Badge tone="green" className="!py-0.5">{pricing.discountPct}% off</Badge></dt>
              <dd className="font-medium text-emerald-600">− {formatINR(pricing.discount)}</dd>
            </div>
          )}
          <div className="flex items-end justify-between pt-3 border-t border-dashed border-ink-100">
            <dt className="font-semibold text-ink-800">Total payable</dt>
            <dd className="font-display text-3xl font-extrabold text-ink-900 leading-none">{formatINR(pricing.price)}</dd>
          </div>
          <p className="text-xs text-ink-400 text-right">Inclusive of all taxes</p>
        </dl>

        <ul className="mt-5 space-y-2 text-xs text-ink-500">
          {["Lifetime access to course content", "Certificate on completion", "Instant enrollment after payment"].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500 shrink-0" />{t}</li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-emerald-50/70 border border-emerald-100 px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-emerald-800">
          <ShieldCheck size={16} className="shrink-0" /> {locked ? "Payment in progress — please don't close this page." : "Your payment is protected with bank-grade security."}
        </div>
      </div>
    </Card>
  );
}

function ProcessingView({ steps, stepIndex, method }) {
  return (
    <Card className="text-center !py-12">
      <div className="relative mx-auto h-20 w-20">
        <span className="absolute inset-0 rounded-full bg-grad-primary opacity-15 animate-ping" />
        <span className="absolute inset-0 rounded-full border-4 border-indigo-100" />
        <Loader2 size={80} strokeWidth={1.25} className="absolute inset-0 animate-spin text-indigo-600" />
        <Lock size={22} className="absolute inset-0 m-auto text-indigo-600" />
      </div>
      <h2 className="mt-6 text-xl font-extrabold text-ink-900">Processing your payment…</h2>
      <p className="mt-1.5 text-sm text-ink-500">Please don’t refresh or press the back button.</p>
      <ul className="mt-7 mx-auto max-w-xs space-y-3 text-left" aria-live="polite">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-3 text-sm transition-colors ${i <= stepIndex ? "text-ink-800" : "text-ink-300"}`}>
            {i < stepIndex ? <CheckCircle2 size={18} className="text-emerald-500" /> : i === stepIndex ? <Loader2 size={18} className="animate-spin text-indigo-600" /> : <span className="h-[18px] w-[18px] rounded-full border-2 border-ink-100" />}
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-7 text-xs text-ink-400">{method === "upi" ? "Approve the collect request in your UPI app to continue." : "This usually takes a few seconds."}</p>
    </Card>
  );
}

function BankAuthView({ bank, amount, onAuthorize, onCancel }) {
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-canvas border-b border-ink-100">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-card"><Building2 size={20} className="text-indigo-600" /></span>
        <div>
          <p className="font-display font-bold text-ink-900 leading-tight">{bank}</p>
          <p className="text-xs text-ink-500 flex items-center gap-1"><Lock size={11} className="text-emerald-600" /> Secure bank authorization · Demo page</p>
        </div>
      </div>
      <div className="p-6 sm:p-8 text-center">
        <p className="text-sm text-ink-500">You are authorizing a payment of</p>
        <p className="mt-1 font-display text-4xl font-extrabold text-ink-900">{formatINR(amount)}</p>
        <p className="mt-1 text-sm text-ink-500">to <span className="font-medium text-ink-700">Vistaar Learning</span></p>
        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs text-amber-800">
          This is a simulated bank page. No real login or credentials are requested or stored.
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button variant="secondary" size="lg" onClick={onCancel}>Cancel</Button>
          <Button size="lg" onClick={onAuthorize}>Authorize payment</Button>
        </div>
      </div>
    </Card>
  );
}

function SuccessView({ course, result, onStart, onMyLearning }) {
  return (
    <Card className="text-center !py-10 sm:!py-12 overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500" aria-hidden="true" />
      <div className="relative mx-auto h-24 w-24 animate-slideUp">
        <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" style={{ animationIterationCount: 2 }} />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_14px_30px_-10px_rgba(16,185,129,0.7)] grid place-items-center">
          <CheckCircle2 size={52} strokeWidth={2} className="text-white" />
        </span>
      </div>
      <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-ink-900">Payment Successful</h2>
      <p className="mt-2 text-sm text-ink-500">You’re now enrolled. Your course is ready in My Learning.</p>

      <dl className="mt-7 mx-auto max-w-md rounded-2xl border border-ink-100 bg-canvas/70 divide-y divide-ink-100 text-sm text-left">
        {[
          ["Course", course.title],
          ["Transaction ID", result.transactionId, true],
          ["Amount paid", formatINR(result.amount)],
          ["Payment method", result.methodLabel],
          ["Date", result.paidAtLabel],
        ].map(([k, v, copy]) => (
          <div key={k} className="flex items-start justify-between gap-4 px-4 py-3">
            <dt className="text-ink-500 shrink-0">{k}</dt>
            <dd className={`font-medium text-ink-900 text-right break-all ${copy ? "font-mono text-[13px]" : ""}`}>
              {v}
              {copy && (
                <button type="button" aria-label="Copy transaction ID" onClick={() => navigator.clipboard?.writeText(v)} className="focus-ring ml-2 align-middle text-ink-300 hover:text-indigo-600"><Copy size={13} /></button>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" onClick={onStart} iconRight={ArrowLeft} className="[&_svg:last-child]:rotate-180">Start Learning</Button>
        <Button size="lg" variant="secondary" onClick={onMyLearning}>Go to My Learning</Button>
      </div>
      <SecureNote className="mt-6" />
    </Card>
  );
}

function FailureView({ result, amount, onRetry, onChangeMethod }) {
  return (
    <Card className="text-center !py-10 sm:!py-12 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-red-400 to-rose-500" aria-hidden="true" />
      <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-red-400 to-rose-600 grid place-items-center shadow-[0_14px_30px_-10px_rgba(225,29,72,0.6)] animate-slideUp">
        <XCircle size={52} strokeWidth={2} className="text-white" />
      </div>
      <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-ink-900">Payment Failed</h2>
      <p role="alert" className="mt-2 mx-auto max-w-md text-sm text-ink-500">{result.reason}</p>
      <div className="mt-6 mx-auto max-w-md rounded-2xl border border-ink-100 bg-canvas/70 divide-y divide-ink-100 text-sm text-left">
        <div className="flex justify-between gap-4 px-4 py-3"><span className="text-ink-500">Amount</span><span className="font-medium text-ink-900">{formatINR(amount)}</span></div>
        <div className="flex justify-between gap-4 px-4 py-3"><span className="text-ink-500">Reference</span><span className="font-mono text-[13px] text-ink-900">{result.reference}</span></div>
      </div>
      <p className="mt-4 text-xs text-ink-400">No money has been deducted. If any amount was debited, it will be refunded in 5–7 working days.</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" icon={RefreshCw} onClick={onRetry}>Retry Payment</Button>
        <Button size="lg" variant="secondary" onClick={onChangeMethod}>Change Payment Method</Button>
      </div>
    </Card>
  );
}

/* ------------------------------- page ------------------------------ */

const EMPTY_CARD = { number: "", name: "", expiry: "", cvv: "", save: false };

export default function Checkout() {
  const { id } = useParams();
  const course = getCourseById(id);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { isEnrolled, purchaseCourse, showToast } = useApp();

  // stage: form | processing | bank | success | failure
  const [stage, setStage] = useState("form");
  const [method, setMethod] = useState("upi");
  const [upi, setUpi] = useState({ id: "", app: null });
  const [card, setCard] = useState(EMPTY_CARD);
  const [bank, setBank] = useState("");
  const [touched, setTouched] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState(null);

  const busy = useRef(false);
  const alive = useRef(true);
  const bankDecision = useRef(null);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [stage]);

  const pricing = useMemo(() => getCoursePricing(course), [course]);
  const theme = course ? getCourseTheme(course) : null;

  const upiError = validateUpi(upi.id);
  const cardErrors = useMemo(() => validateCard(card), [card]);
  const valid = {
    upi: !upiError,
    card: Object.keys(cardErrors).length === 0,
    netbanking: !!bank,
  };
  const canPay = valid[method];
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k, err) => (touched[k] || touched.submit ? err : "");

  if (!course) return <div className="max-w-3xl mx-auto px-4 py-24 text-center text-ink-500">Course not found.</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: `/courses/${course.id}/checkout` }} />;
  if (user.role !== "trainee") return <Navigate to={`/courses/${course.id}`} replace />;
  if (!pricing.isPaid) return <Navigate to={`/courses/${course.id}`} replace />;
  if (isEnrolled(course.id) && stage !== "success") return <Navigate to={`/courses/${course.id}`} replace />;

  const methodLabel = METHODS.find((m) => m.id === method).label;
  const processingSteps =
    method === "upi"
      ? ["Sending payment request", "Waiting for approval", "Confirming with your bank"]
      : method === "card"
      ? ["Encrypting card details", "Authorizing with your bank", "Confirming payment"]
      : ["Redirecting to your bank", "Verifying authorization", "Confirming payment"];

  const succeed = () => {
    const now = new Date();
    const receipt = {
      transactionId: newTxnId(),
      amount: pricing.price,
      methodLabel,
      paidAt: now.toISOString(),
      paidAtLabel: now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      status: "Purchased",
    };
    purchaseCourse(course.id, receipt);
    setResult(receipt);
    // Wipe sensitive form state from memory as soon as it's no longer needed.
    setCard(EMPTY_CARD);
    setUpi({ id: "", app: null });
    setStage("success");
    showToast("Payment successful — course added to My Learning.");
  };

  const fail = (reason) => {
    setResult({ reason, reference: `ERR${Math.random().toString(36).slice(2, 9).toUpperCase()}` });
    setCard((c) => ({ ...c, cvv: "" }));
    setStage("failure");
  };

  const runSteps = async (n, delays) => {
    for (let i = 0; i < n; i++) {
      if (!alive.current) return false;
      setStepIndex(i);
      await wait(delays[i]);
    }
    return alive.current;
  };

  const submit = async (e) => {
    e?.preventDefault();
    setTouched((t) => ({ ...t, submit: true }));
    if (!canPay || busy.current) return;
    busy.current = true;
    setStepIndex(0);
    setStage("processing");
    try {
      if (method === "netbanking") {
        if (!(await runSteps(1, [1400]))) return;
        setStage("bank");
        const decision = await new Promise((resolve) => { bankDecision.current = resolve; });
        if (!alive.current) return;
        if (decision === "cancel") return fail(`The payment was cancelled on the ${bank} page.`);
        setStage("processing");
        setStepIndex(1);
        await wait(1100);
        if (!alive.current) return;
        setStepIndex(2);
        await wait(1000);
        if (!alive.current) return;
        return succeed();
      }
      const delays = method === "upi" ? [1000, 2000, 1200] : [1000, 1500, 1000];
      if (!(await runSteps(3, delays))) return;
      if (method === "card") {
        if (card.number.replace(/\D/g, "").endsWith("0002")) return fail("Your bank declined this transaction. Try a different card or another payment method.");
      } else if (/fail/i.test(upi.id)) {
        return fail("The UPI request was declined or timed out. Please try again or use another payment method.");
      }
      succeed();
    } finally {
      busy.current = false;
    }
  };

  const decideBank = (d) => bankDecision.current?.(d);

  const goStart = () => navigate(`/trainee/learn/${course.id}`);
  const back = () => navigate(`/courses/${course.id}`);
  const inFlow = stage === "processing" || stage === "bank";

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-10 page-enter">
      {stage === "form" || stage === "failure" ? (
        <div className="mb-6">
          <Breadcrumb items={[{ label: "Courses", to: "/courses" }, { label: course.title, to: `/courses/${course.id}` }, { label: "Checkout" }]} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button type="button" onClick={back} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 shadow-card transition-all hover:-translate-x-0.5 hover:border-indigo-300 hover:text-indigo-700">
                <ArrowLeft size={16} /> Back to course
              </button>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-ink-900">Checkout</h1>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700">
              <Lock size={13} /> 100% Secure Payment
            </span>
          </div>
        </div>
      ) : null}

      <div className={`grid gap-6 lg:gap-8 ${stage === "success" ? "max-w-2xl mx-auto" : "lg:grid-cols-[1fr_380px] items-start"}`}>
        {/* Order summary sits on top for mobile, on the right for desktop */}
        {stage !== "success" && (
          <div className="lg:order-2"><OrderSummary course={course} pricing={pricing} theme={theme} locked={inFlow} /></div>
        )}

        <div className="lg:order-1 min-w-0">
          {stage === "processing" && <ProcessingView steps={processingSteps} stepIndex={stepIndex} method={method} />}
          {stage === "bank" && <BankAuthView bank={bank} amount={pricing.price} onAuthorize={() => decideBank("ok")} onCancel={() => decideBank("cancel")} />}
          {stage === "success" && result && <SuccessView course={course} result={result} onStart={goStart} onMyLearning={() => navigate("/trainee/my-learning")} />}
          {stage === "failure" && result && (
            <FailureView
              result={result}
              amount={pricing.price}
              onRetry={() => { setTouched({}); setStage("form"); }}
              onChangeMethod={() => {
                const next = METHODS[(METHODS.findIndex((m) => m.id === method) + 1) % METHODS.length].id;
                setMethod(next); setTouched({}); setStage("form");
              }}
            />
          )}

          {stage === "form" && (
            <Card className="!p-0 overflow-hidden">
              <div className="px-5 sm:px-6 pt-5 sm:pt-6">
                <h2 className="font-display font-bold text-lg text-ink-900">Payment method</h2>
                <p className="text-sm text-ink-500 mt-0.5">Choose how you’d like to pay.</p>

                <div role="radiogroup" aria-label="Payment method" className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {METHODS.map((m) => {
                    const active = method === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => { setMethod(m.id); setTouched({}); }}
                        className={`focus-ring relative flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 rounded-2xl border p-4 text-left transition-all duration-200 ${
                          active
                            ? "border-indigo-500 bg-indigo-50/70 shadow-[0_0_0_3px_rgba(124,58,237,0.12),0_10px_24px_-14px_rgba(124,58,237,0.5)]"
                            : "border-ink-100 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-soft"
                        }`}
                      >
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${active ? "bg-grad-primary text-white shadow-glow" : "bg-ink-50 text-ink-500"}`}>
                          <Icon size={19} />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-sm font-semibold leading-tight ${active ? "text-indigo-900" : "text-ink-800"}`}>{m.label}</span>
                          <span className="block text-xs text-ink-400 mt-0.5">{m.hint}</span>
                        </span>
                        <span className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border-2 transition-all ${active ? "border-indigo-600 bg-indigo-600" : "border-ink-200 bg-white"}`}>
                          {active && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={submit} noValidate className="p-5 sm:p-6" key={method}>
                <div className="animate-slideUp space-y-5">
                  {method === "upi" && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-ink-700 mb-2.5">Pay using your UPI app</p>
                        <div className="grid grid-cols-3 gap-3">
                          {UPI_APPS.map((a) => {
                            const active = upi.app === a.id;
                            return (
                              <button
                                key={a.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setUpi((u) => ({ ...u, app: active ? null : a.id }))}
                                className={`focus-ring flex flex-col items-center gap-2 rounded-2xl border px-2 py-3.5 transition-all duration-200 ${active ? "border-indigo-500 bg-indigo-50/70 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-ink-100 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-soft"}`}
                              >
                                <span className="grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold text-white" style={{ background: a.color }}>{a.short}</span>
                                <span className="text-xs sm:text-sm font-semibold text-ink-800">{a.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-ink-400"><span className="h-px flex-1 bg-ink-100" />or enter UPI ID<span className="h-px flex-1 bg-ink-100" /></div>

                      <Field label="UPI ID" htmlFor="upi-id" error={show("upi", upiError)} hint="Example: aditi@okhdfcbank">
                        <input
                          id="upi-id"
                          className={inputCls(show("upi", upiError))}
                          placeholder="yourname@bank"
                          value={upi.id}
                          autoComplete="off"
                          autoCapitalize="none"
                          spellCheck={false}
                          inputMode="email"
                          aria-invalid={!!show("upi", upiError)}
                          onChange={(e) => setUpi((u) => ({ ...u, id: e.target.value.replace(/\s/g, "") }))}
                          onBlur={() => touch("upi")}
                        />
                      </Field>
                      {upi.app && !upi.id.includes("@") && (
                        <div className="-mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-ink-400">Add handle:</span>
                          {UPI_APPS.find((a) => a.id === upi.app).handles.map((h) => (
                            <button key={h} type="button" onClick={() => setUpi((u) => ({ ...u, id: `${u.id}${h}` }))} className="focus-ring rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700 hover:bg-indigo-100">{h}</button>
                          ))}
                        </div>
                      )}
                      <PayButton amount={pricing.price} disabled={!canPay} />
                    </>
                  )}

                  {method === "card" && (
                    <>
                      <Field
                        label="Card number"
                        htmlFor="cc-number"
                        error={show("number", cardErrors.number)}
                        right={cardBrand(card.number.replace(/\D/g, "")) && <Badge tone="indigo">{cardBrand(card.number.replace(/\D/g, ""))}</Badge>}
                      >
                        <div className="relative">
                          <CreditCard size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
                          <input
                            id="cc-number"
                            className={`${inputCls(show("number", cardErrors.number))} !pl-10 tracking-wider tabular-nums`}
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            value={card.number}
                            aria-invalid={!!show("number", cardErrors.number)}
                            onChange={(e) => setCard((c) => ({ ...c, number: formatCardNumber(e.target.value) }))}
                            onBlur={() => touch("number")}
                          />
                        </div>
                      </Field>
                      <Field label="Cardholder name" htmlFor="cc-name" error={show("name", cardErrors.name)}>
                        <input
                          id="cc-name"
                          className={inputCls(show("name", cardErrors.name))}
                          placeholder="Name on card"
                          autoComplete="cc-name"
                          value={card.name}
                          aria-invalid={!!show("name", cardErrors.name)}
                          onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                          onBlur={() => touch("name")}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Expiry date" htmlFor="cc-exp" error={show("expiry", cardErrors.expiry)}>
                          <input
                            id="cc-exp"
                            className={`${inputCls(show("expiry", cardErrors.expiry))} tabular-nums`}
                            placeholder="MM/YY"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            maxLength={5}
                            value={card.expiry}
                            aria-invalid={!!show("expiry", cardErrors.expiry)}
                            onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value, c.expiry) }))}
                            onBlur={() => touch("expiry")}
                          />
                        </Field>
                        <Field label="CVV" htmlFor="cc-cvv" error={show("cvv", cardErrors.cvv)}>
                          <input
                            id="cc-cvv"
                            type="password"
                            className={`${inputCls(show("cvv", cardErrors.cvv))} tabular-nums`}
                            placeholder="•••"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            maxLength={4}
                            value={card.cvv}
                            aria-invalid={!!show("cvv", cardErrors.cvv)}
                            onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                            onBlur={() => touch("cvv")}
                          />
                        </Field>
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-200 accent-indigo-600" checked={card.save} onChange={(e) => setCard((c) => ({ ...c, save: e.target.checked }))} />
                        <span className="text-sm text-ink-700">
                          Save this card for future payments
                          <span className="block text-xs text-ink-400 mt-0.5">Demo mode: card details are never stored or sent anywhere.</span>
                        </span>
                      </label>
                      <PayButton amount={pricing.price} disabled={!canPay} />
                    </>
                  )}

                  {method === "netbanking" && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-ink-700 mb-2.5">Popular banks</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {POPULAR_BANKS.map((b) => {
                            const active = bank === b;
                            return (
                              <button
                                key={b}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setBank(b)}
                                className={`focus-ring flex flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition-all duration-200 ${active ? "border-indigo-500 bg-indigo-50/70 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-ink-100 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-soft"}`}
                              >
                                <span className={`grid h-9 w-9 place-items-center rounded-full ${active ? "bg-grad-primary text-white" : "bg-ink-50 text-ink-500"}`}><Building2 size={17} /></span>
                                <span className="text-xs font-semibold text-ink-800 leading-tight">{b}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <Field label="Select your bank" htmlFor="bank" error={show("bank", !bank ? "Please select a bank to continue." : "")}>
                        <div className="relative">
                          <select
                            id="bank"
                            className={`${inputCls(show("bank", !bank))} appearance-none pr-10 cursor-pointer`}
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            onBlur={() => touch("bank")}
                          >
                            <option value="">Choose a bank…</option>
                            {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        </div>
                      </Field>
                      <p className="text-xs text-ink-500 flex items-start gap-2"><BadgeCheck size={14} className="mt-px shrink-0 text-indigo-500" /> You’ll be redirected to your bank’s secure page to authorize {formatINR(pricing.price)}.</p>
                      <PayButton amount={pricing.price} disabled={!canPay} label="Continue to Payment" />
                    </>
                  )}

                  <SecureNote />
                </div>
              </form>

              <div className="border-t border-ink-100 bg-canvas/70 px-5 sm:px-6 py-3.5 text-xs text-ink-500 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700"><AlertCircle size={13} /> Demo checkout</span>
                <span>No real payment is made.</span>
                {method === "card" && (
                  <button type="button" className="focus-ring font-medium text-indigo-600 hover:underline" onClick={() => { setCard({ number: "4111 1111 1111 1111", name: user.name, expiry: "12/34", cvv: "123", save: false }); setTouched({}); }}>Fill test card</button>
                )}
                <span className="text-ink-400">
                  {method === "card" ? "Card ending 0002 → declined." : method === "upi" ? "UPI ID containing “fail” → declined." : "Cancel on the bank page → failed."}
                </span>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
