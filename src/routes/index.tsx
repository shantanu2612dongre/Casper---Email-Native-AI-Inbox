import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Inbox, Sparkles, Zap, Shield, Search, Bot, Check, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slashy — The Intelligent Inbox" },
      { name: "description", content: "Slashy learns how you write, drafts your replies, and handles the busywork — so you can focus on what matters." },
      { property: "og:title", content: "Slashy — The Intelligent Inbox" },
      { property: "og:description", content: "An AI inbox that learns your voice and handles the busywork." },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-xl">
          <span
            aria-hidden
            className="inline-block h-5 w-7 rounded-sm"
            style={{ background: "var(--gradient-primary)" }}
          />
          Slashy
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm text-foreground/80">
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="/enterprise" className="hover:text-foreground transition-colors">Enterprise</a>
          <a href="/for-agents" className="hover:text-foreground transition-colors">For Agents</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Login</a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]"
        >
          The Intelligent Inbox.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mx-auto mt-6 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Slashy learns how you write, drafts your replies, and handles the busywork, so you can focus on what matters.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-foreground text-background px-6 py-3 text-base font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </motion.div>

        <InboxMockup />
      </div>
    </section>
  );
}

function InboxMockup() {
  const rows = [
    { from: "Huỳnh Anh Tuấn", subject: "Partnership Opportunity – AI Email", preview: "Hi team, I wanted to reach out about…", tag: "Important", time: "12:21 PM", active: true },
    { from: "Neil Patel", subject: "Have you optimized for agents yet?", preview: "You've heard everyone…", tag: "Newsletter", time: "12:07 PM" },
    { from: "Business Insider", subject: "Ending soon — 1 year for only $29", preview: "Limited time only. End…", tag: "Newsletter", time: "12:01 PM" },
    { from: "The Hustle", subject: "✨ A new kind of power suit", preview: "Plus: A popular plumber, a wi…", tag: "Newsletter", time: "11:30 AM" },
    { from: "Business Insider", subject: "Today: What Amazon's job cuts mean for you", preview: "Plus: More…", tag: "Newsletter", time: "10:52 AM" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
      style={{ perspective: 1400 }}
      className="relative mx-auto mt-20 max-w-5xl"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl p-3 md:p-4"
        style={{
          background: "var(--gradient-hero)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-card border border-border/60">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
            <span className="h-3 w-3 rounded-full bg-[oklch(0.72_0.18_25)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.82_0.14_85)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.16_145)]" />
            <div className="ml-4 flex items-center gap-2 text-sm text-foreground/80">
              <span className="inline-flex flex-col gap-[3px]">
                <span className="block h-[2px] w-4 bg-foreground/60 rounded" />
                <span className="block h-[2px] w-4 bg-foreground/60 rounded" />
                <span className="block h-[2px] w-4 bg-foreground/60 rounded" />
              </span>
              All Mail
            </div>
          </div>
          {/* Rows */}
          <div className="divide-y divide-border/60">
            {rows.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className={`grid grid-cols-12 items-center gap-3 px-5 py-3 text-sm ${
                  r.active ? "bg-muted/60" : "hover:bg-muted/40"
                }`}
              >
                <div className="col-span-3 flex items-center gap-3 min-w-0">
                  <span className="h-2 w-2 rounded-full bg-primary-glow shrink-0" />
                  <span className="font-medium text-foreground truncate">{r.from}</span>
                </div>
                <div className="col-span-6 flex items-center gap-2 min-w-0">
                  <span className="font-medium text-foreground truncate">{r.subject}</span>
                  <span className="text-muted-foreground truncate hidden md:inline">{r.preview}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-3">
                  <span className="rounded-md bg-[color:var(--pink-wash)] text-foreground/80 text-xs px-2 py-0.5">
                    {r.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Logos() {
  const logos = ["Northwind", "Acme", "Monolith", "Lumen", "Stellar", "Zephyr"];
  return (
    <section className="border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Loved by people at fast-moving teams
        </p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {logos.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center text-base font-semibold tracking-tight text-foreground"
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: Sparkles, title: "Drafts in your voice", desc: "Slashy studies the way you write and proposes replies that actually sound like you." },
  { icon: Inbox, title: "Auto-organized inbox", desc: "Newsletters, receipts, and noise are quietly tucked away so only what matters stays in view." },
  { icon: Bot, title: "Background agents", desc: "Schedule meetings, summarize threads, and follow up — without lifting a finger." },
  { icon: Search, title: "Ask your inbox", desc: "Search like you think. Find any email, attachment, or detail with a single question." },
  { icon: Zap, title: "Faster than zero", desc: "Built on a blazing-fast client that opens, scrolls, and searches instantly." },
  { icon: Shield, title: "Private by default", desc: "End-to-end encrypted. We never train on your mail — your inbox stays yours." },
];

function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Email that thinks ahead.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A quiet, intelligent layer over your inbox — no plug-ins, no extra apps, no learning curve.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Connect your inbox", d: "Sign in with Gmail or Outlook. Slashy is live in seconds, no migration required." },
    { n: "02", t: "It learns your voice", d: "Slashy quietly studies how you write and what you care about — privately, on your account." },
    { n: "03", t: "Reach inbox zero", d: "Triage, drafts, and follow-ups happen in the background. You just review and send." },
  ];
  return (
    <section id="how" className="relative py-28 bg-muted/40 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl mx-auto text-center"
        >
          From signed-in to inbox zero in three steps.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl bg-card border border-border p-7"
            >
              <span className="text-sm font-mono text-muted-foreground">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      sub: "Free forever",
      features: ["1 workspace", "5 active workflows", "Community support", "Slashy AI starter"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Pro",
      price: "$29",
      sub: "per user / month",
      features: ["Unlimited workflows", "All integrations", "Priority support", "Advanced agents"],
      cta: "Start 14-day trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      sub: "Talk to sales",
      features: ["SSO & SAML", "Audit logs", "Dedicated CSM", "Custom SLAs"],
      cta: "Contact sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-primary font-medium">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground">Start free. Scale when you're ready.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`relative rounded-2xl border p-7 ${
                p.featured
                  ? "border-transparent bg-foreground text-background shadow-[var(--shadow-soft)]"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-xs px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-background/70" : "text-muted-foreground"}`}>{p.sub}</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((ft) => (
                  <li key={ft} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${p.featured ? "text-primary-glow" : "text-primary"}`} />
                    <span className={p.featured ? "text-background/90" : "text-foreground/80"}>{ft}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  p.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 p-12 md:p-16 text-center"
          style={{
            background:
              "radial-gradient(80% 100% at 50% 0%, var(--lavender-wash) 0%, transparent 70%), radial-gradient(80% 100% at 50% 120%, var(--pink-wash) 0%, transparent 70%), var(--card)",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Ready to build something delightful?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join thousands of teams using Slashy to ship workflows their customers love.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
            >
              Book a demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold text-foreground">slashy</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Status</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
