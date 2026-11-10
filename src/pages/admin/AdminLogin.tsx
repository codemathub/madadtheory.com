import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, KeyRound, ArrowRight, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const FIXED_ADMIN_EMAIL = "code.mathub@gmail.com";

export default function AdminLogin() {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(FIXED_ADMIN_EMAIL);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Auto redirect if already logged in with valid token
  useEffect(() => {
    const token = localStorage.getItem("mat_admin_token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            navigate("/admin");
          }
        })
        .catch(() => {});
    }
  }, [navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      setError("Please provide a valid agency work email.");
      return;
    }

    if (clean !== FIXED_ADMIN_EMAIL) {
      setError(`Access Restricted: Only the designated Super Admin (${FIXED_ADMIN_EMAIL}) is authorized to receive security codes.`);
      return;
    }

    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate security code.");
      }

      setStep("otp");
      setSuccessMsg(data.message || `Security code sent to ${email}`);
      setResendCooldown(30);
    } catch (err: any) {
      setError(err.message || "Failed to deliver OTP. Please verify credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Please enter the complete 6-digit security code.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: otp.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid security code.");
      }

      // Store JWT token and verified session
      localStorage.setItem("mat_admin_token", data.token);
      localStorage.setItem("mat_admin_session", JSON.stringify(data.user));

      setSuccessMsg("Verification confirmed! Opening Workspace...");
      setTimeout(() => {
        navigate("/admin");
      }, 700);
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-subtle dark:bg-[#07040d]">
      <div className="max-w-md w-full space-y-8 p-8 sm:p-10 bg-surface-card dark:bg-[#120d1d] rounded-3xl border border-brand-border dark:border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Brand Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center relative">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-purple-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Admin Console</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Mad Ad Theory Workspace
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            Resend-powered One-Time Passcode (OTP) Authentication
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {successMsg && !error && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs rounded-2xl flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === "email" ? (
          <form className="mt-6 space-y-5 relative" onSubmit={handleSendOtp}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Super Admin Work Email
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Fixed Identity
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-purple-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="code.mathub@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-semibold"
                  required
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Access is strictly restricted to <strong className="text-purple-600 dark:text-purple-400">{FIXED_ADMIN_EMAIL}</strong>. Single-use OTP will be delivered via Resend.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl py-3.5 text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Security Code...</span>
                </>
              ) : (
                <>
                  <span>Send Security Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link to="/" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        ) : (
          /* STEP 2: Enter 6-Digit OTP */
          <form className="mt-6 space-y-5 relative" onSubmit={handleVerifyOtp}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Enter 6-Digit Passcode
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError(null);
                  }}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Change Email</span>
                </button>
              </div>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="• • • • • •"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-center text-xl tracking-[0.5em] font-mono font-bold focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Single-use code expires in 10 mins</span>
                <button
                  type="button"
                  disabled={resendCooldown > 0 || isLoading}
                  onClick={() => handleSendOtp()}
                  className={`font-semibold hover:underline ${
                    resendCooldown > 0 ? "text-slate-400 cursor-not-allowed" : "text-purple-600 dark:text-purple-400"
                  }`}
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full rounded-2xl py-3.5 text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Validating Security Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Access Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link to="/" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
