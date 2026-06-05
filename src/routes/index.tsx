import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Zap, Shield, BarChart3, Workflow, Wand2, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slashy — Ship faster with AI-native workflows" },
      { name: "description", content: "An AI-native canvas to design, automate, and ship product workflows in minutes — not weeks." },
      { property: "og:title", content: "Slashy — Ship faster with AI-native workflows" },
      { property: "og:description", content: "Design, automate and ship product workflows in minutes with an AI-native canvas." },
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
      className="sticky top-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-lg">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          slashy
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign in</a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get started <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-[680px] opacity-90"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 100%, var(--pink-wash) 0%, transparent 60%), radial-gradient(50% 50% at 85% 100%, var(--lavender-wash) 0%, transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--lavender-wash) 70%, transparent)" }}
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--pink-wash) 80%, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          New · Slashy 2.0 is live
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]"
        >
          Ship product workflows
          <br />
          <span className="bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
            at the speed of thought.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Slashy is an AI-native canvas where teams design, automate and ship product flows
          in minutes — not weeks. No glue code. No context switching.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium shadow-[var(--shadow-soft)] hover:translate-y-[-1px] transition-transform"
          >
            Start free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center rounded-full border border-border bg-card/70 backdrop-blur px-6 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
          >
            See how it works
          </a>
        </motion.div>

        {/* Product preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div
            className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur p-2"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50 bg-muted/40">
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.08_20)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.1_85)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.1_150)]" />
              </div>
              <div className="grid grid-cols-12 min-h-[340px]">
                <div className="col-span-3 border-r border-border/50 p-4 space-y-2 bg-muted/20">
                  {["Inbox", "Workflows", "Agents", "Reports", "Settings"].map((it, i) => (
                    <motion.div
                      key={it}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.07 }}
                      className={`px-3 py-2 rounded-lg text-sm ${i === 1 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}
                    >
                      {it}
                    </motion.div>
                  ))}
                </div>
                <div className="col-span-9 p-6 space-y-4">
                  {[
                    { t: "New signup → enrich → assign", c: "Running" },
                    { t: "Daily revenue digest", c: "Scheduled" },
                    { t: "Churn-risk auto-outreach", c: "Draft" },
                    { t: "Support triage agent", c: "Running" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.t}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)] inline-flex items-center justify-center text-primary-foreground">
                          <Workflow className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-foreground">{row.t}</span>
                      </div>
                      <span className="text-xs text-muted-foreground rounded-full bg-muted px-2.5 py-1">{row.c}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["northwind", "acme", "monolith", "lumen", "stellar", "zephyr"];
  return (
    <section className="border-y border-border/60 bg-background/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by product teams everywhere
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {logos.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center text-lg font-semibold tracking-tight text-foreground/70"
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
  { icon: Wand2, title: "AI-native canvas", desc: "Sketch a workflow in plain English and watch it assemble itself — nodes, logic and integrations." },
  { icon: Zap, title: "Real-time execution", desc: "Every change runs instantly. No deploys, no waiting, no broken staging environments." },
  { icon: BarChart3, title: "Insights built-in", desc: "Track every run, surface anomalies, and learn what your workflows are actually doing." },
  { icon: Shield, title: "Enterprise-grade", desc: "SOC2, SSO, granular roles and audit logs from day one — not an afterthought." },
  { icon: Workflow, title: "200+ integrations", desc: "Connect the tools your team already loves. New connectors ship every week." },
  { icon: Sparkles, title: "Agents you can trust", desc: "Bring your own model or use ours. Guardrails and human-in-the-loop are first-class." },
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
          className="max-w-2xl"
        >
          <p className="text-sm text-primary font-medium">Features</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Everything you need to ship,
            <br /> nothing you don't.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Slashy replaces the messy stack of glue scripts, point tools and copy-pasted prompts with a single, beautiful surface.
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
              className="group relative rounded-2xl border border-border/70 bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "var(--gradient-primary)" }}
              />
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
                <f.icon className="h-5 w-5" />
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
    { n: "01", t: "Describe it", d: "Type what you want your workflow to do. Slashy turns it into a runnable canvas." },
    { n: "02", t: "Refine on the canvas", d: "Drag, tweak and chain steps visually. Every change is live." },
    { n: "03", t: "Ship & monitor", d: "Publish in one click. Get real-time insights into every run." },
  ];
  return (
    <section id="how" className="relative py-28 bg-muted/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground max-w-xl"
        >
          From idea to running workflow in three steps.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative rounded-2xl bg-card border border-border/70 p-7"
            >
              <span className="text-sm font-mono text-primary">{s.n}</span>
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
              Get started free <ArrowRight className="h-4 w-4" />
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
