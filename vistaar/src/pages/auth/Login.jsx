import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

const roles = [
  { value: "trainee", label: "Trainee" },
  { value: "trainer", label: "Trainer" },
  { value: "admin", label: "Admin" },
];

export default function Login() {
  const [role, setRole] = useState("trainee");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const { login } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const from = useLocation().state?.from;

  const submit = (e) => {
    e.preventDefault();
    login(role, remember);
    showToast(`Welcome back! Logged in as ${role}.`);
    navigate(from && role === "trainee" ? from : `/${role}/dashboard`, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue your learning journey."
      footer={
        <p className="text-sm text-ink-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-700 font-semibold hover:text-indigo-900">
            Sign up
          </Link>
        </p>
      }
    >
      <div className="flex gap-2 mb-6 bg-ink-100/60 rounded-xl p-1">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setRole(r.value)}
            className={`focus-ring flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              role === r.value ? "bg-white text-indigo-700 shadow-card" : "text-ink-500 hover:text-ink-800"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Input label="Email address" type="email" icon={Mail} placeholder="you@example.com" required defaultValue={`${role}@vistaar.gov`} />
        <div className="relative">
          <Input
            label="Password"
            type={showPw ? "text" : "password"}
            icon={Lock}
            placeholder="••••••••"
            required
            defaultValue="password123"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute right-3.5 top-[38px] text-ink-300 hover:text-ink-600"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-600 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={() => setRemember((r) => !r)} className="rounded border-ink-300 text-indigo-600 focus:ring-indigo-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-indigo-700 font-medium hover:text-indigo-900">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
      </form>
    </AuthLayout>
  );
}
