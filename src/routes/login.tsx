import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Wisps" },
      {
        name: "description",
        content:
          "Sign in to Wisps — the AI-native inbox that learns how you write and handles the busywork.",
      },
    ],
  }),
  component: LoginPage,
});

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ─── Social / SSO connector buttons ─── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-27.1-46.9-42.2-83.7-45.4-35.2-3.1-73.7 20.8-87.9 20.8-15 0-49-19.8-74.8-19.8C63.1 140.2 0 185.3 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.8 59 127.1 107.2 125.6 25.1-.6 42.8-18 75.4-18 31.5 0 48.1 18 76.4 17.4 48.5-.8 90.1-82.4 102.4-119.3-65.1-30.9-62.1-90.5-62.1-91.7zm-56.5-142c27.5-32.7 24.7-62.6 24-72.5-23.8 1.4-51.4 16.3-67.3 34.8-17.2 20-27.2 44.5-25.1 71.9 26 2 49.9-13.7 68.4-34.2z" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 127 127">
      <path
        d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
        fill="#E01E5A"
      />
      <path
        d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H14c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33z"
        fill="#36C5F0"
      />
      <path
        d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V14c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v32.9z"
        fill="#2EB67D"
      />
      <path
        d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-33z"
        fill="#ECB22E"
      />
    </svg>
  );
}

/* ─── Connector Button Component ─── */
function ConnectorButton({
  icon,
  label,
  onClick,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={delay}
      onClick={onClick}
      className="group relative flex w-full items-center gap-3 rounded-xl border border-border/60 bg-white px-5 py-3.5 text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:bg-secondary/50 active:scale-[0.98] cursor-pointer"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span>{label}</span>
      <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0" />
    </motion.button>
  );
}

/* ─── Email Thread Mockup with typewriter animation ─── */
const REPLY_TEXT =
  "Hi Alex, thanks for sending this over. The proposal looks solid — I'm on board with the revenue-share model. Let's schedule a call this week to align on the pilot timeline.";

