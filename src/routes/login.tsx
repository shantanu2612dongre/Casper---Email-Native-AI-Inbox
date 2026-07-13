import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Send,
  Paperclip,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  Bell,
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

            {/* Product preview mockup — stacked card effect */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 relative w-[400px] h-[320px]"
            >
              {/* Back card 1 (deepest) — notification snippet */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-2 left-1/2 w-[86%] rounded-2xl bg-white/90 border border-black/[0.05] shadow-md shadow-black/[0.04] overflow-hidden"
                style={{ transform: "translateX(-50%) rotate(-4deg)", height: "280px" }}
              >
                <div className="px-5 py-3 border-b border-black/[0.04]">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    <Bell className="h-3 w-3" />
                    <span className="font-medium">Notifications</span>
                  </div>
                </div>
                <div className="px-5 py-3 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-500" />
                    </div>
                    <span className="text-[11px] text-muted-foreground">3 replies sent automatically</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Mail className="h-3 w-3 text-emerald-500" />
                    </div>
                    <span className="text-[11px] text-muted-foreground">Inbox sorted — 12 low priority archived</span>
                  </div>
                </div>
              </motion.div>

              {/* Back card 2 (middle) — schedule snippet */}
              <motion.div
                initial={{ opacity: 0, y: 25, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-1/2 w-[93%] rounded-2xl bg-white/95 border border-black/[0.05] shadow-lg shadow-black/[0.05] overflow-hidden"
                style={{ transform: "translateX(-50%) rotate(-1.5deg)", height: "290px" }}
              >
                <div className="px-5 py-3 border-b border-black/[0.04]">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    <Calendar className="h-3 w-3" />
                    <span className="font-medium">Today's Schedule</span>
                  </div>
                </div>
                <div className="px-5 py-3 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground/60 w-10 shrink-0">10:00</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span className="text-[11px] text-foreground/70">Sync with design team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground/60 w-10 shrink-0">14:00</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[11px] text-foreground/70">Client review call</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground/60 w-10 shrink-0">16:30</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-foreground/70">Sprint planning</span>
                  </div>
                </div>
              </motion.div>

              {/* Front card — compose / reply UI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-3 left-1/2 -translate-x-1/2 w-full rounded-2xl bg-white border border-black/[0.06] shadow-xl shadow-black/[0.1] overflow-hidden"
              >
                {/* Window chrome */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-black/[0.05]">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-[11px] text-muted-foreground/70 font-medium">New Reply</span>
                  </div>
                </div>

                {/* Email meta */}
                <div className="px-5 py-3 space-y-1.5 border-b border-black/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground/60 w-8">To:</span>
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-[9px] text-white font-semibold">A</div>
                      <span className="text-[12px] text-foreground/80">Alex Rivera</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground/60 w-8">Re:</span>
                    <span className="text-[12px] text-foreground/80">Q3 Partnership Proposal</span>
                  </div>
                </div>

                {/* Compose body with typing animation */}
                <div className="px-5 py-4">
                  <p className="text-[13px] text-foreground/85 leading-[1.65]">
                    Hi Alex,
                  </p>
                  <p className="text-[13px] text-foreground/85 leading-[1.65] mt-2">
                    Thanks for sending this over — the proposal looks solid. I'm on board with the
                    revenue-share model, and I think a 90-day pilot makes
                    <motion.span
                      className="inline-block"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "steps(1)" }}
                    >
                      <span className="inline-block w-[2px] h-[14px] bg-foreground/70 ml-0.5 -mb-[2px]" />
                    </motion.span>
                  </p>
                </div>

                {/* Compose toolbar */}
                <div className="px-5 py-3 border-t border-black/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer" />
                    <Clock className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer" />
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg bg-foreground text-background px-3.5 py-1.5 text-[12px] font-medium">
                    <Send className="h-3 w-3" />
                    Send
                  </button>
                </div>
              </motion.div>
            </motion.div>
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
