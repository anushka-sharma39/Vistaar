import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="">
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={28} className="text-emerald-600" />
          </div>
          <p className="text-sm text-ink-600 leading-relaxed">
            We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password.
          </p>
          <Link to="/login">
            <Button variant="secondary" className="mt-6 w-full">Back to Log In</Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you instructions to reset it."
      footer={
        <p className="text-sm text-ink-500">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-700 font-semibold hover:text-indigo-900">Log in</Link>
        </p>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="space-y-4"
      >
        <Input label="Email address" type="email" icon={Mail} placeholder="you@example.com" required />
        <Button type="submit" size="lg" className="w-full">
          Send Reset Instructions
        </Button>
      </form>
    </AuthLayout>
  );
}
