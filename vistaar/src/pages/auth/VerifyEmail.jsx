import { useLocation, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function VerifyEmail() {
  const { state } = useLocation();
  const role = state?.role || "trainee";
  const { login } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const proceed = () => {
    login(role);
    showToast("Account verified. Welcome to Vistaar!");
    navigate(`/${role}/dashboard`);
  };

  return (
    <AuthLayout title="Verify your email" subtitle="">
      <div className="text-center py-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-5">
          <MailCheck size={28} className="text-indigo-600" />
        </div>
        <h2 className="font-display font-bold text-xl text-ink-900">Almost there!</h2>
        <p className="text-sm text-ink-600 mt-2 leading-relaxed">
          We've sent a verification link to your email. For this demo, click below to simulate verification and continue to your {role} dashboard.
        </p>
        <Button onClick={proceed} size="lg" className="mt-6 w-full">
          Simulate Verification &amp; Continue
        </Button>
      </div>
    </AuthLayout>
  );
}
