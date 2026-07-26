import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X, Check, PartyPopper, Sparkles, AlertCircle } from "lucide-react";
import { sendWaitlistOtp, verifyWaitlistOtp } from "../lib/api/waitlist.functions";
import { trackEvent } from "../lib/utils";

type WaitlistStep = "email" | "otp" | "success";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<WaitlistStep>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("email");
      setName("");
      setEmail("");
      setOtp(["", "", "", ""]);
      setIsLoading(false);
      setError("");
      setPosition(null);
      setAlreadyJoined(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-focus first OTP input when OTP step appears
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const handleEmailSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      await sendWaitlistOtp({ data: { name: name.trim(), email: email.trim() } });
      trackEvent("join_waitlist_email_submit", {
        event_category: "conversion",
        event_label: "Waitlist Email Submitted",
      });
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const chars = value
        .replace(/[^0-9]/g, "")
        .slice(0, 4)
        .split("");
      const newOtp = [...otp];
      chars.forEach((char, i) => {
        if (index + i < 4) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(index + chars.length, 3);
      otpRefs.current[nextFocus]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await verifyWaitlistOtp({ data: { email: email.trim(), code } });
      if (result.success) {
        trackEvent("join_waitlist_success", {
          event_category: "conversion",
          event_label: "Waitlist Joined Successfully",
          already_joined: result.alreadyJoined,
          position: result.position,
        });
        setPosition(result.position);
        setAlreadyJoined(result.alreadyJoined);
        setStep("success");
      } else {
        setError(result.error || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");
    setOtp(["", "", "", ""]);

    try {
      await sendWaitlistOtp({ data: { name: name.trim(), email: email.trim() } });
      setError(""); // Clear any previous error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-foreground/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-md rounded-3xl bg-background border border-border/50 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Decorative gradient top bar */}
              <div
                className="h-1.5 w-full"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.16 230), oklch(0.78 0.16 170), oklch(0.78 0.18 145))",
                }}
              />

              <div className="px-8 pt-8 pb-10">
                <AnimatePresence mode="wait">
                  {/* ─── Step 1: Email Entry ─── */}
                  {step === "email" && (
                    <motion.div
                      key="email-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center">
                        Join the waitlist
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
                        Your name and email. We send the code over email, because that is the whole
                        point.
                      </p>

                      {/* Error message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 w-full flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl px-4 py-3"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {error}
                        </motion.div>
                      )}

                      {/* Name input */}
                      <div className="mt-6 w-full">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div className="mt-3 w-full">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-all"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleEmailSubmit();
                            }}
                          />
                        </div>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        onClick={handleEmailSubmit}
                        disabled={!name.trim() || !email.trim() || isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full rounded-full bg-[#2196F3] text-white py-3.5 text-base font-semibold shadow-lg shadow-[#2196F3]/20 hover:shadow-xl hover:shadow-[#2196F3]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            <Mail className="h-4 w-4" />
                            Email me a code
                          </>
                        )}
                      </motion.button>

                      {/* Login link */}
                      <p className="mt-6 text-sm text-muted-foreground">
                        Already have access?{" "}
                        <a href="/login" className="text-[#2196F3] font-medium hover:underline">
                          Log in
                        </a>
                      </p>
                    </motion.div>
                  )}

                  {/* ─── Step 2: OTP Verification ─── */}
                  {step === "otp" && (
                    <motion.div
                      key="otp-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center">
                        Join the waitlist
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground text-center flex items-center gap-1.5">
                        Check your Mail <Mail className="h-4 w-4 text-muted-foreground" />
                      </p>

                      {/* Error message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 w-full flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl px-4 py-3"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {error}
                        </motion.div>
                      )}

                      {/* OTP inputs */}
                      <div className="mt-8 flex items-center justify-center gap-2.5">
                        {otp.map((digit, index) => (
                          <motion.input
                            key={index}
                            ref={(el) => {
                              otpRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ""))
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                            className="h-14 w-11 rounded-xl border-2 border-border bg-background text-center text-xl font-semibold text-foreground focus:outline-none focus:border-[#2196F3] focus:ring-2 focus:ring-[#2196F3]/20 transition-all"
                          />
                        ))}
                      </div>

                      {/* Verify button */}
                      <motion.button
                        onClick={handleVerify}
                        disabled={otp.some((d) => !d) || isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full rounded-full bg-[#2196F3] text-white py-3.5 text-base font-semibold shadow-lg shadow-[#2196F3]/20 hover:shadow-xl hover:shadow-[#2196F3]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          "Verify and join"
                        )}
                      </motion.button>

                      {/* Resend + Login links */}
                      <div className="mt-6 flex flex-col items-center gap-2">
                        <button
                          onClick={handleResendCode}
                          disabled={isLoading}
                          className="text-sm text-[#2196F3] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Resend code
                        </button>
                        <p className="text-sm text-muted-foreground">
                          Already have access?{" "}
                          <a href="/login" className="text-[#2196F3] font-medium hover:underline">
                            Log in
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── Step 3: Success / Congratulations ─── */}
                  {step === "success" && (
                    <motion.div
                      key="success-step"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center py-4"
                    >
                      {/* Animated confetti circle */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="relative"
                      >
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                          >
                            <Check className="h-9 w-9 text-emerald-500" strokeWidth={2.5} />
                          </motion.div>
                        </div>
                        {/* Sparkle particles */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0],
                              x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 8)],
                              y: [0, -20 - i * 6],
                            }}
                            transition={{
                              delay: 0.5 + i * 0.08,
                              duration: 0.8,
                            }}
                            className="absolute top-1/2 left-1/2"
                          >
                            <Sparkles className="h-3 w-3 text-amber-400" />
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center"
                      >
                        {alreadyJoined ? "Welcome back! 👋" : "Congratulations! 🎉"}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="mt-3 text-sm text-muted-foreground text-center max-w-xs leading-relaxed"
                      >
                        {alreadyJoined ? (
                          <>
                            You're already on the waitlist with{" "}
                            <span className="font-medium text-foreground">{email}</span>. We'll
                            notify you when your spot is ready!
                          </>
                        ) : (
                          <>
                            You're on the list! We'll send you an invite to{" "}
                            <span className="font-medium text-foreground">{email}</span> as soon as
                            your spot is ready.
                          </>
                        )}
                      </motion.p>

                      {/* Position badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-3.5"
                      >
                        <div className="flex items-center gap-2">
                          <PartyPopper className="h-5 w-5 text-amber-500" />
                          <div>
                            <div className="text-xs text-muted-foreground">Your position</div>
                            <div className="text-lg font-bold text-foreground tracking-tight">
                              #{position?.toLocaleString() ?? "—"}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75 }}
                        onClick={onClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 w-full rounded-full bg-foreground text-background py-3.5 text-base font-semibold hover:opacity-90 transition-opacity"
                      >
                        Done
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