function EmailThreadMockup() {
  const [phase, setPhase] = useState<
    "incoming" | "thinking" | "typing" | "sent"
  >("incoming");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    // Phase 1: Show incoming message (already visible), wait 1.5s
    const t1 = setTimeout(() => setPhase("thinking"), 1500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "thinking") {
      // Phase 2: Show typing dots for 1.2s, then start typing
      const t = setTimeout(() => {
        setPhase("typing");
        setCharIndex(0);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "typing" && charIndex < REPLY_TEXT.length) {
      const speed = REPLY_TEXT[charIndex] === " " ? 20 : 28 + Math.random() * 22;
      const t = setTimeout(() => setCharIndex((i) => i + 1), speed);
      return () => clearTimeout(t);
    }
    if (phase === "typing" && charIndex >= REPLY_TEXT.length) {
      const t = setTimeout(() => setPhase("sent"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, charIndex]);

  // Loop: restart after "sent" lingers
  useEffect(() => {
    if (phase === "sent") {
      const t = setTimeout(() => {
        setPhase("incoming");
        setCharIndex(0);
        // Re-trigger the cycle
        setTimeout(() => setPhase("thinking"), 1500);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: {
          delay: 1.2,
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="mt-10 w-[420px]"
    >
      <div className="rounded-2xl bg-white border border-black/[0.06] shadow-2xl shadow-black/[0.08] overflow-hidden">
        {/* macOS window chrome */}
        <div className="flex items-center px-4 py-2.5 bg-[#f8f8f8] border-b border-black/[0.06]">
          <div className="flex gap-[6px]">
            <div className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]" />
            <div className="h-[10px] w-[10px] rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-muted-foreground/50" />
              <span className="text-[11px] text-muted-foreground/60 font-medium">
                Q3 Partnership Proposal
              </span>
            </div>
          </div>
        </div>

        {/* Thread body */}
        <div className="px-5 py-5 space-y-4 min-h-[230px]">
          {/* Incoming message */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 max-w-[92%]"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] text-white font-semibold shrink-0 mt-0.5">
              A
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-semibold text-foreground">
                  Alex Rivera
                </span>
                <span className="text-[10px] text-muted-foreground/50">
                  10:32 AM
                </span>
              </div>
              <div className="rounded-2xl rounded-tl-md bg-[#f2f2f7] px-4 py-2.5">
                <p className="text-[12.5px] text-foreground/80 leading-[1.55]">
                  Hey! Just sent over the Q3 partnership deck. Let me know
                  if the revenue-share model works for you, or if you'd
                  prefer a flat fee structure.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reply section */}
          <AnimatePresence mode="wait">
            {phase === "thinking" && (
              <motion.div
                key="dots"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 justify-end"
              >
                <div className="rounded-2xl rounded-tr-md bg-foreground px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-[5px] w-[5px] rounded-full bg-background/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {(phase === "typing" || phase === "sent") && (
              <motion.div
                key="reply"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 justify-end max-w-[92%] ml-auto"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <span className="text-[10px] text-muted-foreground/50">
                      Now
                    </span>
                    <span className="text-[12px] font-semibold text-foreground">
                      You
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-tr-md bg-foreground px-4 py-2.5">
                    <p className="text-[12.5px] text-background/90 leading-[1.55]">
                      {REPLY_TEXT.slice(0, charIndex)}
                      {phase === "typing" && (
                        <motion.span
                          className="inline-block w-[1.5px] h-[13px] bg-background/70 ml-[1px] -mb-[2px]"
                          animate={{ opacity: [1, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "steps(1)",
                          }}
                        />
                      )}
                    </p>
                  </div>

                  {/* Sent confirmation */}
                  <AnimatePresence>
                    {phase === "sent" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 justify-end mt-1.5 pr-1"
                      >
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span className="text-[10px] text-emerald-600 font-medium">
                          Sent
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Login Page ─── */
function LoginPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* ─── LEFT PANEL: Brand / Content (Shotbase-inspired) ─── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col overflow-hidden">
        {/* Soft warm gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, oklch(0.95 0.04 30) 0%, oklch(0.94 0.06 350) 30%, oklch(0.92 0.05 320) 60%, oklch(0.96 0.03 280) 100%)",
          }}
        />

        {/* Subtle animated warm orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 right-10 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.88 0.1 30 / 0.4) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -20, 25, 0],
              y: [0, 30, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-32 -left-8 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.12 300 / 0.3) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, 15, -20, 0],
              y: [0, -15, 25, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 7,
            }}
            className="absolute top-1/3 left-1/4 h-44 w-44 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.9 0.08 50 / 0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content — centered like the reference */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-between p-10 xl:p-14">
          {/* Top bar: logo + mute icon area */}
          <div className="flex w-full items-center justify-between">
            <motion.a
              href="/"
              variants={fadeIn}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-2 text-foreground"
            >
              <img
                src="/casper-logo.svg"
                alt="Wisps logo"
                className="h-9 w-9 object-contain"
              />
              <span className="text-lg font-semibold tracking-tight">
                Wisps
              </span>
            </motion.a>
          </div>

          {/* Center: headline + description + product mockup */}
          <div className="flex flex-col items-center text-center max-w-lg -mt-4">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl xl:text-[2.75rem] font-semibold tracking-tight text-foreground leading-[1.08]"
            >
              Your first Wisps
              <br />
              moment
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-sm"
            >
              Sign in and let Wisps learn how you write — it'll draft replies,
              sort your inbox, and handle the busywork for you.
            </motion.p>

            {/* Email thread mockup */}
            <EmailThreadMockup />
          </div>

          {/* Bottom: back nav */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={5}
            className="flex w-full items-center"
          >
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Login Form ─── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
        {/* Mobile logo (visible only on < lg) */}
        <motion.a
          href="/"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center gap-2 text-foreground lg:hidden mb-10"
        >
          <img
            src="/casper-logo.svg"
            alt="Wisps logo"
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-semibold tracking-tight">Wisps</span>
        </motion.a>

        <div className="w-full max-w-[400px]">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Sign in to your Wisps account to continue
            </p>
          </motion.div>

          {/* SSO Connectors */}
          <div className="mt-8 space-y-3">
            <ConnectorButton
              icon={<GoogleIcon />}
              label="Continue with Google"
              delay={1}
            />
            <ConnectorButton
              icon={<MicrosoftIcon />}
              label="Continue with Microsoft"
              delay={2}
            />
            <ConnectorButton
              icon={<AppleIcon />}
              label="Continue with Apple"
              delay={3}
            />
            <ConnectorButton
              icon={<SlackIcon />}
              label="Continue with Slack"
              delay={4}
            />
          </div>

          {/* Divider */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={5}
            className="my-7 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              or
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Email login */}
          {!showEmailForm ? (
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              onClick={() => setShowEmailForm(true)}
              className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-border/60 bg-white px-5 py-3.5 text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:bg-secondary/50 active:scale-[0.98] cursor-pointer"
            >
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>Continue with Email</span>
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@company.com"
                  autoFocus
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none ring-0 transition-all focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-11 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none ring-0 transition-all focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-foreground focus:ring-foreground/20 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-foreground text-background px-5 py-3.5 text-[15px] font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors pt-1 cursor-pointer"
              >
                ← Back to all sign-in options
              </button>
            </motion.form>
          )}

          {/* Sign up link */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={7}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-foreground hover:underline underline-offset-4 transition-colors"
            >
              Get started for free
            </a>
          </motion.p>

          {/* Footer */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={8}
            className="mt-12 text-center text-xs text-muted-foreground/60 leading-relaxed"
          >
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
